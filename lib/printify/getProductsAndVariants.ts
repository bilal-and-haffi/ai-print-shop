import { Variant } from "@/interfaces/Printify/Variant";
import { createPrintifyProduct } from "@/lib/printify/createPrintifyProduct";
import { fetchProductVariants } from "@/lib/printify/fetchProductVariants";
import { products } from "@/lib/printify/productsData";
import { ProductType } from "@/types/ProductType";

export async function getProductsAndVariants({
    printifyImageId,
    country,
}: {
    printifyImageId: string;
    country?: string;
}) {
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
            printProviderId: products.tShirt.printProviderId,
            blueprintId: products.tShirt.blueprintId,
        }),
        fetchProductVariants(
            products.tShirt.blueprintId,
            products.tShirt.printProviderId,
        ),
        createPrintifyProduct({
            printifyImageId,
            printProviderId: products.hoodie.printProviderId,
            blueprintId: products.hoodie.blueprintId,
        }),
        fetchProductVariants(
            products.hoodie.blueprintId,
            products.hoodie.printProviderId,
        ),
        createPrintifyProduct({
            printifyImageId,
            printProviderId: products.mug.printProviderId,
            blueprintId: products.mug.blueprintId,
        }),
        fetchProductVariants(
            products.mug.blueprintId,
            products.mug.printProviderId,
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
