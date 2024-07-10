"use client";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/components/Products";
import { RefreshCw, ChevronLeft } from "lucide-react";
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

export const ProductSwitcher = ({
    selectedProductType,
    setSelectedProductType,
    prompt,
}: {
    selectedProductType: ProductType;
    setSelectedProductType: (productType: ProductType) => void;
    prompt: string;
}) => {
    const productsMap = new Map([
        [ProductType.TShirt, "T Shirt"],
        [ProductType.Hoodie, "Hoodie"],
        [ProductType.Mug, "Mug"],
    ]);

    return (
        <div
            id="links-to-products-container"
            className="flex w-5/6 items-center justify-between space-x-4 lg:w-1/3"
        >
            <Link href={`/`}>
                <Button
                    data-testid="Go back"
                    variant="outline"
                    className="dark"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </Link>
            <div id="product-links" className="dark flex md:hidden">
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
            <div
                id="product-links-md"
                className="dark hidden space-x-2 md:flex"
            >
                <Button
                    className={
                        selectedProductType === ProductType.TShirt
                            ? "ring-1 ring-white"
                            : ""
                    }
                    onClick={() => setSelectedProductType(ProductType.TShirt)}
                    variant="outline"
                >
                    T Shirt
                </Button>
                <Button
                    className={
                        selectedProductType === ProductType.Hoodie
                            ? "ring-1 ring-white"
                            : ""
                    }
                    onClick={() => setSelectedProductType(ProductType.Hoodie)}
                    variant="outline"
                >
                    Hoodie
                </Button>
                <Button
                    className={
                        selectedProductType === ProductType.Mug
                            ? "ring-1 ring-white"
                            : ""
                    }
                    onClick={() => setSelectedProductType(ProductType.Mug)}
                    variant="outline"
                >
                    Mug
                </Button>
            </div>
            {/* needs to be an a because otherwise causes bugs */}
            <a href={`/image/${prompt}?model=openai`}>
                <Button
                    data-testid="Generate new image with same prompt button"
                    className="dark"
                    variant="outline"
                >
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </a>
        </div>
    );
};