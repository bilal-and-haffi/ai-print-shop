import { Button } from "@/components/ui/button";
import { SmallLoadingSpinner } from "./SmallLoadingSpinner";

export const ButtonLoadingSpinner = ({ className }: { className?: string }) => (
    <Button>
        <SmallLoadingSpinner className={className} />
    </Button>
);
