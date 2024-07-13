import { ProgressBar } from "@/components/ProgressBar";

export default function Loading() {
    return (
        <>
            <p>Please wait</p>
            <ProgressBar estimatedTimeInMs={10000} />
            <p>Your image is being generated</p>
            {/* Add which model they are using */}
        </>
    );
}
