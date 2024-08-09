"use client";
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronLeft } from "lucide-react";
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import { useEffect, useState } from "react";
import { getPromptFromImageIdOrRemovedBackgroundImageId } from "@/db/image";
import {
    DisplayName,
    getEnabledProductsForCountry,
} from "@/lib/printify/productsData";

export const ProductSwitcher = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();
    const productType = params["productType"];
    const countryCode = searchParams.get("country") as CountryCode;
    const imageId = searchParams.get("imageId");
    const [prompt, setPrompt] = useState<string | undefined>();

    if (!imageId) {
        console.error("No imageId");
        throw new Error("No imageId");
    }

    useEffect(() => {
        const x = async () => {
            const prompt =
                await getPromptFromImageIdOrRemovedBackgroundImageId(imageId);
            setPrompt(prompt);
        };
        x();
    }, [imageId]);

    if (!prompt) {
        <div>Loading...</div>;
    }

    if (!productType || typeof productType !== "string") {
        console.error("No Product Type");
        throw new Error("No product type");
    }
    const decodedProductType = decodeURIComponent(productType);

    const products = getEnabledProductsForCountry(countryCode);

    // TODO: !!!! add the default options to the links here xoxo

    const onValueChange = (value: DisplayName) => {
        const searchParams = new URLSearchParams();
        searchParams.append("country", countryCode);
        searchParams.append("imageId", imageId);
        appendDefaultOptionsForProductToSearchParams({
            productType: value,
            searchParams,
        });
        const routeToPush = `/product/${value}?${searchParams.toString()}`;
        router.push(routeToPush);
    };

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
                    onValueChange={onValueChange}
                    value={decodedProductType}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={productType} />
                    </SelectTrigger>
                    <SelectContent>
                        {products.map(({ displayName }) => {
                            return (
                                <SelectItem
                                    key={displayName}
                                    value={displayName}
                                >
                                    {displayName}
                                </SelectItem>
                            );
                        })}
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

function appendDefaultOptionsForProductToSearchParams({
    productType,
    searchParams,
}: {
    productType: DisplayName;
    searchParams: URLSearchParams;
}) {
    switch (productType) {
        case "Mug":
            searchParams.append("size", "11oz");
            searchParams.append("color", "Black");
            return;
        case "Baseball Tee":
            searchParams.append("size", "L");
            searchParams.append("color", "Black/ White");
            return;
        case "Canvas":
            searchParams.append("size", '6" x 6"');
            searchParams.append("depth", "0.75''");
            return;
        case "Phone Case":
            searchParams.append("size", "iPhone 15");
            searchParams.append("surface", "Matte");
            return;
        case "T Shirt":
        case "Hoodie":
        case "Sweatshirt":
        default:
            searchParams.append("size", "L");
            searchParams.append("color", "Black");
            return;
    }
}
