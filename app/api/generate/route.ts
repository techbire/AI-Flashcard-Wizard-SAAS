import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Simple rate limiting
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 2 // Limit to 2 requests per minute

function isRateLimited(clientIP: string): boolean {
  const now = Date.now()
  const clientRequests = rateLimitMap.get(clientIP) || []
  
  // Remove old requests outside the window
  const recentRequests = clientRequests.filter((timestamp: number) => now - timestamp < RATE_LIMIT_WINDOW)
  
  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }
  
  // Add current request
  recentRequests.push(now)
  rateLimitMap.set(clientIP, recentRequests)
  
  return false
}

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:
1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
11. Only generate 10 flashcards.
You should return in the following JSON format:
{
  "flashcards": [
    {
      "front": "str",
      "back": "str"
    }
  ]
}
`

async function generateFlashcards(prompt: string) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('Missing GEMINI_API_KEY environment variable');
            throw new Error('API key is not configured. Please check server configuration.');
        }

        console.log('Generating flashcards for prompt:', prompt.substring(0, 100) + '...');

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const fullPrompt = `${systemPrompt}\n\nNow create flashcards for this content:\n\n${prompt}`;
        
        // Add a small delay to help with rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const result = await model.generateContent(fullPrompt);
        const text = await result.response.text();

        console.log('Raw API Response:', text);

        // Clean the response text by removing markdown formatting
        let cleanedText = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        
        // If the response doesn't start with {, try to find the JSON part
        const jsonStart = cleanedText.indexOf('{');
        const jsonEnd = cleanedText.lastIndexOf('}') + 1;
        
        if (jsonStart !== -1 && jsonEnd > jsonStart) {
            cleanedText = cleanedText.substring(jsonStart, jsonEnd);
        }

        console.log('Cleaned text:', cleanedText);

        const flashcards = JSON.parse(cleanedText);

        // Validate the response structure
        if (!flashcards.flashcards || !Array.isArray(flashcards.flashcards)) {
            console.error('Invalid response format from AI:', flashcards);
            throw new Error('AI returned invalid response format');
        }

        // Ensure each flashcard has front and back properties
        const validFlashcards = flashcards.flashcards.filter((card: any) => 
            card.front && card.back && 
            typeof card.front === 'string' && 
            typeof card.back === 'string'
        );

        console.log('Generated', validFlashcards.length, 'valid flashcards');

        return { flashcards: validFlashcards };
    } catch (error) {
        console.error('Error generating flashcards:', error);
        
        // Check if it's a rate limit error
        if (error instanceof Error && error.message.includes('quota exceeded')) {
            throw new Error('API quota exceeded. Please try again in a few minutes.');
        }
        
        if (error instanceof Error && error.message.includes('429')) {
            throw new Error('Too many requests. Please wait a moment and try again.');
        }
        
        // Return fallback flashcards for other errors
        return {
            flashcards: [
                {
                    front: "Sample Question about " + prompt.substring(0, 50) + "...",
                    back: "This is a fallback flashcard. The AI service is temporarily unavailable. Please try again later."
                },
                {
                    front: "What should you do if flashcard generation fails?",
                    back: "Wait a few minutes and try again. The service may be experiencing high demand or rate limits."
                }
            ]
        };
    }
}

export async function POST(req: Request) {
    try {
        // Simple rate limiting based on a general key since we can't easily get IP in this context
        const clientKey = 'general'
        if (isRateLimited(clientKey)) {
            return NextResponse.json({ 
                error: 'Rate limit exceeded. Please wait a moment before generating more flashcards.' 
            }, { status: 429 });
        }

        const { text } = await req.json();
        
        if (!text || !text.trim()) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        const flashcards = await generateFlashcards(text);

        if (!flashcards || !flashcards.flashcards || flashcards.flashcards.length === 0) {
            return NextResponse.json({ error: 'Failed to generate flashcards' }, { status: 500 });
        }

        return NextResponse.json({ flashcards: flashcards.flashcards });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
