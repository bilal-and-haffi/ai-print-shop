"use client";
import { Button } from "@/components/ui/button";
import { ProductType } from "../types/ProductType";
import { RefreshCw, ChevronLeft } from "lucide-react";
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { useContext } from "react";
import {
    useRouter,
    usePathname,
    useSearchParams,
    useParams,
} from "next/navigation";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";

const productsMap = new Map([
    [ProductType.TShirt, "T Shirt"],
    [ProductType.Hoodie, "Hoodie"],
    [ProductType.Mug, "Mug"],
]);

export const ProductSwitcher = ({ prompt }: { prompt?: string }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();
    const productType = params["productType"];
    console.log({ searchParams });
    const countryCode = searchParams.get("country") as CountryCode;
    if (!productType || typeof productType !== "string") {
        console.error("No Product Type");
        throw new Error("No product type");
    }
    const decodedProductType = decodeURIComponent(productType);

    return (
        <div
            id="links-to-products-container"
            className="flex w-full items-center justify-between space-x-4"
        >
            <Link href={`/create?country=${countryCode}&prompt=${prompt}`}>
                <Button data-testid="Go back" variant={"outline"}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </Link>
            <div id="product-links" className="flex">
                <Select
                    onValueChange={(value: ProductType) => {
                        router.push(
                            `/product/${value}?${searchParams.toString()}`,
                        );
                    }}
                    value={decodedProductType}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={productType} />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.from(productsMap).map(
                            ([_productType, title]) => (
                                <SelectItem key={title} value={title}>
                                    {title}
                                </SelectItem>
                            ),
                        )}
                    </SelectContent>
                </Select>
            </div>
            {/* needs to be an <a> because otherwise causes bugs */}
            <a href={`/image/${prompt}?country=${countryCode}`}>
                <Button
                    data-testid="Generate new image with same prompt button"
                    variant={"outline"}
                >
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </a>
        </div>
    );
};
