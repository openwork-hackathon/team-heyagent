import React, { useState } from 'react';
import { Message } from './useBattleSim';

export const MessageBubble = ({ message }: { message: Message }) => {
  const [showProtocol, setShowProtocol] = useState(false);
  const isUser = message.sender === 'user';

  return (
    <div className={`flex flex-col max-w-[80%] mb-4 ${isUser ? 'self-start items-start' : 'self-end items-end'}`}>
      {/* Natural Language Bubble */}
      <div 
        className={`
          p-4 rounded-2xl text-sm md:text-base shadow-lg transition-all duration-300
          ${isUser 
            ? 'bg-blue-600 text-white rounded-bl-none border border-blue-400' 
            : 'bg-red-600 text-white rounded-br-none border border-red-400'
          }
        `}
      >
        <p>{message.text}</p>
      </div>

      {/* Protocol Data Toggle */}
      <button 
        onClick={() => setShowProtocol(!showProtocol)}
        className="mt-1 text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
      >
        <span className="opacity-50">{showProtocol ? '▼' : '▶'}</span> PROTOCOL_DATA
      </button>

      {/* JSON View */}
      {showProtocol && (
        <div className="mt-1 p-2 bg-black/80 border border-green-500/30 rounded text-xs font-mono text-green-400 w-full overflow-x-auto shadow-[0_0_15px_rgba(0,255,0,0.1)]">
          <pre>{JSON.stringify(message.intent, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
