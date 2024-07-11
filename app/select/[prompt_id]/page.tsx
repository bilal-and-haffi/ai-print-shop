import { getAllImageUrlsForPromptId } from "@/db/image";
import { postImageToPrintify } from "@/lib/printify/postImageToPrintify";
import Image from "next/image";

export const maxDuration = 300;

export default async function GenerateImagePage(params: {
    params: { prompt_id: number };
}) {
    const { prompt_id } = params.params;

    if (!prompt_id) {
        console.error("prompt_id is required", { params });
        console.error({ prompt_id });
        return <div>promptId is required</div>;
    }

    const urls = await getAllImageUrlsForPromptId(prompt_id);

    const selectedUrl = ""; // to be set still

    // const { id: printifyImageId } = await postImageToPrintify(
    //     selectedUrl,
    //     "generatedImage.png",
    // );

    // redirect(`/product/${printifyImageId}`, RedirectType.replace);

    return (
        <>
            {urls.map((url) => (
                <Image src={url} alt="x" key={url} width={400} height={400} />
            ))}
        </>
    );
}
