import {Renderable} from "@/utilities/ComponentUtilities";

export function BasketHeader(props: {
    isEmpty: boolean
}): Renderable {

    if (props.isEmpty) {
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Din Kurv</h1>
                <p className="text-gray-600 text-lg">Din kurv er tom</p>
            </div>
        );
    }

    return <h1 className="text-2xl font-bold mb-4">Din Kurv</h1>;
}