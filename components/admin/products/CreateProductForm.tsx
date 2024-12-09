import {Renderable} from "@/utilities/ComponentUtilities";
import {CreateProductAction} from "@/supabase/products/ProductQuery";
import {DescriptionField} from "@/components/admin/products/DescriptionField";
import Form from "next/form";


export function CreateProductForm(): Renderable {
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
                    className="border px-3 py-2 w-full rounded"
                />
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block font-medium mb-1">Pris (DKK)</label><input
                    type="number"
                    name="price"
                    required
                    step="0.01"
                    className="border px-3 py-2 w-full rounded"
                />
                </div>
                <div className="flex-1">
                    <label className="block font-medium mb-1">Lager</label>
                    <input
                        type="number"
                        name="stock"
                        required
                        className="border px-3 py-2 w-full rounded"
                    />
                </div>
            </div>

            <div>
                <label className="block font-medium mb-1">Billede</label>
                <input type="file" name="image" className="block w-full"/>
            </div>

            <DescriptionField />

            <button
                type="submit"
                className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
            >
                Opret Produkt
            </button>
        </Form>
    )
}
