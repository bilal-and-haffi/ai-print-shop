import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
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
                </SheetHeader>
                <div className="mt-4 p-2">
                    <ul className="list-disc space-y-2 text-sm">
                        <li>Be specific about your subject and details.</li>
                        <li>Use descriptive adjectives for clarity.</li>
                        <li>Specify the desired art style or medium.</li>
                        <li>
                            Provide context with relevant background details.
                        </li>
                        <li>
                            Ensure your instructions are clear and avoid content
                            that could infringe on copyright laws.
                        </li>
                    </ul>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit" className="mt-8 w-full">
                            Close
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
