"use client"

import Form from "next/form";
import {DeleteProductAction} from "@/supabase/products/ProductQuery";
import {Trash} from "lucide-react";
import { useState} from "react";


export function DeleteProductButton(props: {
    productId: number
    onDelete?: () => void
}) {
    const [isDeleting, setIsDeleting] = useState(false);

    function handleDelete() {
        setIsDeleting(true);
        if (props.onDelete) props.onDelete()
    }

    return (
        <Form
            action={DeleteProductAction}
            onSubmit={handleDelete}
        >
            <input type="hidden" name="productId" value={props.productId}/>
            <button
                type="submit"
                className={`flex items-center justify-center p-2 rounded-full transition-all duration-200 hover:bg-red-100 ${
                    isDeleting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Delete product"
                disabled={isDeleting}
            >
                <Trash className="text-red-800 size-5"/>
            </button>
        </Form>
    )
}