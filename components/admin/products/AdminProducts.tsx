import {Product} from "@/supabase/types/ProductType";
import {getAllProducts, searchProductsByName} from "@/supabase/products/ProductQuery";
import {SearchBar} from "@/components/header/SearchBar";
import {ProductTable} from "@/components/admin/products/ProductTable";

export async function AdminProducts({
    query
}: {
    query?: string
}) {
    let products: Array<Product>

    if (query && query.trim() !== "") {
        products = await searchProductsByName(query)
    } else {
        products = await getAllProducts()
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Produkter</h2>
            <SearchBar
                className="mx-0 my-6 max-w-lg"
                action="/admin?section=products"
            />
            <ProductTable products={products} />
        </div>
    )
}