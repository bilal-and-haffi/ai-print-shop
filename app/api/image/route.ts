import { OpenAI } from "openai";

export async function POST(req: Request) {
  const reqJson = await req.json();
  const { text } = reqJson;

  if (!text) {
    throw new Error('Text is required');
  }

  return Response.json(await generateImage(text));
  }

// Function to call OpenAI API using OpenAI npm package
const generateImage = async (text: string) => {
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
        prompt: text,
        n: 1 // Number of images to generate
      });
  
      // Log image URL
      const imageUrl = response.data[0].url;
      return imageUrl;
    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error('Error generating image');
    }
  };