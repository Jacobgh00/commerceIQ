import {Product} from "@/supabase/types/ProductType";
import {supabase} from "@/supabase/server";
import {rollbackOrder} from "@/supabase/order/OrderQuery";

export async function getAllProducts(): Promise<Array<Product>> {
    const { data, error} = await supabase.from('products').select('*');

    if (error) {
        console.error("Error fetching products", error);
        return []
    }
    return data as Array<Product>
}

export async function getProductCount(): Promise<number> {
    const { data, error } = await supabase
        .from("products")
        .select("id", { count: "exact" });

    if (error) {
        console.error("Error fetching product count:", error.message);
        return 0;
    }

    return data?.length || 0;
}

export async function searchProductsByName(query: string): Promise<Array<Product>> {
    const { data, error} = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)

    if (error) {
        console.error("Error fetching products", error);
        return []
    }

    return data as Array<Product>
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    const { data, error} = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) {
        console.error("Error fetching product", error);
        return null
    }

    return data as Product
}

export async function getProductsByCategory(categorySlug: string): Promise<Array<Product>> {
    const { data, error } = await supabase
        .from("product_categories")
        .select(`
            products!product_categories_product_id_fkey (*),
            categories!product_categories_category_id_fkey (slug)
        `)
        .eq("categories.slug", categorySlug);

    if (error) {
        console.error("Error fetching products by category:", error);
        return [];
    }

    const filteredProducts = data
        ?.filter((item: any) => item.categories?.slug === categorySlug)
        ?.map((item: any) => item.products) || [];

    return filteredProducts as Array<Product>;
}

export async function updateProductStocks(orderId: number, items: Array<{ product_id: string; quantity: number }>) {
    for (const item of items) {
        const { data: product, error: fetchError } = await supabase
            .from("products")
            .select("stock")
            .eq("id", item.product_id)
            .single();

        if (fetchError || !product) {
            console.error(`Error fetching stock for product ID ${item.product_id}:`, fetchError?.message);

            await rollbackOrder(orderId);

            throw new Error(`Failed to fetch stock for product ID ${item.product_id}`);
        }

        const newStock = product.stock - item.quantity;

        if (newStock < 0) {
            throw new Error(`Not enough stock for product ID ${item.product_id}`);
        }

        const { error: stockError } = await supabase
            .from("products")
            .update({ stock: newStock })
            .eq("id", item.product_id);

        if (stockError) {
            console.error(`Error updating stock for product ID ${item.product_id}:`, stockError.message);

            await rollbackOrder(orderId);

            throw new Error(`Failed to update stock for product ID ${item.product_id}`);
        }

        console.log(`Updated stock for product ID ${item.product_id}: Remaining stock ${newStock}`);
    }
}