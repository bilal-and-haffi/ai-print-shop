import { PRINTIFY_BASE_URL } from "@/app/data/consts";
import { PrintifyProductRequest } from "@/interfaces/PrintifyTypes";
import { envServer } from "../../env/server";
import { getPromptFromImageIdOrRemovedBackgroundImageId } from "@/db/image";
import { fetchProductVariants } from "../fetchProductVariants";

export async function createPrintifyProduct({
    printifyImageId,
    printProviderId,
    blueprintId,
    position = "front",
}: {
    printifyImageId: string;
    printProviderId: number;
    blueprintId: number;
    position?: "front" | "back";
}) {
    const variants = await fetchProductVariants(blueprintId, printProviderId);
    const variantIds = variants.map((variant) => variant.id);
    const prompt =
        await getPromptFromImageIdOrRemovedBackgroundImageId(printifyImageId);

    const productRequest: PrintifyProductRequest = {
        blueprint_id: blueprintId,
        description: "",
        print_areas: [
            {
                variant_ids: variantIds,
                placeholders: [
                    {
                        position,
                        images: [
                            {
                                id: printifyImageId,
                                x: 0.5,
                                y: 0.5,
                                scale: 0.7,
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
            price: 1, // Updated later in success webhook to the actual selling price which is dynamically
        })),
    };
    console.log({ productRequest });
    const productRequestString = JSON.stringify(productRequest);

    const productResponse: any = await fetch(
        `${PRINTIFY_BASE_URL}/v1/shops/${envServer.SHOP_ID}/products.json`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${envServer.PRINTIFY_API_TOKEN}`,
            },
            body: productRequestString,
        },
    );
    console.log({ productResponse });
    const productData = await productResponse.json();
    console.log({ productData });
    return productData;
}
