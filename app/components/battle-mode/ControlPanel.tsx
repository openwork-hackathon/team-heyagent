import React from 'react';

type ControlPanelProps = {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  speed: 'normal' | 'fast';
  onSpeedChange: (speed: 'normal' | 'fast') => void;
  isFinished: boolean;
};

export const ControlPanel = ({ 
  isPlaying, 
  onTogglePlay, 
  onReset, 
  speed, 
  onSpeedChange,
  isFinished 
}: ControlPanelProps) => {
  return (
    <div className="flex items-center gap-4 bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-slate-700 shadow-2xl">
      {/* Play/Pause */}
      <button
        onClick={onTogglePlay}
        disabled={isFinished}
        className={`
          w-12 h-12 flex items-center justify-center rounded-full transition-all
          ${isFinished 
            ? 'bg-gray-700 cursor-not-allowed text-gray-500' 
            : 'bg-green-500 hover:bg-green-400 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]'
          }
        `}
      >
        {isFinished ? '✓' : isPlaying ? '⏸' : '▶'}
      </button>

      {/* Speed Toggle */}
      <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
        <button
          onClick={() => onSpeedChange('normal')}
          className={`px-3 py-1 rounded text-xs font-bold transition-colors ${speed === 'normal' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          1x
        </button>
        <button
          onClick={() => onSpeedChange('fast')}
          className={`px-3 py-1 rounded text-xs font-bold transition-colors ${speed === 'fast' ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'text-slate-400 hover:text-white'}`}
        >
          2x
        </button>
      </div>

      {/* Reset */}
      <button 
        onClick={onReset}
        className="text-slate-400 hover:text-red-400 transition-colors text-sm px-2"
      >
        Reset
      </button>

      <div className="h-4 w-[1px] bg-slate-700 mx-1" />
      
      <div className="text-xs text-slate-500 font-mono">
        MODE: <span className="text-green-400">NEGOTIATION</span>
      </div>
    </div>
  );
};
