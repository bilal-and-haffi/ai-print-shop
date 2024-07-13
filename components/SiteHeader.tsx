import Link from "next/link";

import { MainNav } from "@/components/MainNav";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <Link href="/" className="absolute hidden md:block">
                    <span className="inline-block font-bold">
                        AI Print Shop
                    </span>
                </Link>
                <MainNav />
            </div>
        </header>
    );
}
