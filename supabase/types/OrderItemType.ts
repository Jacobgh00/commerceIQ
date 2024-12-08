import {Product} from "@/supabase/types/ProductType";

export interface OrderItem {
    quantity: number
    product: Product
}