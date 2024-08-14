import { SomethingWrongButton } from "@/components/buttons/SomethingWrongButton";
import { CountryPicker } from "@/components/country/CountryPicker";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getImageUrlFromPrintify } from "@/lib/printify/image/getImageFromPrintify";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import Image from "next/image";
import Link from "next/link";

export default async function ImageConfirmPage({
    searchParams: { imageId, country },
}: {
    searchParams: { imageId: string; country: CountryCode | "undefined" };
}) {
    console.log({ country });
    if (!country || country === "undefined") {
        return <CountryPicker />;
    }
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Confirm your image</CardTitle>
                    <CardDescription>
                        Try again if you do not like it :)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Image
                        src={await getImageUrlFromPrintify({ imageId })}
                        alt={"Generated image for confirmation"}
                        width={500}
                        height={500}
                    />
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <SomethingWrongButton text="Give feedback" />
                    <Link
                        href={`/product/T%20Shirt?country=${country}&imageId=${imageId}&size=L&color=Black`}
                    ></Link>
                    <Button className="w-full">Continue to product</Button>
                </CardFooter>
            </Card>
        </>
    );
}
