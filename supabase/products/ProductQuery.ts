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