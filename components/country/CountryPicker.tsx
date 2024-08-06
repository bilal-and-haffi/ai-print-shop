"use client";

import Link from "next/link";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setNewSearchParamsAndPushRoute } from "../product/setNewSearchParamsAndPushRoute";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";

export function CountryPicker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const onClick = (country: CountryCode) => {
        setNewSearchParamsAndPushRoute({
            name: "country",
            value: country,
            pathname,
            router,
            searchParams,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Choose your country</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Button onClick={() => onClick("GB")}>GB</Button>
                <Button onClick={() => onClick("US")}>US</Button>
            </CardContent>
            <CardFooter className="text-center">
                Please fill out a feedback form to request more countries. Feel
                free to browse the US or GB site. Any products you create will
                be available to be order once we add your country.
            </CardFooter>
        </Card>
    );
}
