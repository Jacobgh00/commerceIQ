'use client'

import {Product} from "@/supabase/types/ProductType";
import {Renderable} from "@/utilities/ComponentUtilities";
import {AnimatePresence, motion} from "framer-motion";
import {ProductThumb} from "@/components/products/ProductThumb";

export function ProductGrid(props: {
    products: Array<Product>
}): Renderable {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {props.products.map((product) => {
                return (
                    <AnimatePresence key={product.id}>
                        <motion.div
                            layout
                            initial={{opacity: 0.2}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                        >
                            <ProductThumb key={product.id} product={product}/>
                        </motion.div>
                    </AnimatePresence>
                )
            })}
        </div>
    )
}