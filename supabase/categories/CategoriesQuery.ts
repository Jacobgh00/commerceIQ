import {supabase} from "@/supabase/server";
import {Category} from "@/supabase/types/CategoryType";

export async function getAllCategories(): Promise<Array<Category>> {
    const { data, error} = await supabase.from('categories').select('*');

    if (error) {
        console.error("Error fetching categories", error);
        return []
    }
    return data as Array<Category>
}