import { ImageGenerationForm } from "@/components/ImageGenerationForm";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";

export default async function CreatePage({
    searchParams,
}: {
    searchParams: {
        country: CountryCode;
    };
}) {
    const { country } = searchParams;

    return (
        <div className="flex w-full flex-col gap-4 md:w-2/3">
            <ImageGenerationForm country={country} />
        </div>
    );
}
