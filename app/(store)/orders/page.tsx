import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getUserOrders} from "@/supabase/order/OrderQuery";
import {cn} from "@/lib/utils";
import {formatCurrency} from "@/lib/formatCurrency";
import Image from "next/image";

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

                {orders.length === 0 ? (
                    <div className="text-center text-gray-600">
                        <p>Du har ikke lavet nogen ordre endnu.</p>
                    </div>
                ) : (
                    <div className="space-y-6 sm:space-y-8">
                        {orders.map((order) => (
                            <div
                                key={order.order_number}
                                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                            >
                                <div className="p-4 sm:p-6 border-b border-gray-200">
                                    <div
                                        className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1 font-bold">
                                                Ordre nummer
                                            </p>
                                            <p className="font-mono text-sm text-emerald-600 break-all">
                                                {order.order_number}
                                            </p>
                                        </div>
                                        <div className="sm:text-right">
                                            <p className="text-sm text-gray-600 mb-1">Ordre Dato</p>
                                            <p className="font-medium">
                                                {order.order_date
                                                    ? new Date(order.order_date).toLocaleDateString()
                                                    : "N/A"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                                        <div className="flex items-center">
                                            <span className="text-sm mr-2">Status:</span>
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-sm",
                                                order.status === "paid" ? "bg-emerald-100 text-emerald-800" : "bg-yellow-100 text-yellow-800"
                                            )}>
                                            {order.status}
                                        </span>
                                        </div>
                                        <div className="sm:text-right">
                                            <p className="text-sm text-gray-600 mb-1">
                                                Total Pris
                                            </p>
                                            <p className="font-bold text-lg">
                                                {formatCurrency(order.total_price ?? 0, order.currency)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-4 py-3 sm:px-6 sm:py-4">
                                    <p className="text-sm font-semibold text-gray-600 mb-3 sm:pb-4">
                                        Ordre Detaljer
                                    </p>
                                    <div className="space-y-3 sm:space-y-4">
                                        {order.products?.map((product) => (
                                            <div
                                                key={product.product.id}
                                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-2 border-b last:border-b-0"
                                            >
                                                <div className="flex items-center gap-3 sm:gap-4">
                                                    {product.product.image_url && (
                                                        <div className="relative size-14 sm:size-16 flex-shrink-0 rounded-md overflow-hidden">
                                                            <Image
                                                                src={product.product.image_url}
                                                                alt={product.product.name}
                                                                className="object-cover"
                                                                fill
                                                            />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-medium text-sm sm:text-base">
                                                            {product.product.name}
                                                        </p>
                                                        <p>
                                                            Antal: {product.quantity}
                                                        </p>
                                                    </div>
                                                </div>

                                                <p className="font-medium text-right">
                                                    {product.product.price && product.quantity
                                                        ? formatCurrency(
                                                            product.product.price * product.quantity,
                                                            order.currency
                                                        )
                                                        : "N/A"
                                                    }
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}