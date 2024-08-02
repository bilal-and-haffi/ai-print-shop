import { SomethingWrongButton } from "@/components/buttons/SomethingWrongButton";
import { ImageGenerationForm } from "@/components/ImageGenerationForm";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import { track } from "@vercel/analytics/server";

export default async function CreatePage({
    searchParams,
}: {
    searchParams: {
        country: CountryCode;
        prompt?: string;
    };
}) {
    const { country, prompt } = searchParams;
    console.log({ msg: "Create Page", country, prompt });
    track("Landed on create");

    return (
        <div className="flex w-full flex-col gap-4 md:w-2/3">
            <ImageGenerationForm country={country} previousPrompt={prompt} />
            <SomethingWrongButton />
        </div>
    );
}
