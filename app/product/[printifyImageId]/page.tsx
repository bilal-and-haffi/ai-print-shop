import { Products } from "@/components/Products";
import { createPrintifyProduct } from "@/lib/printify/createPrintifyProduct";
import { fetchProductVariants } from "@/lib/printify/fetchProductVariants";
import { products } from "@/lib/printify/productsData";

export default async function ProductPage({
    params,
}: {
    params: { printifyImageId: string };
}) {
    const { printifyImageId } = params;
    console.log({ printifyImageId });

    const [
        tShirtProduct,
        hoodieProduct,
        mugProduct,
        tShirtVariants,
        hoodieVariants,
        mugVariants,
    ] = await Promise.all([
        createPrintifyProduct({
            printifyImageId,
            printProviderId: products.tShirt.printProviderId,
            blueprintId: products.tShirt.blueprintId,
        }),
        createPrintifyProduct({
            printifyImageId,
            printProviderId: products.hoodie.printProviderId,
            blueprintId: products.hoodie.blueprintId,
        }),
        createPrintifyProduct({
            printifyImageId,
            printProviderId: products.mug.printProviderId,
            blueprintId: products.mug.blueprintId,
        }),
        // The variants below are fetched because they reflect what is in stock whereas the ProductVariant on the product respones to not reflect what is in stock
        fetchProductVariants(
            products.tShirt.blueprintId,
            products.tShirt.printProviderId,
        ),
        fetchProductVariants(
            products.hoodie.blueprintId,
            products.hoodie.printProviderId,
        ),
        fetchProductVariants(
            products.mug.blueprintId,
            products.mug.printProviderId,
        ),
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
