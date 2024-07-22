"use server";
import { ProductVariant } from "@/interfaces/PrintifyTypes";

export function generatePrice(
    selectedVariant: ProductVariant,
    printProviderId: number,
) {
    selectedVariant.cost; // in cents
    selectedVariant.id;
}
