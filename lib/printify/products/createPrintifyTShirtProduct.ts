import { RetrieveProductResponse } from "@/interfaces/PrintifyTypes";
import { createPrintifyProduct } from "../service";

export async function createPrintifyTshirtProduct(printifyImageId: string): Promise<RetrieveProductResponse> {
    const printCleverId = 72;
    const printifyProduct = await createPrintifyProduct({
        printifyImageId: printifyImageId,
        printProviderId: printCleverId,
        blueprintId: 6, // unisexHeavyCottonTeeBlueprintId
    });

    return printifyProduct;
}
