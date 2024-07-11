"use client";
import { postImageToPrintify } from "@/lib/printify/postImageToPrintify";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function ImageSelect({ urls }: { urls: string[] }) {
    const router = useRouter();

    const onClick = async (url: string) => {
        const { id: printifyImageId } = await postImageToPrintify(
            url,
            "generatedImage.png",
        );
        router.replace(`/product/${printifyImageId}`);
    };

    return urls.map((url) => (
        <Image
            src={url}
            alt="x"
            key={url}
            width={400}
            height={400}
            onClick={() => onClick(url)}
        />
    ));
}
