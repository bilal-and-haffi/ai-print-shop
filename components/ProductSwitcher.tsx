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
import { JSX, useContext } from "react";
import { CountryCodeContext } from "./Products";

export const ProductSwitcher = ({
    selectedProductType,
    setSelectedProductType,
    prompt,
    productsMap,
}: {
    selectedProductType: ProductType;
    setSelectedProductType: (productType: ProductType) => void;
    prompt: string;
    productsMap: Map<ProductType, string>;
}) => {
    const ProductButtons: JSX.IntrinsicAttributes | JSX.Element[] = [];
    const countryCode = useContext(CountryCodeContext);

    productsMap.forEach((name, productType) => {
        ProductButtons.push(
            <Button
                className={
                    selectedProductType === productType
                        ? "ring-1 ring-white"
                        : ""
                }
                variant={"outline"}
                onClick={() => setSelectedProductType(productType)}
                key={name}
            >
                {name}
            </Button>,
        );
    });

    return (
        <div
            id="links-to-products-container"
            className="flex w-full items-center justify-between space-x-4"
        >
            <Link href={`/create?country=${countryCode}`}>
                <Button data-testid="Go back" variant={"outline"}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </Link>
            <div id="product-links" className="flex md:hidden">
                <Select
                    onValueChange={(value: ProductType) =>
                        setSelectedProductType(value)
                    }
                    value={selectedProductType}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={selectedProductType} />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.from(productsMap).map(([productType, title]) => (
                            <SelectItem key={productType} value={productType}>
                                {title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div id="product-links-md" className="hidden space-x-2 md:flex">
                {ProductButtons}
            </div>
            {/* needs to be an <a> because otherwise causes bugs */}
            <a href={`/image/${prompt}`}>
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
