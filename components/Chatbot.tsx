import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, GraduationCap, Loader2, Sparkles } from 'lucide-react';
import { Chat } from "@google/genai";
import { createChatSession } from '../services/geminiService';
import { ChatMessage, LoadingState } from '../types';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Xin chào! Mình là trợ lý ảo của THPT Hương Khê. Mình có thể giúp gì cho bạn về tuyển sinh, lịch học hay thông tin nhà trường không?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  
  // Ref to store the active Gemini Chat Session
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Hide tooltip after 5s (Updated from 10s)
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    
    // Initialize the Chat Session on mount (using the admin configured key)
    const session = createChatSession();
    if (session) {
      chatSessionRef.current = session;
    } else {
      console.error("Không thể khởi tạo Chatbot. Vui lòng kiểm tra API Key trong source code.");
    }

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleOpen = () => {
      setIsOpen(!isOpen);
      setShowTooltip(false);
  }

  const handleSend = async () => {
    if (!input.trim() || loadingState === LoadingState.LOADING) return;

    const userMessageText = input;
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userMessageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoadingState(LoadingState.LOADING);

    // Try to get session if not exists
    if (!chatSessionRef.current) {
        // Retry creation
        const session = createChatSession();
        if (session) {
            chatSessionRef.current = session;
        } else {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: "Hệ thống đang bảo trì hoặc chưa được cấu hình (Thiếu API Key). Vui lòng liên hệ quản trị viên.",
                timestamp: new Date()
            }]);
            setLoadingState(LoadingState.IDLE);
            return;
        }
    }

    try {
      let responseText = "Xin lỗi, không có phản hồi.";

      if (chatSessionRef.current) {
        const result = await chatSessionRef.current.sendMessage({ 
          message: userMessageText 
        });
        responseText = result.text || "Xin lỗi, mình không có câu trả lời cho vấn đề này.";
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage: ChatMessage = {
         id: (Date.now() + 1).toString(),
         role: 'model',
         text: "Xin lỗi, đã có lỗi kết nối. Vui lòng thử lại sau.",
         timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setLoadingState(LoadingState.ERROR);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const quickQuestions = [
    "Hồ sơ tuyển sinh?",
    "Địa chỉ trường?",
    "Học phí thế nào?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
      
      {/* Tooltip Bubble - Positioned to the left of the icon */}
      <div className={`absolute bottom-2 right-20 bg-white px-4 py-3 rounded-xl rounded-br-none shadow-lg border border-gray-100 transform transition-all duration-500 origin-bottom-right max-w-[250px] ${!isOpen && showTooltip ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-50 translate-x-8 pointer-events-none'}`}>
        <div className="flex flex-col gap-1">
            <h4 className="font-bold text-slate-900 text-sm">Trợ lý ảo</h4>
            <p className="text-sm text-slate-600 leading-snug">Bạn cần hỗ trợ? Chúng tôi luôn sẵn sàng hỗ trợ!</p>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={handleOpen}
        className={`${
          isOpen ? 'scale-0 opacity-0 rotate-90' : 'scale-100 opacity-100 rotate-0'
        } ${!isOpen && showTooltip ? 'animate-bounce' : ''} transition-all duration-300 absolute bottom-0 right-0 bg-gradient-to-tr from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white p-4 rounded-full shadow-xl shadow-primary-500/30 flex items-center justify-center group`}
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400 border-2 border-primary-600"></span>
        </span>
        <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform" />
      </button>

      {/* Chat Window */}
      <div
        className={`${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'
        } transition-all duration-300 origin-bottom-right bg-white w-[350px] sm:w-[380px] h-[550px] rounded-3xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden ring-1 ring-gray-100`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-4 flex justify-between items-center text-white shadow-md z-10">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm border border-white/20">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm font-heading">Trợ lý ảo AI</h3>
              <div className="flex items-center space-x-1.5">
                <span className={`w-2 h-2 rounded-full ${chatSessionRef.current ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`}></span>
                <span className="text-xs text-primary-100 font-medium">
                  {chatSessionRef.current ? 'Sẵn sàng hỗ trợ' : 'Đang kết nối...'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
             <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition">
                <X className="h-5 w-5" />
             </button>
          </div>
        </div>

        {/* Content Area */}
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 scrollbar-thin scrollbar-thumb-gray-200">
            <div className="space-y-4">
            {messages.map((msg) => (
                <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start items-end'}`}
                >
                {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-100 to-white border border-primary-50 flex items-center justify-center mr-2 flex-shrink-0 shadow-sm mb-1">
                        <Sparkles className="h-4 w-4 text-primary-600" />
                    </div>
                )}
                <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                        ? 'bg-primary-600 text-white rounded-br-none'
                        : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                    }`}
                >
                    {msg.text}
                </div>
                </div>
            ))}
            {loadingState === LoadingState.LOADING && (
                <div className="flex justify-start items-end">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-2 mb-1">
                        <Sparkles className="h-4 w-4 text-primary-600" />
                    </div>
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100">
                    <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
                </div>
                </div>
            )}
            <div ref={messagesEndRef} />
            </div>
        </div>

        {/* Quick Actions */}
        {messages.length < 4 && (
            <div className="px-4 py-3 bg-gray-50/50 flex gap-2 overflow-x-auto scrollbar-hide mask-fade-right">
            {quickQuestions.map((q, idx) => (
                <button
                key={idx}
                onClick={() => { setInput(q); }}
                className="whitespace-nowrap px-4 py-1.5 bg-white border border-primary-100 text-primary-700 text-xs font-medium rounded-full hover:bg-primary-50 hover:border-primary-200 hover:shadow-sm transition-all transform hover:-translate-y-0.5"
                >
                {q}
                </button>
            ))}
            </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center space-x-2 bg-white rounded-2xl px-4 py-2.5 border border-gray-300 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Nhập câu hỏi của bạn..."
                className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400"
                disabled={loadingState === LoadingState.LOADING}
            />
            <button
                onClick={handleSend}
                disabled={!input.trim() || loadingState === LoadingState.LOADING}
                className={`p-2 rounded-xl transition-all duration-300 ${
                input.trim()
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-md transform hover:scale-110 rotate-0'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed rotate-0'
                }`}
            >
                <Send className="h-4 w-4" />
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;