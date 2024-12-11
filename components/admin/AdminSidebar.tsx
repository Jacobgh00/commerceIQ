"use client"

import {Renderable} from "@/utilities/ComponentUtilities";
import {cn} from "@/lib/utils";
import {useRouter, useSearchParams} from "next/navigation";
import { useTransition} from "react";


export function AdminSidebar(props: {
    activeSection: string
    onNavigate: () => void
}): Renderable {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const sections = [
        { key: "overview", label: "Dashboard"},
        { key: "products", label: "Produkter"},
        { key: "orders", label: "Ordrer"}
    ]

    const activeSection = searchParams.get("section") || "overview";

    function handleNavigation(sectionKey: string): void {
        const path = `/admin?section=${sectionKey}`
        if (!isPending) {
            startTransition(() => {
                router.push(path)
                props.onNavigate()
            });
        }
    }

    return (
        <nav className="w-64 bg-white min-h-screen p-4">
            <ul className="flex flex-col gap-4">
                {sections.map((section) => (
                    <li key={section.key}>
                        <button
                            onClick={() => handleNavigation(section.key)}
                            className={cn(
                                "block w-full text-left px-4 py-2 rounded transition-colors duration-200 text-gray-800",
                                activeSection === section.key
                                    ? "bg-emerald-500 text-white"
                                    : "hover:bg-gray-200"
                            )}
                        >
                            {section.label}
                        </button>
                    </li>
                ))}
            </ul>
            {isPending && (
                <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
                    <div className="animate-spin rounded-full size-32 border-b-2 border-emerald-500"></div>
                </div>
            )}
        </nav>
    );
}