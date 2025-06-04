import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Function to create default headers
function createDefaultHeaders() {
  const headers = {};
  if (process.env.YOUR_SITE_URL) {
    headers["HTTP-Referer"] = process.env.YOUR_SITE_URL;
  }
  if (process.env.YOUR_SITE_NAME) {
    headers["X-Title"] = process.env.YOUR_SITE_NAME;
  }
  return headers;
}

// Function to initialize OpenAI client
function initializeOpenAI() {
  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: createDefaultHeaders(),
  });
}

// Function to fetch completion
async function fetchCompletion(openai, messages) {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-0528:free",
      messages: messages,
    });
    return completion.choices[0].message;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Main function
async function main() {
  const openai = initializeOpenAI();
  const messages = [
    {
      "role": "user",
      "content": "What is the meaning of life?"
    }
  ];
  const response = await fetchCompletion(openai, messages);
  console.log(response);
}

main();
