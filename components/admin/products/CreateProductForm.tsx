import {CreateProductAction} from "@/supabase/products/ProductQuery";
import {DescriptionField} from "@/components/admin/products/DescriptionField";
import Form from "next/form";
import {CreateProductButton} from "@/components/admin/products/buttons/CreateProductButton";
import {getAllCategories} from "@/supabase/categories/CategoriesQuery";


export async function CreateProductForm() {
    const categories = await getAllCategories();

    return (
        <Form
            action={CreateProductAction}
            className="space-y-4"
        >
            <input type="hidden" name="section" value="products"/>
            <div>
                <label className="block font-medium mb-1">Produkt Navn</label>
                <input
                    type="text"
                    name="name"
                    className="border px-3 py-2 w-full rounded focus:outline-none focus:ring-emerald-500 focus:ring-2 focus:ring-opacity-100"
                />
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block font-medium mb-1">Pris (DKK)</label>
                    <input
                        type="number"
                        name="price"
                        required
                        step="0.01"
                        className="border px-3 py-2 w-full rounded focus:outline-none focus:ring-emerald-500 focus:ring-2 focus:ring-opacity-100"
                />
                </div>
                <div className="flex-1">
                    <label className="block font-medium mb-1">Lager</label>
                    <input
                        type="number"
                        name="stock"
                        required
                        className="border px-3 py-2 w-full rounded focus:outline-none focus:ring-emerald-500 focus:ring-2 focus:ring-opacity-100"
                    />
                </div>
            </div>

            <div>
                <label className="block font-medium mb-1">Billede</label>
                <input type="file" name="image" className="block w-fit"/>
            </div>

            <div>
                <label className="block font-medium mb-1">Kategori</label>
                <select
                    name="category"
                    className="border px-3 py-2 w-56 rounded focus:outline-none focus:ring-emerald-500 focus:ring-2 focus:ring-opacity-100"
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>
            </div>

            <DescriptionField />

           <CreateProductButton />
        </Form>
    )
}
