import {Product} from "@/supabase/types/ProductType";
import {Renderable} from "@/utilities/ComponentUtilities";
import {AddToBasketButton} from "@/components/products/AddToBasketButton";
import Image from "next/image";


export function BasketItem(props: {
    product: Product,
    quantity: number,
}): Renderable {
    return (
        <div className="mb-4 p-4 border rounded flex items-center justify-between">
            <div className="size-20 sm:size-24 flex-shrink-0 mr-4">
                {props.product.image_url && (
                    <Image
                        src={props.product.image_url}
                        alt={props.product.name || "Produkt billede"}
                        className="w-full h-full object-cover rounded"
                        width={96}
                        height={96}
                    />
                )}
            </div>
            <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-semibold truncate">
                    {props.product.name}
                </h2>
                <p className="text-sm sm:text-base">
                    Pris: Kr.{" "}
                    {((props.product.price ?? 0) * props.quantity).toFixed(2)}
                </p>
            </div>
            <div className="flex items-center ml-4 flex-shrink-0">
                <AddToBasketButton product={props.product}/>
            </div>
        </div>
    )
}