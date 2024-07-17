"use client";

import { useState } from "react";
import { ProductDetails } from "./ProductDetails";
import { RetrieveProductResponse } from "@/interfaces/PrintifyTypes";
import { Variant } from "@/interfaces/Printify/Variant";
import { ProductSwitcher } from "./ProductSwitcher";

export const enum ProductType {
    TShirt = "tshirt",
    Hoodie = "hoodie",
    Mug = "mug",
}

const productsMap = new Map([
    [ProductType.TShirt, "T Shirt"],
    [ProductType.Hoodie, "Hoodie"],
    [ProductType.Mug, "Mug"],
]);

export const Products = ({
    tShirtProduct,
    hoodieProduct,
    mugProduct,
    tShirtVariants,
    hoodieVariants,
    mugVariants,
}: {
    tShirtProduct: RetrieveProductResponse;
    hoodieProduct: RetrieveProductResponse;
    mugProduct: RetrieveProductResponse;
    tShirtVariants: Variant[];
    hoodieVariants: Variant[];
    mugVariants: Variant[];
}) => {
    const [selectedProductType, setSelectedProductType] = useState<ProductType>(
        ProductType.TShirt,
    );

    const CurrentProductDetails = () => {
        switch (selectedProductType) {
            case ProductType.TShirt:
                return (
                    <ProductDetails
                        retrievedProduct={tShirtProduct}
                        initialSize="L"
                        initialColor="Black"
                        priceInGbp={20}
                        variants={tShirtVariants}
                    />
                );
            case ProductType.Hoodie:
                return (
                    <ProductDetails
                        retrievedProduct={hoodieProduct}
                        initialSize="L"
                        initialColor="Black"
                        priceInGbp={40}
                        variants={hoodieVariants}
                    />
                );
            case ProductType.Mug:
                return (
                    <ProductDetails
                        retrievedProduct={mugProduct}
                        initialSize="11oz"
                        initialColor="Black"
                        priceInGbp={15}
                        variants={mugVariants}
                    />
                );
        }
    };

    return (
        <>
            <ProductSwitcher
                selectedProductType={selectedProductType}
                setSelectedProductType={setSelectedProductType}
                prompt={tShirtProduct.title}
                productsMap={productsMap}
            />
            <CurrentProductDetails />
        </>
    );
};
