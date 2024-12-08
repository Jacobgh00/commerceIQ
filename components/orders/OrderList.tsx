import {Order} from "@/supabase/types/OrderType";
import {Renderable} from "@/utilities/ComponentUtilities";
import {OrderCard} from "@/components/orders/OrderCard";

export function OrderList(props: {
    orders: Array<Order>
}): Renderable {

    if (props.orders.length === 0) {
        return (
            <div className="text-center text-gray-600">
                <p>Du har ikke lavet nogen ordre endnu.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8">
            {props.orders.map((order) => (
                <OrderCard key={order.order_number} order={order} />
            ))}
        </div>
    );

}