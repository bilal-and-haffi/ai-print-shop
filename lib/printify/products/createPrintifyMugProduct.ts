import { RetrieveProductResponse } from "@/interfaces/PrintifyTypes";
import { createPrintifyProduct } from "../service";

export async function createPrintifyMugProduct(
    printifyImageId: string,
): Promise<RetrieveProductResponse> {
    const printCleverId = 72;
    const printifyProduct = await createPrintifyProduct({
        printifyImageId: printifyImageId,
        printProviderId: printCleverId,
        blueprintId: 1302,
    });

    return printifyProduct;
}
