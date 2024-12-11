
export interface Product {
    id: number
    name: string
    slug: string
    image_url: string | null
    description: string | TrustedHTML
    price: number
    stock: number
    created_at: string
    updated_at: string
}

