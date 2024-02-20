'use client'
import { RetrieveProductResponse } from "@/interfaces/PrintifyTypes";
import Image from 'next/image'

export function Product(props: {retrievedProduct: RetrieveProductResponse}) {
    return (
        <div>
            <h1>Product</h1>
            <p>{props.retrievedProduct.title}</p>
            {props.retrievedProduct.images.map((image, index) => {
                return <Image key={index} src={image.src} alt="Product Image" width={300} height={300} />
            })}
        </div>
    )
}