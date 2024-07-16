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
        <>
            <Card className="p-4">
                <p>Create custom clothes with AI generated Images!</p>
            </Card>
            <TextAreaAndButton />
            <Image
                src="./icon.svg"
                alt="Gifts"
                width={200}
                height={200}
                priority
            />
        </>
    );
}
