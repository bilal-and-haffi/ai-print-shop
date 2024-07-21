import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="flex w-full flex-col gap-8">
            <h1 className="pt-8 text-3xl md:text-4xl">
                Create custom clothes with AI images, order easily and print on
                demand!
            </h1>

            <h2 className="text-xl text-muted-foreground">
                Generate your image. See products. Order the ones you like, try
                again or save for later. Enjoy!
            </h2>

            <h2 className="text-3xl">Examples</h2>
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

            <Link href="/create">
                <Button className="w-full">Create your own</Button>
            </Link>
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
        productType: "T Shirt",
        prompt: "In this style: Anime. In this location: Outdoors. A ninja making lemonade",
        imageSrc:
            "in-this-style-anime-in-this-location-outdoors-a-ninja-making-lemonade.jpg",
        imageAlt:
            "A T shirt with a printed image of: In this style: Anime. In this location: Outdoors. A ninja making lemonade",
        printifyImageId: "66981c740068169fdbc86e96",
    },
    {
        productType: "Hoodie",
        prompt: "An astronaut playing on an old arcade game in space",
        imageSrc: "astronaut-playing-arcade-hoodie.jpeg",
        imageAlt:
            "A hoodie with a printed image of: An astronaut playing on an old arcade game in space.",
        printifyImageId: "6697fd3381c433a6e00279b3",
    },
];

function ExampleCard({
    productType,
    prompt,
    imageSrc,
    imageAlt,
    printifyImageId,
}: {
    productType: string;
    prompt: string;
    imageSrc: string;
    imageAlt: string;
    printifyImageId: string;
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
            <CardFooter>
                <Link className="w-full" href={`/product/${printifyImageId}`}>
                    <Button className="w-full" variant={"secondary"}>
                        Browse products with this image
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
