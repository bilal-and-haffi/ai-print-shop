import { OpenAI } from "openai";
import * as fs from 'fs';
import { PrintifyImageResponse } from "@/interfaces/Product";

const IMAGE_PREFIX = 'data:image/png;base64,';

export async function POST(req: Request) {
    const reqJson = await req.json();
    const { text } = reqJson;

    if (!text) {
        throw new Error('Text is required');
    }

    const url = await generateImageUrl(text);

    if(!url) {
        console.error('Error generating image');
        throw new Error('Error generating image');
    }

    try {
        postImageToPrintify(url, 'generatedImage.png');
    } catch {
        console.error('Error posting the image to printify');
    }

    return Response.json(url);
}

function saveBase64AsPng(base64Data: string, filename: string): void {
    const base64Image: string = base64Data.split(';base64,').pop() || '';
    
    fs.writeFile(filename, base64Image, {encoding: 'base64'}, (err: NodeJS.ErrnoException | null) => {
        if (err) {
            console.error('Error saving the file:', err);
        } else {
            console.log('File created');
        }
    });
}

const PRINTIFY_BASE_URL = 'https://api.printify.com/v1/';

export async function postImageToPrintify(url: string, fileName: string): Promise<PrintifyImageResponse> {
    const imageRequest = {
        file_name: fileName,
        url: url
    };
    const imageRequestString = JSON.stringify(imageRequest);
    const imageResponse = await fetch(`${PRINTIFY_BASE_URL}/uploads/images.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`
        },
        body: imageRequestString 
    })

    const imageData: PrintifyImageResponse = await imageResponse.json();
    
    console.info({ imageRequest, imageRequestString, imageData })
    
    return imageData;
}

const generateImageUrl = async (prompt: string) => {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.error('API key not found. Please set the OPENAI_API_KEY in your .env file.');
            return;
        }

        const openai = new OpenAI({apiKey});

        const response = await openai.images.generate({
            prompt,
            n: 1, 
            response_format: 'url',
            style: 'natural'
        });

        const url = response.data[0].url!;

        return url;
    } catch (error) {
        console.error('Error generating image:', error);
        throw new Error('Error generating image');
    }
};