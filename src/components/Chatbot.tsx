import React from 'react';
import { Bot, Send } from 'lucide-react';

interface ChatbotProps {
  onClose: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  return (
    <div className="fixed bottom-24 right-8 w-96 h-[500px] bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col font-mono border border-slate-700/50 z-50">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-slate-700/50">
        <div className="w-12 h-12 flex items-center justify-center bg-slate-800 rounded-xl mr-4 border border-cyan-400/50 shadow-[0_0_10px_rgba(56,189,248,0.4)]">
          {/* Placeholder for the bot avatar */}
          <Bot className="w-8 h-8 text-cyan-300" />
        </div>
        <h2 className="text-lg font-bold text-white tracking-wider">MINECRAFTOS-BOT</h2>
      </div>

      {/* Chat Area */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        <div className="flex items-start space-x-3">
          <div className="text-white text-md bg-slate-800/60 p-3 rounded-lg rounded-bl-none">
            <p>Hello, Archlord!</p>
            <p>How can I assist you today?</p>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="relative">
          <input
            type="text"
            placeholder="Type here..."
            className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 pl-4 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 transition-colors">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
