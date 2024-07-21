import { Products } from "@/components/Products";
import { getProductsAndVariants } from "../../../lib/printify/getProductsAndVariants";

export default async function ProductPage({
    params,
    searchParams,
}: {
    params: { printifyImageId: string };
    searchParams: { country: string };
}) {
    const { printifyImageId } = params;
    const { country } = searchParams;
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
