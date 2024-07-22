import { getUkShippingCostInCents } from "./getShippingCosts";

describe("getUkShippingCostInCents", () => {
    it("should return 349 for t shirt from t shirt and sons", async () => {
        const shippingCost = await getUkShippingCostInCents({
            blueprint_id: 145,
            print_provider_id: 6,
        });
        expect(shippingCost).toBe(349);
    });
});
