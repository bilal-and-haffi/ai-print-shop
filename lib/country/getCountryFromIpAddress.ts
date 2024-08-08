"use client";
// must be run on client because otherwise would be giving the server ip
export async function getCountryFromIpAddress() {
    return "JP";
    try {
        console.log("Fetching country");
        const x = await fetch("https://ipapi.co/json/", {
            cache: "force-cache",
        });
        const { country } = await x.json();
        console.log({ msg: "Received country", country });
        return country;
    } catch (error) {
        console.error({ error, msg: "Failed to get country so returning GB" });
        return "GB";
    }
}
