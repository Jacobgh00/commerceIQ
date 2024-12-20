import {getAllProducts} from "@/supabase/products/ProductQuery";
import {ProductsView} from "@/components/products/ProductsView";
import {getAllCategories} from "@/supabase/categories/CategoriesQuery";
import {BlackFridayBanner} from "@/components/banners/BlackFridayBanner";

export const dynamic = "force-static"
export const revalidate = 60

export default async function Home() {
    const products = await getAllProducts()
    const categories = await getAllCategories()

    return (
        <div className="flex flex-col gap-8 bg-gray-50">
            <BlackFridayBanner />
            <div className="flex px-4 w-full">
                <ProductsView products={products} categories={categories}/>
            </div>
        </div>
    );
}
