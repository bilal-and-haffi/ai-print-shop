import { mapProductDetails } from "./service";
import { fetchProductVariants } from "./fetchProductVariants";
import printCleverTShirtFixture from "../../fixtures/print-clever-t-shirt.json";

describe("fetchProductVariants", () => {
    it.skip("should return a list of variants", async () => {
        // skipped because fails on GitHub Actions
        const data = await fetchProductVariants(6, 72); // probs a flaky test because the data will change. instead probs want to test just for the products we are showing
        expect(data).toEqual(printCleverTShirtFixture.variants);
    });
});

describe("mapProductDetails", () => {
    it("should return an object with the essential product details", () => {
        const variant = printCleverTShirtFixture.variants[0];
        const data = mapProductDetails(variant as any);
        expect(data).toEqual({
            id: variant.id,
            color: variant.options.color,
            size: variant.options.size,
        });
    });
});
