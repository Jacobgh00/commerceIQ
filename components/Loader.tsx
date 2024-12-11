import {ClassName, Renderable} from "@/utilities/ComponentUtilities";
import {cn} from "@/lib/utils";

export function Loader(props: {
    className?: ClassName
}): Renderable {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className={cn("animate-spin rounded-full", props.className)}/>
        </div>
    )
}