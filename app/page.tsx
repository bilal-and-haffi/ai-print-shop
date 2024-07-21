import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ImageGenerationForm } from "../components/ImageGenerationForm";
import { InstructionsDialog } from "@/components/InstructionsDialog";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex w-full flex-col space-y-4 md:space-y-8">
            <Card className="border border-muted p-4 text-sm md:text-base">
                <p>
                    Create custom clothes with AI images, order easily and print
                    on demand!
                </p>
            </Card>
            {examples.map(({ productType, prompt, imageSrc, imageAlt }) => (
                <ExampleCard
                    productType={productType}
                    prompt={prompt}
                    imageSrc={imageSrc}
                    imageAlt={imageAlt}
                    key={imageSrc}
                />
            ))}

            <ImageGenerationForm />
            <InstructionsDialog />
        </div>
    );
}

const examples: {
    productType: string;
    prompt: string;
    imageSrc: string;
    imageAlt: string;
}[] = [
    {
        productType: "T shirt",
        prompt: "In this style: Anime. In this location: Outdoors. A ninja making lemonade",
        imageSrc:
            "in-this-style-anime-in-this-location-outdoors-a-ninja-making-lemonade.jpg",
        imageAlt:
            "A T shirt with a printed image of: In this style: Anime. In this location: Outdoors. A ninja making lemonade",
    },
    {
        productType: "Hoodie",
        prompt: "An astronaut playing on an old arcade game in space",
        imageSrc: "astronaut-playing-arcade-hoodie.jpeg",
        imageAlt:
            "A hoodie with a printed image of: An astronaut playing on an old arcade game in space.",
    },
];

function ExampleCard({
    productType,
    prompt,
    imageSrc,
    imageAlt,
}: {
    productType: string;
    prompt: string;
    imageSrc: string;
    imageAlt: string;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{productType}</CardTitle>
                <CardDescription>Prompt: {prompt}</CardDescription>
            </CardHeader>
            <CardContent>
                <Image
                    alt={imageAlt}
                    src={imageSrc}
                    width={1000}
                    height={1000}
                    priority
                />
            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    );
}
