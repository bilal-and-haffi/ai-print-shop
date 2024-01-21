import { OpenAI } from "openai";
import readline from 'readline';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Configure readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt for text
const promptForText = (): Promise<string> => {
  return new Promise((resolve) => {
    rl.question('Enter text to generate image: ', (input) => {
      resolve(input);
    });
  });
};

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
    console.log('Image URL:', response.data[0].url);
    const image = response.data[0]
  } catch (error) {
    console.error('Error generating image:', error);
  }
};

// Main function
const main = async () => {
  const text = await promptForText();
  await generateImage(text);
  rl.close();
};

main();
