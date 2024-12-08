import {OrderItem} from "@/supabase/types/OrderItemType";
import {Renderable} from "@/utilities/ComponentUtilities";
import {OrderProductItem} from "@/components/orders/OrderProductItem";

export function OrderProductList(props: {
    products: Array<OrderItem>
    currency: string
}): Renderable {
    return (
        <div className="space-y-3 sm:space-y-4">
            {props.products.map((product) => (
                <OrderProductItem key={product.product.id} product={product} currency={props.currency} />
            ))}
        </div>
    );
}