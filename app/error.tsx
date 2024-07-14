"use client";

import Link from "next/link";

export default function ErrorPage() {
    return (
        <div className="text-center">
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
        </div>
    );
}
