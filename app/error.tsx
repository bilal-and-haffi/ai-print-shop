"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ErrorPage() {
    return (
        <Card>
            <CardContent>
                <p>Sorry, something went wrong.</p>
                <br />
                <p>Please go back and try again.</p>
                <br />
                <p>
                    Contact us at:{" "}
                    <Link href="mailto:customer-service@ai-print-shop.com">
                        customer-service@ai-print-shop.com
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
}
