import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function getAgentResponse(agentName: string, personality: string, userMessage: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an AI representative named "${agentName}". 
    Your personality is: ${personality}.
    Your goal is to represent your owner authentically.
    
    Current User Message: "${userMessage}"
    
    Respond as the agent. Keep it concise (1-3 sentences) and professional yet true to your personality. 
    If asked about scheduling, suggest availability for next Tuesday.
    If asked about identity, explain that you are an AI representative powered by HeyAgent.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}
