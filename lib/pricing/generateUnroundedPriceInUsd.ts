import { ProductVariant } from "@/interfaces/PrintifyTypes";

const MARK_UP_IN_USD = 10;

export function generateUnroundedPriceInUsd({
    selectedVariant,
    shippingCostsInCents,
}: {
    selectedVariant: ProductVariant;
    shippingCostsInCents: number;
}): number {
    const totalCostInCentsWithoutTax =
        selectedVariant.cost + shippingCostsInCents;
    const totalCostInCentsWithTax = totalCostInCentsWithoutTax;

    const totalCostInUsd = totalCostInCentsWithTax / 100;

    const unroundedPriceInUsd = totalCostInUsd + MARK_UP_IN_USD;

    return unroundedPriceInUsd;
}
// MAYBE TAX CAN BE FOUND ON PRINTIFY VARIANT
