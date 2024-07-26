"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { getCountryFromIpAddress } from "@/lib/country/getCountryFromIpAddress";
import { useState, useEffect } from "react";

export function CreateLink() {
    const [countryCode, setCountryCode] = useState();

    useEffect(() => {
        const fetchAndSetCountryCode = async () => {
            const country = await getCountryFromIpAddress();
            setCountryCode(country);
        };
        fetchAndSetCountryCode();
    }, []);

    return (
        <Link href={`/create?country=${countryCode}`}>
            <Button className="w-full" disabled={!countryCode}>
                Get started
            </Button>
        </Link>
    );
}
