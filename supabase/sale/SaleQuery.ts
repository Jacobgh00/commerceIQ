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

export async function getTotalSales(): Promise<number> {
    const { data, error } = await supabase
        .from("orders")
        .select("total_price", { count: "exact" })
        .eq("status", "paid");

    if (error) {
        console.error("Error fetching sales:", error);
        return 0;
    }

    return data?.reduce((acc: number, order: { total_price: number }) => acc + order.total_price, 0) || 0;
}

export async function getSalesEvolution(): Promise<Array<{ date: string; revenue: number }>> {
    const { data, error } = await supabase
        .from("orders")
        .select("total_price, created_at")
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching sales evolution:", error);
        return [];
    }

    const groupedRevenue = data.reduce((acc: Record<string, number>, order) => {
        const date = new Date(order.created_at).toLocaleDateString("da-DK", {
            year: "numeric",
            month: "short",
        });
        acc[date] = (acc[date] || 0) + order.total_price;
        return acc;
    }, {});

    return Object.entries(groupedRevenue).map(([date, revenue]) => ({
        date,
        revenue,
    }));
}