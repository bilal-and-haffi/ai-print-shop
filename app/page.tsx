import { TextAreaAndButton } from "../components/TextAreaAndButton";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <p>Create custom clothes with AI generated Images!</p>
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
