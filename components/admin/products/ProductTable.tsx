import {Product} from "@/supabase/types/ProductType";
import {ProductRow} from "@/components/admin/products/ProductRow";

export function ProductTable(props: {
    products: Array<Product>
}) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
                <thead>
                <tr className="border-b">
                    <th className="text-left px-4 py-2">Navn</th>
                    <th className="text-left px-4 py-2">Pris</th>
                    <th className="text-left px-4 py-2">Lager</th>
                    <th className="text-left px-4 py-2">Handlinger</th>
                </tr>
                </thead>
                <tbody>
                {props.products.length === 0 ? (
                    <tr>
                        <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                            Ingen produkter fundet.
                        </td>
                    </tr>
                ) : (
                    props.products.map((product) => <ProductRow key={product.id} product={product}/>)
                )}
                </tbody>
            </table>
        </div>
    )
}