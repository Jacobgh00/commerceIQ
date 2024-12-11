"use client"

import {cn} from "@/lib/utils";
import { useState} from "react";
import {LoaderCircle} from "lucide-react";
import {useRouter} from "next/navigation";

export function OrderPagination(props: {
    currentPage: number;
    totalPages: number;
    basePath: string;
}) {
    const [loadingButton, setLoadingButton] = useState<"previous" | "next" | null>(null);
    const router = useRouter();

    function createPageLink(page: number) {
        const url = new URL(window.location.href);
        url.searchParams.set("page", page.toString());
        return url.toString();
    }


    async function handleNavigation(page: number, button: "previous" | "next") {
        setLoadingButton(button)
        const href = createPageLink(page)

        router.push(href)
        router.prefetch(href)
        setTimeout(() => setLoadingButton(null), 500);
    }

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
            <button
                onClick={() => handleNavigation(props.currentPage - 1, "previous")}
                disabled={props.currentPage === 1}
                className={cn(
                    "flex items-center justify-center md:w-20 w-full py-2 bg-emerald-500 hover:bg-emerald-700",
                    "rounded text-white transition-colors duration-200",
                    props.currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                )}
            >
                {loadingButton === "previous" ? (
                    <LoaderCircle className="size-6 animate-spin" />
                ) : (
                    "Forrige"
                )}
            </button>
            <span>
                Side {props.currentPage} af {props.totalPages}
            </span>
            <button
                onClick={() => handleNavigation(props.currentPage + 1, "next")}
                disabled={props.currentPage === props.totalPages}
                className={cn(
                    "flex items-center justify-center md:w-20 w-full py-2 bg-emerald-500 hover:bg-emerald-700",
                    "rounded text-white transition-colors duration-200",
                    props.currentPage === props.totalPages ? "opacity-50 pointer-events-none" : ""
                )}
            >
                {loadingButton === "next" ? (
                    <LoaderCircle className="size-6 animate-spin"/>
                ) : (
                    "Næste"
                )}
            </button>
        </div>
    );
}