"use server";
import { ProductVariant } from "@/interfaces/PrintifyTypes";
import { convertUSDToGBP } from "@/lib/currency/convertUSDToGBP";

export async function isPriceOkay(
    selectedVariant: ProductVariant,
    priceInGbp: number,
) {
    "use server";
    const printifyProductCostInUsd = selectedVariant.cost / 100;
    const printifyShippingCostToUkInUsd = 3.99; // replace me with /v1/catalog/blueprints/{blueprint_id}/print_providers/{print_provider_id}/shipping.json
    const VATMultiplier = 1.2;
    const totalPrintifyCostInUsd =
        (printifyProductCostInUsd + printifyShippingCostToUkInUsd) *
        VATMultiplier;
    const totalPrintifyCostInGbp = await convertUSDToGBP(
        totalPrintifyCostInUsd,
    );
    const minimumProfitInGbp = 2;
    const profitInGbp = priceInGbp - totalPrintifyCostInGbp;
    const isPriceOkay = profitInGbp > minimumProfitInGbp;
    console.log({
        printifyProductCostInUsd,
        printifyShippingCostToUkInUsd,
        VATMultiplier,
        totalPrintifyCostInUsd,
        totalPrintifyCostInGbp,
        minimumProfitInGbp,
        profitInGbp,
        isPriceOkay,
    });

    if (!isPriceOkay) {
        console.error({
            printifyProductCostInUsd,
            printifyShippingCostToUkInUsd,
            VATMultiplier,
            totalPrintifyCostInUsd,
            totalPrintifyCostInGbp,
            minimumProfitInGbp,
            profitInGbp,
            isPriceOkay,
            msg: "Pricing issue!",
        });
    }

    return isPriceOkay;
}
