import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getUserOrders} from "@/supabase/order/OrderQuery";
import {OrderList} from "@/components/orders/OrderList";

export default async function OrdersPage() {
    const {userId} = await auth()

    if (!userId) {
        return redirect("/")
    }

    const orders = await getUserOrders(userId)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-8">
                    Mine Ordrer
                </h1>
                <OrderList orders={orders} />
            </div>
        </div>
    );
}