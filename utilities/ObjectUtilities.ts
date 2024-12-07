declare const discriminator: unique symbol

export type Brand<UniqueTag extends string> = {
    readonly [discriminator]?: UniqueTag
}
