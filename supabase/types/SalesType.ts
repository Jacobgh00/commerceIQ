import {Product} from "@/supabase/types/ProductType";

export interface Sale {
    id: number
    title: string
    description: string | null
    discount_amount: number | null
    coupon_code: string | null
    valid_from: string | null
    valid_until: string | null
    is_active: boolean
    created_at: string
}

export interface SaleWithProducts extends Sale {
    products: Array<Product>
}