import React, { useEffect, useRef } from 'react';
import { useBattleSim } from './useBattleSim';
import { AgentAvatar } from './AgentAvatar';
import { MessageBubble } from './MessageBubble';
import { ControlPanel } from './ControlPanel';

export default function BattleArena() {
  const { 
    messages, 
    isPlaying, 
    togglePlay, 
    reset, 
    speed, 
    setSpeed, 
    isFinished 
  } = useBattleSim();

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full h-[600px] relative overflow-hidden bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #334155 1px, transparent 1px),
            linear-gradient(to bottom, #334155 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] pointer-events-none" />

      {/* Header/HUD */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10 pointer-events-none">
        <div className="text-slate-500 font-mono text-xs tracking-widest">
          SIMULATION_ID: <span className="text-blue-400">AG-90210</span>
        </div>
        <div className="text-slate-500 font-mono text-xs tracking-widest">
          STATUS: <span className={isPlaying ? "text-green-400 animate-pulse" : "text-yellow-400"}>
            {isPlaying ? "ACTIVE" : isFinished ? "COMPLETE" : "STANDBY"}
          </span>
        </div>
      </div>

      {/* Arena Layout */}
      <div className="relative w-full h-full flex flex-col">
        
        {/* Opponent Zone (Top Right) */}
        <div className="absolute top-12 right-12 z-20">
          <AgentAvatar name="Sally (AI)" role="opponent" isActive={messages.length > 0 && messages[messages.length-1].sender === 'opponent'} />
        </div>

        {/* Message Stream (Center Diagonal) */}
        <div 
          ref={scrollRef}
          className="absolute inset-0 z-10 overflow-y-auto px-4 py-20 flex flex-col gap-4 scroll-smooth"
          style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="min-h-[50%] w-full" /> {/* Spacer to push first messages down */}
          {messages.map((msg) => (
            <div key={msg.id} className="w-full flex justify-center">
              <div className="w-full max-w-2xl px-12 md:px-24">
                <MessageBubble message={msg} />
              </div>
            </div>
          ))}
          <div className="min-h-[20%] w-full" /> {/* Spacer at bottom */}
        </div>

        {/* User Zone (Bottom Left) */}
        <div className="absolute bottom-12 left-12 z-20">
          <AgentAvatar name="Jubei (You)" role="user" isActive={messages.length > 0 && messages[messages.length-1].sender === 'user'} />
        </div>

        {/* Controls (Bottom Center) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
          <ControlPanel 
            isPlaying={isPlaying} 
            onTogglePlay={togglePlay} 
            onReset={reset}
            speed={speed}
            onSpeedChange={setSpeed}
            isFinished={isFinished}
          />
        </div>
      </div>
    </div>
  );
}
