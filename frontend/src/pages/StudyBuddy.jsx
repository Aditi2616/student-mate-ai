import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Bot, Send, User, Sparkles } from 'lucide-react';

const StudyBuddy = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([
        { role: 'ai', content: `Hi ${user?.name}! I'm your AI Study Buddy. What topic would you like to explore today?` }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            const { data } = await api.post('/ai/chat', { prompt: userMsg });
            setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { 
                role: 'ai', 
                content: "I'm having trouble connecting to my knowledge base right now. Please try again in a moment.",
                isError: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto h-[85vh] flex flex-col bg-gray-800 rounded-xl border border-gray-700 shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700 p-4 flex items-center justify-between z-10">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                        <Bot className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white flex items-center">
                            AI Study Buddy <Sparkles className="h-4 w-4 ml-2 text-amber-400" />
                        </h1>
                        <p className="text-xs text-indigo-300">Powered by Gemini 1.5</p>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#111827]">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            
                            <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mt-1 
                                ${msg.role === 'user' ? 'bg-emerald-600 ml-3' : 'bg-indigo-600 mr-3'}`}
                            >
                                {msg.role === 'user' ? <User className="h-5 w-5 text-white" /> : <Bot className="h-5 w-5 text-white" />}
                            </div>
                            
                            <div className={`p-4 rounded-2xl ${
                                msg.role === 'user' 
                                    ? 'bg-indigo-600 text-white rounded-tr-sm' 
                                    : msg.isError 
                                        ? 'bg-red-500/10 border border-red-500/50 text-red-400 rounded-tl-sm'
                                        : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-tl-sm'
                            }`}>
                                {/* Pro tip: In a real app, use react-markdown here for formatted AI responses */}
                                <div className="whitespace-pre-wrap leading-relaxed">
                                    {msg.content}
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex max-w-[80%] flex-row">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-600 mr-3 flex items-center justify-center mt-1">
                                <Bot className="h-5 w-5 text-white" />
                            </div>
                            <div className="bg-gray-800 border border-gray-700 p-4 rounded-2xl rounded-tl-sm flex space-x-2 items-center">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-gray-800 border-t border-gray-700">
                <form onSubmit={handleSend} className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        disabled={isLoading}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-4 pr-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors shadow-inner disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-indigo-600 flex items-center justify-center shadow-md"
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </form>
                <p className="text-center text-xs text-gray-500 mt-2">
                    AI can make mistakes. Verify important information.
                </p>
            </div>
        </div>
    );
};

export default StudyBuddy;
