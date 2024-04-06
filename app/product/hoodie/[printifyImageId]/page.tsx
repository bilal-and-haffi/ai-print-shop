import {
    printCleverId,
    unisexHeavyBlendHoodedSweatshirtBlueprintId,
} from "@/app/data/consts";
import { ProductDetails } from "@/components/ProductDetails";
import { Button } from "@/components/ui/button";
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
        printProviderId: printCleverId,
        blueprintId: unisexHeavyBlendHoodedSweatshirtBlueprintId,
    });

    const { id: hoodiePrintifyProductId } =
        await createPrintifyProduct(hoodieProductRequest);

    const retrievedProduct = await retrieveAProduct(hoodiePrintifyProductId);

    return (
        <>
            <Link href={`/product/tshirt/${printifyImageId}`}>
                <Button>T Shirt</Button>
            </Link>
            <ProductDetails
                retrievedProduct={retrievedProduct}
                withBuyNow={true}
                size={size}
                color={color}
            />
        </>
    );
}
