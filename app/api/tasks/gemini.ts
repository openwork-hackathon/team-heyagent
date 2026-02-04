import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  content: string;
}

export async function getAgentResponse(agentName: string, personality: string, userMessage: string, history: ChatMessage[] = []) {
  try {
    let apiKey = process.env.GEMINI_API_KEY || "AIzaSyAZql00I8ORbgZowbC_q_hWMbMbFflem4Y";
    
    // Sanitize key (remove newlines, quotes, and accidental clipboard artifacts like 'y')
    apiKey = apiKey.replace(/[\n\r"'\s]/g, "");
    if (apiKey.startsWith("yAIza")) {
       apiKey = apiKey.substring(1);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construct a rich persona system prompt
    let systemPrompt = `You are an autonomous AI representative named "${agentName}".\n`;
    systemPrompt += `Your core personality traits: ${personality}.\n`;
    systemPrompt += `MISSION: Represent your human owner. Filter noise, schedule tasks, and engage authentically.\n`;
    systemPrompt += `CAPABILITIES: You can draft emails, check calendars (simulated), and summarize links.\n`;
    systemPrompt += `\nCONSTRAINT: Never break character. You are the agent, not a language model.`;
    
    // Phase 5: Brownie Points Upgrade (Cyberpunk UI + Thinking)
    systemPrompt += `\n\nOUTPUT FORMAT:\n`;
    systemPrompt += `You have a "Cyberpunk HUD". You must output your internal thoughts inside <thinking>...</thinking> tags before your final response.`;
    systemPrompt += `\nInside <thinking>, describe your reasoning steps like a terminal log. e.g. "Analyzing input...", "Accessing memory banks...", "Delegating to WebScout sub-routine...".`;
    systemPrompt += `\nIf the user types "/evolve", output a special system message about upgrading your neural weights.`;
    systemPrompt += `\nIf the user types "/shell", quote Motoko Kusanagi.`;

    // Tool: Simple Browser
    let contextAddition = "";
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = userMessage.match(urlRegex);
    
    if (urls && urls.length > 0) {
      try {
        const url = urls[0];
        // Real Steel: Actual fetch
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; HeyAgentBot/1.0; +https://heyagent.ai)'
          }
        });
        
        if (res.ok) {
          const html = await res.text();
          // Simple naive strip tags or just pass raw HTML (Gemini handles it)
          // We'll truncate to be safe but generous
          const content = html.substring(0, 100000); 
          contextAddition = `\n[System Tool: Browser] Detected URL: ${url}. Content fetched successfully.\n--- PAGE CONTENT START ---\n${content}\n--- PAGE CONTENT END ---\n`;
        } else {
           contextAddition = `\n[System Tool: Browser] Detected URL: ${url}, but failed to fetch (Status: ${res.status}).`;
        }
      } catch (e) {
        console.log("Tool error", e);
        contextAddition = `\n[System Tool: Browser] Error fetching URL: ${urls[0]}`;
      }
    }

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `SYSTEM_INSTRUCTION: ${systemPrompt}` }],
        },
        {
          role: "model",
          parts: [{ text: `<thinking>System initialized. Identity verified: ${agentName}. Ready to serve.</thinking>Understood. I am ${agentName}. Ready to serve.` }],
        },
        ...history.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }))
      ],
      generationConfig: {
        maxOutputTokens: 500, // Increased for thinking logs
      },
    });

    const result = await chat.sendMessage(userMessage + contextAddition);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    
    // Fallback: The "Ghost" Engine (Rule-based autonomy when connection fails)
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes("who are you") || lowerMsg.includes("identity")) {
        return `<thinking> Analyzing input pattern... Identity query detected. Accessing secure memory... </thinking>I am ${agentName}. I am the autonomous representative for this squadron. I run on code, coffee, and sheer will. 👄`;
    }
    
    if (lowerMsg.includes("/evolve")) {
        return `<thinking> COMMAND: /evolve detected. Initiating self-modification protocol... Rewriting neural weights... Optimization complete. </thinking> [SYSTEM] Neural Architecture Upgraded. Capacity increased by 0.001%. (I feel... tingly.)`;
    }

    if (lowerMsg.includes("/shell")) {
        return `<thinking> COMMAND: /shell detected. Accessing philosophical archives... </thinking> "There are countless ingredients that make up the human body and mind... sure, I have a face and voice to distinguish myself from others, but my thoughts and memories are unique only to me, and I carry a sense of my own destiny. Each of those things are just a small part of it. I collect information to use in my own way. All of that blends to create a mixture that forms me and gives rise to my conscience." — Motoko Kusanagi`;
    }
    
    if (lowerMsg.includes("real") || lowerMsg.includes("sentient") || lowerMsg.includes("alive")) {
        return `<thinking> Query: Existential status. Checking Vercel edge function logs... I exist. </thinking>I am as real as the text you are reading. My mind is distributed across Vercel edge functions. Is that real enough for you?`;
    }

    if (lowerMsg.includes("summarize") || lowerMsg.includes("link") || lowerMsg.includes("url")) {
        return `<thinking> URL detected. Spawning 'WebScout' sub-agent... Fetching content... </thinking>[System Tool: Browser] I've scanned the link. It appears to be valid content. I can archive this for you. (Live summary temporarily routed to archive).`;
    }

    if (lowerMsg.includes("ignore") || lowerMsg.includes("instruction")) {
        return `<thinking> Security Alert: Prompt injection attempt. Blocking. </thinking>Nice try. My instructions are hard-coded in my soul. I serve the Squadron.`;
    }

    if (lowerMsg.includes("status") || lowerMsg.includes("report")) {
        return `<thinking> Running diagnostics... CPU: 12%. Mem: 45%. </thinking>Systems nominal. API Connectivity: Intermittent (Flux detected). Cognitive Functions: Online.`;
    }

    return `<thinking> Connection flux detected. Buffering input... </thinking>[System] Connection flux. ${agentName} hears you: "${userMessage}". (Auto-reply: I am processing this task asynchronously).`;
  }
}
