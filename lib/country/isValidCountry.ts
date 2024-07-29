export function isValidCountry(country: string) {
    return ["GB", "US"].some((validCountry) => validCountry === country);
}
