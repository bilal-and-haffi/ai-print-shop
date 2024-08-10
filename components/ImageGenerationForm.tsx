"use client";
import { ChangeEvent, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { envClient } from "@/lib/env/client";
import { PromptConfirmationDialog } from "./PromptConfirmationDialog";
import { SelectFormField } from "./form/SelectFormField";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { sample } from "lodash";
import { track } from "@vercel/analytics";
import { checkPromptForIssues } from "@/lib/openai/copyrightCheck";

const styleOptions = [
    "None",
    "Anime",
    "Cartoon",
    "Futuristic",
    "Photograph",
    "Pixel Art",
] as const;

const locationOptions = [
    "None",
    "Dessert",
    "Indoors",
    "Mars",
    "Outdoors",
    "Rural",
    "Space",
    "Underwater",
    "Urban",
] as const;

const FormSchema = z.object({
    style: z.enum(styleOptions),
    locationOptions: z.enum(locationOptions),
});

export function ImageGenerationForm({
    country,
    previousPrompt,
}: {
    country: CountryCode;
    previousPrompt?: string;
}) {
    const initalPrompt =
        previousPrompt ??
        (envClient.NEXT_PUBLIC_ENV === "development" ? "test prompt" : "");
    const [promptValue, setPromptValue] = useState<string>(initalPrompt);

    const [showConfirmationDialog, setShowConfirmationDialog] =
        useState<boolean>(false);
    const [alertReason, setAlertReason] = useState<string>("");

    const [style, setStyle] = useState<string>(styleOptions[0]);
    const [location, setLocation] = useState<string>(locationOptions[0]);

    const formFields = [
        {
            name: "Style",
            options: styleOptions,
            set: setStyle,
            value: style,
        },
        {
            name: "Location",
            options: locationOptions,
            set: setLocation,
            value: location,
        },
    ];

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

    const continueToNextStep = () => {
        router.push(
            `/image/${promptValue}?&style=${style}&location=${location}&country=${country}`,
        );
    };

    const generateImage = async () => {
        track("Generated Image");
        if (promptValue.trim() === "") return;

        const response = await checkPromptForIssues(promptValue);

        if (response === "NO") {
            continueToNextStep();
        } else {
            // response = "YES,8 - Reasoning...."
            const parsedReason = response.split("- ")[1];
            setAlertReason(parsedReason);
            setShowConfirmationDialog(true);
        }
    };

    const onInputChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPromptValue(e.target.value);
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function getRandomPrompt(): string {
        return sample(examplPrompts) ?? examplPrompts[0];
    }

    function randomisePrompt(): void {
        const randomPrompt = getRandomPrompt();
        setPromptValue(randomPrompt);
        track("Randomise Prompt");
    }

    return (
        <div className="flex w-full flex-col gap-4">
            {showConfirmationDialog && (
                <PromptConfirmationDialog
                    showConfirmationDialog={showConfirmationDialog}
                    setShowConfirmationDialog={setShowConfirmationDialog}
                    continueToNextStep={continueToNextStep}
                    alertReason={alertReason}
                />
            )}
            <h1 className="text-2xl">Enter your image prompt</h1>
            <Textarea
                ref={textAreaRef}
                placeholder="Example: An astronaut playing on an old arcade machine."
                value={promptValue}
                onChange={onInputChanged}
                className="h-96 resize-none rounded-lg"
                autoFocus
            />

            <Dialog>
                <DialogTrigger asChild className="w-full">
                    <Button
                        data-testid="Generate Image Button"
                        disabled={!promptValue}
                    >
                        Generate Image
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Additional details</DialogTitle>
                        <DialogDescription>
                            Optional details to help produce the best image
                            possible!
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        {formFields.map((x) => {
                            const { name, options, set, value } = x;
                            return (
                                <SelectFormField
                                    key={x.name}
                                    form={form}
                                    setFieldValue={set}
                                    options={options as unknown as string[]}
                                    name={name}
                                    value={value}
                                />
                            );
                        })}
                    </Form>
                    <Button
                        className="w-full"
                        onClick={generateImage}
                        data-testid="Continue Button"
                        disabled={!promptValue}
                    >
                        Continue
                    </Button>
                </DialogContent>
            </Dialog>

            <Button
                className="w-full"
                onClick={randomisePrompt}
                data-testid="Randomise"
                variant={"secondary"}
            >
                Randomise
            </Button>
        </div>
    );
}

const examplPrompts = [
    "Intricate and vibrant psychedelic mandala with neon pink, electric blue, and bright yellow, featuring swirling fractal designs and geometric patterns on a dark background",
    "Vintage 80s retro wave sunset with neon-colored palm trees, a glowing grid-patterned ground, and a radiant sun setting over a serene ocean horizon with a gradient sky",
    "Adorable cartoon animals playing musical instruments in a lively outdoor concert, featuring a bear on drums, a rabbit with a guitar, and a fox with a saxophone, with a cheering crowd and forest backdrop",
    "Surreal cosmic landscape with ringed planets, swirling galaxies, colorful nebulae, and shooting stars across a dark, star-filled sky",
    "Bold and dynamic abstract watercolor splashes with bright colors, blending seamlessly with soft gradients and gold accents on a white background",
    "Inspirational quote in elegant calligraphy, surrounded by delicate roses and vines in pastel colors, with a soft watercolor background of clouds",
    "Stylized Japanese wave pattern with traditional Hokusai-style details, koi fish swimming, and cherry blossoms floating on the water with a serene mountain backdrop",
    "Steampunk mechanical heart with intricate gears and cogs, metallic textures, a vintage bronze color palette, and steam effects, set against a Victorian industrial background",
    "Minimalist line art of mountain ranges and forests, with clean lines, subtle shading in monochrome, and a rising sun in the background with birds flying",
    "Majestic fantasy dragon with detailed scales, fiery breath, a dark mystical background, swirling smoke, glowing embers, and sharp claws",
    "Dynamic anime character in an action pose with a glowing sword, wearing futuristic armor and set against a vibrant neon cityscape at night with flying vehicles",
    "Pixel art of a bustling cityscape at night with detailed neon signs, tiny animated characters walking along the streets, and moving vehicles under a starry sky",
    "Photograph of a roaring lion with a dramatic background, capturing the intensity and power of the animal in its natural savannah habitat with acacia trees",
    "Cute anime-style cat with a bowtie and glasses, sitting in a playful pose with sparkling eyes and a pastel-colored, whimsical background with floating hearts",
    "Retro pixel art of a classic arcade game screen, featuring pixelated characters, obstacles, a high score counter, and vibrant colors with a retro arcade cabinet border",
    "Photograph of a vintage car on a deserted highway at sunset, with dramatic lighting, a wide-open landscape, and a nostalgic atmosphere",
    "Watercolor painting of a serene beach with palm trees, gentle waves, a clear blue sky, soft sand, and a distant sailboat on the horizon",
    "Anime girl with colorful hair and big expressive eyes, wearing a stylish outfit and standing in a whimsical background filled with stars and sparkles",
    "Pixel art of a fantasy RPG character with a sword and shield, standing in a detailed medieval village with lush environment and a castle in the background",
    "Photograph of a majestic eagle soaring in the sky, capturing the bird in mid-flight with its wings spread wide against a dramatic sky with clouds",
    "Illustration of a jazz band with lively musicians playing a saxophone, trumpet, and piano, set in a colorful, dynamic scene with musical notes swirling around and a cityscape in the background",
    "Pixel art of a cozy café with detailed tables, chairs, and a barista behind the counter, featuring people sipping coffee and a warm ambiance with a city street outside the windows",
    "Photograph of a classic motorcycle parked by the ocean, with waves crashing, a clear sky, and a vintage coastal road backdrop",
    "Anime boy with a cool futuristic outfit and gadgets, standing in a high-tech city with glowing lights and advanced technology",
    "Pixel art of a medieval castle with knights and dragons, featuring detailed brickwork, banners, a moat, and a bustling courtyard",
    "Photograph of a beautiful butterfly on a vibrant flower, capturing the delicate wings, bright colors, and a detailed close-up in a natural background",
    "Modern and minimalist abstract geometric shapes with clean lines, bold colors, overlapping forms, and a dynamic composition",
    "Illustration of an astronaut floating in space with a starry background, featuring a detailed spacesuit and the Earth in the distance",
    "Pixel art of colorful tropical fish swimming in a coral reef, with detailed coral, seaweed, bubbles, and a vibrant underwater scene",
    "Photograph of a vintage typewriter with a sheet of paper, set on a rustic wooden table against an old-fashioned backdrop with sepia tones",
    "Anime couple sharing an umbrella in the rain, with detailed raindrops, reflective puddles, a romantic atmosphere, and a cityscape background",
    "Pixel art of a retro video game console and controllers, featuring detailed buttons, wires, and a pixelated game screen",
    "Photograph of a serene forest with sun rays filtering through the trees, capturing the tranquil atmosphere and natural beauty",
    "Cute cartoon dog wearing a superhero cape and mask, standing in a heroic pose with a cityscape in the background",
    "Illustration of a magical unicorn with a rainbow mane, set against a fantasy landscape with sparkling stars and a glowing moon",
    "Pixel art of a bustling market street with various stalls, featuring detailed vendor stands, customers, and colorful products",
    "Photograph of a powerful storm with lightning striking, capturing the dramatic clouds and intense atmosphere",
    "Anime-style dragon with detailed scales and fiery breath, set against a dark, mystical background with swirling smoke and glowing embers",
    "Pixel art of a quaint village with cottages and gardens, featuring detailed thatched roofs, colorful flowers, and cobblestone paths",
    "Photograph of a grand piano in a dimly lit room, capturing the elegant lines, polished wood, and a soft, moody ambiance",
    "Dynamic abstract painting of swirling colors and shapes, featuring energetic brush strokes and a vibrant color palette",
    "Illustration of a pirate ship sailing through rough seas, with detailed sails, crashing waves, and a dramatic stormy sky",
    "Pixel art of a futuristic city with flying cars and skyscrapers, featuring detailed buildings, bright lights, and advanced technology",
    "Photograph of a snowy mountain peak at sunrise, capturing the serene beauty, soft colors, and the early morning light",
    "Anime character with robotic enhancements and futuristic armor, standing in a high-tech city with glowing neon lights",
    "Pixel art of a cozy library with bookshelves and reading nooks, featuring detailed books, warm lighting, and comfortable chairs",
    "Photograph of a sleek sports car on a racetrack, capturing the speed, motion blur, and aerodynamic design of the vehicle",
    "Illustration of a whimsical treehouse in a magical forest, featuring detailed trees, hanging lanterns, and a cozy atmosphere",
    "Pixel art of a serene lake with ducks and lily pads, featuring detailed water reflections, plants, and animated wildlife",
    "Retro arcade scene with neon colors, featuring pixelated characters and geometric patterns on a black background",
    "Abstract geometric shapes in vibrant colors, forming a modern, eye-catching design on a white background",
    "Vintage floral pattern with peace symbols, using earthy tones and psychedelic swirls on a soft fabric texture",
    "Minimalist mountain landscape at sunset with clean lines and a pastel color palette with birds flying",
    "Surreal underwater world with fantastical sea creatures and coral reefs in vivid colors, with shafts of sunlight piercing the water",
    "Bold typography design with a motivational quote, using contrasting fonts and colors, set against a minimalist background",
    "Cyberpunk cityscape at night, with neon lights and futuristic buildings, featuring flying cars and holographic advertisements",
    "Anime-style original character with detailed costume and dynamic pose, set against a vibrant background with cherry blossoms",
    "Retro pop culture-inspired collage, featuring music and TV references from the past, set against a vibrant neon grid background",
    "Pixel art fantasy scene with knights and mythical creatures in a pixelated medieval setting with a castle in the background",
    "Steampunk-inspired mechanical octopus with gears and cogs, in a sepia tone, set against a Victorian underwater background",
    "Photorealistic tiger in mid-roar, with detailed fur and intense eyes, set against a lush jungle background",
    "Abstract art inspired by nature, with leaves and flowers in bold, abstract forms on a textured canvas background",
    "Vintage racing scene, with classic cars and retro typography, set on a scenic country road",
    "Cute cartoon animals in a whimsical forest setting, using bright, cheerful colors with a rainbow and sun in the background",
    "Detailed guitar illustration with musical notes and a grunge texture background, set against a stage with spotlights",
    "Fantasy dragon flying over a castle, with detailed scales and fiery breath, set against a stormy sky",
    "Y2K-inspired design with metallic elements, bright neon colors, and early 2000s motifs, set against a digital matrix background",
    "Photorealistic wolf howling at the moon, with detailed fur and night sky with stars",
    "Retro sci-fi robot with a vintage design, set against a futuristic cityscape with flying vehicles",
    "Elegant peacock with fully spread feathers, in a detailed, vibrant illustration with a tropical background",
    "Graffiti-style street art design with bold colors and urban elements, set on a brick wall background",
    "Cute anime chibi characters in a playful, dynamic scene with a colorful park background",
    "Pixel art beach scene with a sunset and pixelated palm trees, set against a vibrant ocean background",
    "Bold abstract painting with bright, contrasting colors and dynamic brushstrokes, set against a white canvas",
    "Realistic lion portrait with a regal expression and detailed mane.",
    "Vintage motorcycle with retro typography and a grunge texture background.",
    "Futuristic spaceship flying through a neon-lit space scene.",
    "Fantasy elf warrior in a detailed costume, set against a magical forest background.",
    "Photorealistic eagle in mid-flight, with detailed feathers and a sharp gaze.",
    "Kawaii-style animals in a cute, pastel-colored design.",
    "Geometric mandala with intricate patterns and vibrant colors.",
    "Photorealistic race car with detailed design and motion blur effect.",
    "Retro cassette tape with 80s-themed typography and colors.",
    "Detailed owl illustration with intricate feather patterns.",
    "Cybernetic animal hybrid with mechanical and organic elements.",
    "Anime-style original character with long flowing hair and a dynamic background.",
    "Minimalist abstract shapes in a monochrome palette.",
    "Vintage hot air balloon with a scenic background and retro typography.",
    "Photorealistic cat portrait with detailed fur and expressive eyes.",
    "Fantasy unicorn in a magical forest, with a rainbow mane and sparkling details.",
    "Steampunk airship with gears and cogs, set against a detailed sky.",
    "Abstract watercolor painting with flowing colors and organic shapes.",
    "Retro jukebox with vibrant colors and musical notes.",
    "Realistic dolphin jumping out of the water, with detailed waves and splashes.",
    "Bold graffiti typography with an urban background.",
    "Detailed samurai warrior in traditional armor, set against a dramatic backdrop.",
    "Photorealistic butterfly on a flower, with detailed wings and vibrant colors.",
    "Anime-style fantasy scene with a hero and mythical creatures.",
];
