# OpenRouter API Demo

This is a simple demo showing how to use OpenRouter API to access the Deepseek model.

## Setup

1. Register at [OpenRouter](https://openrouter.ai) and get your API key
2. Clone this repository
3. Install dependencies:
   ```
   npm install
   ```
4. Update the `.env` file with your OpenRouter API key and site information:
   ```
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   YOUR_SITE_URL=https://yourwebsite.com
   YOUR_SITE_NAME=Your Site Name
   ```
5. Run the script:
   ```
   npm start
   ```

## What's happening

The script connects to the OpenRouter API, which provides access to various AI models including Deepseek. It sends a simple prompt asking for the meaning of life and displays the model's response.
