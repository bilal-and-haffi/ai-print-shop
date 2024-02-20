'use client'
import { ChangeEvent, useState, KeyboardEvent, useRef } from "react";
import Image from 'next/image'
import { Product } from "./components/Product";
import { RetrieveProductResponse } from "@/interfaces/PrintifyTypes";
import { useRouter } from "next/navigation";

export default function Home() {
    const [prompt, setPrompt] = useState<string>("")
    const [image, setImage] = useState<string | undefined>(undefined)
    const [retrievedProduct, setRetrievedProduct] = useState<RetrieveProductResponse | undefined>(undefined)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const router = useRouter()
    const onInputChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value)
    } 

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            submitGenerateText();
            textAreaRef.current?.blur()
        }
    }

    const onGenerateButtonChange = () => {
        submitGenerateText();
    }

    const submitGenerateText = async () => {
        const response = await postToGenerateImage()
        const { url: imageUrl, productId} = await response.json()
        console.log({imageUrl, productId})
        setImage(imageUrl);
        router.push(`/product/${productId}`)
    }

    async function postToGenerateImage() {
        return await fetch('/api/generateImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: prompt })
        })
    }

    return (
        <>
            <div id="heading">
                <h1 className="text-2xl font-bold">AI Personalised Gift Shop</h1>
            </div>
            <div className="flex flex-col space-y-4 w-5/6" id="form-container">
                <label htmlFor="prompt" className="text-lg">Enter your prompt</label>
                <textarea ref={textAreaRef} placeholder="Enter your promt here!" value={prompt} onChange={onInputChanged} className="text-black rounded-lg p-2 resize-none h-96" onKeyDown={onKeyDown} autoFocus/>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={onGenerateButtonChange}>Generate</button>
            </div>
            {image ? <Image src={image} alt="Generated Image" width={300} height={300} />: <Image src={'/hoodie.svg'} alt="Hoodie" width={100} height={100} priority={true} />}
        </>
    );
}