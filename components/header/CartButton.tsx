import Link from "next/link";
import {cn} from "@/lib/utils";
import {Renderable} from "@/utilities/ComponentUtilities";
import {ShoppingCart} from "lucide-react";

export function CartButton(props: {
    itemCount: number
}): Renderable {
    return (
        <Link
            href="/basket"
            className={cn(
                'flex-1 relative flex justify-center sm:justify-start sm:flex-none',
                'items-center gap-2 bg-emerald-500 hover:bg-emerald-700',
                'text-white font-bold py-2 px-4 rounded transition-colors'
            )}
        >
            <ShoppingCart className="size-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-5 flex items-center justify-center text-xs">
                {props.itemCount}
            </span>
            <span>Min Kurv</span>
        </Link>
    );
}