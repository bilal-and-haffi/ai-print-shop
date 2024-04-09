import { PageLoadingSpinner } from "@/components/PageLoadingSpinner";

export default function ImageLoading() {
    return (
        <>
            <p>Your image is loading</p>
            <PageLoadingSpinner />
            <p>It will be ready in about 10 seconds :)</p>
        </>
    );
}
