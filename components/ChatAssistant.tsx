
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { 
      role: 'ai', 
      text: '👋 嗨！我是你的 AI 课程助教。\n我全天在线，关于 Unity 环境配置、Cursor 使用技巧 或 会员权益 的问题，随时问我！' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Use a ref to store the chat session to maintain context across turns
  const chatSessionRef = useRef<any>(null);

  const quickReplies = [
    { label: "💰 会员包含什么?", value: "会员包含什么内容 and 权益？" },
    { label: "👶 0基础能学吗?", value: "我是零基础小白，真的能学会做游戏吗？" },
    { label: "🛠️ 需要下载什么?", value: "学习这门课需要下载安装哪些软件？" },
    { label: "🐞 报错了怎么办?", value: "如果我在开发中遇到报错怎么办？" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) setShowTooltip(false);
  }, [isOpen]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isOpen]);

  // 👇 这是一个“带关键词识别”的智能回复版
  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userText = textToSend;
    if (!customInput) setInput('');

    // 1. 显示用户的问题
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    // 2. 模拟思考（根据关键词选择不同的回复）
    setTimeout(() => {
      let replyText = "";
      // 把用户说的话转成小写，方便匹配
      const lowerText = userText.toLowerCase();

      // --- 🤖 关键词匹配逻辑 ---
      if (lowerText.includes("会员") || lowerText.includes("价格") || lowerText.includes("钱") || lowerText.includes("费用")) {
        replyText = "💰 **关于会员权益**\n\n我们的会员包含：\n1. 全套 Unity + AI 实战视频课程\n2. 所有项目的完整源码工程\n3. 专属 Discord 开发者社区答疑\n\n现在的早鸟优惠价非常划算，建议直接入手永久版！";
      } 
      else if (lowerText.includes("基础") || lowerText.includes("小白") || lowerText.includes("难") || lowerText.includes("没学过")) {
        replyText = "👶 **零基础完全没问题！**\n\n本课程的核心理念就是“让 AI 帮你写代码”。\n你不需要背诵复杂的 C# 语法，只需要学会如何向 Cursor 提问。很多学员都是美术或策划出身，一样能做出独立游戏！";
      }
      else if (lowerText.includes("下载") || lowerText.includes("配置") || lowerText.includes("安装") || lowerText.includes("环境")) {
        replyText = "🛠️ **环境配置很简单**\n\n你只需要准备两样东西：\n1. **Unity Hub** (游戏引擎)\n2. **Cursor** (AI 代码编辑器)\n\n课程第一章有详细的《保姆级环境搭建指南》，跟着视频做，10分钟就能搞定！";
      }
      else if (lowerText.includes("你好") || lowerText.includes("hi") || lowerText.includes("hello")) {
        replyText = "👋 嗨！我是 UnityAI 课程助教。有什么我可以帮你的吗？\n\n你可以试着问我：\n- “0基础能学吗？”\n- “会员包含什么？”\n- “需要下载什么软件？”";
      }
      else {
        // 如果没听懂，就回默认的话
        replyText = "🤔 这个问题有点深奥...\n\n由于我是“演示版”机器人，目前只能回答关于**课程内容、适合人群、环境配置**等基础问题。\n\n您可以换个问法，或者直接联系人工客服！(Demo Mode)";
      }

      // 3. 显示回复
      setMessages(prev => [...prev, { role: 'model', text: replyText }]);
      setIsLoading(false);
    }, 1000); // 1秒后回复
  };
          

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      {showTooltip && !isOpen && (
        <div 
          onClick={() => setIsOpen(true)}
          className="absolute bottom-20 right-0 glass px-6 py-4 rounded-[1.5rem] border border-indigo-500/40 text-white text-sm font-black animate-fade-in-up whitespace-nowrap shadow-[0_10px_40px_rgba(79,70,229,0.3)] cursor-pointer hover:scale-105 transition-transform group"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
            👋 有问题问我，秒级响应
          </div>
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-[#0f172a] border-r border-b border-indigo-500/40 rotate-45"></div>
        </div>
      )}

      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-[1.5rem] bg-indigo-600 text-white flex items-center justify-center shadow-[0_15px_45px_rgba(79,70,229,0.5)] hover:scale-110 hover:rotate-3 active:scale-95 transition-all group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="w-[400px] h-[640px] glass rounded-[2.5rem] border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col animate-fade-in-up origin-bottom-right">
          <div className="p-7 bg-indigo-600 flex items-center justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-transparent pointer-events-none"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black italic text-white text-lg shadow-inner">AI</div>
              <div>
                <span className="block font-black text-white text-base tracking-tight">UnityAI 助教</span>
                <span className="flex items-center gap-2 text-[10px] text-indigo-100 font-bold uppercase tracking-widest mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                  Online / 低延迟模式
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-10 h-10 rounded-2xl bg-black/10 hover:bg-black/20 flex items-center justify-center text-white/60 hover:text-white transition-all active:scale-90"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-7 space-y-7 bg-[#020617]/50 scroll-smooth custom-scrollbar"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] p-5 rounded-[1.5rem] text-sm leading-relaxed whitespace-pre-wrap shadow-lg transition-all ${
                  msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-slate-800/80 text-slate-200 rounded-bl-none border border-white/5 backdrop-blur-md'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-slate-800/80 p-5 rounded-[1.5rem] rounded-bl-none border border-white/5 flex gap-2 items-center backdrop-blur-md shadow-xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-duration:0.8s]"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.15s] [animation-duration:0.8s]"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.3s] [animation-duration:0.8s]"></div>
                  </div>
                  <span className="ml-3 text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] italic">思考中...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-slate-900/90 border-t border-white/10 backdrop-blur-2xl">
            <div className="flex overflow-x-auto pb-3 gap-2 no-scrollbar scroll-smooth">
              {quickReplies.map((qr, i) => (
                <button 
                  key={i}
                  onClick={() => handleSend(qr.value)}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl bg-indigo-500/5 border border-indigo-500/20 text-indigo-300 text-[11px] font-black hover:bg-indigo-600 hover:text-white transition-all whitespace-nowrap active:scale-95 disabled:opacity-50"
                >
                  {qr.label}
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-1">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="在此输入您的问题..."
                className="flex-1 bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-700 shadow-inner"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white disabled:opacity-30 transition-all active:scale-90 shadow-2xl shadow-indigo-600/30 group"
              >
                <svg className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.2); border-radius: 10px; }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default ChatAssistant;
