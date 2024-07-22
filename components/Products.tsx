"use client";

import { createContext, useState } from "react";
import { ProductDetails } from "./ProductDetails";
import { Variant } from "@/interfaces/Printify/Variant";
import { ProductSwitcher } from "./ProductSwitcher";
import { ProductType } from "../types/ProductType";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";

const productsMap = new Map([
    [ProductType.TShirt, "T Shirt"],
    [ProductType.Hoodie, "Hoodie"],
    [ProductType.Mug, "Mug"],
]);
export const CountryCodeContext = createContext<CountryCode>("GB");

export const Products = ({
    countryCode,
    productsAndVariants,
}: {
    countryCode: CountryCode;
    productsAndVariants: Map<
        ProductType,
        {
            product: any;
            variants: Variant[];
        }
    >;
}) => {
    const [selectedProductType, setSelectedProductType] = useState<ProductType>(
        ProductType.TShirt,
    );

    const tShirtProduct = productsAndVariants.get(ProductType.TShirt)!.product; // sketch
    const tShirtVariants = productsAndVariants.get(
        ProductType.TShirt,
    )!.variants;
    const hoodieProduct = productsAndVariants.get(ProductType.Hoodie)!.product;
    const hoodieVariants = productsAndVariants.get(
        ProductType.Hoodie,
    )!.variants;
    const mugProduct = productsAndVariants.get(ProductType.Mug)!.product;
    const mugVariants = productsAndVariants.get(ProductType.Mug)!.variants;

    const CurrentProductDetails = () => {
        switch (selectedProductType) {
            case ProductType.TShirt:
                return (
                    <ProductDetails
                        retrievedProduct={tShirtProduct}
                        initialSize="L"
                        initialColor="Black"
                        // priceInGbp={25}
                        variants={tShirtVariants}
                    />
                );
            case ProductType.Hoodie:
                return (
                    <ProductDetails
                        retrievedProduct={hoodieProduct}
                        initialSize="L"
                        initialColor="Black"
                        // priceInGbp={40}
                        variants={hoodieVariants}
                    />
                );
            case ProductType.Mug:
                return (
                    <ProductDetails
                        retrievedProduct={mugProduct}
                        initialSize="11oz"
                        initialColor="Black"
                        // priceInGbp={15}
                        variants={mugVariants}
                    />
                );
        }
    };

    return (
        <>
            <CountryCodeContext.Provider value={countryCode}>
                <ProductSwitcher
                    selectedProductType={selectedProductType}
                    setSelectedProductType={setSelectedProductType}
                    prompt={tShirtProduct.title}
                    productsMap={productsMap}
                />
                <CurrentProductDetails />
            </CountryCodeContext.Provider>
        </>
    );
};
