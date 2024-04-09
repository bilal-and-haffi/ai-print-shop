import { Products } from "@/components/Products";
import { createPrintifyHoodieProduct } from "@/lib/printify/products/createPrintifyHoodieProduct";
import { createPrintifyMugProduct } from "@/lib/printify/products/createPrintifyMugProduct";
import { createPrintifyTshirtProduct } from "@/lib/printify/products/createPrintifyTShirtProduct";

export default async function ProductPage({
    params,
}: {
    params: { printifyImageId: string };
}) {
    const { printifyImageId } = params;
    const [tShirtProduct, hoodieProduct, mugProduct] = await Promise.all([
        createPrintifyTshirtProduct(printifyImageId),
        createPrintifyHoodieProduct(printifyImageId),
        createPrintifyMugProduct(printifyImageId),
    ]);

    return (
        <>
            <Products
                tShirtProduct={tShirtProduct}
                hoodieProduct={hoodieProduct}
                mugProduct={mugProduct}
            />
        </>
    );
}
