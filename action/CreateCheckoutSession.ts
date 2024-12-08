"use server"

import {BasketItem} from "@/store/Store";
import stripe from "@/lib/stripe";

export type Metadata = {
    orderNumber: string
    customerName: string
    customerEmail: string
    clerkUserId: string
}

export type GroupedBasketItem = {
    product: BasketItem["product"]
    quantity: number
}

export async function createCheckoutSession(
    items: Array<GroupedBasketItem>,
    metadata: Metadata
) {
    try {
        const itemsWithoutPrice = items.filter((item) => !item.product.price)

        if (itemsWithoutPrice.length > 0) {
            throw new Error("Some items do not have a price")
        }

        const customers = await stripe.customers.list({
            email: metadata.customerEmail,
            limit: 1
        })

        let customerId: string | undefined
        if (customers.data.length > 0) {
            customerId = customers.data[0].id
        }


        const baseUrl = process.env.NODE_ENV === "production"
            ? `https://${process.env.VERCEL_URL}`
            : `${process.env.NEXT_PUBLIC_BASE_URL}`

        const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`
        const cancelUrl = `${baseUrl}/basket`

        //stripe checkout session
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            customer_creation: customerId ? undefined : "always",
            customer_email: !customerId ? metadata.customerEmail : undefined,
            metadata,
            mode: "payment",
            allow_promotion_codes: true,
            success_url: successUrl,
            cancel_url: cancelUrl,
            line_items: items.map((item) => ({
                price_data: {
                    currency: "dkk",
                    unit_amount: Math.round(item.product.price! * 100),
                    product_data: {
                        name: item.product.name || "Unnamed product",
                        description: `Product ID: ${item.product.id}`,
                        metadata: {
                            id: item.product.id,
                        },
                        images: item.product.image_url ? [item.product.image_url] : undefined,
                    }
                },
                quantity: item.quantity,
            }))
        })

        return session.url

    } catch (error) {
        console.error("Error creating checkout session", error)
        throw error
    }
}