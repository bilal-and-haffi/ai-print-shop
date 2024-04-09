"use client";
import { Button } from "@/components/ui/button";
import { ProductType } from "./Products";

export const ProductSwitcher = ({
    selectedProductType,
    setSelectedProductType,
}: {
    selectedProductType: ProductType;
    setSelectedProductType: (productType: ProductType) => void;
}) => {
    return (
        <div
            id="links-to-products-container"
            className="flex w-full justify-center space-x-4"
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
    );
};
