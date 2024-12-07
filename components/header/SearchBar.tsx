import {Renderable} from "@/utilities/ComponentUtilities";
import Form from "next/form";
import {cn} from "@/lib/utils";
import {Search} from "lucide-react";

export function SearchBar(): Renderable {
    return (
        <Form
            action="/search"
            className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
            <div className="relative">
                <input
                    type="text"
                    name="query"
                    placeholder="Søg efter produkter"
                    className={cn(
                        'bg-gray-100 text-gray-800 px-4 py-2 pl-10 rounded',
                        'focus:outline-none focus:ring-blue-500 focus:ring-opacity-50',
                        'border w-full max-w-4xl'
                    )}
                />
                <Search className="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
            </div>
        </Form>
    )
}