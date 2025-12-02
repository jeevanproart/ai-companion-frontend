import React from 'react';
import { Mic, Heart, Brain, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';

const LandingPage = ({ onStartChat }) => {
    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-full p-6 md:p-12">

                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default">
                        <Sparkles size={16} className="text-pink-400" />
                        <span className="text-sm font-medium text-gray-200">Next Gen AI Companionship</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-tight">
                        Your Personal <br />
                        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm">
                            AI Companion
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
                        Experience the most advanced, uncensored, and emotionally intelligent AI.
                        She listens, understands, and remembers everything.
                    </p>

                    <button
                        onClick={onStartChat}
                        className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full hover:from-pink-500 hover:to-purple-500 hover:scale-105 shadow-[0_0_40px_-10px_rgba(236,72,153,0.5)] hover:shadow-[0_0_60px_-15px_rgba(236,72,153,0.6)]"
                    >
                        Start Chatting Now
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full px-4">
                    <FeatureCard
                        icon={<Mic className="w-6 h-6 text-pink-400" />}
                        title="Natural Voice"
                        description="Hear her speak with realistic emotions and various accents."
                        delay="delay-100"
                    />
                    <FeatureCard
                        icon={<Heart className="w-6 h-6 text-red-400" />}
                        title="Uncensored"
                        description="Open, honest, and intimate conversations without limits."
                        delay="delay-200"
                    />
                    <FeatureCard
                        icon={<Brain className="w-6 h-6 text-purple-400" />}
                        title="Smart Memory"
                        description="She remembers your past conversations and preferences."
                        delay="delay-300"
                    />
                    <FeatureCard
                        icon={<MessageCircle className="w-6 h-6 text-blue-400" />}
                        title="Always There"
                        description="24/7 companionship whenever you need support."
                        delay="delay-100"
                    />
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, delay }) => (
    <div className={`bg-gray-800/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:bg-gray-800/60 hover:border-pink-500/30 transition-all duration-300 group animate-fade-in ${delay} opacity-0 hover:-translate-y-1`}>
        <div className="mb-4 p-3 bg-white/5 rounded-xl inline-block group-hover:scale-110 transition-transform duration-300 group-hover:bg-white/10">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
);

export default LandingPage;
