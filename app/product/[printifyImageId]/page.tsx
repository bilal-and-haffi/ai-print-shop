import { Products } from "@/components/Products";
import { getProductsAndVariants } from "../../../lib/printify/getProductsAndVariants";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";

export default async function ProductPage({
    params,
    searchParams,
}: {
    params: { printifyImageId: string };
    searchParams: { country: CountryCode };
}) {
    const { printifyImageId } = params;
    const { country } = searchParams;
    console.log({ country });
    const productAndVariants = await getProductsAndVariants({
        printifyImageId,
        country,
    });

    return (
        <div className="flex flex-col gap-4 md:w-1/2">
            <Products productsAndVariants={productAndVariants} />
        </div>
    );
}
