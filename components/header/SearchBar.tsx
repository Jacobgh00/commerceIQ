import {Renderable} from "@/utilities/ComponentUtilities";
import Form from "next/form";
import {cn} from "@/lib/utils";

export function SearchBar(): Renderable {
    return (
        <Form
            action="/search"
            className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
            <input
                type="text"
                name="query"
                placeholder="Søg efter produkter"
                className={cn(
                    'bg-gray-100 text-gray-800 px-4 py-2 rounded',
                    'focus:outline-none focus:ring-blue-500 focus:ring-opacity-50',
                    'border w-full max-w-4xl'
                )}
            />
        </Form>
    )
}