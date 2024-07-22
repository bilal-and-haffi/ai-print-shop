"use server";
import { ProductVariant } from "@/interfaces/PrintifyTypes";
import { getShippingCostInCents } from "../printify/shipping/getShippingCostsInCents";
import { UK_VAT_MULTIPLIER } from "@/app/data/consts";
import { convertGBPToUSD } from "../currency/convertGBPToUSD";
import { CountryCode } from "../stripe/createCheckoutSession";

export type Currency = "gbp" | "usd";

export async function isSellingPriceProfitable({
    selectedVariant,
    priceInLocalCurrency,
    print_provider_id,
    blueprint_id,
    country,
}: {
    selectedVariant: ProductVariant;
    priceInLocalCurrency: number;
    print_provider_id: number;
    blueprint_id: number;
    country: CountryCode;
}) {
    const printifyProductCostInUsd = selectedVariant.cost / 100;

    const printifyShippingCostInUsd =
        (await getShippingCostInCents({
            print_provider_id,
            blueprint_id,
            deliveryCountry: country,
        })) / 100;

    const totalPrintifyCostInUsd =
        (printifyProductCostInUsd + printifyShippingCostInUsd) *
        UK_VAT_MULTIPLIER; // does not apply in US but used anyway for safety

    const minimumProfitInUsd = 5;

    const priceInUsd =
        country === "GB"
            ? await convertGBPToUSD(priceInLocalCurrency)
            : priceInLocalCurrency;

    const profitInUsd = priceInUsd - totalPrintifyCostInUsd;

    const isPriceOkay = profitInUsd > minimumProfitInUsd;
    console.log({
        printifyProductCostInUsd,
        printifyShippingCostToUkInUsd: printifyShippingCostInUsd,
        UK_VAT_MULTIPLIER,
        totalPrintifyCostInUsd,
        minimumProfitInUsd,
        profitInUsd,
        isPriceOkay,
    });

    if (!isPriceOkay) {
        console.error({
            printifyProductCostInUsd,
            printifyShippingCostToUkInUsd: printifyShippingCostInUsd,
            UK_VAT_MULTIPLIER,
            totalPrintifyCostInUsd,
            minimumProfitInUsd,
            profitInGbp: profitInUsd,
            isPriceOkay,
            msg: "Pricing issue!",
        });
    }

    return isPriceOkay;
}
