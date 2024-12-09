import React, { forwardRef } from "react";
import { motion, type MotionProps } from "framer-motion";

//apperently, there is a bug in framermotion when using React19 and Next15. This is a workaround

type MotionDivProps = MotionProps & React.HTMLAttributes<HTMLDivElement>
type MotionSpanProps = MotionProps & React.HTMLAttributes<HTMLSpanElement>
type MotionH2Props = MotionProps & React.HTMLAttributes<HTMLHeadingElement>
type MotionPProps = MotionProps & React.HTMLAttributes<HTMLParagraphElement>
type MotionAProps = MotionProps & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>((props, ref) => (
    <motion.div ref={ref} {...props} />
));

export const MotionSpan = forwardRef<HTMLSpanElement, MotionSpanProps>((props, ref) => (
    <motion.span ref={ref} {...props} />
));

export const MotionH2 = forwardRef<HTMLHeadingElement, MotionH2Props>((props, ref) => (
    <motion.h2 ref={ref} {...props} />
));

export const MotionP = forwardRef<HTMLParagraphElement, MotionPProps>((props, ref) => (
    <motion.p ref={ref} {...props} />
));

export const MotionA = forwardRef<HTMLAnchorElement, MotionAProps>((props, ref) => (
    <motion.a ref={ref} {...props} />
));