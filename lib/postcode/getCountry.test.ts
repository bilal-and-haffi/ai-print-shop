import { getCountry } from "./getCountry";

describe("getCountry", () => {
    it("should return the country of the given postcode", async () => {
        expect(await getCountry("SW1A 1AA")).toEqual("England");
        expect(await getCountry("EH1 2NG")).toEqual("Scotland");
    });
});
