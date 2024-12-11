import {getProductsByCategory} from "@/supabase/products/ProductQuery";
import {getAllCategories} from "@/supabase/categories/CategoriesQuery";
import {ProductsView} from "@/components/products/ProductsView";

export default async function CategoryPage(props: {
    params: Promise<{slug: string}>
}) {
    const {slug} = await props.params;

    const products = await getProductsByCategory(slug)
    const categories = await getAllCategories()


    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-7xl">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    {slug
                        .split("-")
                        .map((word): string => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")
                    }{" "}
                    Kollektion
                </h1>
                <ProductsView products={products} categories={categories} />
            </div>
        </div>
    )
}