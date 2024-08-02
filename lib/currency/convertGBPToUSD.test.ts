import { convertGBPToUSD } from "./convertGBPToUSD";

describe("convertGBPToUSD", () => {
    it("should convert 10 pounds to around 13 dollars", async () => {
        expect(await convertGBPToUSD(10)).toBeGreaterThan(11);
        expect(await convertGBPToUSD(10)).toBeLessThan(15);
    });
});
