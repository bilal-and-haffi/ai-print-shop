import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { TextAreaAndButton } from "../components/TextAreaAndButton";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex w-full flex-col space-y-4 md:space-y-8">
            <Card className="p-4 text-sm">
                <p>
                    Create personalized custom clothes with AI-generated images!
                </p>
            </Card>
            <Card className="p-4 text-sm">
                <p>Easy to order, print-on-demand T-shirts and apparel.</p>
            </Card>
            <TextAreaAndButton />
        </div>
    );
}
