"use client";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/components/Products";
import { RefreshCw, ChevronLeft } from "lucide-react";
import Link from "next/link";

export const ProductSwitcher = ({
    selectedProductType,
    setSelectedProductType,
    prompt,
}: {
    selectedProductType: ProductType;
    setSelectedProductType: (productType: ProductType) => void;
    prompt: string;
}) => {
    return (
        <div
            id="links-to-products-container"
            className="flex w-5/6 items-center justify-between space-x-4 lg:w-1/3"
        >
            <Link href={`/`}>
                <Button data-testid="Go back">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </Link>
            <div
                id="product-links"
                className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0"
            >
                <Button
                    className={
                        selectedProductType === ProductType.TShirt
                            ? "ring-1 ring-white"
                            : ""
                    }
                    onClick={() => setSelectedProductType(ProductType.TShirt)}
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
                >
                    Mug
                </Button>
            </div>
            {/* needs to be an a because otherwise causes bugs */}
            <a href={`/image/${prompt}?model=openai`}>
                <Button data-testid="Generate new image with same prompt button">
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </a>
        </div>
    );
};
