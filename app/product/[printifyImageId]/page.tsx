import { Products } from "@/components/Products";
import { getProductsAndVariants } from "../../../lib/printify/getProductsAndVariants";
import { isValidCountry } from "../../../lib/country/isValidCountry";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import { getCountryFromIpAddress } from "@/lib/country/getCountryFromIpAddress";

export default async function ProductPage({
    params,
    searchParams,
}: {
    params: { printifyImageId: string };
    searchParams: { country: string };
}) {
    const { printifyImageId } = params;
    const { country } = searchParams;
    const userCountry: CountryCode = isValidCountry(country)
        ? (country as CountryCode)
        : ((await getCountryFromIpAdress()) ?? "GB");
    const productAndVariants = await getProductsAndVariants({
        printifyImageId,
        country: userCountry,
    });

    return (
        <div className="flex flex-col gap-4 md:w-1/2">
            <Products
                productsAndVariants={productAndVariants}
                countryCode={userCountry}
            />
        </div>
    );
}
