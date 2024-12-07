import {Renderable} from "@/utilities/ComponentUtilities";
import {getProductBySlug} from "@/supabase/products/ProductQuery";
import {notFound} from "next/navigation";
import {cn} from "@/lib/utils";
import Image from "next/image";

export default async function ProductPage({
    params
}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params
    const product = await getProductBySlug(slug)

    if (!product) {
        return notFound()
    }

    const isOutOfStock = product.stock != null && product.stock <= 0

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={cn(
                    "relative aspect-square overflow-hidden rounded-lg shadow-lg",
                    isOutOfStock ? "opacity-50" : ""
                )}
                >
                    {product.image_url && (
                        <div className="w-full h-full flex items-center justify-center">
                            <Image
                                src={product.image_url}
                                alt={product.name || "Produkt billede"}
                                width={500}
                                height={500}
                                className="object-contain transition-transform duration-300 hover:scale-105 max-w-full max-h-full"
                            />
                        </div>
                    )}
                    {isOutOfStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <span className="text-white font-bold text-lg">Ikke på Lager</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <div className="text-xl font-semibold mb-4">
                            Kr. {product.price.toFixed(2)}
                        </div>
                        <div className="prose max-w-none mb-6">
                            {product.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}