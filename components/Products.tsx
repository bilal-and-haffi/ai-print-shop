"use client";

import { useState } from "react";
import { ProductDetails } from "./ProductDetails";
import { ProductSwitcher } from "./LinksToProducts";

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
    tShirtProduct: any;
    hoodieProduct: any;
    mugProduct: any;
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
                    />
                );
            case ProductType.Hoodie:
                return (
                    <ProductDetails
                        retrievedProduct={hoodieProduct}
                        initialSizeId={16} // large
                        initialColorId={418} // black
                    />
                );
            case ProductType.Mug:
                return (
                    <ProductDetails
                        retrievedProduct={mugProduct}
                        initialSizeId={1189}
                        initialColorId={2621}
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
