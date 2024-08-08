"use client";

import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setNewSearchParamsAndPushRoute } from "../product/setNewSearchParamsAndPushRoute";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import { SomethingWrongButton } from "../buttons/SomethingWrongButton";

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
                <CardTitle>Select your country</CardTitle>
                <CardDescription>
                    We need this to select the appropriate suppliers. If your
                    country is not listed feel free to browse the US or GB site.
                    Any products you create will be available to be order once
                    we add your country.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Button onClick={() => onClick("GB")}>GB</Button>
                <Button onClick={() => onClick("US")}>US</Button>
                <SomethingWrongButton text="Request your country" />
            </CardContent>
        </Card>
    );
}
