import { Button } from "@/components/ui/button";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import Link from "next/link";
import Image from "next/image";

export default async function ConfirmPage({
    params: { printifyImageId },
    searchParams: { url, country },
}: {
    params: { printifyImageId: string };
    searchParams: {
        country: CountryCode;
        url: string;
    };
}) {
    return (
        <div className="flex flex-col items-center gap-4">
            <Image
                src={url}
                alt={"Generated Image"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized
                width={500}
                height={500}
            />
            <Link
                className="w-full md:w-3/5"
                href={`/product/${printifyImageId}?country=${country}`}
            >
                <Button className="w-full">Go to product</Button>
            </Link>
            <Link
                className="w-full md:w-3/5"
                href={`/image/confirm/${printifyImageId}/removeBackground?url=${encodeURIComponent(url)}&country=${country}`}
            >
                <Button className="w-full" variant={"secondary"}>
                    Remove background
                </Button>
            </Link>
        </div>
    );
}
