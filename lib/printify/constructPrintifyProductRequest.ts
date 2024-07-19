import { getPromptFromImageId } from "@/db/image";
import { PrintifyProductRequest } from "@/interfaces/PrintifyTypes";
import { fetchProductVariants } from "./fetchProductVariants";

export async function constructPrintifyProductRequest({
    printifyImageId,
    printProviderId,
    blueprintId,
}: {
    printifyImageId: string;
    printProviderId: number;
    blueprintId: number;
}) {
    const variants = await fetchProductVariants(blueprintId, printProviderId);
    const variantIds = variants.map((variant) => variant.id);
    const prompt = await getPromptFromImageId(printifyImageId);

    const productRequest: PrintifyProductRequest = {
        blueprint_id: blueprintId,
        description: "",
        print_areas: [
            {
                variant_ids: variantIds,
                placeholders: [
                    {
                        position: "front",
                        images: [
                            {
                                id: printifyImageId,
                                x: 0.5,
                                y: 0.5,
                                scale: 1,
                                angle: 0,
                            },
                        ],
                    },
                ],
            },
        ],
        print_provider_id: printProviderId,
        title: prompt,
        variants: variantIds.map((variantId) => ({
            id: variantId,
            price: 1, // ???
        })),
    };
    return productRequest;
}
