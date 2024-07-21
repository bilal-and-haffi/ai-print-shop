import { ImageGenerationForm } from "@/components/ImageGenerationForm";
import { InstructionsDialog } from "@/components/InstructionsDialog";

export default async function CreatePage() {
    return (
        <div className="flex w-full flex-col gap-4 md:w-2/3">
            <ImageGenerationForm />
            <InstructionsDialog />
        </div>
    );
}
