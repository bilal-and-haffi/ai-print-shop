'use server'

import { AddressTo, LineItem, PrintifyOrderExistingProductRequest, PrintifyOrderResponse } from "@/interfaces/PrintifyTypes";
import { PRINTIFY_BASE_URL } from "./consts";
import { z } from "zod";

export async function processAddressForm(formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries())
    const { first_name, last_name, email, phone, country, region, address1, address2, city, zip } = rawFormData;
    console.info({ first_name, last_name, email, phone, country, region, address1, address2, city, zip });
    const address_to = {
        first_name,
        last_name,
        email,
        phone,
        country,
        region,
        address1,
        address2,
        city,
        zip
    }
    
    console.info({ address_to })
    const line_items: LineItem[] = [{
        product_id: 'PRODUCT_ID',
        variant_id: 38192,
        quantity: 1
    }]
    const shipping_method = 1; // make me dynamic
    createPrintifyOrderForExistingProduct(line_items, shipping_method, address_to)
}

async function createPrintifyOrderForExistingProduct(line_items: LineItem[], shipping_method: number, address_to: AddressTo) {
    const endpoint = `${PRINTIFY_BASE_URL}/v1/shops/${process.env.SHOP_ID}/orders.json`;
    const body: PrintifyOrderExistingProductRequest = {
        external_id: 'EXTERNAL_ID',
        label: 'LABEL',
        line_items,
        shipping_method,
        send_shipping_notification: true,
        address_to
    }
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`
        },
        body: JSON.stringify(body) 
    }
    console.info({ endpoint, options })
    const orderResponse = await (await fetch(endpoint, options)).json() as PrintifyOrderResponse;
    console.info({ orderResponse })
    return orderResponse.id;
}
