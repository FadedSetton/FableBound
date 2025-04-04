import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateStoryNode = async (prompt: string): Promise<string> => {
    try{
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are a fantasy RPG narrator. Respond only with the next part of the story in a narrative tone.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.9,
            max_tokens: 300,
        });

        const message = completion.choices[0].message?.content;

        if (!message) {
            console.warn('[OpenAI Warning] No content returned in message');
            return 'The narrator hesitates... and says nothing.';
        }
        return message.trim();
        }
        catch (err) {
            console.error('[OpenAI Error]', err);
            return 'An error occurred while continuing your adventure.';
     }
    };  