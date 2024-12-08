'use client'

import {Renderable} from "@/utilities/ComponentUtilities";
import {Logo} from "@/components/header/Logo";
import {SearchBar} from "@/components/header/SearchBar";
import {CartButton} from "@/components/header/CartButton";
import {UserActions} from "@/components/header/UserActions";
import {AdminButton} from "@/components/header/AdminButton";
import useBasketStore from "@/store/Store";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {cn} from "@/lib/utils";
import {AdminSidebar} from "@/components/admin/AdminSidebar";
import {Menu, X} from "lucide-react";

export function Header(): Renderable {
    const pathname = usePathname();
    const itemCount = useBasketStore((state) =>
        state.items.reduce((total, item) => total + item.quantity, 0)
    )

    const isAdminPage = pathname.startsWith("/admin");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <header className="flex flex-wrap md:flex-nowrap justify-between items-center px-4 py-3 bg-white shadow">
            <div className="flex items-center w-full md:w-auto">
                <Logo />
                {isAdminPage && (
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="ml-4 md:hidden flex items-center justify-center"
                    >
                        <Menu className="size-8 text-gray-800" />
                    </button>
                )}
            </div>

            {!isAdminPage && (
                <div className="hidden md:block flex-1">
                    <SearchBar />
                </div>
            )}

            <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
                {!isAdminPage && (
                    <div className="flex">
                        <AdminButton/>
                    </div>
                )}
                <div className="flex flex-row gap-4 items-center">
                    <CartButton itemCount={itemCount}/>
                    <UserActions/>
                </div>
            </div>

            {isAdminPage && (
                <>
                    <div
                        className={cn(
                            "fixed inset-0 z-40 bg-white shadow-lg transform transition-transform duration-300 md:hidden w-3/4 max-w-xs",
                            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        )}
                    >
                        <div className="flex justify-end p-4">
                            <Logo />
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                            >
                                <X className="h-6 w-6 text-gray-800" />
                            </button>
                        </div>
                        <AdminSidebar activeSection={pathname.split("?section=")[1] || "overview"} />
                    </div>

                    {isSidebarOpen && (
                        <div
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
                        />
                    )}
                </>
            )}
        </header>
    );
}