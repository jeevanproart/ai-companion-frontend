import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Mic, Volume2 } from 'lucide-react';

// API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const ChatBox = ({ selectedVoice, sessionId }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Fetch messages when sessionId changes
    useEffect(() => {
        if (sessionId) {
            fetchMessages(sessionId);
        } else {
            setMessages([]);
        }
    }, [sessionId]);

    const fetchMessages = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/sessions/${id}/messages`);
            setMessages(response.data);
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        }
    };

    const sendMessage = async () => {
        if (!input.trim() || !sessionId) return;

        const userMessage = { role: "user", content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/sessions/${sessionId}/chat`, {
                message: userMessage.content,
                history: [] // History is now managed by backend
            });

            const botMessage = { role: "assistant", content: response.data.response };
            setMessages(prev => [...prev, botMessage]);

            // Auto-play removed as per user request
            // playAudio(botMessage.content);
        } catch (error) {
            console.error("Chat error", error);
        } finally {
            setLoading(false);
        }
    };

    const playAudio = async (text) => {
        try {
            const response = await axios.post(`${API_URL}/speak`, {
                text: text,
                voice: selectedVoice
            }, {
                responseType: 'blob'
            });

            const audioUrl = URL.createObjectURL(response.data);
            const audio = new Audio(audioUrl);
            audio.play();
        } catch (error) {
            console.error("TTS error", error);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'user'
                            ? 'bg-pink-600 text-white rounded-br-none'
                            : 'bg-gray-700 text-gray-100 rounded-bl-none'
                            }`}>
                            <p>{msg.content}</p>
                            {msg.role === 'assistant' && (
                                <button
                                    onClick={() => playAudio(msg.content)}
                                    className="mt-2 text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                                >
                                    <Volume2 size={14} /> Read Aloud
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-700 rounded-2xl px-4 py-3 rounded-bl-none">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-700">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 bg-gray-900 text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 border border-gray-700"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={loading}
                        className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
