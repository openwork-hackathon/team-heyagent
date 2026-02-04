'use client'

import { useState, useEffect } from 'react'

interface MemoryFact {
  id: string
  text: string
  confidence: number
  timestamp: string
}

export function GhostMemoryPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [isReflecting, setIsReflecting] = useState(false)
  // Mock data for facts
  const [facts, setFacts] = useState<MemoryFact[]>([
    { id: '1', text: 'User prefers async communication', confidence: 0.95, timestamp: new Date().toISOString() },
    { id: '2', text: 'User likes sushi', confidence: 0.8, timestamp: new Date().toISOString() },
    { id: '3', text: 'Working on "HeyAgent" project', confidence: 0.99, timestamp: new Date().toISOString() },
    { id: '4', text: 'Interested in cybernetic aesthetics', confidence: 0.88, timestamp: new Date().toISOString() },
    { id: '5', text: 'Requires high-contrast accessibility', confidence: 0.75, timestamp: new Date().toISOString() },
  ])

  // Simulate reflection updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly trigger reflection update simulation
      if (Math.random() > 0.7) {
        setIsReflecting(true)
        setTimeout(() => setIsReflecting(false), 2500)
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="z-[100] fixed top-1/2 right-0 pointer-events-none flex flex-col items-end transform -translate-y-1/2 font-mono">
      {/* Trigger Button - Always Visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto bg-black text-green-500 border-l border-t border-b border-green-500/50 py-4 px-1 rounded-l-md shadow-[0_0_10px_rgba(0,255,0,0.2)] transition-all duration-300 hover:bg-green-900/20 hover:border-green-400 flex flex-col items-center gap-2 ${isOpen ? 'translate-x-full opacity-0' : 'translate-x-0'}`}
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <span className="text-xs font-bold tracking-widest">GHOST_MEMORY</span>
        {isReflecting && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#00ff00]" />}
      </button>

      {/* Main Panel */}
      <div 
        className={`pointer-events-auto fixed top-0 right-0 h-full w-80 bg-black/95 border-l border-green-500/30 backdrop-blur-md shadow-[-10px_0_30px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-out z-[101] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-green-900/50 flex justify-between items-center bg-gradient-to-r from-green-900/10 to-transparent">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-sm ${isReflecting ? 'bg-green-400 animate-ping' : 'bg-green-700'}`} />
            <h2 className="text-green-500 font-bold text-sm tracking-wider">NEURAL_CONTEXT</h2>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-green-700 hover:text-green-400 hover:bg-green-900/20 px-2 py-1 rounded text-xs transition-colors"
          >
            [CLOSE]
          </button>
        </div>

        {/* Reflection Status */}
        <div className="h-1 w-full bg-green-900/30 overflow-hidden">
          {isReflecting && (
            <div className="h-full bg-green-500/50 animate-processing-bar w-1/2 shadow-[0_0_10px_rgba(0,255,0,0.5)]" />
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-transparent">
          
          {/* Decorative Glitch Header */}
          <div className="text-[10px] text-green-800 mb-2 flex justify-between border-b border-green-900/30 pb-1">
             <span>MEM_ADDR: 0x{Math.random().toString(16).slice(2, 10).toUpperCase()}</span>
             <span>V.0.9.2 BETA</span>
          </div>

          {facts.map((fact) => (
            <div key={fact.id} className="group relative pl-3 py-1 border-l border-green-800 hover:border-green-400 transition-colors">
              <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/5 transition-colors pointer-events-none" />
              
              <div className="text-xs text-green-400 mb-1 group-hover:text-green-300 group-hover:shadow-[0_0_5px_rgba(0,255,0,0.1)] transition-all">
                {fact.text}
              </div>
              
              <div className="flex justify-between items-center text-[10px] text-green-800 font-mono">
                <span className="group-hover:text-green-600 transition-colors">CONFIDENCE: {(fact.confidence * 100).toFixed(0)}%</span>
                <span>{new Date(fact.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
            </div>
          ))}

          {/* Empty State / Loader */}
          {facts.length === 0 && (
             <div className="text-center py-8 text-green-900 text-xs italic">
                NO_DATA_FOUND_IN_SECTOR_7
             </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-green-900/50 bg-black/50 text-[10px] text-green-800 flex justify-between font-mono">
           <span>GHOST_MEMORY_MODULE</span>
           <span className="animate-pulse">ONLINE</span>
        </div>
      </div>
    </div>
  )
}
