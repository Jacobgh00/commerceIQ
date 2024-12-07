import Link from "next/link";
import {cn} from "@/lib/utils";
import {Renderable} from "@/utilities/ComponentUtilities";
import {ShoppingCart} from "lucide-react";

export function CartButton(): Renderable {
    return (
        <Link
            href="/basket"
            className={cn(
                'flex-1 relative flex justify-center sm:justify-start sm:flex-none',
                'items-center gap-2 bg-blue-500 hover:bg-blue-700',
                'text-white font-bold py-2 px-4 rounded transition-colors'
            )}
        >
            <ShoppingCart className="size-6" />
            <span>Min Kurv</span>
        </Link>
    );
}