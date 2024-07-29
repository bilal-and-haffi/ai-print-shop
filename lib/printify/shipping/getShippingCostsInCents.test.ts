import { getShippingCostInCents } from "./getShippingCostsInCents";

describe("getUkShippingCostInCents", () => {
    it("should return 349 for t shirt from t shirt and sons", async () => {
        const shippingCost = await getShippingCostInCents({
            blueprint_id: 145,
            print_provider_id: 6,
            deliveryCountry: "GB",
        });
        expect(shippingCost).toBe(349);
    });

    it("should return value for us print provider delivering to US", async () => {
        const shippingCost = await getShippingCostInCents({
            blueprint_id: 145,
            print_provider_id: 29,
            deliveryCountry: "US",
        });
        expect(shippingCost).toBe(475);
    });
});
