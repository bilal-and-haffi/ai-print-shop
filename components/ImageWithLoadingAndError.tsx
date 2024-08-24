"use client";
import { track } from "@vercel/analytics";
import Image from "next/image";
import { useState } from "react";

export function ImageWithLoadingAndError({ src }: { src: string }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageErrored, setImageErrored] = useState(false);
    return (
        <Image
            src={src}
            alt="Product Image"
            width={1200}
            height={1200}
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
    );
}
