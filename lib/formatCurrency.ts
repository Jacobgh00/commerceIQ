
export function formatCurrency(
    amount: number,
    currencyCode: string = "dkk",
): string {
    try {
        return new Intl.NumberFormat("da-DK", {
            style: "currency",
            currency: currencyCode.toUpperCase()
        }).format(amount);
    } catch (error) {
        console.error("Error formatting currency:", currencyCode, error);
        return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`;
    }
}