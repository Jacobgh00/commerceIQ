import {Metadata} from "@/action/CreateCheckoutSession";
import {supabase} from "@/supabase/server";
import Stripe from "stripe";
import {Order} from "@/supabase/types/OrderType";
import {Product} from "@/supabase/types/ProductType";


export async function getUserOrders(userId: string): Promise<Array<Order>> {
    const { data, error } = await supabase
        .from("orders")
        .select(`
            *,
            order_items (
                quantity,
                product:products (
                    id,
                    name,
                    image_url,
                    price
                )
            )
        `)
        .eq("clerk_user_id", userId)
        .order("order_date", { ascending: false });

    if (error) {
        console.error("Error getting user orders:", error.message);
        throw new Error("Failed to get user orders.");
    }

    return (
        data?.map((order) => ({
            ...order,
            products: order.order_items.map((item: { quantity: number; product: Product }) => ({
                product: item.product,
                quantity: item.quantity,
            })),
        })) || []
    );
}


export async function saveOrder({
    sessionId,
    amount_total,
    metadata,
    customer,
    orderNumber,
    customerName,
    customerEmail,
    clerkUserId,
}: {
    sessionId: string;
    amount_total: number | null;
    metadata: Metadata
    customer: string | undefined;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
}) {
    const { data: order, error } = await supabase
        .from("orders")
        .insert({
            order_number: orderNumber,
            stripe_checkout_session_id: sessionId,
            stripe_customer_id: customer,
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

    if (error) {
        console.error("Error saving order:", error.message);
        throw new Error("Failed to save the order.");
    }
    return order;
}

export function prepareOrderItems(lineItems: Stripe.LineItem[]) {
    return lineItems.map((item) => ({
        product_id: (item.price?.product as Stripe.Product)?.metadata?.id,
        quantity: item.quantity ?? 0,
    }));
}

export async function saveOrderItems(orderId: number, items: Array<{ product_id: string; quantity: number }>) {
    const { error } = await supabase
        .from("order_items")
        .insert(items.map((item) => ({ ...item, order_id: orderId })));

    if (error) {
        console.error("Error saving order items:", error.message);

        await rollbackOrder(orderId);

        throw new Error("Failed to save order items.");
    }
}

export async function rollbackOrder(orderId: number) {
    const { error: rollbackItemsError } = await supabase
        .from("order_items")
        .delete()
        .eq("order_id", orderId);

    const { error: rollbackOrderError } = await supabase
        .from("orders")
        .delete()
        .eq("id", orderId);

    if (rollbackItemsError) {
        console.error("Rollback failed for order items:", rollbackItemsError.message);
    }

    if (rollbackOrderError) {
        console.error("Rollback failed for order:", rollbackOrderError.message);
    }
}