import { ProductDetails } from "@/components/ProductDetails";
import { fetchProductVariants } from "@/lib/printify/fetchProductVariants";
import { createPrintifyProduct } from "@/lib/printify/product/createPrintifyProduct";
import { productData } from "@/lib/printify/productsData";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";

export type DisplayName = "T Shirt" | "Hoodie" | "Mug";
export type Position = "front" | "back";

export default async function ProductTypePage({
    params: { productType },
    searchParams: { imageId, country, position = "front" },
}: {
    params: { productType: string };
    searchParams: {
        imageId: string;
        country: CountryCode;
        position?: Position;
    };
}) {
    if (!country) {
        throw new Error("return client component to enter or detect country");
    }
    const products = productData.filter(
        (product) => product.country === country && product.enabled,
    );
    const displayName = decodeURIComponent(productType) as DisplayName;
    const productInfo = products.find((p) => p.displayName === displayName);

    if (!productInfo) {
        console.error({ msg: "No product info" });
        throw new Error("No product info");
    }
    const product = await createPrintifyProduct({
        printifyImageId: imageId,
        printProviderId: productInfo.printProviderId,
        blueprintId: productInfo.blueprintId,
        position,
    });
    console.log({ msg: "Fetched product", product });
    const variants = await fetchProductVariants(
        productInfo.blueprintId,
        productInfo.printProviderId,
    );

    return (
        <>
            <ProductDetails
                retrievedProduct={product}
                initialSize={getInitialSize(displayName)}
                initialColor="Black"
                variants={variants}
                printifyImageId={imageId}
            />
        </>
    );
}

function getInitialSize(displayName: DisplayName) {
    if (displayName === "Mug") {
        return "11oz";
    } else {
        return "L";
    }
}
