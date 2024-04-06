import { RedirectType, redirect } from "next/navigation";
import { PrintifyProductRequest } from "@/interfaces/PrintifyTypes";
import {
    createProduct as createPrintifyProduct,
    fetchProductVariants,
    postImageToPrintify,
} from "@/lib/printify/service";
import {
    printCleverId,
    unisexHeavyCottonTeeBlueprintId,
} from "@/app/data/consts";
import { generateImageUrl } from "@/lib/openai/generateImageUrl";

export const maxDuration = 300;

export default async function ImagePage(params: {
    params: { prompt: string };
    searchParams: { generateNew?: string };
}) {
    const { prompt: encodedPrompt } = params.params;
    const decodedPrompt = decodeURIComponent(encodedPrompt);

    if (!encodedPrompt) {
        console.error("Text is required", { params });
        console.error({ decodedPrompt });
        return <div>Text is required</div>;
    }

    const openaiImageUrl = await generateImageUrl(decodedPrompt);

    const printifyImage = await postImageToPrintify(
        openaiImageUrl,
        "generatedImage.png",
    );

    const [printProviderId, blueprintId] = [
        printCleverId,
        unisexHeavyCottonTeeBlueprintId,
    ];

    const teeShirtProductRequest = await constructPrintifyProductRequest({
        printifyImageId: printifyImage.id,
        prompt: decodedPrompt,
        printProviderId,
        blueprintId,
    });

    const { id: printifyProductId } = await createPrintifyProduct(
        teeShirtProductRequest,
    );

    redirect(`/product/${printifyProductId}`, RedirectType.replace);
}

async function constructPrintifyProductRequest({
    printifyImageId,
    prompt,
    printProviderId,
    blueprintId,
}: {
    printifyImageId: string;
    prompt: string;
    printProviderId: number;
    blueprintId: number;
}) {
    const variants = await fetchProductVariants(blueprintId, printProviderId);
    const variantIds = variants.map((variant) => variant.id);

    const capitalisedPrompt = prompt.charAt(0).toUpperCase() + prompt.slice(1);
    const productRequest: PrintifyProductRequest = {
        blueprint_id: blueprintId,
        description: "TODO: make dynamic description",
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
        title: capitalisedPrompt,
        variants: variantIds.map((variantId) => ({
            id: variantId,
            price: 1,
        })),
    };
    return productRequest;
}
