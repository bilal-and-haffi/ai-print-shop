import { stripeServerClient } from "./client";

interface checkOutSessionParams {
    referer: string;
    origin: string;
    totalStripePrice: number;
    totalShipping: number;
    orderTitle: string;
    orderVariantLabel: string;
    orderPreview: string;
    productId: string;
    productType: string;
    orderVariantId: string;
    internalOrderId: number;
    country: "US" | "GB";
}

export async function createCheckoutSession(params: checkOutSessionParams) {
    const {
        referer,
        origin,
        totalStripePrice,
        totalShipping,
        orderTitle,
        orderVariantLabel,
        orderPreview,
        productId,
        productType,
        orderVariantId,
        internalOrderId,
        country,
    } = params;

    return await stripeServerClient.checkout.sessions.create({
        customer_creation: "always",
        billing_address_collection: "required",
        shipping_address_collection: {
            allowed_countries: [country],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        currency: "gbp",
                        amount: totalShipping,
                    },
                    display_name: "Standard",
                    delivery_estimate: {
                        minimum: {
                            unit: "business_day",
                            value: 3,
                        },
                        maximum: {
                            unit: "business_day",
                            value: 5,
                        },
                    },
                },
            },
        ],
        line_items: [
            {
                price_data: {
                    currency: "gbp",
                    product_data: {
                        name: `${productType} - ${orderVariantLabel}`,
                        description: orderTitle,
                        images: [orderPreview],
                    },
                    unit_amount_decimal: totalStripePrice.toString(),
                },
                quantity: 1,
            },
        ],
        metadata: {
            productId,
            orderVariantId,
            internalOrderId: internalOrderId.toString(),
        },
        payment_intent_data: {
            metadata: {
                productId,
                orderVariantId,
                internalOrderId: internalOrderId.toString(),
            },
        },
        mode: "payment",
        success_url: `${origin}/payment/success?orderId=${internalOrderId}`,
        cancel_url: referer,
        automatic_tax: {
            enabled: true,
        },
    });
}
