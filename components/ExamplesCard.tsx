"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "./ui/card";
import Image from "next/image";
import { getCountryFromIpAddress } from "@/lib/country/getCountryFromIpAddress";
import { useEffect, useState } from "react";

export function ExampleCard({
    productType,
    prompt,
    imageSrc,
    imageAlt,
    printifyImageId,
}: {
    productType: string;
    prompt: string;
    imageSrc: string;
    imageAlt: string;
    printifyImageId: string;
}) {
    const [countryCode, setCountryCode] = useState();

    useEffect(() => {
        const fetchAndSetCountryCode = async () => {
            const country = await getCountryFromIpAddress();
            setCountryCode(country);
        };
        fetchAndSetCountryCode();
    }, []);
    return (
        <Card>
            <CardHeader>
                <CardTitle>{productType}</CardTitle>
                <CardDescription>User prompt: {prompt}</CardDescription>
            </CardHeader>
            <CardContent>
                <Image
                    alt={imageAlt}
                    src={imageSrc}
                    width={1000}
                    height={1000}
                    priority
                />
            </CardContent>
            <CardFooter>
                <Link
                    className="w-full"
                    href={`/product/${printifyImageId}?country=${countryCode}`}
                    target="_blank"
                >
                    <Button className="w-full" variant={"secondary"}>
                        Browse products with this image
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
