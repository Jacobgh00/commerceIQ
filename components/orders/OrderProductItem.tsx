import {OrderItem} from "@/supabase/types/OrderItemType";
import {Renderable} from "@/utilities/ComponentUtilities";
import Image from "next/image";
import {formatCurrency} from "@/lib/formatCurrency";

export function OrderProductItem(props: {
    product: OrderItem
    currency: string
}): Renderable {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-2 border-b last:border-b-0">
            <div className="flex items-center gap-3 sm:gap-4">
                {props.product.product.image_url && (
                    <div className="relative size-14 sm:size-16 flex-shrink-0 rounded-md overflow-hidden">
                        <Image
                            src={props.product.product.image_url}
                            alt={props.product.product.name}
                            className="object-cover"
                            fill
                        />
                    </div>
                )}
                <div>
                    <p className="font-medium text-sm sm:text-base">{props.product.product.name}</p>
                    <p>Antal: {props.product.quantity}</p>
                </div>
            </div>
            <p className="font-medium text-right">
                {props.product.product.price && props.product.quantity
                    ? formatCurrency(props.product.product.price * props.product.quantity, props.currency)
                    : "N/A"}
            </p>
        </div>
    );
}