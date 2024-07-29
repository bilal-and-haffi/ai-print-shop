"use client";
// must be run on client because otherwise would be giving the server ip
export async function getCountryFromIpAddress() {
    try {
        const x = await fetch("https://ipapi.co/json/", {
            cache: "force-cache",
        });
        const { country } = await x.json();

        return country;
    } catch (error) {
        // not logging because don't want to log to client
        return "GB";
    }
}
