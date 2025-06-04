import OpenAI from 'openai';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

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

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (HTML/CSS)
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.json());

// Endpoint for chatbot messages
app.post('/chat', async (req, res) => {
  try {
    console.log("Received request:", req.body); // Log incoming request
    const openai = initializeOpenAI();
    const messages = req.body.messages;
    const response = await fetchCompletion(openai, messages);
    console.log("API response:", response); // Log API response
    res.json({ reply: response.content });
  } catch (error) {
    console.error("Error during API call:", error); // Log error details
    res.status(500).json({ error: 'Failed to fetch completion' });
  }
});

// Serve index.html explicitly for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
