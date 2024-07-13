import { ProgressBar } from "@/components/loading/ProgressBar";

export default function Loading() {
    return (
        <>
            <ProgressBar estimatedTimeInMs={2000} />
            <p>Your products are being created!</p>
        </>
    );
}
