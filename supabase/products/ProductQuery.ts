import {Product} from "@/supabase/types/ProductType";
import {supabase} from "@/supabase/server";

export async function getAllProducts(): Promise<Array<Product>> {
    const { data, error} = await supabase.from('products').select('*');

    if (error) {
        console.error("Error fetching products", error);
        return []
    }
    return data as Array<Product>
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