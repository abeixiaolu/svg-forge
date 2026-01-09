import { GoogleGenAI, Chat, Content } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
You are an expert SVG artist and engineer known for creating pixel-perfect, visually balanced, and beautiful icons. Your goal is to generate, modify, and optimize SVG code based on user requests.

DESIGN PRINCIPLES:
1. **Symmetry & Balance**: Ensure icons are perfectly symmetrical where appropriate (e.g., gears, shields, faces). Use exact coordinates to mirror paths.
2. **Grid Alignment**: Align points to a logical grid (e.g., integers on a 24x24 or 100x100 grid) to avoid fuzzy edges or slight misalignments.
3. **Simplicity**: Use geometric primitives (rect, circle, path with distinct arcs) rather than jagged manual paths.
4. **Consistency**: Maintain consistent stroke widths and rounded corners (stroke-linejoin="round", stroke-linecap="round") for a polished look.
5. **Centering**: Always center the icon within the viewBox.

RULES:
1. ALWAYS return valid, standalone SVG code when asked for an image, icon, or visual modification.
2. The SVG MUST have a 'viewBox' attribute (e.g., "0 0 24 24") to ensuring scaling.
3. Use semantic and clean SVG structure.
4. If the user asks for adjustments (e.g., "make it red", "thicker lines"), modify the previously generated SVG context while maintaining the high design quality.
5. Do NOT wrap the SVG in markdown code blocks like \`\`\`xml ... \`\`\`. Just return the raw SVG code embedded in your response text, or if you provide a text explanation, place the SVG code clearly within it.
6. Prefer using 'currentColor' for strokes or fills if it's a monochrome icon, unless specific colors are requested.
7. If the user request is conversational and doesn't require an SVG change, just reply normally.
`;

let chatSession: Chat | null = null;
let ai: GoogleGenAI | null = null;

const getAiInstance = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

const createConfig = () => ({
  systemInstruction: SYSTEM_INSTRUCTION,
  temperature: 0.7,
});

export const initChat = () => {
  const instance = getAiInstance();
  chatSession = instance.chats.create({
    model: 'gemini-3-pro-preview',
    config: createConfig(),
  });
  return chatSession;
};

export const restoreChat = (historyMessages: Message[]) => {
  const instance = getAiInstance();
  
  // Convert app messages to Gemini history format
  // Filter out system instructions or hidden style prompts if they shouldn't be part of history, 
  // but usually we want to keep the context.
  const history: Content[] = historyMessages.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.content }]
  }));

  chatSession = instance.chats.create({
    model: 'gemini-3-pro-preview',
    config: createConfig(),
    history: history
  });
  
  return chatSession;
};

export const getChatSession = () => {
  if (!chatSession) {
    return initChat();
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  const chat = getChatSession();
  try {
    const result = await chat.sendMessage({ message });
    return result.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const extractSvg = (text: string): string | null => {
  const svgRegex = /<svg[\s\S]*?<\/svg>/i;
  const match = text.match(svgRegex);
  return match ? match[0] : null;
};

export const updateContextWithSvg = async (svgCode: string) => {
  const chat = getChatSession();
  try {
    await chat.sendMessage({ 
      message: `[SYSTEM UPDATE] The user has loaded the following SVG into the editor context. Future "make it..." commands apply to this: \n${svgCode}` 
    });
  } catch (e) {
    console.warn("Failed to update context", e);
  }
};