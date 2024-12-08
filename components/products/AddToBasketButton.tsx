'use client'

import {Product} from "@/supabase/types/ProductType";
import {Renderable} from "@/utilities/ComponentUtilities";
import useBasketStore from "@/store/Store";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";

export function AddToBasketButton(props: {
    product: Product
    disabled?: boolean
}): Renderable {
    const { addItem, removeItem, getItemCount } = useBasketStore()
    const itemCount = getItemCount(props.product.id.toString())

    const [isClient, setIsClient] = useState(false)

    useEffect((): void => {
        setIsClient(true)
    }, []);

    if (!isClient) {
        return null
    }

    return (
        <div className="flex items-center justify-center gap-2">
            <button
                type="button"
                onClick={(): void => removeItem(props.product.id.toString())}
                className={cn(
                    "size-8 rounded-full flex items-center justify-center transition-colors duration-200",
                    itemCount === 0
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                )}
                disabled={itemCount === 0 || props.disabled}
            >
                <span
                    className={cn(
                        "text-xl font-bold pb-1",
                        itemCount === 0 ? "text-gray-400" : "text-gray-600"
                    )}
                >
                    -
                </span>
            </button>
            <span className="w-8 text-center font-semibold">
                {itemCount}
            </span>
            <button
                type="button"
                onClick={(): void => addItem(props.product)}
                className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200",
                    props.disabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-500 hover:bg-emerald-600 cursor-pointer"
                )}
                disabled={props.disabled}
            >
                <span className="text-xl font-bold text-white pb-1">+</span>
            </button>
        </div>
    )
}