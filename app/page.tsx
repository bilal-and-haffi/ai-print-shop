import { Card } from "@/components/ui/card";
import { TextAreaAndButton } from "../components/TextAreaAndButton";

export default function Home() {
    return (
        <div className="flex w-full flex-col space-y-4 md:space-y-8">
            <Card className="p-4">
                <p>
                    Create personalized custom clothes with AI-generated images!
                </p>
            </Card>
            <TextAreaAndButton />
        </div>
    );
}
