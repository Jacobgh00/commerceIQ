import {Renderable} from "@/utilities/ComponentUtilities";
import Link from "next/link";
import {cn} from "@/lib/utils";

export function Logo(): Renderable {
    return (
        <Link
            href="/"
            className={cn(
                'text-2xl font-bold text-blue-500',
                'hover:opacity-50 cursor-pointer mx-auto sm:mx-0 transition-all'
            )}
        >
            CommerceIQ
        </Link>
    )
}