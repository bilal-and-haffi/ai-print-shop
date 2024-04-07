import { ProductDetails } from "@/components/ProductDetails";
import { createPrintifyTshirtProduct } from "@/lib/printify/products/createPrintifyTShirtProduct";

export default async function TShirtProductPage({
    params,
    searchParams,
}: {
    params: { printifyImageId: string };
    searchParams: { size?: number; color?: number };
}) {
    const { printifyImageId } = params;
    const { size, color } = searchParams;
    const tshirtProduct = await createPrintifyTshirtProduct(printifyImageId);

    return (
        <>
            <ProductDetails
                retrievedProduct={tshirtProduct}
                sizeId={size || 16} // large
                colorId={color || 418} // black
                printifyImageId={printifyImageId}
            />
        </>
    );
}
