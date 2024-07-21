import { Variant } from "@/interfaces/Printify/Variant";
import { createPrintifyProduct } from "@/lib/printify/createPrintifyProduct";
import { fetchProductVariants } from "@/lib/printify/fetchProductVariants";
import { productData } from "@/lib/printify/productsData";
import { ProductType } from "@/types/ProductType";

export async function getProductsAndVariants({
    printifyImageId,
    country,
}: {
    printifyImageId: string;
    country?: string;
}) {
    const products = productData.filter(
        (product) => product.country === country,
    );

    const tShirtProductInfo = products.find((p) => p.displayName === "T Shirt");
    const hoodieProductInfo = products.find((p) => p.displayName === "Hoodie");
    const mugProductInfo = products.find((p) => p.displayName === "Mug");

    if (!tShirtProductInfo || !hoodieProductInfo || !mugProductInfo) {
        throw new Error("Missing Data");
    }
    const [
        tShirtProduct,
        tShirtVariants,
        hoodieProduct,
        hoodieVariants,
        mugProduct,
        mugVariants,
    ] = await Promise.all([
        createPrintifyProduct({
            printifyImageId,
            printProviderId: tShirtProductInfo.printProviderId,
            blueprintId: tShirtProductInfo.blueprintId,
        }),
        fetchProductVariants(
            tShirtProductInfo.blueprintId,
            tShirtProductInfo.printProviderId,
        ),
        createPrintifyProduct({
            printifyImageId,
            printProviderId: hoodieProductInfo.printProviderId,
            blueprintId: hoodieProductInfo.blueprintId,
        }),
        fetchProductVariants(
            hoodieProductInfo.blueprintId,
            hoodieProductInfo.printProviderId,
        ),
        createPrintifyProduct({
            printifyImageId,
            printProviderId: mugProductInfo.printProviderId,
            blueprintId: mugProductInfo.blueprintId,
        }),
        fetchProductVariants(
            mugProductInfo.blueprintId,
            mugProductInfo.printProviderId,
        ),
    ]);

    const productAndVariants: Map<
        ProductType,
        {
            product: any;
            variants: Variant[];
        }
    > = new Map([
        [
            ProductType.TShirt,
            {
                product: tShirtProduct,
                variants: tShirtVariants,
            },
        ],
        [
            ProductType.Hoodie,
            {
                product: hoodieProduct,
                variants: hoodieVariants,
            },
        ],
        [
            ProductType.Mug,
            {
                product: mugProduct,
                variants: mugVariants,
            },
        ],
    ]);

    return productAndVariants;
}
