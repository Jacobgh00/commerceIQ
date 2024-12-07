import {getActiveSaleByCouponCode} from "@/supabase/sale/SaleQuery";
import {CouponCodes} from "@/supabase/sale/CouponCodes";

export async function BlackFridayBanner() {
    const sale = await getActiveSaleByCouponCode(CouponCodes.BLACK_FRIDAY);

    if (!sale?.is_active) {
        return null;
    }

    return (
        <div className="bg-gradient-to-r from-red-600 to-black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex-1">
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-left mb-4">
                        {sale.title}
                    </h2>
                </div>
            </div>
        </div>
    )
}