import { Card } from "@/components/ui/card";
import { ImageForm } from "../components/ImageForm";

export default function Home() {
    return (
        <div className="flex w-full flex-col space-y-4 md:space-y-8">
            <Card className="p-4">
                <p>
                    Create custom clothes with AI images, order easily and print
                    on demand!
                </p>
            </Card>

            <ImageForm />
        </div>
    );
}
