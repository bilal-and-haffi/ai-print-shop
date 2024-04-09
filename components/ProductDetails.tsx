"use client";

import { Button } from "@/components/ui/button";
import {
    ProductVariant,
    RetrieveProductResponse,
} from "@/interfaces/PrintifyTypes";
import { ImagesCarousel } from "./ImageCarousel";
import { T_SHIRT_PRICE_IN_GBP } from "@/app/data/consts";
import { SizeAndColorSelector } from "./SizeAndColorForm";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { GenerateImageLinks } from "./GenerateImageLinks";

export interface Options {
    id: number;
    title: string;
}

export function ProductDetails({
    retrievedProduct,
    initialSizeId,
    initialColorId,
}: {
    retrievedProduct: RetrieveProductResponse;
    initialSizeId: number;
    initialColorId: number;
}) {
    console.log({ retrievedProduct });
    const colourOptions: Options[] = retrievedProduct.options[0].values;
    const sizeOptions: Options[] = retrievedProduct.options[1].values;
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
    ) as ProductVariant; // hack

    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
        initialSelectedVariant,
    );

    useEffect(() => {
        setSelectedVariant(
            findSelectedVariant(
                selectedSizeId,
                selectedColorId,
                retrievedProduct,
            ) || initialSelectedVariant, // hacky fix for when the new selected variant is not in the list
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

    const productType = retrievedProduct.tags[1];
    console.log(productType);

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
                    sizes={sizeOptions}
                    colours={colourOptions}
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
                        fetch("/checkout", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                productId: retrievedProduct.id,
                                productType: productType,
                                order_title: retrievedProduct.title,
                                order_variant_label: selectedVariant.title,
                                orderVariantId: selectedVariant.id,
                                order_preview: retrievedProduct.images[0].src,
                            }),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                window.location.href = data.url;
                            });
                    }}
                    className="focus:shadow-outline flex w-2/3 flex-row self-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
                >
                    <p>Buy now for £{T_SHIRT_PRICE_IN_GBP}</p>
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
    return retrievedProduct.variants.find(
        (variant) =>
            variant.options[0] == Number(colorId) &&
            variant.options[1] == Number(sizeId),
    );
}
