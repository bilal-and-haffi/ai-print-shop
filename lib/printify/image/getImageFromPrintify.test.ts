import { getImageUrlFromPrintify } from "./getImageFromPrintify";

describe("getImageFromPrintify", () => {
    it("should return a url of the imageId it is passed", async () => {
        const url = await getImageUrlFromPrintify({
            imageId: "66bd125b46a599b685de387e",
        });
        expect(url).toBe(
            "https://pfy-prod-image-storage.s3.us-east-2.amazonaws.com/17136789/bdad5609-dfb7-4207-bf04-bd6fcc3e3fee",
        );
    });
});
