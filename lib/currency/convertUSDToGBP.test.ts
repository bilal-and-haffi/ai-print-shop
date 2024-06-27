import { convertUSDToGBP } from "./convertUSDToGBP";

describe("convertUSDToGBP", () => {
    it("returns something abit smaller", async () => {
        const gbp = await convertUSDToGBP(10);
        expect(gbp).toBeGreaterThan(5);
        expect(gbp).toBeLessThan(10);
    });
});
