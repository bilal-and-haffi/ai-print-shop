import { Products } from "@/components/Products";
import { getProductsAndVariants } from "../../lib/printify/getProductsAndVariants";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";

export default async function ProductPage({
    searchParams,
}: {
    params: { printifyImageId: string };
    searchParams: {
        country: CountryCode;
        position: "front" | "back";
        imageId: string;
    };
}) {
    const { country, position, imageId } = searchParams;
    console.log({ country, position, imageId, msg: "ProductPage" });
    const productAndVariants = await getProductsAndVariants({
        printifyImageId: imageId,
        country,
        position: position ?? "front",
    });

    return (
        <div className="flex flex-col gap-4 md:w-1/2">
            <Products
                productsAndVariants={productAndVariants}
                country={country}
                printifyImageId={imageId}
            />
        </div>
    );
}
