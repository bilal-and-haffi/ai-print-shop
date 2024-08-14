import { COUNTRIES_WE_SELL_IN } from "@/app/data/consts";
import { CountryPicker } from "@/components/country/CountryPicker";
import { CountrySetter } from "@/components/country/CountrySetter";
import { ProductDetails } from "@/components/product/ProductDetails";
import { createPrintifyProduct } from "@/lib/printify/product/createPrintifyProduct";
import { fetchProductVariants } from "@/lib/printify/product/fetchProductVariants";
import {
    DisplayName,
    getEnabledProductsForCountry,
} from "@/lib/printify/productsData";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import { track } from "@vercel/analytics/server";

export type Position = "front" | "back";
export default async function ProductTypePage({
    params: { productType },
    searchParams: {
        imageId,
        country,
        position = "front",
        scale = 0.7,
        x = 0.5,
        y = 0.5,
    },
}: {
    params: { productType: string };
    searchParams: {
        imageId: string;
        country: CountryCode | "undefined";
        position?: Position;
        scale?: number;
        x?: number;
        y?: number;
    };
}) {
    track("Product page");

    if (country === "undefined") {
        return <CountrySetter />;
    }

    if (COUNTRIES_WE_SELL_IN.indexOf(country) === -1) {
        return <CountryPicker />;
    }

    const products = getEnabledProductsForCountry(country);
    const displayName = decodeURIComponent(productType) as DisplayName;
    const productInfo = products.find((p) => p.displayName === displayName);
    console.log("1");

    if (!productInfo) {
        console.error({
            msg: "No product info",
            country,
            products,
            displayName,
        });
        throw new Error("No product info");
    }

    const product = await createPrintifyProduct({
        printifyImageId: imageId,
        printProviderId: productInfo.printProviderId,
        blueprintId: productInfo.blueprintId,
        position,
        scale,
        x,
        y,
    });
    console.log({ msg: "Fetched product", product });
    const variants = await fetchProductVariants(
        productInfo.blueprintId,
        productInfo.printProviderId,
    );

    return (
        <ProductDetails
            retrievedProduct={product}
            variants={variants}
            printifyImageId={imageId}
        />
    );
}
