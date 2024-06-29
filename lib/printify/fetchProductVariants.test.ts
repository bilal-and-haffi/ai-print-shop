import { fetchProductVariants } from "./fetchProductVariants";

describe("fetchProductVariants", () => {
    it.skip("should only return in stock products", async () => {
        expect((await fetchProductVariants(6, 72)).length).toBe(49);
    });

    it("should not include safety pink as a colour option because it is discontinued", async () => {
        const variants = await fetchProductVariants(6, 72);
        const string = JSON.stringify(variants);
        expect(string).not.toContain("Safety Pink");
    });
});
