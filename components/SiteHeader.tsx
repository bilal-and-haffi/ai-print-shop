import Link from "next/link";
import { TipsSheet } from "./TipsSheet";
import { Separator } from "@/components/ui/separator";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full  border-b-white bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-12 max-w-screen-2xl items-center justify-between px-6 align-middle">
                <Link href="/">
                    <span className="font-bold">ai-print-shop</span>
                </Link>
                <div className="flex space-x-6">
                    <TipsSheet />

                    <Link className="hover:text-zinc-200" href="/support">
                        Support
                    </Link>
                </div>
            </div>
            <Separator />
        </header>
    );
}
