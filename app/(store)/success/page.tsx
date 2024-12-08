"use client"

import {Renderable} from "@/utilities/ComponentUtilities";
import {useSearchParams} from "next/navigation";
import useBasketStore from "@/store/Store";
import {useEffect} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function SuccessPage(): Renderable {
    const searchParams = useSearchParams()
    const orderNumber = searchParams.get("orderNumber")
    const clearBasket = useBasketStore((state) => state.clearBasket)

    useEffect(() => {
        if (orderNumber) {
            clearBasket()
        }
    }, [orderNumber, clearBasket]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
                <div className="flex justify-center mb-8">
                    <div className="size-16 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg
                            className="size-8 text-emerald-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                <h1 className="text-4xl font-bold mb-6 text-center">
                    Tak for din bestilling!
                </h1>

                <div className="border-t border-b border-gray-200 py-6 mb-6">
                   <p className="text-lg text-gray-700 mb-4 text-center">
                       Din bestilling er bekræftet og vil blive sendt til dig snart.
                   </p>
                    <div className="space-y-2">
                        {orderNumber && (
                            <p className="text-gray-600 flex justify-center items-center gap-5">
                                <span>Ordrenummer:</span>
                                <span className="font-mono text-sm text-emerald-600">
                                    {orderNumber}
                                </span>
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-gray-600 text-center">
                        En kvittering vil blive sendt til din email.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            asChild
                            className="bg-emerald-600 hover:bg-emerald-700 transition-colors"
                        >
                            <Link href="/orders">Se ordre detaljer</Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                        >
                            <Link href="/">
                                Fortsæt shopping
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}