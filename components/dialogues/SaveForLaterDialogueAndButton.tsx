"use client";

import { Button } from "../ui/button";
import {
    DialogHeader,
    DialogFooter,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useToast } from "@/components/ui/use-toast";
import { sendEmail } from "@/lib/email/sendEmail";
import { useState } from "react";

export const BASE_PROD_URL = "https://www.ai-print-shop.com";

export function SaveForLaterDialogueAndButton({ link }: { link: string }) {
    const { toast } = useToast();
    const [emailValue, setEmailValue] = useState("");

    async function onClickSend() {
        sendEmail({
            emailAddress: emailValue,
            body: `Resume your purchase: ${BASE_PROD_URL}${link}`, // link already starts with a slash
            subject: "Resume your purchase",
        });

        toast({
            title: "Email sent :)",
            duration: 1200,
        });

        setEmailValue("");
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">Save for later</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Save for later</DialogTitle>
                    <DialogDescription>
                        We will send you an email with a link to resume your
                        purchase later.
                    </DialogDescription>
                </DialogHeader>
                <Input
                    placeholder="Email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    type="email"
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={onClickSend}>Send</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
