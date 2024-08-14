"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { track } from "@vercel/analytics";
import Link from "next/link";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    console.error({ error });
    track("Error page");

    return (
        <Card>
            <CardHeader>
                <p>Sorry, something went wrong.</p>
            </CardHeader>
            <CardContent>
                <p>Please go back and try again.</p>
                <br />
                <p>You can tell us what happened below.</p>
                <br />
                <p> This will help us solve it as soon as possible.</p>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" onClick={() => reset()}>
                    Try again
                </Button>
                <Link href="/support" className="w-full">
                    <Button variant={"secondary"} className="w-full">
                        Tell us what happened
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
