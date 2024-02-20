import { retrieveAProduct } from "@/app/api/generateImage/route";
import { Product } from "@/app/components/Product";

export default async function ProductPage({ params }: { params: { id: string } }) {
    const retrievedProduct = await retrieveAProduct(params.id);
    return (
        <div>
            <h1>Product Page</h1>
            <p>Product ID: {params.id}</p>
            <Product retrievedProduct={retrievedProduct} />
        </div>
    )
}