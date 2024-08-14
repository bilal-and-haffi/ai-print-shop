"use client";
import { track } from "@vercel/analytics";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

export function ImageWithLoadingAndError({
    src,
    width,
    height,
}: {
    src: string;
    width: number;
    height: number;
}) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageErrored, setImageErrored] = useState(false);
    return (
        <div>
            {!imageLoaded && (
                <Skeleton className={`h-[${height}px] w-[${width}px]`} />
            )}

            <Image
                src={src}
                alt="Product Image"
                width={width}
                height={height}
                onLoad={() => setImageLoaded(true)}
                className={
                    imageLoaded && !imageErrored ? "rounded-lg" : "invisible"
                }
                unoptimized
                onError={(error) => {
                    console.error({
                        error,
                        msg: "Image loading error",
                    });
                    track("Image Error");
                    setImageErrored(true);
                }}
                priority
            />
        </div>
    );
}
