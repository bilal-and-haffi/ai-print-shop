import { Card } from "@/components/ui/card";
import { ImageGenerationForm } from "../components/ImageGenerationForm";
import { InstructionsDialog } from "@/components/InstructionsDialog";

export default function Home() {
    return (
        <div className="flex w-full flex-col space-y-4 md:space-y-8">
            <Card className="border border-muted p-4 text-sm md:text-base">
                <p>
                    Create custom clothes with AI images, order easily and print
                    on demand!
                </p>
            </Card>

            <ImageGenerationForm />
            <InstructionsDialog />
        </div>
    );
}
