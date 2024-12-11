"use client"


import {Product} from "@/supabase/types/ProductType";
import {useState} from "react";
import {Pencil} from "lucide-react";
import {EditProductModal} from "@/components/admin/products/modals/EditProductModal";

export function EditProductButton(props: {
    product: Product
}) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleOpenModal() {
        setIsModalOpen(true)
    }

    function handleCloseModal() {
        setIsModalOpen(false)
    }

    return (
        <>
            <button
                onClick={handleOpenModal}
                className="flex items-center justify-center p-2 rounded-full transition-all duration-200 hover:bg-gray-100"
                aria-label={`Edit ${props.product.name}`}
            >
                <Pencil className="text-blue-800 size-5" />
            </button>
            {isModalOpen && (
                <EditProductModal
                    product={props.product}
                    onClose={handleCloseModal}
                />
            )}
        </>
    )
}