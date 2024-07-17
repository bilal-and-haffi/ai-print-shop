import Link from "next/link";
import { TipsSheet } from "./TipsSheet";
import { Separator } from "@/components/ui/separator";
import { Bot, MessageSquareMore } from "lucide-react";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full  border-b-white bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex max-w-screen-2xl items-center justify-between p-4 align-middle">
                <Link className="flex space-x-2" href="/">
                    <Bot />
                    <span>AI Print Shop</span>
                </Link>
                <div className="flex space-x-4 md:space-x-16">
                    <Link
                        className="hover:text-zinc-200 md:hidden"
                        href="/support"
                    >
                        <MessageSquareMore />
                    </Link>
                    <Link
                        className="hidden hover:text-zinc-200 md:block"
                        href="/support"
                    >
                        Support
                    </Link>

                    <TipsSheet />
                </div>
            </div>
            <Separator />
        </header>
    );
}
