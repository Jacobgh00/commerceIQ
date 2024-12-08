import {Order} from "@/supabase/types/OrderType";
import {Renderable} from "@/utilities/ComponentUtilities";
import {cn} from "@/lib/utils";
import {formatCurrency} from "@/lib/formatCurrency";
import {OrderDetails} from "@/components/orders/OrderDetails";

export function OrderCard(props: {
    order: Order
}): Renderable {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                    <div>
                        <p className="text-sm text-gray-600 mb-1 font-bold">Ordre nummer</p>
                        <p className="font-mono text-sm text-emerald-600 break-all">
                            {props.order.order_number}
                        </p>
                    </div>
                    <div className="sm:text-right">
                        <p className="text-sm text-gray-600 mb-1">Ordre Dato</p>
                        <p className="font-medium">
                            {props.order.order_date
                                ? new Date(props.order.order_date).toLocaleDateString()
                                : "N/A"}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                    <div className="flex items-center">
                        <span className="text-sm mr-2">Status:</span>
                        <span
                            className={cn(
                                "px-3 py-1 rounded-full text-sm",
                                props.order.status === "paid"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-yellow-100 text-yellow-800"
                            )}
                        >
                            {props.order.status}
                        </span>
                    </div>
                    <div className="sm:text-right">
                        <p className="text-sm text-gray-600 mb-1">Total Pris</p>
                        <p className="font-bold text-lg">
                            {formatCurrency(props.order.total_price ?? 0, props.order.currency)}
                        </p>
                    </div>
                </div>
            </div>
            <OrderDetails order={props.order} />
        </div>
    );
}