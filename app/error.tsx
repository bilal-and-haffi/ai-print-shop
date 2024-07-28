"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

export default function ErrorPage() {
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
            <CardFooter>
                <Link href="/support" className="w-full">
                    <Button variant={"secondary"} className="w-full">
                        Tell us what happened
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
