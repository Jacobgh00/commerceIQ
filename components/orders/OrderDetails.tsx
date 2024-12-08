import {Order} from "@/supabase/types/OrderType";
import {Renderable} from "@/utilities/ComponentUtilities";
import {OrderProductList} from "@/components/orders/OrderProductList";


export function OrderDetails(props: {
    order: Order
}): Renderable {
    return (
        <div className="px-4 py-3 sm:px-6 sm:py-4">
            <p className="text-sm font-semibold text-gray-600 mb-3 sm:pb-4">Ordre Detaljer</p>
            <OrderProductList
                products={props.order.products}
                currency={props.order.currency}
            />
        </div>
    );
}