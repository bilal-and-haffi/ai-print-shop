import { SomethingWrongButton } from "@/components/buttons/SomethingWrongButton";
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
import Image from "next/image";

export default async function ImageConfirmPage({
    searchParams: { imageId },
}: {
    searchParams: { imageId: string };
}) {
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
                    <Button className="w-full" variant={"secondary"}>
                        Do something else
                    </Button>
                    <Button className="w-full" variant={"secondary"}>
                        Do something else else
                    </Button>
                    <SomethingWrongButton text="Give feedback" />
                    <Button className="w-full">Continue to product</Button>
                </CardFooter>
            </Card>
        </>
    );
}
