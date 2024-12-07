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