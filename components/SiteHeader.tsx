import Link from "next/link";
import { TipsSheet } from "./TipsSheet";
import { Separator } from "@/components/ui/separator";
import { Bot, MessageSquareMore } from "lucide-react";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full  border-b-white bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex max-w-screen-md items-center justify-between p-4 align-middle md:p-0 md:py-4">
                <Link className="hover:text-zinc-200" href="/support">
                    <MessageSquareMore />
                </Link>
                <Link className="flex space-x-2" href="/">
                    <span className="font-bold">AI Print Shop</span>
                </Link>
                <TipsSheet />
            </div>
            <Separator />
        </header>
    );
}
