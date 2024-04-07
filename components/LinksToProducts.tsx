"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const LinksToProducts = ({
    printifyImageId,
}: {
    printifyImageId: string;
}) => {
    const pathName = usePathname();

    const tShirtUrl = `/product/tshirt/${printifyImageId}`;
    const hoodieUrl = `/product/hoodie/${printifyImageId}`;
    const mugUrl = `/product/mug/${printifyImageId}`;

    return (
        <div
            id="links-to-products-container"
            className="flex w-full justify-center space-x-4"
        >
            <Link href={tShirtUrl}>
                <Button
                    className={
                        pathName === tShirtUrl ? "ring-1 ring-white" : ""
                    }
                >
                    T Shirt
                </Button>
            </Link>
            <Link href={hoodieUrl}>
                <Button
                    className={
                        pathName === hoodieUrl ? "ring-1 ring-white" : ""
                    }
                >
                    Hoodie
                </Button>
            </Link>
            <Link href={mugUrl}>
                <Button
                    className={pathName === mugUrl ? "ring-1 ring-white" : ""}
                >
                    Mug
                </Button>
            </Link>
        </div>
    );
};
