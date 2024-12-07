'use client'

import {Renderable} from "@/utilities/ComponentUtilities";
import {ClerkLoaded, SignedIn, SignInButton, UserButton, useUser} from "@clerk/nextjs";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {PackageIcon} from "lucide-react";

export function UserActions(): Renderable {
    const { user } = useUser();

    async function createClerkPasskey() {
        try {
            const response = await user?.createPasskey();
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ClerkLoaded>
            <SignedIn>
                <Link
                    href="/orders"
                    className={cn(
                        'flex-1 relative flex justify-center sm:justify-start sm:flex-none',
                        'items-center gap-2 bg-blue-500 hover:bg-blue-700',
                        'text-white font-bold py-2 px-4 rounded transition-colors'
                    )}
                >
                    <PackageIcon className="size-6" />
                    <span className="whitespace-nowrap">Mine Ordre</span>
                </Link>
            </SignedIn>

            {user ? (
                <div className="flex items-center gap-2">
                    <UserButton />
                    <div className="hidden sm:block text-xs">
                        <p className="text-gray-400">Velkommen Tilbage</p>
                        <p className="font-bold">{user.fullName}</p>
                    </div>
                </div>
            ) : (
                <SignInButton mode="modal" />
            )}

            {user?.passkeys.length === 0 && (
                <button
                    type="button"
                    onClick={createClerkPasskey}
                    className={cn(
                        'bg-white hover:bg-blue-700 hover:text-white',
                        'animate-pulse text-blue-500 font-bold px-4 py-2 rounded',
                        'border-blue-300 border transition-all'
                    )}
                >
                    Opret passkey
                </button>
            )}
        </ClerkLoaded>
    );
}