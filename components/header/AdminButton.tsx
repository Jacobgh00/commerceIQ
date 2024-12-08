'use client'

import {Renderable} from "@/utilities/ComponentUtilities";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {useUser} from "@clerk/nextjs";
import {ShieldCheck} from "lucide-react";

export function AdminButton(): Renderable {
    const { user } = useUser()

    if (!user || user.publicMetadata.role !== "admin") {
        return null
    }

    return (
        <Link
            href="/admin/dashboard"
            className={cn(
                'flex-1 relative flex justify-center sm:justify-start sm:flex-none',
                'items-center gap-2 bg-emerald-500 hover:bg-emerald-700',
                'text-white font-bold py-2 px-4 rounded transition-colors'
            )}
        >
            <ShieldCheck className="size-6"/>
            <span>Admin</span>
        </Link>
    )
}