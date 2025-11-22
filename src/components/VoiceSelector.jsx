import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VoiceSelector = ({ selectedVoice, onVoiceChange }) => {
    const [voices, setVoices] = useState([]);

    useEffect(() => {
        const fetchVoices = async () => {
            try {
                const response = await axios.get('http://localhost:8000/voices');
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
