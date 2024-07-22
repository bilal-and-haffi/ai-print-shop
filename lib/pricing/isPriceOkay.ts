"use server";
import { ProductVariant } from "@/interfaces/PrintifyTypes";
import { convertUSDToGBP } from "@/lib/currency/convertUSDToGBP";
import { getUkShippingCostInCents } from "../printify/shipping/getShippingCosts";

export async function isPriceOkay({
    selectedVariant,
    priceInGbp,
    print_provider_id,
    blueprint_id,
}: {
    selectedVariant: ProductVariant;
    priceInGbp: number;
    print_provider_id: number;
    blueprint_id: number;
}) {
    const printifyProductCostInUsd = selectedVariant.cost / 100;
    const printifyShippingCostToUkInUsd =
        (await getUkShippingCostInCents({
            print_provider_id,
            blueprint_id,
        })) / 100;
    const VATMultiplier = 1.2;
    const totalPrintifyCostInUsd =
        (printifyProductCostInUsd + printifyShippingCostToUkInUsd) *
        VATMultiplier;
    const totalPrintifyCostInGbp = await convertUSDToGBP(
        totalPrintifyCostInUsd,
    );
    const minimumProfitInGbp = 2;
    const profitInGbp = priceInGbp - totalPrintifyCostInGbp;git 
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
