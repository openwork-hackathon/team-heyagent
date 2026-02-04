import { NextRequest, NextResponse } from 'next/server';
import { getAgentResponse } from '../tasks/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentId, message, agentName, personality, history } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    // Default values if not provided
    const name = agentName || "HeyAgent";
    const persona = personality || "Helpful, professional, and efficient.";
    const chatHistory = history || [];

    // "Brain" execution
    const responseText = await getAgentResponse(name, persona, message, chatHistory);

    return NextResponse.json({
      response: responseText,
      agentId: agentId,
      timestamp: new Date().toISOString(),
      model: "gemini-1.5-flash-autonomous"
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: 'Internal Agent Error' },
      { status: 500 }
    );
  }
}
