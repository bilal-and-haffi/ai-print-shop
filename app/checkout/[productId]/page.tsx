import { AddressForm } from "@/app/components/AddressForm";
import { PRINTIFY_BASE_URL } from "@/app/consts";
import { PrintifyShippingRequest, PrintifyShippingResponse } from "@/interfaces/PrintifyTypes";

export default async function Page(params: { params: { productId: string } }) {
    const {productId} = params.params;
    
    if (!productId) {
        console.error('Product ID is required', { params });
        console.error({productId})
        return <div>Product ID is required</div>;
    }

    const shippingCost: PrintifyShippingResponse = await calculateShippingCost(productId, 1);
    console.debug({shippingCost})
    
    const elements = [];
    for (const [key, value] of Object.entries(shippingCost)) {
        elements.push(<p key={key}>{capitalizeFirstLetter(key)}: {value}</p>)
    }

    return (
        <div>
            <h1 className="text-4xl">Checkout Page</h1>
            <h2 className="text-2xl">Shipping Costs</h2>
            {shippingCost && elements}
            <AddressForm productId={productId} shippingCost={shippingCost}/>
        </div>
    );
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function calculateShippingCost(productId: string, quantity: number) {
    const endpoint = `${PRINTIFY_BASE_URL}/v1/shops/${process.env.SHOP_ID}/orders/shipping.json`; 
    const body: PrintifyShippingRequest = {
        line_items: [{
            product_id: productId,
            quantity,
            variant_id: 38192
        }],
        address_to: {
            first_name: "John",
            last_name: "Smith",
            email: "example@msn.com",
            phone: "0574 69 21 90",
            country: "BE",
            region: "",
            address1: "ExampleBaan 121",
            address2: "45",
            city: "Retie",
            zip: "2470"
        }
    }
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`
        },
        body: JSON.stringify(body)
    
    }
    console.info('calculateShippingCost', { endpoint, options });
    const shippingResponse = await (await fetch(endpoint, options)).json();
    console.info('calculateShippingCost', { shippingResponse });
    return shippingResponse;
}
