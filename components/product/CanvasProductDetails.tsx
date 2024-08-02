"use client";

import { Button } from "@/components/ui/button";
import {
    ProductVariant,
    RetrieveProductResponse,
} from "@/interfaces/PrintifyTypes";
import { ImagesCarousel } from "../ImageCarousel";
import { useEffect, useMemo, useState } from "react";
import { SmallLoadingSpinner } from "../loading/SmallLoadingSpinner";
import { isSellingPriceProfitable } from "../../lib/pricing/isSellingPriceProfitable";
import { Variant } from "@/interfaces/Printify/Variant";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { generateUnroundedPriceInUsd } from "@/lib/pricing/generateUnroundedPriceInUsd";
import { convertUSDToGBP } from "@/lib/currency/convertUSDToGBP";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toggleImageBackgroundButtonAction } from "@/actions/toggleImageBackgroundButtonAction";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { SomethingWrongButton } from "../buttons/SomethingWrongButton";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import { DisplayName } from "@/lib/printify/productsData";
import { track } from "@vercel/analytics";

export interface Options {
    id: number;
    title: string;
}

export function CanvasProductDetails({
    retrievedProduct,
    initialSize,
    initialColor,
    variants,
    printifyImageId,
}: {
    retrievedProduct: RetrieveProductResponse;
    initialSize: string;
    initialColor: string;
    variants: Variant[];
    printifyImageId: string;
}) {
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const { images, print_provider_id, blueprint_id } = retrievedProduct;
    const searchParams = useSearchParams();
    const country = searchParams.get("country") as CountryCode;
    const imageId = searchParams.get("imageId") as string;
    const params = useParams();
    const productType = params["productType"] as DisplayName;
    const displayName = decodeURIComponent(productType);
    const [selectedSize, setSelectedSize] = useState(initialSize);
    const [selectedColor, setSelectedColor] = useState(initialColor);
    const [sellingPriceInLocalCurrency, setSellingPriceInLocalCurrency] =
        useState<number>();

    if (!country) {
        // TODO: GET COUNTRY or ask for country
        console.error("No country");
        throw new Error("No country");
    }

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

    const pathname = usePathname();
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

    useEffect(() => {
        const handlePricing = async () => {
            const generatedUnroundedPriceInUsd =
                await generateUnroundedPriceInUsd({
                    selectedVariant: selectedProductVariant,
                    blueprint_id,
                    print_provider_id,
                    country,
                });

            const generatedUnroundedPriceInGbp = await convertUSDToGBP(
                generatedUnroundedPriceInUsd,
            );

            const sellingPriceInLocalCurrency = roundUpToNearestInteger(
                country === "GB"
                    ? generatedUnroundedPriceInGbp
                    : generatedUnroundedPriceInUsd,
            );

            setSellingPriceInLocalCurrency(sellingPriceInLocalCurrency);
        };
        handlePricing();
    }, [selectedProductVariant, country, blueprint_id, print_provider_id]);

    const onClick = async () => {
        track("Canvas porduct buy now");
        if (!sellingPriceInLocalCurrency) {
            throw new Error("No selling price");
        }
        if (
            !(await isSellingPriceProfitable({
                selectedVariant: selectedProductVariant,
                sellingPriceInLocalCurrency,
                blueprint_id,
                print_provider_id,
                country,
            }))
        ) {
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
                price: sellingPriceInLocalCurrency * 100, // 100 is weird imo
                country,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                window.location.href = data.url;
                setCheckoutLoading(false);
            });
    };

    const priceCurrencyPrefix = country === "GB" ? `£` : `$`;

    const priceString =
        priceCurrencyPrefix +
        (sellingPriceInLocalCurrency
            ? country === "GB"
                ? `${sellingPriceInLocalCurrency}`
                : `${sellingPriceInLocalCurrency}`
            : "");

    const CustommiseDialog = () => (
        <Dialog>
            <DialogTrigger asChild className="w-full">
                <Button variant={"outline"}>Customise</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader></DialogHeader>
                <Button
                    variant={"secondary"}
                    onClick={async () => {
                        await toggleImageBackgroundButtonAction({
                            currentImageId: printifyImageId,
                            country,
                            productType,
                        });
                    }}
                >
                    Toggle Image Background
                </Button>
                {["T Shirt", "Hoodie", "Baseball Tee"].some(
                    // TODO: make my dynamic
                    (p) => p === displayName,
                ) && (
                    <>
                        <a
                            href={`${pathname}?country=${country}&imageId=${imageId}`}
                            className="w-full"
                        >
                            <Button variant={"secondary"} className="w-full">
                                Position Image on Front
                            </Button>
                        </a>
                        <a
                            href={`${pathname}?position=back&country=${country}&imageId=${imageId}`}
                            className="w-full"
                        >
                            <Button variant={"secondary"} className="w-full">
                                Position Image on Back
                            </Button>
                        </a>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );

    return (
        <div className="flex w-full flex-col items-center justify-center text-center">
            {images ? (
                <ImagesCarousel images={filteredImages} />
            ) : (
                <div>Product Not Available</div>
            )}
            <div className="mt-4 flex w-full flex-col gap-2">
                <div
                    id="selectContainer"
                    className="flex justify-between gap-2"
                ></div>

                <CustommiseDialog />

                <Card>
                    <CardHeader>
                        <CardTitle>{priceString}</CardTitle>
                        <CardDescription>Free shipping</CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <div className="mt-4 flex w-full flex-col items-center gap-4">
                <Button
                    onClick={onClick}
                    className="w-full bg-blue-500 text-white hover:bg-blue-700"
                    disabled={!sellingPriceInLocalCurrency}
                >
                    {checkoutLoading ? (
                        <div className="flex flex-row items-center">
                            <SmallLoadingSpinner className="fill-white" />
                        </div>
                    ) : (
                        <>Buy now</>
                    )}
                </Button>

                <SomethingWrongButton />
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
        return variants[0];
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
function roundUpToNearestInteger(x: number) {
    return Math.ceil(x / 1) * 1;
}
