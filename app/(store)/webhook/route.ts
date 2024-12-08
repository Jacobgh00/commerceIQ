import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import Stripe from "stripe";
import stripe from "@/lib/stripe";
import {Metadata} from "@/action/CreateCheckoutSession";
import {supabase} from "@/supabase/server";


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
        return NextResponse.json({error: "Webhook error"}, {status: 400});
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session

        try {
            await createOrderInSupabase(session)
        } catch (error) {
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

    const { orderNumber, customerName, customerEmail, clerkUserId } = metadata as Metadata;

    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
        expand: ["data.price.product"],
    });

    const items = lineItems.data.map((item) => ({
        product_id: (item.price?.product as Stripe.Product)?.metadata?.id,
        quantity: item.quantity ?? 0,
    }));

    const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
            order_number: orderNumber,
            stripe_checkout_session_id: sessionId,
            stripe_customer_id: customer as string | undefined,
            clerk_user_id: clerkUserId,
            customer_name: customerName,
            email: customerEmail,
            total_price: amount_total ? amount_total / 100 : 0,
            currency: "dkk",
            amount_discount: 0,
            status: "paid",
            order_date: new Date().toISOString(),
        })
        .select()
        .single();

    if (orderError) {
        console.error("Error saving order:", orderError.message);
        throw new Error("Failed to save the order.");
    }

    const { error: itemsError } = await supabase
        .from("order_items")
        .insert(items.map((item) => ({ ...item, order_id: order.id })));

    if (itemsError) {
        console.error("Error saving order items:", itemsError.message);

        const {error: rollbackError} = await supabase
            .from("orders")
            .delete()
            .eq("id", order.id);

        if (rollbackError) {
            console.error("Rollback failed:", rollbackError.message);
        }

        throw new Error("Failed to save order items.");
    }

    console.log("Order and items saved successfully!");
}