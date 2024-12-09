import {ClassName} from "@/utilities/ComponentUtilities";

export function MetricCard(props: {
    title: string
    value: string | number
    className?: ClassName
}) {
    return (
        <div className={`bg-white shadow rounded-lg p-6 ${props.className}`}>
            <p className="text-gray-600 mb-2">{props.title}</p>
            <p className="text-3xl font-bold text-emerald-500">{props.value}</p>
        </div>
    )
}