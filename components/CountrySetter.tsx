"use client";
import { getCountryFromIpAddress } from "@/lib/country/getCountryFromIpAddress";
import { useEffect, useState } from "react";
import { setNewSearchParamsAndPushRoute } from "./product/setNewSearchParamsAndPushRoute";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function CountrySetter() {
    const [countryCode, setCountryCode] = useState();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const fetchAndSetCountryCode = async () => {
            const country = await getCountryFromIpAddress();
            setCountryCode(country);
            console.log({ msg: "Setting countryCode", country });
        };
        fetchAndSetCountryCode();
    }, []);

    if (countryCode) {
        setNewSearchParamsAndPushRoute({
            name: "country",
            value: countryCode,
            pathname,
            router,
            searchParams,
        });
    }

    return <>Fetching country...</>;
}
