import { createPrintifyProduct } from "../service";

export async function createPrintifyHoodieProduct(printifyImageId: string) {
    const printCleverId = 72;
    const unisexHeavyBlendHoodedSweatshirtBlueprintId = 77;
    const printifyProduct = await createPrintifyProduct({
        printifyImageId,
        printProviderId: printCleverId,
        blueprintId: unisexHeavyBlendHoodedSweatshirtBlueprintId,
    });

    return printifyProduct;
}
