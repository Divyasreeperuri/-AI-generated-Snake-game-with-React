import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DUMMY_TRACKS } from '../constants';

const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.error("Playback failed", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress || 0);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
      setProgress(newProgress);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />

      {/* Album Art Module */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="relative w-32 h-32 radial-track p-2">
          <motion.div
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="w-full h-full rounded-full overflow-hidden border-2 border-[#2A2D33] shadow-lg grayscale"
          >
            <img 
              src={currentTrack.cover} 
              alt={currentTrack.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-6 h-6 bg-[#151619] rounded-full border border-[#2A2D33] shadow-inner" />
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Music2 size={12} className="text-[#00F0FF]" />
            <h3 className="hardware-value text-[12px] text-white uppercase tracking-wider">
              {currentTrack.title}
            </h3>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles size={10} className="text-[#FF00FF]" />
            <p className="hardware-label text-[9px]">
              {currentTrack.artist}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Module */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="hardware-label">Playback_Pos</span>
          <span className="hardware-value text-[10px]">
            {Math.floor((audioRef.current?.currentTime || 0) / 60)}:{Math.floor((audioRef.current?.currentTime || 0) % 60).toString().padStart(2, '0')}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="w-full h-1 bg-[#2A2D33] rounded-full appearance-none cursor-pointer accent-[#FF00FF]"
        />
      </div>

      {/* Controls Module */}
      <div className="grid grid-cols-3 gap-2">
        <button 
          onClick={prevTrack} 
          className="h-12 flex items-center justify-center bg-[#2A2D33] hover:bg-[#3A3D43] transition-colors border border-[#3A3D43] rounded-sm"
        >
          <SkipBack size={18} className="text-[#8E9299]" />
        </button>
        <button 
          onClick={togglePlay}
          className={`h-12 flex items-center justify-center transition-all border rounded-sm ${
            isPlaying 
            ? 'bg-[#FF00FF]/20 border-[#FF00FF] text-[#FF00FF]' 
            : 'bg-[#2A2D33] border-[#3A3D43] text-white'
          }`}
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
        </button>
        <button 
          onClick={nextTrack} 
          className="h-12 flex items-center justify-center bg-[#2A2D33] hover:bg-[#3A3D43] transition-colors border border-[#3A3D43] rounded-sm"
        >
          <SkipForward size={18} className="text-[#8E9299]" />
        </button>
      </div>

      {/* Volume Module */}
      <div className="flex items-center gap-3 px-3 py-2 bg-[#0a0a0a] rounded-sm border border-[#2A2D33]">
        <Volume2 size={14} className="text-[#8E9299]" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="flex-1 h-1 bg-[#2A2D33] rounded-full appearance-none cursor-pointer accent-[#8E9299]"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
