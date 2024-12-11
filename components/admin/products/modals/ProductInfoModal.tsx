"use client"

import {Product} from "@/supabase/types/ProductType";
import Image from "next/image";
import {formatCurrency} from "@/lib/formatCurrency";
import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {XIcon} from "lucide-react";

export function ProductInfoModal(props: {
    product: Product
    onClose: () => void
}) {
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => {
            clearTimeout(timer)
            setIsMounted(false);
        };
    }, []);

    function handleClose() {
        setIsVisible(false);
        setTimeout(() => props.onClose(), 200);
    }

    if (!isMounted) {
        return null;
    }

    return createPortal(
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50 transition-opacity duration-300 ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
            role="dialog"
            aria-labelledby="product-modal-title"
            aria-modal="true"
        >
            <div
                className={`bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative transform transition-transform duration-200 h-[600px] overflow-y-auto ${
                    isVisible ? "scale-100" : "scale-95"
                }`}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:bg-gray-100 rounded-full p-1 transition-all duration-200"
                    aria-label="Close modal"
                >
                    <XIcon className="size-6"/>
                </button>

                <h2
                    id="product-modal-title"
                    className="text-xl font-semibold mb-4 text-gray-800"
                >
                    {props.product.name}
                </h2>

                <div className="flex items-center justify-center mb-4">
                    <Image
                        src={props.product.image_url || "/images/placeholder.png"}
                        alt={props.product.name}
                        width={300}
                        height={300}
                        className="object-contain rounded-lg border p-8"
                    />
                </div>

                <div
                    className="mb-4 text-sm text-gray-600 line-clamp-4"
                    dangerouslySetInnerHTML={{__html: props.product.description}}
                />

                <div className="mb-4 text-sm text-gray-800 space-y-2">
                    <p>
                        <strong>Price:</strong>{" "}
                        {formatCurrency(props.product.price, "DKK")}
                    </p>
                    <p>
                        <strong>Stock:</strong> {props.product.stock}
                    </p>
                </div>
            </div>
        </div>,
        document.body
    );
}