"use client"

import {Product} from "@/supabase/types/ProductType";
import {useState} from "react";
import {Eye} from "lucide-react";
import {ProductInfoModal} from "@/components/admin/products/modals/ProductInfoModal";


export function ViewProductButton(props: {
    product: Product
}) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            <button
                onClick={handleOpenModal}
                className="flex items-center justify-center p-2 rounded-full transition-all duration-200 hover:bg-gray-100"
                aria-label={`View details for ${props.product.name}`}
            >
                <Eye className="text-gray-700 size-5" />
            </button>
            {isModalOpen && (
                <ProductInfoModal
                    product={props.product}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}