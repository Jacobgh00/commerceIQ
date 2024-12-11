'use client';

import {Children, Renderable} from "@/utilities/ComponentUtilities";
import {Logo} from "@/components/header/Logo";
import {cn} from "@/lib/utils";
import {AdminSidebar} from "@/components/admin/AdminSidebar";
import {X} from "lucide-react";
import {useSearchParams} from "next/navigation";
import {useState} from "react";

export function AdminLayout(props: {
    children: Children;
}): Renderable {
    const searchParams = useSearchParams();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const activeSection = searchParams.get("section") || "overview";

    function handleNavigation(): void {
        setIsSidebarOpen(false);
    }

    return (
        <div className="flex">
            <div className="hidden md:flex">
                <AdminSidebar activeSection={activeSection} onNavigate={handleNavigation} />
            </div>

            {isSidebarOpen && (
                <div
                    className={cn(
                        "fixed inset-0 z-40 bg-white shadow-lg transform transition-transform duration-300 md:hidden w-3/4 max-w-xs",
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    )}
                >
                    <div className="flex justify-between items-center p-4">
                        <Logo />
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                        >
                            <X className="h-6 w-6 text-gray-800" />
                        </button>
                    </div>
                    <AdminSidebar activeSection={activeSection} onNavigate={handleNavigation} />
                </div>
            )}

            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
                />
            )}

            <div className="flex-1">
                <main className="p-6 bg-gray-100 overflow-x-auto">{props.children}</main>
            </div>
        </div>
    );
}