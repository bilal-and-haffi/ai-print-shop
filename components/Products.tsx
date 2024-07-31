"use client";

import { useEffect, useState } from "react";
import { ProductDetails } from "./ProductDetails";
import { Variant } from "@/interfaces/Printify/Variant";
import { ProductSwitcher } from "./ProductSwitcher";
import { ProductType } from "../types/ProductType";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import { getCountryFromIpAddress } from "@/lib/country/getCountryFromIpAddress";

export const Products = ({
    productsAndVariants,
    printifyImageId,
}: {
    productsAndVariants: Map<
        ProductType,
        {
            product: any;
            variants: Variant[];
        }
    >;
    country: CountryCode;
    printifyImageId: string;
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
                        variants={tShirtVariants}
                        printifyImageId={printifyImageId}
                    />
                );
            case ProductType.Hoodie:
                return (
                    <ProductDetails
                        retrievedProduct={hoodieProduct}
                        initialSize="L"
                        initialColor="Black"
                        variants={hoodieVariants}
                        printifyImageId={printifyImageId}
                    />
                );
            case ProductType.Mug:
                return (
                    <ProductDetails
                        retrievedProduct={mugProduct}
                        initialSize="11oz"
                        initialColor="Black"
                        variants={mugVariants}
                        printifyImageId={printifyImageId}
                    />
                );
        }
    };

    return (
        <>
            <ProductSwitcher prompt={tShirtProduct.title} />
            <CurrentProductDetails />
        </>
    );
};
