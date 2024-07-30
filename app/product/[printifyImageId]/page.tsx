import { Products } from "@/components/Products";
import { getProductsAndVariants } from "../../../lib/printify/getProductsAndVariants";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import { ImagePosition } from "@/lib/printify/product/constructPrintifyProductRequest";

export default async function ProductPage({
    params,
    searchParams,
}: {
    params: { printifyImageId: string };
    searchParams: { country: CountryCode; position: ImagePosition };
}) {
    const { printifyImageId } = params;
    const { country, position } = searchParams;
    console.log({ country, position, printifyImageId, msg: "ProductPage" });
    const productAndVariants = await getProductsAndVariants({
        printifyImageId,
        country,
        position: position ?? "front",
    });

    return (
        <div className="flex flex-col gap-4 md:w-1/2">
            <Products
                productsAndVariants={productAndVariants}
                country={country}
                printifyImageId={printifyImageId}
            />
        </div>
    );
}
