'use client'

import {Renderable} from "@/utilities/ComponentUtilities";
import {Logo} from "@/components/header/Logo";
import {SearchBar} from "@/components/header/SearchBar";
import {CartButton} from "@/components/header/CartButton";
import {UserActions} from "@/components/header/UserActions";
import {AdminButton} from "@/components/header/AdminButton";
import useBasketStore from "@/store/Store";

export function Header(): Renderable {
    const itemCount = useBasketStore((state) =>
        state.items.reduce((total, item) => total + item.quantity, 0)
    )

    return (
        <header className="flex flex-wrap justify-between items-center px-4 py-2">
            <div className="flex w-full flex-wrap justify-between items-center">
                <Logo />
                <SearchBar />

                <div className="flex flex-wrap items-center gap-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
                    <AdminButton />
                    <CartButton itemCount={itemCount}/>
                    <UserActions />
                </div>
            </div>
        </header>
    )
}