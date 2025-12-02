import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import ChatBox from './components/ChatBox';
import VoiceSelector from './components/VoiceSelector';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import { MessageSquare, Heart, Menu } from 'lucide-react';

// API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [selectedVoice, setSelectedVoice] = useState("en-US-AriaNeural"); // 💋 Hottest voice by default
  const { user } = useUser();

  // Session state
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [view, setView] = useState('landing'); // 'landing' | 'chat'

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
        // Do NOT auto-select session, stay on landing page
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
        setView('chat'); // Switch to chat view
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
          setCurrentSessionId(null);
          setView('landing'); // Go back to landing if current session deleted
        }
      }
    } catch (error) {
      console.error("Failed to delete session:", error);
    }
  };

  const handleSelectSession = (sessionId) => {
    setCurrentSessionId(sessionId);
    setView('chat');
  };

  const handleLogoClick = () => {
    setView('landing');
    setCurrentSessionId(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex font-outfit">
      <SignedIn>
        <Sidebar
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSelectSession={handleSelectSession}
          onCreateSession={createSession}
          onDeleteSession={deleteSession}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </SignedIn>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="flex-shrink-0 w-full flex justify-between items-center p-4 bg-gray-800/50 backdrop-blur-md border-b border-gray-700/50 z-10">
          <div className="flex items-center gap-4">
            <SignedIn>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden text-gray-400 hover:text-white"
              >
                <Menu size={24} />
              </button>
            </SignedIn>
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={handleLogoClick}
            >
              <Heart className="text-pink-500 fill-pink-500 group-hover:scale-110 transition-transform" />
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                AI Companion
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </header>

        <main className="flex-1 overflow-hidden flex flex-col relative bg-gray-900">
          <SignedIn>
            {view === 'landing' ? (
              <LandingPage onStartChat={createSession} />
            ) : (
              <div className="flex-1 flex flex-col overflow-hidden p-4">
                <div className="bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg flex-1 flex flex-col overflow-hidden border border-gray-700">
                  <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-200">Chat with Her</h2>
                    <VoiceSelector selectedVoice={selectedVoice} onVoiceChange={setSelectedVoice} />
                  </div>
                  <ChatBox selectedVoice={selectedVoice} sessionId={currentSessionId} />
                </div>
              </div>
            )}
          </SignedIn>

          <SignedOut>
            <LandingPage onStartChat={() => { }} />
            {/* Note: The SignInButton in header handles auth, but we show LandingPage content for signed out users too */}
          </SignedOut>
        </main>
      </div>
    </div>
  );
}

export default App;
