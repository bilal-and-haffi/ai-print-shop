import { ProductDetails } from "@/components/ProductDetails";
import { fetchProductVariants } from "@/lib/printify/fetchProductVariants";
import { createPrintifyProduct } from "@/lib/printify/product/createPrintifyProduct";
import { getEnabledProductsForCountry } from "@/lib/printify/productsData";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";

export type DisplayName = "T Shirt" | "Hoodie" | "Mug" | "Baseball Tee";
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

    const products = getEnabledProductsForCountry(country);
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
                initialColor={getInitialColour(displayName)}
                variants={variants}
                printifyImageId={imageId}
            />
        </>
    );
}

function getInitialColour(displayName: DisplayName) {
    if (displayName === "Baseball Tee") {
        return "Black/ White";
    }
    return "Black";
}

function getInitialSize(displayName: DisplayName) {
    if (displayName === "Mug") {
        return "11oz";
    } else {
        return "L";
    }
}
