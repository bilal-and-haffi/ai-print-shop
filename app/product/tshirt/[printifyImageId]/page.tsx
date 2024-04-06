import {
    printCleverId,
    unisexHeavyBlendHoodedSweatshirtBlueprintId,
    unisexHeavyCottonTeeBlueprintId,
} from "@/app/data/consts";
import { ProductDetails } from "@/components/ProductDetails";
import {
    constructPrintifyProductRequest,
    createPrintifyProduct,
    retrieveAProduct,
} from "@/lib/printify/service";
import Link from "next/link";

export default async function TShirtPage({
    params,
    searchParams,
}: {
    params: { printifyImageId: string };
    searchParams: { size?: number; color?: number };
}) {
    const { printifyImageId } = params;
    const { size, color } = searchParams;
    console.log({ printifyImageId });

    const teeShirtProductRequest = await constructPrintifyProductRequest({
        printifyImageId: printifyImageId,
        prompt: "TODO",
        printProviderId: printCleverId,
        blueprintId: unisexHeavyCottonTeeBlueprintId,
    });

    const { id: teeShirtPrintifyProductId } = await createPrintifyProduct(
        teeShirtProductRequest,
    );

    const retrievedProduct = await retrieveAProduct(teeShirtPrintifyProductId);

    return (
        <>
            <ProductDetails
                retrievedProduct={retrievedProduct}
                withBuyNow={true}
                size={size}
                color={color}
            />
            <Link href={`/product/hoodie/${printifyImageId}`}>Hoodie</Link>
        </>
    );
}
