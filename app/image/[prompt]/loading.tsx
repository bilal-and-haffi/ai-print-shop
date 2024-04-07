import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function ImageLoading() {
    return (
        <>
            <p>Your image is loading</p>
            <LoadingSpinner />
            <p>It will be ready in about 10 seconds :)</p>
        </>
    );
}
