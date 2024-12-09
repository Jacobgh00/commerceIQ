"use client";

import { LineChart } from "@mui/x-charts/LineChart";
import {useEffect, useRef, useState} from "react";
import {MotionDiv} from "@/types/Motion";

export function LineChartComponent(props: {
    title: string
    dataset: Array<{ [key: string]: string | number}>
    dataKeyX: string
    series: Array<{ dataKey: string, label: string, color: string }>
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 480, height: 300 });

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                const height = width * 0.6
                setDimensions({ width, height })
            }
        };

        const resizeObserver = new ResizeObserver(updateSize)
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current)
        }

        updateSize()

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <MotionDiv
            ref={containerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white shadow rounded-lg p-6 relative"
        >
            <h2 className="text-lg font-bold mb-4">{props.title}</h2>
            <LineChart
                dataset={props.dataset}
                xAxis={[{scaleType: "band", dataKey: props.dataKeyX}]}
                series={props.series}
                width={dimensions.width}
                height={dimensions.height}
                grid={{vertical: true, horizontal: true}}
            />
        </MotionDiv>
    )
}