import { Mistral } from '@mistralai/mistralai';

// Access API Keys from Vite environment variables
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const MISTRAL_KEY = import.meta.env.VITE_MISTRAL_API_KEY || "";

/**
 * Validates if any AI service is enabled
 */
export const isAIEnabled = () => {
    return (GEMINI_KEY && GEMINI_KEY !== "your_api_key_here") ||
        (MISTRAL_KEY && MISTRAL_KEY !== "your_api_key_here");
};

/**
 * Calls Mistral (preferred) or Gemini to generate project insights
 */
export async function getAIInsight(prompt: string): Promise<string> {
    if (!isAIEnabled()) {
        throw new Error("AI features are disabled: API Key is missing in .env file.");
    }

    let mistralError: string | null = null;

    // Try Mistral first if key exists
    if (MISTRAL_KEY && MISTRAL_KEY !== "your_api_key_here") {
        try {
            const client = new Mistral({ apiKey: MISTRAL_KEY });
            const result = await client.chat.complete({
                model: 'mistral-medium',
                messages: [{ role: 'user', content: prompt }],
            });

            if (result.choices && result.choices.length > 0) {
                const content = result.choices[0].message.content;
                if (typeof content === 'string') return content;
            }
            throw new Error("Empty response from Mistral");
        } catch (error: any) {
            console.error("Mistral Error:", error);
            mistralError = error?.message || "Invalid Key or Connection Issue";

            // If we don't have a Gemini fallback, throw Mistral error immediately
            if (!GEMINI_KEY || GEMINI_KEY === "your_api_key_here") {
                throw new Error(`Mistral AI Error: ${mistralError}`);
            }
        }
    }

    // Fallback or Try Gemini
    if (GEMINI_KEY && GEMINI_KEY !== "your_api_key_here") {
        try {
            const { GoogleGenerativeAI } = await import("@google/generative-ai");
            const genAI = new GoogleGenerativeAI(GEMINI_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error: any) {
            console.error("Gemini Error:", error);
            const geminiError = error?.message || "Invalid Key or Connection Issue";

            if (mistralError) {
                throw new Error(`Both AI Services Failed.\nMistral: ${mistralError}\nGemini: ${geminiError}`);
            }
            throw new Error(`Gemini AI Error: ${geminiError}`);
        }
    }

    // This case covers when Mistral failed and there was no Gemini key to try
    throw new Error(`Mistral AI Error: ${mistralError || "Unknown Error"}`);
}

/**
 * Specialized prompts for different stages
 */
export const AI_PROMPTS = {
    ideation: (problem: string) => `
        Act as a Hackathon Meta-Strategist.
        Project Idea: ${problem}
        Generate 5 high-impact, unique feature ideas that would score high on "Innovation" and "User Experience".
        For each feature, provide:
        - Name
        - Description
        - Why it's a winner
        Keep it concise and punchy. Format as Markdown.
    `,
    build: (problem: string, track: string) => `
        Act as a Solutions Architect.
        Problem: ${problem}
        Tech Track: ${track}
        Propose a modern, lightning-fast tech stack and a brief system architecture plan for a 24-48h hackathon.
        Include frontend, backend, database, and any specialized AI tools or APIs.
        Format as Markdown.
    `,
    pitch: (problem: string, focus: string[]) => `
        Act as a Senior Hackathon Judge.
        Project: ${problem}
        Judging Focus: ${focus.join(", ")}
        Based on the current project details, simulate a "Judge's Critique".
        Point out:
        1. Biggest strength.
        2. Toughest technical question we might ask.
        3. One critical improvement to make before presenting.
        Format as Markdown.
    `
};
