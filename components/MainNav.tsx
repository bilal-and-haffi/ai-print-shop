import Link from "next/link";
import { TipsSheet } from "@/components/TipsSheet";

export function MainNav() {
    return (
        <div className="mx-auto flex gap-6 md:gap-10">
            <Link className="hover:text-zinc-200" href="/">
                Home
            </Link>
            <Link className="hover:text-zinc-200" href="/support">
                Support
            </Link>
            <TipsSheet />
        </div>
    );
}
