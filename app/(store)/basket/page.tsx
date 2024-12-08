'use client'

import {Renderable} from "@/utilities/ComponentUtilities";
import useBasketStore from "@/store/Store";
import { useAuth, useUser} from "@clerk/nextjs";
import {useEffect, useState} from "react";
import {Loader} from "@/components/Loader";
import {BasketHeader} from "@/components/basket/BasketHeader";
import {BasketItem} from "@/components/basket/BasketItem";
import {BasketSummary} from "@/components/basket/BasketSummary";
import {createCheckoutSession, Metadata} from "@/action/CreateCheckoutSession"


export default function BasketPage(): Renderable {
    const groupedItems = useBasketStore((state) => state.getGroupedItems())
    const { isSignedIn } = useAuth()
    const { user } = useUser()

    const [isClient, setIsClient] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect((): void => {
        setIsClient(true)
    }, []);

    if (!isClient) {
        return <Loader/>
    }

    async function handleCheckout() {
        if (!isSignedIn) {
            return
        }
        setIsLoading(true)

        try {
            const metadata: Metadata = {
                orderNumber: crypto.randomUUID(),
                customerName: user?.fullName ?? "Unknown",
                customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
                clerkUserId: user!.id,
            }
            const checkoutUrl = await createCheckoutSession(groupedItems, metadata)

            if (checkoutUrl) {
               window.location.href = checkoutUrl
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }


    const isEmpty = groupedItems.length === 0;


    if (groupedItems.length === 0) {
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Din Kurv
                </h1>
                <p className="text-gray-600 text-lg">
                    Din kurv er tom
                </p>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <BasketHeader isEmpty={isEmpty} />
            {!isEmpty && (
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-grow">
                        {groupedItems.map((item) => (
                            <BasketItem
                                key={item.product.id}
                                product={item.product}
                                quantity={item.quantity}
                            />
                        ))}
                    </div>
                    <BasketSummary
                        handleCheckout={handleCheckout}
                        isLoading={isLoading}
                        isSignedIn={isSignedIn}
                    />

                    <div className="h-64 lg:h-0" />
                </div>
            )}
        </div>
    );
}