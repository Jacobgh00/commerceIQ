import {ClassName, Renderable} from "@/utilities/ComponentUtilities";
import Form from "next/form";
import {cn} from "@/lib/utils";
import {Search} from "lucide-react";

export function SearchBar(props: {
    className?: ClassName
    action?: string
    placeholder: string
    section: "products" | "orders"
}): Renderable {
    return (
        <Form
            action={props.action ?? "/search"}
            className={cn(props.className)}
        >
            <input type="hidden" name="section" value={props.section} />

            <div className="relative">
                <input
                    type="text"
                    name="query"
                    placeholder={props.placeholder}
                    className={cn(
                        'bg-gray-100 text-gray-800 px-4 py-2 pl-10 rounded',
                        'focus:outline-none focus:ring-emerald-500 focus:ring-2 focus:ring-opacity-100',
                        'border w-full max-w-4xl'
                    )}
                />
                <Search className="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
            </div>
        </Form>
    )
}