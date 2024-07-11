import { generateOpenAiImageUrls } from "./generateOpenAiImageUrl";

describe("generateOpenAiImageUrls", () => {
    // test to ensure that the test prompts work as expected too
    it("returns 2 image urls when it is passed 2 images with the test prompt", async () => {
        const urls = await generateOpenAiImageUrls({
            prompt: "test prompt",
            numberOfImages: 2,
            style: "vivid",
        });
        expect(urls.length).toBe(2);
    });

    // skipped because uses real images and don't want the costs
    it.skip("returns 2 image urls when it is passed 2 images", async () => {
        const urls = await generateOpenAiImageUrls({
            prompt: "flying fish",
            numberOfImages: 2,
            style: "vivid",
        });
        expect(urls.length).toBe(2);
    }, 30000);
});
