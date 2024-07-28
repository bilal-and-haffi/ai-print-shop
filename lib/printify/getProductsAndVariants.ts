import { Variant } from "@/interfaces/Printify/Variant";
import { createPrintifyProduct } from "@/lib/printify/createPrintifyProduct";
import { fetchProductVariants } from "@/lib/printify/fetchProductVariants";
import { productData } from "@/lib/printify/productsData";
import { ProductType } from "@/types/ProductType";
import { ImagePosition } from "./constructPrintifyProductRequest";

export async function getProductsAndVariants({
    printifyImageId,
    country,
    position,
}: {
    printifyImageId: string;
    country: string;
    position: ImagePosition;
}) {
    if (!country) {
        console.error({ msg: "country is undefined", country });
    }

    const products = productData.filter(
        (product) => product.country === country && product.enabled,
    );

    const tShirtProductInfo = products.find((p) => p.displayName === "T Shirt");
    const hoodieProductInfo = products.find((p) => p.displayName === "Hoodie");
    const mugProductInfo = products.find((p) => p.displayName === "Mug");

    if (!tShirtProductInfo || !hoodieProductInfo || !mugProductInfo) {
        console.error({
            country,
            printifyImageId,
            products,
            tShirtProductInfo,
            hoodieProductInfo,
            mugProductInfo,
        });
        throw new Error("Missing Data in product variants");
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
            position,
        }),
        fetchProductVariants(
            tShirtProductInfo.blueprintId,
            tShirtProductInfo.printProviderId,
        ),
        createPrintifyProduct({
            printifyImageId,
            printProviderId: hoodieProductInfo.printProviderId,
            blueprintId: hoodieProductInfo.blueprintId,
            position,
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
