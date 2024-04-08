"use client";

import { Button } from "@/components/ui/button";
import { RetrieveProductResponse } from "@/interfaces/PrintifyTypes";
import Link from "next/link";
import { ImagesCarousel } from "./ImageCarousel";
import { T_SHIRT_PRICE_IN_GBP } from "@/app/data/consts";
import { SizeAndColorSelector } from "./SizeAndColorForm";
import { LinksToProducts } from "./LinksToProducts";
import Image from "next/image";

export interface Options {
    id: number;
    title: string;
}

export function ProductDetails({
    retrievedProduct,
    colorId,
    sizeId,
    printifyImageId,
}: {
    retrievedProduct: RetrieveProductResponse;
    sizeId: number;
    colorId: number;
    printifyImageId: string;
}) {
    const colourOptions: Options[] = retrievedProduct.options[0].values;
    const sizeOptions: Options[] = retrievedProduct.options[1].values;
    const variant = retrievedProduct.variants.find(
        (variant) =>
            variant.options[0] == colorId && variant.options[1] == sizeId,
    );

    if (!variant) {
        // FIXME! SHOULD NOT HAPPEN! DON'T LET CUSTOMER PICK A NON EXISTING VARIANT.
        return <div>Variant not found</div>;
    }

    const { images } = retrievedProduct;
    const filteredImages = images.filter((image) =>
        image.variant_ids.includes(variant.id),
    );

    return (
        <div className="flex w-5/6 flex-col items-center justify-center space-y-4 text-center lg:w-1/3">
            <div id="linkContainer" className="w-full self-center">
                <a href={`/image/${retrievedProduct.title}`}>
                    {/* Using <Link> instead of <a> here caused a bug where this wouldn't work for many seconds after page load. */}
                    <Button className="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none">
                        Generate new image with same prompt
                    </Button>
                </a>
            </div>

            <div id="linkContainer" className="w-full self-center">
                <Link href={`/`}>
                    <Button className="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none">
                        Generate new image with new prompt
                    </Button>
                </Link>
            </div>
            <ImagesCarousel images={filteredImages} />
            <div className="flex flex-col justify-center space-y-4">
                <span className="text-sm">{retrievedProduct.description}</span>
                <SizeAndColorSelector
                    sizes={sizeOptions}
                    colours={colourOptions}
                    sizeId={sizeId}
                    colorId={colorId}
                />
            </div>
            <LinksToProducts printifyImageId={printifyImageId} />
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
                                order_title: retrievedProduct.title,
                                order_variant_label: variant.title,
                                orderVariantId: variant.id,
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
