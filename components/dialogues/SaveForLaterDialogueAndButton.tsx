import { z } from "zod";
import { Button } from "../ui/button";
import {
    DialogHeader,
    DialogFooter,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

export function SaveForLaterDialogueAndButton() {
    const formSchema = z.object({
        email: z.string().email().optional(),
    });
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">Save for later</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Save for later</DialogTitle>
                    <DialogDescription>
                        We can send you an email with a link to resume your
                        purchase later
                    </DialogDescription>
                </DialogHeader>
                <Input placeholder="Email" />
                <DialogFooter>
                    <Button
                        onClick={() => {
                            throw new Error("Send Email!");
                        }}
                    >
                        Send
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
