import { RetrieveProductResponse } from "@/interfaces/PrintifyTypes";
import Image from 'next/image'

export function Product(props: {retrievedProduct: RetrieveProductResponse}) {
    return (
        <div>
            <p>{props.retrievedProduct.title}</p>
            <p>{props.retrievedProduct.description}</p>
            <p>Price: £{props.retrievedProduct.variants[0].price}</p>
            <div id="image-container" className="space-y-4">
                {props.retrievedProduct.images.map((image, index) => {
                    return <Image key={index} src={image.src} alt="Product Image" width={300} height={300} />
                })}
            </div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Buy Now!</button>
        </div>
    )
}