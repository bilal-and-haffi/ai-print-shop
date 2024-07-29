import Link from "next/link";
import { Button } from "../ui/button";

export function SomethingWrongButton() {
    return (
        <Link href="/support" className="w-full">
            <Button variant={"secondary"} className="w-full">
                Something Wrong?
            </Button>
        </Link>
    );
}
