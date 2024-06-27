"use client";

import { Button } from "@/components/ui/button";
import {
    ProductImage,
    ProductVariant,
    RetrieveProductResponse,
} from "@/interfaces/PrintifyTypes";
import { ImagesCarousel } from "./ImageCarousel";
import { SizeAndColorSelector } from "./SizeAndColorForm";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { GenerateImageLinks } from "./GenerateImageLinks";
import { SmallLoadingSpinner } from "./SmallLoadingSpinner";

export interface Options {
    id: number;
    title: string;
}

export function ProductDetails({
    retrievedProduct,
    initialSizeId,
    initialColorId,
    priceInGbp,
}: {
    retrievedProduct: RetrieveProductResponse;
    initialSizeId: number;
    initialColorId: number;
    priceInGbp: number;
}) {
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const { images } = retrievedProduct;

    const [selectedSizeId, setSelectedSizeId] = useState(
        initialSizeId.toString(),
    );
    const [selectedColorId, setSelectedColorId] = useState(
        initialColorId.toString(),
    );

    const initialSelectedVariant = findSelectedVariant(
        selectedSizeId,
        selectedColorId,
        retrievedProduct,
    );

    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
        initialSelectedVariant,
    );

    useEffect(() => {
        setSelectedVariant(
            findSelectedVariant(
                selectedSizeId,
                selectedColorId,
                retrievedProduct,
            ),
        );
    }, [
        selectedSizeId,
        selectedColorId,
        retrievedProduct,
        initialSelectedVariant,
    ]);

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
        () =>
            getFilteredSizeOptionsForColorId(selectedColorId, retrievedProduct),
        [selectedColorId, retrievedProduct],
    );

    const filteredColourOptionsForSizeId = useMemo(
        () =>
            getFilteredColorOptionsForSizeId(selectedSizeId, retrievedProduct),
        [retrievedProduct, selectedSizeId],
    );

    return (
        <div className="flex w-5/6 flex-col items-center justify-center space-y-4 text-center lg:w-1/3">
            <GenerateImageLinks prompt={retrievedProduct.title} />
            {images ? (
                <ImagesCarousel images={filteredImages} />
            ) : (
                <div>Product Not Available</div>
            )}
            <div className="flex flex-col justify-center space-y-4">
                <SizeAndColorSelector
                    sizes={filteredSizeOptionsForColorId}
                    colours={filteredColourOptionsForSizeId}
                    selectedSizeId={selectedSizeId}
                    selectedColorId={selectedColorId}
                    setSelectedSizeId={setSelectedSizeId}
                    setSelectedColorId={setSelectedColorId}
                />
            </div>
            <div
                id="linkContainer"
                className="flex w-full flex-col space-y-3 self-center"
            >
                <Button
                    onClick={() => {
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
                                order_preview: retrievedProduct.images[0].src,
                                price: priceInGbp * 100,
                            }),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                window.location.href = data.url;
                                setCheckoutLoading(false);
                            });
                    }}
                    className="focus:shadow-outline flex w-2/3 flex-row self-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
                >
                    {checkoutLoading ? (
                        <div className="flex flex-row items-center">
                            <SmallLoadingSpinner className="fill-white" />
                        </div>
                    ) : (
                        <p>Buy now for £{priceInGbp}</p>
                    )}
                </Button>
                <div className="flex flex-row items-center self-center rounded py-2 pl-3">
                    Powered by
                    <Image
                        src="/stripe.svg"
                        alt="Stripe"
                        width={100}
                        height={100}
                    />
                </div>
            </div>
        </div>
    );
}

function findSelectedVariant(
    sizeId: string,
    colorId: string,
    retrievedProduct: RetrieveProductResponse,
) {
    const selectedVariant = retrievedProduct.variants.find(
        (variant) =>
            variant.options[0] == Number(colorId) &&
            variant.options[1] == Number(sizeId),
    );

    if (!selectedVariant) {
        throw new Error("No selected variant");
    }

    return selectedVariant;
}

function getFilteredSizeOptionsForColorId(
    colorId: string,
    retrievedProduct: RetrieveProductResponse,
) {
    const filteredVariants = retrievedProduct.variants.filter(
        (variant) => variant.options[0] == Number(colorId),
    );
    const filteredSizeIds = filteredVariants.map(
        (variant) => variant.options[1],
    );

    const sizeOptions = retrievedProduct.options[1].values.filter((option) =>
        filteredSizeIds.includes(option.id),
    );

    return sizeOptions;
}

function getFilteredColorOptionsForSizeId(
    sizeId: string,
    retrievedProduct: RetrieveProductResponse,
) {
    console.log("called");
    const filteredVariants = retrievedProduct.variants.filter(
        (variant) => variant.options[1] == Number(sizeId),
    );
    const filteredColorIds = filteredVariants.map(
        (variant) => variant.options[0],
    );

    const filteredColorOptions = retrievedProduct.options[0].values.filter(
        (option) => filteredColorIds.includes(option.id),
    );

    console.log({ filteredVariants, filteredColorIds, filteredColorOptions });
    return filteredColorOptions;
}
