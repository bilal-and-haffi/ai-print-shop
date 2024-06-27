"use client";

import { useState } from "react";
import { ProductDetails } from "./ProductDetails";
import { ProductSwitcher } from "./LinksToProducts";
import { RetrieveProductResponse } from "@/interfaces/PrintifyTypes";

export const enum ProductType {
    TShirt = "tshirt",
    Hoodie = "hoodie",
    Mug = "mug",
}

export const Products = ({
    tShirtProduct,
    hoodieProduct,
    mugProduct,
}: {
    tShirtProduct: RetrieveProductResponse;
    hoodieProduct: RetrieveProductResponse;
    mugProduct: RetrieveProductResponse;
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
                        initialSizeId={16} // large
                        initialColorId={418} // black
                        priceInGbp={20}
                    />
                );
            case ProductType.Hoodie:
                return (
                    <ProductDetails
                        retrievedProduct={hoodieProduct}
                        initialSizeId={16} // large
                        initialColorId={418} // black
                        priceInGbp={40}
                    />
                );
            case ProductType.Mug:
                return (
                    <ProductDetails
                        retrievedProduct={mugProduct}
                        initialSizeId={1189}
                        initialColorId={2621}
                        priceInGbp={15}
                    />
                );
        }
    };

    return (
        <>
            <ProductSwitcher
                selectedProductType={selectedProductType}
                setSelectedProductType={setSelectedProductType}
            />
            <CurrentProductDetails />
        </>
    );
};
