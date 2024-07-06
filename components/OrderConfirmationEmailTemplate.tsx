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
        <p>Hi {firstName},</p>
        <p>Your order has been confirmed!</p>
        <p>
            <a href={printifyConnectUrl}>
                <Button>Track order</Button>
            </a>
        </p>
        <p>
            <a href="https://www.ai-print-shop.com/">
                <Button>Continue shopping</Button>
            </a>
        </p>
        <p>
            Contact us at{": "}
            <a href="mailto:ai-print-shop@mail.com">
                <Button>ai-print-shop@mail.com</Button>
            </a>
        </p>
    </div>
);
