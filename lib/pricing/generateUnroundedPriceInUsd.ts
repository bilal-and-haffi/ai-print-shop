import { ProductVariant } from "@/interfaces/PrintifyTypes";
import { getShippingCostInCents } from "../printify/shipping/getShippingCostsInCents";
import { CountryCode } from "../stripe/createCheckoutSession";

const MARK_UP_IN_USD = 5;

export async function generateUnroundedPriceInUsd({
    selectedVariant,
    print_provider_id,
    blueprint_id,
    country,
}: {
    selectedVariant: ProductVariant;
    print_provider_id: number;
    blueprint_id: number;
    country: CountryCode;
}): Promise<number> {
    const printifyShippingCostInCents = await getShippingCostInCents({
        print_provider_id,
        blueprint_id,
        deliveryCountry: country,
    });

    const totalCostInCentsWithoutTax =
        selectedVariant.cost + printifyShippingCostInCents;

    const totalCostInUsd = totalCostInCentsWithoutTax / 100; // we don't need to pay VAT until we make 85k

    const unroundedPriceInUsd = totalCostInUsd + MARK_UP_IN_USD;

    return unroundedPriceInUsd;
}
