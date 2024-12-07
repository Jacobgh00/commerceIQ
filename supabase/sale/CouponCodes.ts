export const CouponCodes = {
    BLACK_FRIDAY: "BFRIDAY",
    SUMMER_SALE: "SUMMER2024",
    WINTER_SALE: "WINTER2024",
    NEW_CUSTOMER: "WELCOME10",
    FREE_SHIPPING: "FREESHIP",
}

export type CouponCode = keyof typeof CouponCodes;

