"use client"

import {ClassName, Renderable} from "@/utilities/ComponentUtilities";
import {cn} from "@/lib/utils";
import {MotionDiv} from "@/types/Motion";

export function MetricCard(props: {
    title: string
    value: string | number
    className?: ClassName
}): Renderable {
    return (
        <MotionDiv
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, ease: "easeOut"}}
            className={cn("bg-white shadow rounded-lg p-6 relative", props.className)}
        >
            <p className="text-gray-600 mb-2">{props.title}</p>
            <p className="text-3xl font-bold text-emerald-500">{props.value}</p>
        </MotionDiv>
    )
}