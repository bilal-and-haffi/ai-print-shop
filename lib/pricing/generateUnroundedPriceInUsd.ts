"use server";
import { ProductVariant } from "@/interfaces/PrintifyTypes";

const MARK_UP_IN_USD = 10;

export function generateUnroundedPriceInUsd(
    selectedVariant: ProductVariant,
    shippingCostsInCents: number,
): number {
    const totalCostInCentsWithoutTax =
        selectedVariant.cost + shippingCostsInCents; // in cents
    const ukTaxMultiplier = 1.2; // this is for UK only and stripe will add US one by itself
    const totalCostInCentsWithTax =
        totalCostInCentsWithoutTax * ukTaxMultiplier;

    const totalCostInUsd = totalCostInCentsWithTax / 100;

    const unroundedPriceInUsd = totalCostInUsd + MARK_UP_IN_USD;

    return unroundedPriceInUsd;
}
// MAYBE TAX CAN BE FOUND ON PRINTIFY VARIANT
