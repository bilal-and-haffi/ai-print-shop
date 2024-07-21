import { ImageGenerationForm } from "@/components/ImageGenerationForm";
import { InstructionsDialog } from "@/components/InstructionsDialog";

export default async function CreatePage() {
    return (
        <div className="flex w-full flex-col gap-8">
            <ImageGenerationForm />
            <InstructionsDialog />
        </div>
    );
}
