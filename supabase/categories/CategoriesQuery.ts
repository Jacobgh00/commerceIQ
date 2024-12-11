import {supabase} from "@/supabase/server";
import {Category} from "@/supabase/types/CategoryType";

export async function getAllCategories(): Promise<Array<Category>> {
    try {
        const { data, error } = await supabase.from('categories').select('*');

        if (error) {
            console.error("Error fetching categories:", error.message);
            return [];
        }
        return data || [];
    } catch (err) {
        console.error("Unexpected error fetching categories:", err);
        return [];
    }
}