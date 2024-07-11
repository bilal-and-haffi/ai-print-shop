import { generateOpenAiImageUrls } from "./generateOpenAiImageUrl";

describe("generateOpenAiImageUrls", () => {
    // test to ensure that the test prompts work as expected too
    describe("with test prompt", () => {
        it("returns 2 image urls when it is passed 2 images with the test prompt", async () => {
            const urls = await generateOpenAiImageUrls({
                prompt: "test prompt",
                numberOfImages: 2,
                style: "vivid",
            });
            expect(urls.length).toBe(2);
        });
    });

    describe.skip("with real prompt and api request", () => {
        // skipped because uses real images and don't want the costs
        let urls: string[] = [];
        beforeAll(async () => {
            urls = await generateOpenAiImageUrls({
                prompt: "flying fish",
                numberOfImages: 2,
                style: "vivid",
            });
        }, 30000);

        it("returns 2 image urls when it is passed 2 images", async () => {
            expect(urls.length).toBe(2);
        });

        it("returns different urls", () => {
            const areBothUrlsTheSame = urls[0] === urls[1];
            expect(areBothUrlsTheSame).toBeFalsy();
        });
    });
});
