import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function PromptConfirmationDialog({
    showConfirmationDialog,
    setShowConfirmationDialog,
    continueToNextStep,
    alertReason,
}: {
    showConfirmationDialog: boolean;
    setShowConfirmationDialog: (open: boolean) => void;
    continueToNextStep: () => void;
    alertReason: string;
}) {
    return (
        <AlertDialog
            open={showConfirmationDialog}
            onOpenChange={setShowConfirmationDialog}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <strong>Copyright warning:</strong> {alertReason}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                        <Button onClick={continueToNextStep}>Continue</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
