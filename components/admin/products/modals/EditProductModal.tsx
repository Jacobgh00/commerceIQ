import {Product} from "@/supabase/types/ProductType";
import {useEffect, useState} from "react";
import Form from "next/form";
import {UpdateProductAction} from "@/supabase/products/ProductQuery";
import {createPortal} from "react-dom";
import {DescriptionField} from "@/components/admin/products/DescriptionField";
import {XIcon} from "lucide-react";
import {cn} from "@/lib/utils";


export function EditProductModal(props: {
    product: Product
    onClose: () => void
}) {
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [,setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: props.product.name,
        price: props.product.price,
        stock: props.product.stock,
        description: props.product.description || "",
    })

    useEffect(() => {
        setIsMounted(true);
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => {
            clearTimeout(timer);
            setIsMounted(false);
        };
    }, []);

    if (!isMounted) {
        return null;
    }

    function handleClose() {
        setIsVisible(false);
        setTimeout(() => props.onClose(), 200)
    }

    async function handleUpdate(formData: FormData) {
        setIsSubmitting(true);
        await UpdateProductAction(formData);
        setIsSubmitting(false);
        props.onClose();
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }

    return createPortal (
        <div
            className={cn(
                "fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center",
                "z-50 transition-opacity duration-300 h-full overflow-hidden",
                isVisible ? "opacity-100" : "opacity-0"
            )}
            role="dialog"
            aria-labelledby="edit-product-modal-title"
            aria-modal="true"
        >
            <div className="bg-white rounded-lg shadow-xl p-6 max-h-[600px] max-w-[800px] relative overflow-auto">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:bg-gray-200 rounded-full p-1 transition-all duration-200"
                    aria-label="Close modal"
                >
                    <XIcon className="size-6" />
                </button>

                <h2
                    id="edit-product-modal-title"
                    className="text-xl font-semibold mb-4 text-gray-800"
                >
                    Ændre Produkt
                </h2>

                <Form action={handleUpdate} className="space-y-4">
                    <input type="hidden" name="productId" value={props.product.id}/>
                    <div>
                        <label className="block font-medium mb-1">Navn</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="border px-3 py-2 w-full rounded focus:outline-none focus:ring-emerald-500 focus:ring-2 focus:ring-opacity-100"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Pris (DKK)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="border px-3 py-2 w-full rounded focus:outline-none focus:ring-emerald-500 focus:ring-2 focus:ring-opacity-100"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Antal</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            className="border px-3 py-2 w-full rounded focus:outline-none focus:ring-emerald-500 focus:ring-2 focus:ring-opacity-100"
                            required
                        />
                    </div>
                    <div>
                        <DescriptionField initialContent={props.product.description?.toString()}/>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-300 transition-all duration-200"
                        >
                            Gem ændringer
                        </button>
                    </div>
                </Form>
            </div>
        </div>,
        document.body
    )
}