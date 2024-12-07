import {Product} from "@/supabase/types/ProductType";
import {Category} from "@/supabase/types/CategoryType";
import {Renderable} from "@/utilities/ComponentUtilities";
import {ProductGrid} from "@/components/products/ProductGrid";


export function ProductsView(props: {
    products: Array<Product>
    categories: Array<Category>
}): Renderable {
    return (
        <div className="flex flex-col">
            <div className="w-full sm:w-[200px]">

            </div>

            <div className="flex-1">
                <div>
                    <ProductGrid products={props.products}/>

                    <hr className="w-1/2 sm:w-3/4"/>
                </div>
            </div>
        </div>
    )
}
