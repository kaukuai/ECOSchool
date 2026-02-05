import React, { useState, useRef, useEffect } from 'react';
import { getAiTutorResponse } from '../services/geminiService';
import { X, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AiTutorProps {
  context: string;
}

const AiTutor: React.FC<AiTutorProps> = ({ context }) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Beep Boop! I'm Eco-Bot 3000. Need mission intel?" }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!query.trim()) return;

    const userText = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    // Pass language preference to the AI service context
    const contextWithLang = `${context} (User Language: ${language})`;
    const botReply = await getAiTutorResponse(userText, contextWithLang);
    
    setMessages(prev => [...prev, { role: 'bot', text: botReply }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white border-2 border-black shadow-hard rounded-xl overflow-hidden flex flex-col h-[400px] pointer-events-auto animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-yellow-400 p-3 border-b-2 border-black flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full border border-black"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full border border-black"></div>
              <span className="font-display font-bold text-black uppercase tracking-wider">Eco-Bot 3000</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-black hover:text-white p-1 rounded border border-transparent hover:border-transparent transition-colors">
              <X size={20} strokeWidth={3} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-blue-50 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 text-sm font-bold border-2 border-black shadow-hard-sm ${
                  msg.role === 'user' 
                    ? 'bg-white text-black rounded-tl-xl rounded-tr-xl rounded-bl-xl' 
                    : 'bg-green-400 text-black rounded-tr-xl rounded-bl-xl rounded-br-xl'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 border-2 border-black text-black text-xs p-2 rounded-xl animate-pulse font-bold">
                  Computing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t-2 border-black flex gap-2">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for help..."
              className="flex-1 border-2 border-black rounded-lg px-3 py-2 text-sm focus:outline-none focus:bg-yellow-50 font-bold placeholder:text-slate-400"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-black hover:bg-slate-800 text-white border-2 border-black p-2 rounded-lg transition-colors disabled:opacity-50 active:translate-y-1"
            >
              <Send size={18} strokeWidth={3} />
            </button>
          </div>
        </div>
      )}

      {/* Mascot Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto group relative animate-float transition-all active:scale-95"
      >
        {/* Thought Bubble if closed */}
        {!isOpen && (
            <div className="absolute right-full mr-4 top-0 bg-white border-2 border-black px-4 py-2 rounded-xl rounded-tr-none shadow-hard-sm w-40 transform transition-all origin-right scale-0 group-hover:scale-100">
                <p className="text-xs font-bold text-black">Click me for tips!</p>
            </div>
        )}

        {/* Robot Head SVG */}
        <div className="w-20 h-20 relative">
             <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                {/* Antenna */}
                <line x1="50" y1="10" x2="50" y2="25" stroke="black" strokeWidth="4" />
                <circle cx="50" cy="10" r="5" fill="#facc15" stroke="black" strokeWidth="3" className="animate-pulse"/>
                
                {/* Head Shape */}
                <rect x="20" y="25" width="60" height="50" rx="10" fill="white" stroke="black" strokeWidth="4" />
                
                {/* Screen/Face */}
                <rect x="28" y="35" width="44" height="25" rx="5" fill="#22c55e" stroke="black" strokeWidth="3" />
                
                {/* Eyes */}
                {isOpen ? (
                     <>
                     <circle cx="40" cy="47" r="3" fill="black" />
                     <circle cx="60" cy="47" r="3" fill="black" />
                     </>
                ) : (
                    <>
                    <rect x="36" y="45" width="8" height="4" fill="black" className="animate-blink" />
                    <rect x="56" y="45" width="8" height="4" fill="black" className="animate-blink" />
                    </>
                )}
                
                {/* Mouth */}
                <path d="M 40 53 Q 50 58 60 53" stroke="black" strokeWidth="2" fill="none" />

                {/* Ears */}
                <rect x="12" y="40" width="8" height="20" fill="#a8a29e" stroke="black" strokeWidth="3" />
                <rect x="80" y="40" width="8" height="20" fill="#a8a29e" stroke="black" strokeWidth="3" />
             </svg>
        </div>
      </button>
    </div>
  );
};

export default AiTutor;