function getCurrencyFromCountry(country: "US" | "GB") {
    if (country === "US") {
        return "usd";
    } else if (country === "GB") {
        return "gbp";
    }
    throw new Error("No currency for country");
}
