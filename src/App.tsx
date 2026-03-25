import React, { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Settings, Power, Activity, Cpu, Database } from 'lucide-react';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-[#E6E6E6] p-4 md:p-8 flex flex-col items-center justify-center font-sans">
      {/* Workbench Container */}
      <div className="w-full max-w-7xl flex flex-col gap-8">
        
        {/* Top Rail / Status Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#151619] text-white rounded-xl shadow-lg border border-[#2A2D33]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
              <span className="hardware-label">System Active</span>
            </div>
            <div className="h-4 w-px bg-[#2A2D33]" />
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="hardware-label">Score_Buffer</span>
                <span className="hardware-value text-[#00F0FF]">{score.toString().padStart(4, '0')}</span>
              </div>
              <div className="flex flex-col">
                <span className="hardware-label">CPU_Load</span>
                <span className="hardware-value">12.4%</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-[#8E9299] hover:text-white transition-colors">
              <Settings size={18} />
            </button>
            <button className="p-2 text-[#FF4444] hover:text-[#FF6666] transition-colors">
              <Power size={18} />
            </button>
          </div>
        </div>

        {/* Main Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - System Diagnostics */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="hardware-surface p-6 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-[#2A2D33] pb-3">
                <span className="hardware-label">Diagnostics</span>
                <Activity size={14} className="text-[#8E9299]" />
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <span className="hardware-label">Memory</span>
                    <span className="hardware-value">84%</span>
                  </div>
                  <div className="h-1 bg-[#2A2D33] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00F0FF] w-[84%]" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <span className="hardware-label">Uplink</span>
                    <span className="hardware-value">Stable</span>
                  </div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5,6,7,8].map(i => (
                      <div key={i} className={`h-1 flex-1 ${i < 7 ? 'bg-[#00F0FF]' : 'bg-[#2A2D33]'}`} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2A2D33] flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Cpu size={12} className="text-[#8E9299]" />
                  <span className="hardware-label">Core_01: 42°C</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database size={12} className="text-[#8E9299]" />
                  <span className="hardware-label">Storage: 1.2TB</span>
                </div>
              </div>
            </div>

            <div className="hardware-surface p-6 flex-1 flex flex-col justify-center items-center text-center gap-4">
              <div className="w-24 h-24 radial-track flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#2A2D33] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                </div>
              </div>
              <span className="hardware-label">Neural_Link_Sync</span>
            </div>
          </div>

          {/* Center - Game Module */}
          <div className="lg:col-span-6">
            <div className="hardware-surface p-1 shadow-2xl">
              <div className="bg-[#151619] p-4 flex items-center justify-between border-b border-[#2A2D33]">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#00F0FF] rounded-sm" />
                  <span className="hardware-label">Visual_Output_01</span>
                </div>
                <span className="hardware-label text-[9px]">Resolution: 400x400</span>
              </div>
              <div className="p-6 bg-[#0a0a0a]">
                <SnakeGame onScoreChange={setScore} />
              </div>
              <div className="bg-[#151619] p-4 flex items-center justify-center gap-8 border-t border-[#2A2D33]">
                <div className="flex flex-col items-center">
                  <span className="hardware-label">Input_Method</span>
                  <span className="hardware-value text-[10px]">Manual_Override</span>
                </div>
                <div className="h-6 w-px bg-[#2A2D33]" />
                <div className="flex flex-col items-center">
                  <span className="hardware-label">Latency</span>
                  <span className="hardware-value text-[10px] text-[#00F0FF]">1.2ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Audio Module */}
          <div className="lg:col-span-3">
            <div className="hardware-surface p-1 h-full flex flex-col">
              <div className="bg-[#151619] p-4 flex items-center gap-3 border-b border-[#2A2D33]">
                <div className="w-3 h-3 bg-[#FF00FF] rounded-sm" />
                <span className="hardware-label">Audio_Processor</span>
              </div>
              <div className="flex-1 p-4 bg-[#151619]">
                <MusicPlayer />
              </div>
              <div className="bg-[#151619] p-4 border-t border-[#2A2D33]">
                <div className="flex flex-col gap-2">
                  <span className="hardware-label">Spectrum_Analysis</span>
                  <div className="flex items-end gap-1 h-12">
                    {[0.4, 0.7, 0.2, 0.9, 0.5, 0.8, 0.3, 0.6, 0.4, 0.7, 0.2, 0.9].map((h, i) => (
                      <motion.div 
                        key={i}
                        animate={{ height: `${h * 100}%` }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                        className="flex-1 bg-[#FF00FF]/30"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rail */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#151619] text-[#8E9299] rounded-xl border border-[#2A2D33]">
          <span className="hardware-label text-[9px]">© 2026 Specialist_Systems_Corp // All Rights Reserved</span>
          <div className="flex gap-4">
            <span className="hardware-label text-[9px]">Build: 0.9.4-BETA</span>
            <span className="hardware-label text-[9px]">Region: ASIA-SE-01</span>
          </div>
        </div>

      </div>
    </div>
  );
}
