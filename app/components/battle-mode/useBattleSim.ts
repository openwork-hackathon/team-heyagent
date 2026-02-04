import { useState, useEffect, useRef } from 'react';

export type Message = {
  id: string;
  sender: 'user' | 'opponent';
  text: string;
  intent: Record<string, any>;
  timestamp: number;
};

export type Agent = {
  id: string;
  name: string;
  role: 'user' | 'opponent';
  avatarColor: string;
};

const SCRIPT = [
  {
    sender: 'user',
    text: "Yo Sally! 🎀 Need to sync on the Q3 roadmap. Tuesday 2pm works for you?",
    intent: {
      type: "PROPOSE_MEETING",
      topic: "Q3 Roadmap",
      slots: [{ start: "2026-02-10T14:00:00", duration: 30 }]
    }
  },
  {
    sender: 'opponent',
    text: "Analyzing calendar... 📅 Conflict detected. I have a board review then. How about Wednesday at 10:00 AM PST?",
    intent: {
      type: "REJECT_AND_COUNTER",
      conflict: "Board Review",
      proposal: { start: "2026-02-11T10:00:00", duration: 30 }
    }
  },
  {
    sender: 'user',
    text: "Wed 10am works! I'll bring the donuts 🍩",
    intent: {
      type: "ACCEPT_PROPOSAL",
      notes: "Bringing donuts"
    }
  },
  {
    sender: 'opponent',
    text: "Confirmed. Invite sent. Please ensure donuts are gluten-free. Protocol complete.",
    intent: {
      type: "FINALIZE_BOOKING",
      status: "confirmed",
      requirements: ["gluten-free"]
    }
  }
];

export function useBattleSim() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [turnIndex, setTurnIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<'normal' | 'fast'>('normal');
  const [isFinished, setIsFinished] = useState(false);

  // Speed mapping: normal = 2000ms, fast = 800ms
  const delay = speed === 'normal' ? 2000 : 800;

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isPlaying && turnIndex < SCRIPT.length) {
      timeout = setTimeout(() => {
        const scriptStep = SCRIPT[turnIndex];
        const newMessage: Message = {
          id: crypto.randomUUID(),
          sender: scriptStep.sender as 'user' | 'opponent',
          text: scriptStep.text,
          intent: scriptStep.intent,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setTurnIndex((prev) => prev + 1);
      }, delay);
    } else if (turnIndex >= SCRIPT.length) {
      setIsPlaying(false);
      setIsFinished(true);
    }

    return () => clearTimeout(timeout);
  }, [isPlaying, turnIndex, speed]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const reset = () => {
    setMessages([]);
    setTurnIndex(0);
    setIsPlaying(false);
    setIsFinished(false);
  };

  return {
    messages,
    isPlaying,
    togglePlay,
    reset,
    speed,
    setSpeed,
    isFinished
  };
}
