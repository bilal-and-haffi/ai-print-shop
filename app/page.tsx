'use client'
import { ChangeEvent, useState, KeyboardEvent, useEffect, useCallback } from "react";
import Image from 'next/image'
import { PrintifyProductRequest } from "@/interfaces/Product";

export default function Home() {
    const [prompt, setPrompt] = useState<string>("")
    const [image, setImage] = useState<string | undefined>(undefined)
    const onInputChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value)
    }

    useEffect(() => {
        console.info('Image changed')
        const postProduct = async () => {
            if (!image) {
                console.error('No image to post')
                throw new Error('No image to post')
            }
            const requestProduct: PrintifyProductRequest = {
                title: 'AI Generated Product',
                description: 'AI Generated Product Description',
                price: 100,
                blueprint_id: 1,
                print_provider_id: 1,
                variants: [
                    {
                        id: 1,
                        price: 100
                    }
                ],
                print_areas: [
                    {
                        variant_ids: [1],
                        placeholders: [
                            {
                                position: 'front',
                                images: [image]
                            }
                        ]
                    }
                ]
            }
            console.info({ requestProduct });
            try {
                const responseProduct = await fetch('/api/product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestProduct)
                })
                console.log({ responseProduct });
    
            } catch (error) {
                console.error({ error })
            }
        };
        (async () => {
            if (image) {
                // await postProduct();
            }
        })();
    }
    , [image])

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
        const data = await response.json()
        setImage(data);
    }
    

    async function fetchShop() {
        const res = await fetch('/api/shop')
        const data = await res.json()
        console.log({ data })
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-48 text-xl">
            <h1 className="text-4xl font-bold">AI Personalised Gift Shop</h1>
            <p className="text-xl">Hoodies, T-shirts, Mugs, and more!</p>
            <Image src={'/hoodie.svg'} alt="Hoodie" width={200} height={200} priority={true} />
            <textarea placeholder="Enter your promt here!" value={prompt} onChange={onInputChanged} className="text-black rounded-2xl p-8" onKeyDown={onKeyDown} />
            <button className='border-2 p-2 m-2' onClick={onGenerateButtonChange}>Generate</button>
            {image ? <Image src={image} alt="Generated Image" width={300} height={300} /> : <span> No image Yet </span>}
        </main>
    );
}
