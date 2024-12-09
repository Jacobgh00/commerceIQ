import {Product} from "@/supabase/types/ProductType";
import {Renderable} from "@/utilities/ComponentUtilities";
import Link from "next/link";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {formatCurrency} from "@/lib/formatCurrency";

export function ProductThumb(props: {
    product: Product
}): Renderable {
    const isOutOfStock = props.product.stock !== null && props.product.stock <= 0;

    return (
        <Link
            href={`/product/${props.product.slug}`}
            className={cn(
                "group flex flex-col bg-white rounded-lg border border-gray-200",
                "shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden",
                isOutOfStock ? "opacity-50" : ""
            )}
        >
            <div className="relative aspect-square max-h-64 flex items-center justify-center overflow-hidden">
                {props.product.image_url && (
                    <Image
                        src={props.product.image_url}
                        alt={props.product.name || "Product Image"}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                )}

                {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <span className="text-white font-bold text-lg">Ikke på Lager</span>
                    </div>
                )}
            </div>

            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {props.product.name}
                </h2>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {props.product.description}
                </p>
                <p className="mt-2 text-lg font-bold text-gray-900">
                    {formatCurrency(props.product.price, "dkk")}
                </p>
            </div>
        </Link>
    )
}