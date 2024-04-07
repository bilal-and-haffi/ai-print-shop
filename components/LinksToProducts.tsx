"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LinksToProducts = ({
    printifyImageId,
}: {
    printifyImageId: string;
}) => {
    return (
        <div
            id="links-to-products-container"
            className="flex w-full justify-between"
        >
            <Link href={`/product/tshirt/${printifyImageId}`}>
                <Button>T Shirt</Button>
            </Link>
            <Link href={`/product/hoodie/${printifyImageId}`}>
                <Button>Hoodie</Button>
            </Link>
            <Link href={`/product/mug/${printifyImageId}`}>
                <Button>Mug</Button>
            </Link>
        </div>
    );
};
