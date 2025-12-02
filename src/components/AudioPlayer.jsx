import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const AudioPlayer = ({ audioUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);
    const progressBarRef = useRef(null);

    useEffect(() => {
        if (audioUrl) {
            audioRef.current = new Audio(audioUrl);

            const audio = audioRef.current;

            const setAudioData = () => {
                setDuration(audio.duration);
                setCurrentTime(audio.currentTime);
            };

            const setAudioTime = () => {
                setCurrentTime(audio.currentTime);
            };

            const handleEnded = () => {
                setIsPlaying(false);
                setCurrentTime(0);
            };

            audio.addEventListener('loadeddata', setAudioData);
            audio.addEventListener('timeupdate', setAudioTime);
            audio.addEventListener('ended', handleEnded);

            return () => {
                audio.removeEventListener('loadeddata', setAudioData);
                audio.removeEventListener('timeupdate', setAudioTime);
                audio.removeEventListener('ended', handleEnded);
                audio.pause();
            };
        }
    }, [audioUrl]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleProgressChange = (e) => {
        if (audioRef.current) {
            const newTime = Number(e.target.value);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (!audioUrl) return null;

    return (
        <div className="bg-gray-800 rounded-lg p-3 mt-2 flex items-center gap-3 w-full max-w-md border border-gray-700 shadow-lg">
            <button
                onClick={togglePlay}
                className="text-pink-500 hover:text-pink-400 transition-colors p-1"
            >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            </button>

            <div className="flex-1 flex items-center gap-2">
                <span className="text-xs text-gray-400 w-8 text-right">{formatTime(currentTime)}</span>
                <input
                    type="range"
                    ref={progressBarRef}
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-pink-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:hover:bg-pink-400"
                />
                <span className="text-xs text-gray-400 w-8">{formatTime(duration)}</span>
            </div>

            <button
                onClick={toggleMute}
                className="text-gray-400 hover:text-white transition-colors"
            >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
        </div>
    );
};

export default AudioPlayer;
