import { ExampleCard } from "../ExamplesCard";

export function ExamplesSection() {
    return (
        <div className="flex flex-col gap-8 2xl:flex-row">
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

export const examples: {
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
            "/in-this-style-anime-in-this-location-outdoors-a-ninja-making-lemonade.jpg",
        imageAlt:
            "A T shirt with a printed image of: In this style: Anime. In this location: Outdoors. A ninja making lemonade",
        printifyImageId: "66981c740068169fdbc86e96",
    },
    {
        productType: "Hoodies",
        prompt: "An astronaut playing on an old arcade game in space",
        imageSrc: "/astronaut-playing-arcade-hoodie.jpeg",
        imageAlt:
            "A hoodie with a printed image of: An astronaut playing on an old arcade game in space.",
        printifyImageId: "6697fd3381c433a6e00279b3",
    },
    {
        productType: "Mugs",
        prompt: "A child playing with fire in space in the style of photograph.",
        imageSrc:
            "/in-this-style-photograph-in-this-location-space-a-child-playing-with-fire-on-a-white-background-2.jpg",
        imageAlt:
            "A mug with a printed image of: In this style: Photograph. In this location: Space. A child playing with fire on a white background",
        printifyImageId: "669820bf5ee4247611d8757c",
    },
    {
        productType: "Many colours and sizes",
        prompt: "A person with a hoodie on programming on a laptop in pixel art.",
        imageSrc:
            "/in-this-style-pixel-art-in-this-location-indoors-a-person-coding-on-his-laptop-with-his-hoodie-up.jpg",
        imageAlt:
            "A t shirt with a printed image of: A person with a hoodie on programming on a laptop in pixel art.",
        printifyImageId: "66a58cec9c8dc8ddd562d7e9",
    },
];
