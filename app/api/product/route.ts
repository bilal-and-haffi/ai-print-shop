import { PrintifyProductRequest } from "@/interfaces/Product";

export async function POST(req: Request) {
    const productRequest: PrintifyProductRequest = await req.json();
    const productRequestString = JSON.stringify(productRequest);
    console.log({ productRequest, productRequestString });
    
    const productResponse: any = await fetch(`https://api.printify.com/v1/shops/${process.env.SHOP_ID}/products.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.PRINTIFY_API_TOKEN}`
        },
        body: productRequestString
    })
    const productData = await productResponse.json()
    console.info({ productData })
    return Response.json({ productData })   
}

