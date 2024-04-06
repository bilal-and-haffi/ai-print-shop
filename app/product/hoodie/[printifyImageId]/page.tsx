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

export default async function ProductPage({
    params,
    searchParams,
}: {
    params: { printifyImageId: string };
    searchParams: { size?: number; color?: number };
}) {
    const { printifyImageId } = params;
    const { size, color } = searchParams;
    console.log({ printifyImageId });

    const hoodieProductRequest = await constructPrintifyProductRequest({
        printifyImageId: printifyImageId,
        prompt: "TODO",
        printProviderId: printCleverId,
        blueprintId: unisexHeavyBlendHoodedSweatshirtBlueprintId,
    });

    const { id: hoodiePrintifyProductId } =
        await createPrintifyProduct(hoodieProductRequest);

    const retrievedProduct = await retrieveAProduct(hoodiePrintifyProductId);

    return (
        <>
            <ProductDetails
                retrievedProduct={retrievedProduct}
                withBuyNow={true}
                size={size}
                color={color}
            />
            <Link href={`/product/tshirt/${printifyImageId}`}>T Shirt</Link>
        </>
    );
}
