import { ProgressBar } from "@/components/loading/ProgressBar";

export default function Loading() {
    return (
        <>
            <p>Please wait</p>
            <ProgressBar estimatedTimeInMs={12000} />
            <p>Your image is being generated!</p>
            {/* Add which model they are using */}
        </>
    );
}
