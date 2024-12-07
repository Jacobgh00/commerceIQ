import {ReactNode} from "react";
import type { Brand } from "./ObjectUtilities"

export type Children = Renderable

export type Renderable = Exclude<ReactNode, boolean>

export type ClassName = ClassNamePropBrand & ClassValue

type ClassValue = string | false | null | undefined

type NonEmptyNonClassName<Value extends ClassValue> =
    Value extends ClassNamePropBrand ? never : NonEmptyClassValue<Value>

type NonEmptyClassValue<Value extends ClassValue> = Value extends ""
    ? "Unexpected empty `className` string"
    : Value extends ` ${string}`
        ? "Unexpected leading whitespace in the `className` string"
        : Value extends `${string} `
            ? "Unexpected trailing whitespace in the `className` string"
            : Value extends `${string}  ${string}`
                ? "Unexpected multiple consecutive whitespace in the `className` string"
                : Value

type ClassNamePropBrand = Brand<"ClassNameProp">