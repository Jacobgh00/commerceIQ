import {Order} from "@/supabase/types/OrderType";
import {OrderPagination} from "@/components/admin/orders/OrderPagination";

export function OrderTable(props: {
    orders: Array<Order>
    currentPage: number
    totalPages: number
    basePath: string
}) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full min-h-[200px] table-auto">
                <thead className="hidden md:table-header-group">
                    <tr className="border-b">
                    <th className="text-left px-4 py-2">Ordre nummer</th>
                    <th className="text-left px-4 py-2">Kunde</th>
                    <th className="text-left px-4 py-2">Total</th>
                    <th className="text-left px-4 py-2">Dato</th>
                    <th className="text-left px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {props.orders.map((order) => (
                        <tr key={order.id} className="border-b grid md:table-row grid-cols-2 gap-4 md:gap-0 px-4 py-6">
                            <td className="md:px-4 md:py-2">
                                <span className="font-bold md:hidden">Ordre nummer:</span>{" "}
                                {order.order_number}
                            </td>
                            <td className="md:px-4 md:py-2">
                                <span className="font-bold md:hidden">Kunde:</span>{" "}
                                {order.customer_name}
                            </td>
                            <td className="md:px-4 md:py-2">
                                <span className="font-bold md:hidden">Total:</span>{" "}
                                {order.total_price} DKK
                            </td>
                            <td className="md:px-4 md:py-2">
                                <span className="font-bold md:hidden">Dato:</span>{" "}
                                {new Date(order.order_date).toLocaleDateString()}
                            </td>
                            <td className="md:px-4 md:py-2">
                                <span className="font-bold md:hidden">Status:</span>{" "}
                                {order.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <OrderPagination
                currentPage={props.currentPage}
                totalPages={props.totalPages}
                basePath={props.basePath}
            />
        </div>
    )
}