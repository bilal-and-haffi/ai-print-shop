'use client';
import { ChangeEvent, useState, KeyboardEvent, useRef } from "react";
import { useRouter } from "next/navigation";

export function TextAreaAndButton() {
    const [prompt, setPrompt] = useState<string>("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();
    const submitGenerateText = async () => {
        router.push(`/image/${prompt}`);
    };

    const onInputChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitGenerateText();
            textAreaRef.current?.blur();
        }
    };


    return (
        <>
            <div className="flex flex-col space-y-4 w-5/6" id="form-container">
                <label htmlFor="prompt" className="text-lg">Enter your prompt</label>
                <textarea ref={textAreaRef} placeholder="Enter your promt here!" value={prompt} onChange={onInputChanged} className="text-black rounded-lg p-2 resize-none h-96" onKeyDown={onKeyDown} autoFocus />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={submitGenerateText}>Generate</button>
            </div>
        </>

    );
}
