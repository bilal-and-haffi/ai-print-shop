import * as React from "react";
import { Button } from "./ui/button";

interface OrderConfirmationEmailTemplateProps {
    firstName: string;
    printifyConnectUrl: string;
}

export const OrderConfirmationEmailTemplate: React.FC<
    Readonly<OrderConfirmationEmailTemplateProps>
> = ({ firstName, printifyConnectUrl }) => (
    <div className="flex flex-col items-center space-y-5">
        <p>Hi {firstName}</p>
        <p>Your order has been confirmed 🎉🎉</p>
        <a href={printifyConnectUrl}>
            <Button>Track order</Button>
        </a>
        <a href="https://www.ai-print-shop.com/">
            <Button>Continue shopping</Button>
        </a>
    </div>
);
