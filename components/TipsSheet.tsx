import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export function TipsSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <p className="hover:cursor-pointer hover:text-zinc-200">Tips</p>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Tips for generating images</SheetTitle>
                    <SheetDescription>
                        Learn how to generate creative images with the best
                        quality.
                    </SheetDescription>
                </SheetHeader>
                <div className="p-2">
                    <ul className="list-disc space-y-2">
                        <li>
                            Use genAI model such as ChatGPT to curate prompts
                            for image creation.
                        </li>
                    </ul>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
