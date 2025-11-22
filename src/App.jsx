import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import ChatBox from './components/ChatBox';
import VoiceSelector from './components/VoiceSelector';
import Sidebar from './components/Sidebar';
import { MessageSquare, Heart, Menu } from 'lucide-react';

// API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [selectedVoice, setSelectedVoice] = useState("en-US-AnaNeural");
  const { user } = useUser();

  // Session state
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch sessions on mount and when user changes
  useEffect(() => {
    if (user) {
      fetchSessions();
    }
  }, [user]);

  const fetchSessions = async () => {
    if (!user?.id) return;

    try {
      const res = await fetch(`${API_URL}/sessions/${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
        if (data.length > 0 && !currentSessionId) {
          setCurrentSessionId(data[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
    }
  };

  const createSession = async () => {
    if (!user?.id) return;

    try {
      const res = await fetch(`${API_URL}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `Chat ${sessions.length + 1}`,
          user_id: user.id
        })
      });
      if (res.ok) {
        const newSession = await res.json();
        setSessions([newSession, ...sessions]);
        setCurrentSessionId(newSession.id);
      }
    } catch (error) {
      console.error("Failed to create session:", error);
    }
  };

  const deleteSession = async (sessionId) => {
    try {
      const res = await fetch(`${API_URL}/sessions/${sessionId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        const newSessions = sessions.filter(s => s.id !== sessionId);
        setSessions(newSessions);
        if (currentSessionId === sessionId) {
          setCurrentSessionId(newSessions.length > 0 ? newSessions[0].id : null);
        }
      }
    } catch (error) {
      console.error("Failed to delete session:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <SignedIn>
        <Sidebar
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSelectSession={setCurrentSessionId}
          onCreateSession={createSession}
          onDeleteSession={deleteSession}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </SignedIn>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="flex-shrink-0 w-full flex justify-between items-center p-4 bg-gray-800 shadow-lg z-10">
          <div className="flex items-center gap-4">
            <SignedIn>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden text-gray-400 hover:text-white"
              >
                <Menu size={24} />
              </button>
            </SignedIn>
            <div className="flex items-center gap-2">
              <Heart className="text-pink-500 fill-pink-500" />
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                AI Girlfriend
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </header>

        <main className="flex-1 overflow-hidden flex flex-col p-4 relative">
          <SignedIn>
            {currentSessionId ? (
              <div className="bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg flex-1 flex flex-col overflow-hidden">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                  <h2 className="text-lg md:text-xl font-semibold">Chat with Her</h2>
                  <VoiceSelector selectedVoice={selectedVoice} onVoiceChange={setSelectedVoice} />
                </div>
                <ChatBox selectedVoice={selectedVoice} sessionId={currentSessionId} />
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                <MessageSquare size={48} className="mb-4 opacity-50" />
                <p>Create a new chat to start talking</p>
                <button
                  onClick={createSession}
                  className="mt-4 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Start New Chat
                </button>
              </div>
            )}
          </SignedIn>

          <SignedOut>
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Your AI Companion Awaits</h2>
              <p className="text-gray-400 mb-8 max-w-md">Sign in to start chatting with your personalized AI girlfriend.</p>
              <MessageSquare className="w-24 h-24 text-gray-700" />
            </div>
          </SignedOut>
        </main>
      </div>
    </div>
  );
}

export default App;
