import {getActiveSaleByCouponCode} from "@/supabase/sale/SaleQuery";
import {CouponCodes} from "@/supabase/sale/CouponCodes";
import {Gift} from "lucide-react";

export async function BlackFridayBanner() {
    const sale = await getActiveSaleByCouponCode(CouponCodes.BLACK_FRIDAY);

    if (!sale?.is_active) {
        return null;
    }

    return (
        <div className="bg-gradient-to-r from-black via-red-700 to-black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-xl">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 animate-pulse">
                        <Gift className="inline-block mr-2 text-white size-12 pb-2"/>
                        {sale.title}
                    </h2>
                    <p className="text-xl sm:text-2xl font-medium mb-6">
                        {sale.description}
                    </p>
                    <div
                        className="bg-gray-50 text-gray-900 py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 w-fit mx-auto sm:mx-0">
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                            <span className="font-bold text-lg sm:text-xl">
                                Brug koden:{" "}
                                <span className="font-extrabold text-red-500">
                                    {sale.coupon_code}
                                </span>
                            </span>
                            <span className="text-lg sm:text-xl font-medium text-center sm:text-left">
                                og få <span className="font-extrabold">{sale.discount_amount}%</span> rabat!
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
