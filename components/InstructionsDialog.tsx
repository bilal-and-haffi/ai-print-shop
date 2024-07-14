import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function InstructionsDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Help</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Getting Started</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                    <ol className="list-decimal space-y-2 text-sm md:text-base">
                        <li>
                            Enter your idea and click &quot;Generate
                            Image&quot;.
                        </li>
                        <li>AI generates an image based on your input.</li>
                        <li>Browse products featuring your image.</li>
                        <li>Click &quot;Buy Now&quot; to purchase.</li>
                        <li>
                            Your item will be printed and shipped with free
                            delivery.
                        </li>
                    </ol>
                </div>
                <DialogFooter>
                    <Button type="submit">Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
