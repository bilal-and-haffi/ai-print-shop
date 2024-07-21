"use client";
// must be run on client because otherwise would be giving the server ip
export async function getCurrentIpAddressCountry() {
    try {
        const x = await fetch("https://ipapi.co/json/");
        const { country } = await x.json();

        return country;
    } catch (error) {
        console.error({ error });
        throw new Error("???");
    }
}
