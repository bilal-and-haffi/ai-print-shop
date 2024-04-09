"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const GenerateImageLinks = ({ prompt }: { prompt: string }) => {
    return (
        <>
            <div id="linkContainer" className="w-full self-center">
                <Link href={`/`}>
                    <Button className="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none">
                        Generate new image with new prompt
                    </Button>
                </Link>
            </div>
            <div id="linkContainer" className="w-full self-center">
                <a href={`/image/${prompt}`}>
                    {/* Using <Link> instead of <a> here caused a bug where this wouldn't work for many seconds after page load. */}
                    <Button className="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none">
                        Generate new image with same prompt
                    </Button>
                </a>
            </div>
        </>
    );
};
