import { PRINTIFY_BASE_URL } from "@/app/data/consts";
import { envServer } from "../../env/server";
import { sendAnExistingOrderToProduction } from "./sendAnExistingOrderToProduction";

describe("sendAnExistingOrderToProduction", () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({}),
        }),
    ) as jest.Mock;

    const orderId = "x";
    const endpoint = `${PRINTIFY_BASE_URL}/v1/shops/${envServer.SHOP_ID}/orders/${orderId}/send_to_production.json`;

    const envsThatShouldNotMakeFetchCall = [
        "development",
        "testing",
        "preview",
    ] as const;

    for (const env of envsThatShouldNotMakeFetchCall) {
        it(`should not make request for ${env}`, async () => {
            envServer.VERCEL_ENV = env;
            await sendAnExistingOrderToProduction(orderId);
            expect(global.fetch).not.toHaveBeenCalled();
        });
    }

    it("should make request to correct endpoint for prod", async () => {
        envServer.VERCEL_ENV = "production";
        await sendAnExistingOrderToProduction(orderId);
        expect(global.fetch).toHaveBeenCalledWith(
            endpoint,
            expect.objectContaining({ method: "POST" }),
        );
    });
});
