'use client'
import { ChangeEvent, useState, KeyboardEvent } from "react";
import Image from 'next/image'

export default function Home() {
  const [prompt, setPrompt] = useState<string>("")
  const onInputChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }

  const onGenerateButtonChange = () => {
    generateImage()
  }

  function generateImage() {
    fetch('/api/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: prompt })
    })
      .then(response => response.json())
      .then(data => {
        window.open(data, '_blank')
      })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-48 text-xl">
      <h1 className="text-4xl font-bold">AI Personalised Gift Shop</h1>
      <p className="text-xl">Hoodies, T-shirts, Mugs, and more!</p>
      <Image src={'/hoodie.svg'} alt="Hoodie" width={200} height={200} priority={true} />
      <textarea placeholder="Enter your promt here!" value={prompt} onChange={onInputChanged} className="text-black rounded-2xl p-8" />
      <button className='border-2 p-2 m-2' onClick={onGenerateButtonChange}>Generate</button>

    </main>
  );
}
