import React from 'react';
import { MessageSquare, Plus, Trash2, Menu, X } from 'lucide-react';

function Sidebar({ sessions, currentSessionId, onSelectSession, onCreateSession, onDeleteSession, isOpen, onClose }) {
    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-gray-800 border-r border-gray-700 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
                <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Chats</h2>
                    <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-4">
                    <button
                        onClick={() => {
                            onCreateSession();
                            if (window.innerWidth < 768) onClose();
                        }}
                        className="w-full flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-3 rounded-lg transition-colors"
                    >
                        <Plus size={20} />
                        <span>New Chat</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {sessions.map((session) => (
                        <div
                            key={session.id}
                            className={`
                group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors
                ${currentSessionId === session.id ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'}
              `}
                            onClick={() => {
                                onSelectSession(session.id);
                                if (window.innerWidth < 768) onClose();
                            }}
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <MessageSquare size={18} className="shrink-0" />
                                <span className="truncate text-sm">{session.name}</span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteSession(session.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-600 rounded text-gray-400 hover:text-red-400 transition-all"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Sidebar;
