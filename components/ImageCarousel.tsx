"use client";

import { ProductImage } from "@/interfaces/PrintifyTypes";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ImageWithLoadingAndError } from "./ImageWithLoadingAndError";

export function ImagesCarousel(props: { images: ProductImage[] }) {
    const { images } = props;

    return (
        <Carousel className="flex w-full">
            <CarouselContent className="">
                {images.map((image, index) => (
                    <CarouselItem key={index}>
                        <div>
                            <Card>
                                <CardContent className="p-0">
                                    <ImageWithLoadingAndError
                                        src={image.src}
                                        width={1200}
                                        height={1200}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="invisible outline-none md:visible" />
            <CarouselNext className="invisible outline-none md:visible" />
        </Carousel>
    );
}
