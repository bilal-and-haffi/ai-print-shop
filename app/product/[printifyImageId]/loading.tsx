import { ProgressBar } from "@/components/loading/ProgressBar";

export default function Loading() {
    return (
        <>
            <p>Please wait</p>
            <ProgressBar estimatedTimeInMs={3000} />
            <p>Your products are being created!</p>
        </>
    );
}
