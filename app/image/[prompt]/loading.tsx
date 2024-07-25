import { ProgressBar } from "@/components/loading/ProgressBar";
import { ExamplesSection } from "@/components/sections/ExamplesSection";

export default function Loading() {
    return (
        <>
            <p>Please wait</p>
            <ProgressBar estimatedTimeInMs={20000} />
            <p>Your image is being generated!</p>
        </>
    );
}
