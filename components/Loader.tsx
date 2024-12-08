import {Renderable} from "@/utilities/ComponentUtilities";

export function Loader(): Renderable {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full size-32 border-b-2 border-emerald-500"/>
        </div>
    )
}