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
                <Link href="mailto:ai-print-shop@mail.com">
                    ai-print-shop@mail.com
                </Link>
            </p>
        </div>
    );
}
