"use client"

import {Product} from "@/supabase/types/ProductType";
import {Renderable} from "@/utilities/ComponentUtilities";
import {formatCurrency} from "@/lib/formatCurrency";
import {DeleteProductButton} from "@/components/admin/products/DeleteProductButton";

export function ProductRow(props: {
    product: Product
}): Renderable {
   return (
       <tr className="border-b">
           <td className="px-4 py-2">{props.product.name}</td>
           <td className="px-4 py-2">{formatCurrency(props.product.price, "DKK")}</td>
           <td className="px-4 py-2">{props.product.stock}</td>
           <td className="px-4 py-2">
               <DeleteProductButton productId={props.product.id} />
           </td>
       </tr>
   )
}