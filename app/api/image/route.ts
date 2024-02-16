import { OpenAI } from "openai";
import * as fs from 'fs';

const IMAGE_PREFIX = 'data:image/png;base64,';

function saveBase64AsFile(base64Data: string, filename: string): void {
    const base64Image: string = base64Data.split(';base64,').pop() || '';
    
    fs.writeFile(filename, base64Image, {encoding: 'base64'}, (err: NodeJS.ErrnoException | null) => {
        if (err) {
            console.error('Error saving the file:', err);
        } else {
            console.log('File created');
        }
    });
}

export async function POST(req: Request, res: Response) {
  const reqJson = await req.json();
  const { text } = reqJson;

  if (!text) {
    throw new Error('Text is required');
  }

  return Response.json(await generateImage(text));
  }

// Function to call OpenAI API using OpenAI npm package
const generateImage = async (prompt: string) => {
    try {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        console.error('API key not found. Please set the OPENAI_API_KEY in your .env file.');
        return;
      }
  
      // Initialize OpenAI client
      const openai = new OpenAI({apiKey});
  
      // Make API request
      const response = await openai.images.generate({
        prompt,
        n: 1, // Number of images to generate,
        response_format: 'b64_json', // Format of the response
      });

      console.log(response.data[0])
  
      // Log image URL
      const b64Json = response.data[0].b64_json!;
      const imageB64Json = IMAGE_PREFIX + b64Json;
      try {
        saveBase64AsFile(imageB64Json, 'app/api/image/generatedImage' + prompt + '.png');
      } catch (error) {
        console.error('Error saving the file:', error);
      }

      return imageB64Json;
    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error('Error generating image');
    }
  };