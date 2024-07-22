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
        console.error({
            error,
            msg: "Error getting current country, returning GB",
        });
        return "GB";
    }
}
