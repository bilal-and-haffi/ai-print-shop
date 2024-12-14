import { SomethingWrongButton } from "@/components/buttons/SomethingWrongButton";
import { ImageGenerationForm } from "@/components/ImageGenerationForm";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";

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

    return (
        <div className="flex w-full flex-col gap-4 md:w-2/3">
            <ImageGenerationForm country={country} previousPrompt={prompt} />
            <SomethingWrongButton />
        </div>
    );
}
