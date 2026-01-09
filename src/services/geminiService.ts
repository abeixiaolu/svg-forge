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

// Get API configuration from environment variables
const getApiConfig = () => {
  return {
    apiKey:
      import.meta.env?.VITE_API_KEY ||
      import.meta.env?.API_KEY ||
      (typeof process !== "undefined" && process.env?.API_KEY) ||
      "sk-c7b2c8a06ab14334b0b604ae8b30502a",
    baseURL:
      import.meta.env?.VITE_BASE_URL ||
      import.meta.env?.BASE_URL ||
      (typeof process !== "undefined" && process.env?.BASE_URL) ||
      "http://127.0.0.1:8045/v1",
  };
};

// Store conversation history in memory
let conversationHistory: Array<{
  role: "user" | "assistant";
  content: string;
}> = [];

export const initChat = () => {
  conversationHistory = [];
  return conversationHistory;
};

export const restoreChat = (historyMessages: Message[]) => {
  // Convert app messages to the format needed for the internal history
  // Map "model" role to "assistant" for compatibility
  conversationHistory = historyMessages.map((msg) => ({
    role: (msg.role === "model" ? "assistant" : msg.role) as
      | "user"
      | "assistant",
    content: msg.content,
  }));

  return conversationHistory;
};

export const getChatSession = () => {
  if (conversationHistory.length === 0) {
    return initChat();
  }
  return conversationHistory;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const config = getApiConfig();

    // Add user message to history
    conversationHistory.push({ role: "user", content: message });

    // Prepare API endpoint
    // Ensure we reference the /v1/chat/completions endpoint
    let baseUrl = config.baseURL.replace(/\/$/, "");
    if (!baseUrl.endsWith("/v1")) {
      baseUrl += "/v1";
    }

    // Prepare messages with system instruction at the beginning
    const messages = [
      { role: "system", content: SYSTEM_INSTRUCTION },
      ...conversationHistory,
    ];

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: "gemini-3-flash",
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API Request Failed: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data = await response.json();
    const assistantContent = data.choices?.[0]?.message?.content || "";

    // Add assistant response to history
    conversationHistory.push({ role: "assistant", content: assistantContent });

    return assistantContent;
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
  try {
    await sendMessageToGemini(
      `[SYSTEM UPDATE] The user has loaded the following SVG into the editor context. Future "make it..." commands apply to this: \n${svgCode}`
    );
  } catch (e) {
    console.warn("Failed to update context", e);
  }
};
