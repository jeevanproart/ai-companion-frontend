import React, { useEffect, useState } from 'react';
import axios from 'axios';

// API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const VoiceSelector = ({ selectedVoice, onVoiceChange }) => {
    const [voices, setVoices] = useState([]);

    useEffect(() => {
        const fetchVoices = async () => {
            try {
                const response = await axios.get(`${API_URL}/voices`);
                setVoices(response.data);
            } catch (error) {
                console.error("Failed to fetch voices", error);
            }
        };
        fetchVoices();
    }, []);

    return (
        <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Voice:</label>
            <select
                value={selectedVoice}
                onChange={(e) => onVoiceChange(e.target.value)}
                className="bg-gray-700 text-white rounded px-2 py-1 text-sm border border-gray-600 focus:outline-none focus:border-pink-500"
            >
                {voices.map((voice) => (
                    <option key={voice.id} value={voice.id}>
                        {voice.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default VoiceSelector;
