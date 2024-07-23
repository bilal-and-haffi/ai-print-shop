import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExampleCard } from "@/components/ExamplesCard";
import { CreateLink } from "@/components/CreateLink";

export default function Home() {
    return (
        <div className="flex w-full flex-col items-center gap-16">
            <div className="flex w-4/5 flex-col gap-16 pt-16 md:w-3/5">
                <h1 className="text-4xl md:text-5xl">
                    Create custom clothes with AI images
                </h1>

                <h2 className="text-xl text-muted-foreground">
                    Enter a prompt to generate your image. Order easily and
                    print on demand!
                </h2>

                <CreateLink />
            </div>

            <div className="flex flex-col gap-8 md:flex-row">
                {examples.map(
                    ({
                        productType,
                        prompt,
                        imageSrc,
                        imageAlt,
                        printifyImageId,
                    }) => (
                        <ExampleCard
                            productType={productType}
                            prompt={prompt}
                            imageSrc={imageSrc}
                            imageAlt={imageAlt}
                            key={imageSrc}
                            printifyImageId={printifyImageId}
                        />
                    ),
                )}
            </div>
        </div>
    );
}

const examples: {
    productType: string;
    prompt: string;
    imageSrc: string;
    imageAlt: string;
    printifyImageId: string;
}[] = [
    {
        productType: "T Shirts",
        prompt: "A ninja making lemonade outdoors, in the style of anime.",
        imageSrc:
            "in-this-style-anime-in-this-location-outdoors-a-ninja-making-lemonade.jpg",
        imageAlt:
            "A T shirt with a printed image of: In this style: Anime. In this location: Outdoors. A ninja making lemonade",
        printifyImageId: "66981c740068169fdbc86e96",
    },
    {
        productType: "Hoodies",
        prompt: "An astronaut playing on an old arcade game in space",
        imageSrc: "astronaut-playing-arcade-hoodie.jpeg",
        imageAlt:
            "A hoodie with a printed image of: An astronaut playing on an old arcade game in space.",
        printifyImageId: "6697fd3381c433a6e00279b3",
    },
];
