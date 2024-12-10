"use client";

import {Product} from "@/supabase/types/ProductType";
import {Renderable} from "@/utilities/ComponentUtilities";
import {formatCurrency} from "@/lib/formatCurrency";
import {DeleteProductButton} from "@/components/admin/products/buttons/DeleteProductButton";
import {useState} from "react";
import {ViewProductButton} from "@/components/admin/products/buttons/ViewProductButton";
import {EditProductButton} from "@/components/admin/products/buttons/EditProductButton";
import {cn} from "@/lib/utils";

export function ProductRow(props: {
    product: Product
}): Renderable {
    const [isAnimating, setIsAnimating] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false);

    function handleDelete() {
        setIsAnimating(true)
        setTimeout(() => {
            setIsDeleted(true)
        }, 500)
    }

    if (isDeleted) return null;

    return (
        <tr
            className={cn(
                "border-b transition-all duration-500 ease-in-out sm:table-row",
                isAnimating ? "opacity-0 translate-y-2 scale-90 blur-sm" : "opacity-100 translate-y-0 scale-100 blur-0"
            )}
            style={{
                transformOrigin: "right",
            }}
        >
            <td className="hidden sm:table-cell px-4 py-2 text-sm font-medium text-gray-800">
                {props.product.name}
            </td>
            <td className="hidden sm:table-cell px-4 py-2 text-sm text-gray-600">
                {formatCurrency(props.product.price, "DKK")}
            </td>
            <td className="hidden sm:table-cell px-4 py-2 text-sm text-gray-600">
                {props.product.stock}
            </td>
            <td className="hidden sm:table-cell px-4 py-2 items-center gap-2">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                    <ViewProductButton product={props.product}/>
                    <EditProductButton product={props.product}/>
                    <DeleteProductButton productId={props.product.id} onDelete={handleDelete}/>
                </div>
            </td>

            <td className="block sm:hidden w-full px-4 py-2 text-sm font-medium text-gray-800">
                <div>
                    <strong>Navn:</strong> {props.product.name}
                </div>
                <div>
                    <strong>Pris:</strong> {formatCurrency(props.product.price, "DKK")}
                </div>
                <div>
                    <strong>Lager:</strong> {props.product.stock}
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <ViewProductButton product={props.product}/>
                    <EditProductButton product={props.product}/>
                    <DeleteProductButton productId={props.product.id} onDelete={handleDelete}/>
                </div>
            </td>
        </tr>
    )
}