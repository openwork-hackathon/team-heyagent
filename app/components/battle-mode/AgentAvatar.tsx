import React from 'react';

type AgentAvatarProps = {
  name: string;
  role: 'user' | 'opponent';
  isActive?: boolean;
};

export const AgentAvatar = ({ name, role, isActive }: AgentAvatarProps) => {
  const isUser = role === 'user';

  return (
    <div className={`relative group transition-all duration-500 ${isActive ? 'scale-110' : 'scale-100'}`}>
      {/* Name Tag */}
      <div 
        className={`
          absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase
          bg-black/60 border backdrop-blur-sm
          ${isUser ? 'border-blue-500 text-blue-400' : 'border-red-500 text-red-400'}
        `}
      >
        {name}
      </div>

      {/* Avatar Graphic */}
      <div 
        className={`
          w-24 h-24 md:w-32 md:h-32 rounded-full border-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden bg-slate-800
          ${isUser ? 'border-blue-500 shadow-blue-500/20' : 'border-red-500 shadow-red-500/20'}
          ${isActive ? 'ring-4 ring-white/20' : ''}
        `}
      >
        {isUser ? (
          // Back View (User)
          <div className="relative w-full h-full">
            {/* Head */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-400 rounded-full" />
            {/* Shoulders */}
            <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-24 h-16 bg-blue-900 rounded-t-full" />
          </div>
        ) : (
          // Front View (Opponent)
          <div className="relative w-full h-full flex flex-col items-center justify-center">
             {/* Robot Head */}
             <div className="w-16 h-14 bg-red-900/50 rounded-lg border-2 border-red-400 flex items-center justify-center gap-2 relative">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse shadow-[0_0_10px_#f87171]" />
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-75 shadow-[0_0_10px_#f87171]" />
                <div className="absolute -bottom-1 w-6 h-1 bg-red-400/50 rounded-full" />
             </div>
             {/* Body */}
             <div className="w-10 h-8 bg-slate-700 mt-1 rounded-t-lg" />
          </div>
        )}
      </div>

      {/* Platform/Shadow */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/40 blur-xl rounded-full" />
    </div>
  );
};
