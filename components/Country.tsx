"use client";
import { getCurrentIpAddressCountry } from "@/lib/getCurrentIpAddressCountry";
import { useEffect, useState } from "react";

export function Country() {
    const [userCountry, setUserCountry] = useState();
    useEffect(() => {
        const x = async () => {
            const country = await getCurrentIpAddressCountry();
            console.log({ country });
            setUserCountry(country);
        };
        x();
    }, []);

    return <>{userCountry}</>;
}
