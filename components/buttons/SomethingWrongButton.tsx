import Link from "next/link";
import { Button } from "../ui/button";

export function SomethingWrongButton({
    text = "Something Wrong?",
}: {
    text?: string;
}) {
    return (
        <Link href="/support" className="w-full">
            <Button variant={"secondary"} className="w-full">
                {text}
            </Button>
        </Link>
    );
}
