import {supabase} from "@/supabase/server";
import {Sale} from "@/supabase/types/SalesType";


export async function getActiveSaleByCouponCode(couponCode: string): Promise<Sale | null> {
    const { data, error } = await supabase
        .from("sales")
        .select("*")
        .eq("coupon_code", couponCode)
        .eq("is_active", true)
        .lte("valid_from", new Date().toISOString())
        .gte("valid_until", new Date().toISOString())
        .single();

    if (error) {
        console.error("Error fetching sale:", error);
        return null;
    }

    return data as Sale;
}