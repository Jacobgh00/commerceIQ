import {OrderItem} from "@/supabase/types/OrderItemType";

export interface Order {
    id: number
    order_number: string
    stripe_checkout_session_id: string | null
    stripe_customer_id: string
    clerk_user_id: string
    customer_name: string
    email: string
    stripe_payment_intent_id: string
    total_price: number
    currency: string
    amount_discount: number
    status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'canceled'
    order_date: string
    created_at: string
    products: Array<OrderItem>
}

