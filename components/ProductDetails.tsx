"use client";

import { Button } from "@/components/ui/button";
import {
    ProductVariant,
    RetrieveProductResponse,
} from "@/interfaces/PrintifyTypes";
import { ImagesCarousel } from "./ImageCarousel";
import { Size, SizeAndColorSelector } from "./SizeAndColorForm";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { SmallLoadingSpinner } from "./loading/SmallLoadingSpinner";
import { isPriceOkay } from "../lib/pricing/isPriceOkay";
import { Variant } from "@/interfaces/Printify/Variant";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";

export interface Options {
    id: number;
    title: string;
}

export function ProductDetails({
    retrievedProduct,
    initialSize,
    initialColor,
    priceInGbp,
    variants,
}: {
    retrievedProduct: RetrieveProductResponse;
    initialSize: string;
    initialColor: string;
    priceInGbp: number;
    variants: Variant[];
}) {
    const { print_provider_id, blueprint_id } = retrievedProduct;
    console.log({ print_provider_id, blueprint_id, variants });
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const { images } = retrievedProduct;

    const [selectedSize, setSelectedSize] = useState(initialSize);
    const [selectedColor, setSelectedColor] = useState(initialColor);

    const initialSelectedVariant = findSelectedVariant(
        selectedSize,
        selectedColor,
        variants,
    );

    const [selectedVariant, setSelectedVariant] = useState<Variant>(
        initialSelectedVariant,
    );

    useEffect(() => {
        setSelectedVariant(
            findSelectedVariant(selectedSize, selectedColor, variants),
        );
    }, [selectedSize, selectedColor, retrievedProduct, variants]);

    const filteredImages = useMemo(
        () =>
            selectedVariant
                ? images.filter((image) =>
                      image.variant_ids.includes(selectedVariant.id),
                  )
                : [],
        [selectedVariant, images],
    );

    const filteredSizeOptionsForColorId = useMemo(
        () => getFilteredSizesForColor(selectedColor, variants),
        [selectedColor, variants],
    );

    const filteredColourOptionsForSizeId = useMemo(
        () => getFilteredColorsForSize(selectedSize, variants),
        [selectedSize, variants],
    );

    const selectedProductVariant = useMemo(() => {
        return retrievedProduct.variants.find(
            (variants) => variants.id === selectedVariant.id,
        ) as ProductVariant;
    }, [selectedVariant, retrievedProduct.variants]);

    const onClick = async () => {
        if (!(await isPriceOkay(selectedProductVariant, priceInGbp))) {
            throw new Error("Something went wrong");
        }
        setCheckoutLoading(true);
        fetch("/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId: retrievedProduct.id,
                productType: retrievedProduct.tags[1],
                order_title: retrievedProduct.title,
                order_variant_label: selectedVariant.title,
                orderVariantId: selectedVariant.id,
                order_preview: filteredImages[0].src,
                price: priceInGbp * 100,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                window.location.href = data.url;
                setCheckoutLoading(false);
            });
    };

    return (
        <div className="flex w-full flex-col items-center justify-center text-center">
            {images ? (
                <ImagesCarousel images={filteredImages} />
            ) : (
                <div>Product Not Available</div>
            )}
            <div className="mt-4 flex w-2/3 flex-col gap-2">
                <div
                    id="selectContainer"
                    className="flex flex-col justify-between gap-2"
                >
                    <SizeAndColorSelector
                        sizes={filteredSizeOptionsForColorId as Size[]}
                        colours={filteredColourOptionsForSizeId}
                        selectedSize={selectedSize}
                        selectedColor={selectedColor}
                        setSelectedSize={setSelectedSize}
                        setSelectedColor={setSelectedColor}
                    />
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>£{priceInGbp}</CardTitle>
                        <CardDescription>Free shipping</CardDescription>
                    </CardHeader>
                </Card>
            </div>
            <div className="mt-4 flex w-full flex-col items-center">
                <Button
                    onClick={onClick}
                    className="w-full bg-blue-500 text-white hover:bg-blue-700"
                >
                    {checkoutLoading ? (
                        <div className="flex flex-row items-center">
                            <SmallLoadingSpinner className="fill-white" />
                        </div>
                    ) : (
                        <>Buy now</>
                    )}
                </Button>
                <div className="mt-4 text-sm">
                    Powered by
                    <Image
                        src="/stripe.svg"
                        alt="Stripe"
                        width={100}
                        height={100}
                        priority
                    />
                </div>
            </div>
        </div>
    );
}

function findSelectedVariant(size: string, color: string, variants: Variant[]) {
    const selectedVariant = variants.find(
        (variant) =>
            variant.options.color == color && variant.options.size == size,
    );

    if (!selectedVariant) {
        throw new Error("No selected variant");
    }

    return selectedVariant;
}

function getFilteredSizesForColor(color: string, variants: Variant[]) {
    const filteredVariants = variants.filter(
        (variant) => variant.options.color == color,
    );
    const filteredSizes = filteredVariants.map(
        (variant) => variant.options.size,
    );
    return filteredSizes;
}

function getFilteredColorsForSize(size: string, variants: Variant[]) {
    const filteredVariants = variants.filter(
        (variant) => variant.options.size === size,
    );
    const filteredColors = filteredVariants.map(
        (variant) => variant.options.color,
    );

    return filteredColors;
}
