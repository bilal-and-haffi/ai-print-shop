import { ProgressBar } from "@/components/ProgressBar";

export default function Loading() {
    return (
        <>
            <p>Loading</p>
            <ProgressBar estimatedTimeInMs={2000} />
            <p>Your products are being created!</p>
        </>
    );
}
