import { ExampleCard } from "../ExamplesCard";

export function ExamplesSection() {
    return (
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
