import { ProductDetails } from "@/components/ProductDetails";
import { createPrintifyMugProduct } from "@/lib/printify/products/createPrintifyMugProduct";

export default async function MugProductPage({
    params,
    searchParams,
}: {
    params: { printifyImageId: string };
    searchParams: { size?: number; color?: number };
}) {
    const { printifyImageId } = params;
    const { size, color } = searchParams;
    const hoodieProduct = await createPrintifyMugProduct(printifyImageId);

    return (
        <>
            <ProductDetails
                retrievedProduct={hoodieProduct}
                sizeId={size || 1189}
                colorId={color || 2621}
                printifyImageId={printifyImageId}
            />
        </>
    );
}
