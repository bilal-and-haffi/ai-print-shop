'use client'
import { ChangeEvent, useState, KeyboardEvent, useEffect, useCallback } from "react";
import Image from 'next/image'
import { Product } from "./components/Product";
import { RetrieveProductResponse } from "@/interfaces/PrintifyTypes";

export default function Home() {
    const [prompt, setPrompt] = useState<string>("")
    const [image, setImage] = useState<string | undefined>(undefined)
    const [retrievedProduct, setRetrievedProduct] = useState<RetrieveProductResponse | undefined>(undefined)
    const onInputChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value)
    } 

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            submitGenerateText();
        }
    }

    const onGenerateButtonChange = () => {
        submitGenerateText();
    }

    const submitGenerateText = async () => {
        await generateAndSetImage()
    }

    async function generateAndSetImage() {
        const response = await fetch('/api/generateImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: prompt })
        })
        const { url: imageUrl, retrievedProduct} = await response.json()
        console.log({imageUrl, retrievedProduct})
        setImage(imageUrl);
        setRetrievedProduct(retrievedProduct);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-48 text-xl">
            <h1 className="text-4xl font-bold">AI Personalised Gift Shop</h1>
            <p className="text-xl">Hoodies, T-shirts, Mugs, and more!</p>
            <Image src={'/hoodie.svg'} alt="Hoodie" width={200} height={200} priority={true} />
            <textarea placeholder="Enter your promt here!" value={prompt} onChange={onInputChanged} className="text-black rounded-2xl p-8" onKeyDown={onKeyDown} />
            <button className='border-2 p-2 m-2' onClick={onGenerateButtonChange}>Generate</button>
            {image ? <Image src={image} alt="Generated Image" width={300} height={300} /> : <span> No image Yet </span>}
            {retrievedProduct ? <Product retrievedProduct={retrievedProduct} /> : <span> No product Yet </span>}
        </main>
    );
}