"use client"

import {useFormStatus} from "react-dom";
import {LoaderCircle} from "lucide-react";
import {cn} from "@/lib/utils";


export function CreateProductButton() {
    const status = useFormStatus();

    return (
        <button
            type="submit"
            disabled={status.pending}
            className={cn(
                "bg-emerald-500 flex items-center justify-center text-white",
                "px-4 py-2 rounded-md transition-all duration-200 h-10 w-36",
                status.pending ? "opacity-50 cursor-not-allowed" : "hover:bg-emerald-600"
            )}
        >
            {status.pending ? (
               <LoaderCircle className="animate-spin size-6"/>
            ) : (
                "Opret Produkt"
            )}
        </button>
    );
}