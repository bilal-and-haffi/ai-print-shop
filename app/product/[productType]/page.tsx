import { ProductDetails } from "@/components/ProductDetails";
import { fetchProductVariants } from "@/lib/printify/fetchProductVariants";
import { createPrintifyProduct } from "@/lib/printify/product/createPrintifyProduct";
import { productData } from "@/lib/printify/productsData";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";

export default async function ProductTypePage({
    params: { productType },
    searchParams: { imageId, country },
}: {
    params: { productType: string };
    searchParams: { imageId: string; country: CountryCode };
}) {
    if (!country) {
        throw new Error("return client component to enter or detect country");
    }
    const position = "front";
    const products = productData.filter(
        (product) => product.country === country && product.enabled,
    );
    const displayName = decodeURIComponent(productType);
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
    console.log({ variants });
    return (
        <>
            <ProductDetails
                retrievedProduct={product}
                initialSize="L"
                initialColor="Black"
                variants={variants}
                printifyImageId={imageId}
            />
        </>
    );
}
