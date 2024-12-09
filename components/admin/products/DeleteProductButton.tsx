import Form from "next/form";
import {DeleteProductAction} from "@/supabase/products/ProductQuery";
import {Trash} from "lucide-react";
import {Renderable} from "@/utilities/ComponentUtilities";


export function DeleteProductButton(props: {
    productId: number
}): Renderable {
    return (
        <Form action={DeleteProductAction}>
            <input type="hidden" name="productId" value={props.productId}/>
            <button type="submit">
                <Trash className="size-5"/>
            </button>
        </Form>
    )
}