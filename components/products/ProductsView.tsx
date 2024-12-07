import {Product} from "@/supabase/types/ProductType";
import {Category} from "@/supabase/types/CategoryType";
import {Renderable} from "@/utilities/ComponentUtilities";
import {ProductGrid} from "@/components/products/ProductGrid";
import {CategorySelector} from "@/components/categories/CategorySelector";


export function ProductsView(props: {
    products: Array<Product>
    categories: Array<Category>
}): Renderable {
    return (
        <div className="flex flex-col items-center md:items-start">
            <div className="w-[300px] sm:w-[200px] mt-2 md:ml-4">
                <CategorySelector categories={props.categories}/>
            </div>

            <div className="flex-1 px-2 md:mx-2">
                <div>
                    <ProductGrid products={props.products}/>

                    <hr className="w-1/2 sm:w-3/4"/>
                </div>
            </div>
        </div>
    )
}
