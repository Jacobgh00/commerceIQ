import {searchProductsByName} from "@/supabase/products/ProductQuery";
import {ProductGrid} from "@/components/products/ProductGrid";

export default async function SearchPage({
    searchParams,
} : {
    searchParams: Promise<{ query: string }>
}){
    const { query } = await searchParams;
    const products = await searchProductsByName(query)

    if (!products.length) {
        return (
            <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Ingen produkter fundet for: {query}
                    </h1>
                    <p className="text-gray-600 text-center">
                        Prøv at søge efter noget andet
                    </p>
                </div>
            </div>
        )
    }


    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Søgeresultater for {query}
                </h1>
                <ProductGrid products={products} />
            </div>
        </div>
    )
}