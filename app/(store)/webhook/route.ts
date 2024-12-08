import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import Stripe from "stripe";
import stripe from "@/lib/stripe";
import {Metadata} from "@/action/CreateCheckoutSession";
import {prepareOrderItems, saveOrder, saveOrderItems} from "@/supabase/order/OrderQuery";
import {updateProductStocks} from "@/supabase/products/ProductQuery";


export async function POST(req: NextRequest) {
    const body = await req.text();
    const headersList = await headers()
    const sig = headersList.get("stripe-signature");

    if (!sig) {
        return NextResponse.json({error: "No signature"}, {status: 400});
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!webhookSecret) {
        return NextResponse.json({error: "No webhook secret"}, {status: 400});
    }

    let event: Stripe.Event
    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({error: "Webhook error"}, {status: 400});
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session

        try {
            await createOrderInSupabase(session)
        } catch (error) {
            console.error("Error creating order:", error);
            return NextResponse.json({error: "Error creating order"}, {status: 500});
        }
    }

    return NextResponse.json({received: true})
}

export async function createOrderInSupabase(session: Stripe.Checkout.Session) {
    const {
        id: sessionId,
        amount_total,
        metadata,
        customer,
    } = session;

    if (!metadata || !isValidMetadata(metadata)) {
        throw new Error("Invalid metadata in session");
    }

    const { orderNumber, customerName, customerEmail, clerkUserId } = metadata as Metadata;

    const customerId =
        typeof customer === "string"
            ? customer
            : customer && "id" in customer
                ? customer.id
                : undefined;

    if (!customerId) {
        throw new Error("Invalid customer in session");
    }

    const lineItems = await fetchLineItemsFromStripe(sessionId);

    const items = prepareOrderItems(lineItems);

    const order = await saveOrder({
        sessionId,
        amount_total,
        metadata,
        customer: customerId,
        orderNumber,
        customerName,
        customerEmail,
        clerkUserId,
    });

    await saveOrderItems(order.id, items);

    await updateProductStocks(order.id, items);

    console.log("Order and items saved successfully!");
}

async function fetchLineItemsFromStripe(sessionId: string) {
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
        expand: ["data.price.product"],
    });
    return lineItems.data;
}

function isValidMetadata(metadata: Stripe.Metadata | null): metadata is Metadata {
    return metadata !== null && true;
}