import { SomethingWrongButton } from "@/components/buttons/SomethingWrongButton";
import { ImageGenerationForm } from "@/components/ImageGenerationForm";
// import { InstructionsDialog } from "@/components/InstructionsDialog";
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

    return (
        <div className="flex w-full flex-col gap-4 md:w-2/3">
            <ImageGenerationForm country={country} previousPrompt={prompt} />
            {/* <InstructionsDialog /> */}
            <SomethingWrongButton />
        </div>
    );
}
