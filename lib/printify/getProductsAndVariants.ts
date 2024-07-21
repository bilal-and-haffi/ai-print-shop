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
            printProviderId: productData.tShirt.printProviderId,
            blueprintId: productData.tShirt.blueprintId,
        }),
        fetchProductVariants(
            productData.tShirt.blueprintId,
            productData.tShirt.printProviderId,
        ),
        createPrintifyProduct({
            printifyImageId,
            printProviderId: productData.hoodie.printProviderId,
            blueprintId: productData.hoodie.blueprintId,
        }),
        fetchProductVariants(
            productData.hoodie.blueprintId,
            productData.hoodie.printProviderId,
        ),
        createPrintifyProduct({
            printifyImageId,
            printProviderId: productData.mug.printProviderId,
            blueprintId: productData.mug.blueprintId,
        }),
        fetchProductVariants(
            productData.mug.blueprintId,
            productData.mug.printProviderId,
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
