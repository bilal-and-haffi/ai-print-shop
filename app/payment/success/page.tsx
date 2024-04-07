import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
    return (
        <div className="flex flex-col items-center space-y-5">
            <p>Your payment has been successfully processed 🎉🎉</p>
            <Link href="/">
                <Button>Continue shopping</Button>
            </Link>
        </div>
    );
}
