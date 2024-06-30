export async function getCountry(postcode: string) {
    try {
        const data = await fetch(
            `https://api.postcodes.io/postcodes/${postcode}`,
        );
        const postcodeDataJson = await data.json();
        const country = postcodeDataJson.result.country;
        return postcodeDataJson.result.country;
    } catch (error) {
        console.error("Error fetching country from postcode", error);
        return undefined;
    }
}
