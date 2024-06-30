import { Products } from "@/components/Products";
import { fetchProductVariants } from "@/lib/printify/fetchProductVariants";
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
    const printCleverId = 72;
    const tShirtBlueprintId = 6;
    const hoodieBlueprintId = 77;
    const mugBlueprintId = 1302;
    // The variants below are fetched because they reflect what is in stock whereas the ProductVariant on the product respones to not reflect what is in stock
    const [tShirtVariants, hoodieVariants, mugVariants] = await Promise.all([
        fetchProductVariants(tShirtBlueprintId, printCleverId),
        fetchProductVariants(hoodieBlueprintId, printCleverId),
        fetchProductVariants(mugBlueprintId, printCleverId),
    ]);

    return (
        <>
            <Products
                tShirtProduct={tShirtProduct}
                hoodieProduct={hoodieProduct}
                mugProduct={mugProduct}
                tShirtVariants={tShirtVariants}
                hoodieVariants={hoodieVariants}
                mugVariants={mugVariants}
            />
        </>
    );
}
