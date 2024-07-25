import { addOptionsToPrompt } from "./addOptionsToPrompt";

describe("addOptionsToPrompt", () => {
    it("should return original prompt if location and style were none", () => {
        const result = addOptionsToPrompt({
            style: "None",
            location: "None",
            decodedPrompt: "Example",
        });
        expect(result).toBe("Example");
    });
});
