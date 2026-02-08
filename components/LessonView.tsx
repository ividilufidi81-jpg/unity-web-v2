
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Prompt {
  label: string;
  text: string;
}

interface LessonData {
  title: string;
  subtitle: string;
  duration: string;
  terminalPrompt: string;
  takeaways: string[];
  prompts: Prompt[];
  videoUrl?: string;
}

interface LessonViewProps {
  data: LessonData;
  onClose: () => void;
  onNext: () => void;
  hasMore: boolean;
}

const LessonView: React.FC<LessonViewProps> = ({ data, onClose, onNext, hasMore }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // 👇 1. 在这里加一行，创建一个引用（遥控器）
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [videoScript, setVideoScript] = useState<string | null>(null);
// 监听 data 变化：只要课程内容一变，就立刻滚回顶部
 // 👇 2. 修改这个 useEffect
  useEffect(() => {
    // 如果找到了那个滚动的盒子，就让它滚回顶部
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [data]);
  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCopy = (text: string, index: number | 'terminal') => {
    navigator.clipboard.writeText(text);
    if (index === 'terminal') {
      showNotification('🚀 核心指令已复制！快去 Cursor 粘贴吧！');
    } else {
      setCopiedIndex(index);
      showNotification('指令已复制');
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const handleJoinCommunity = () => {
    window.open('https://discord.gg/unity-ai-revolution', '_blank');
  };

 // 👇 把原来的 generateVideoScript 替换成这个：
  const generateVideoScript = () => {
    // 防止重复点击
    if (isGeneratingScript) return;
    
    setIsGeneratingScript(true);
    setVideoScript(null);

    // 假装思考 2 秒
    setTimeout(() => {
      // 动态生成脚本内容（读取当前课程标题）
      const fakeScript = `
🎬 **《${data.title}》爆款短视频分镜脚本**

🔥 **核心卖点**：${data.subtitle || "3分钟学会核心技巧"}
⏱️ **推荐时长**：25秒

【0-5s 黄金开头】
画面：快速剪辑本节课的游戏最终效果（高燃BGM）。
文案：“你敢信？只需几行代码，Unity 也能做出这种《${data.title}》效果！”

【5-20s 干货展示】
画面：分屏显示 Cursor 写代码的过程，右边展示游戏实时变化。
文案：“别再手动造轮子了！看我用 AI 一键生成，效率直接起飞。关键参数都在这里...”

【20-End 互动引导】
画面：角色做出搞笑动作或展示一个有趣的 Bug。
文案：“想知道源码怎么写吗？评论区扣‘666’，我把工程文件发你！”
`;
      
      setVideoScript(fakeScript);
      setIsGeneratingScript(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-[#020617] animate-fade-in overflow-hidden pt-20">
      <div ref={scrollRef} className="flex-1 overflow-y-auto lg:flex">
        <div className="lg:flex-1 p-8 lg:p-12 space-y-12 max-w-5xl mx-auto">
          
          {/* 视频播放区域 */}
          <div className="relative aspect-video rounded-[3rem] bg-slate-950 overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] group">
            {!isPlaying ? (
              <div onClick={() => setIsPlaying(true)} className="absolute inset-0 z-10 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 transition-transform duration-700 group-hover:scale-105">
                  <div className="w-24 h-24 rounded-full bg-indigo-600/30 border-2 border-indigo-500 flex items-center justify-center text-white shadow-[0_0_50px_rgba(79,70,229,0.5)] group-hover:bg-indigo-600 transition-all">
                    <svg className="w-12 h-12 ml-1.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <h3 className="mt-8 text-3xl font-black text-white px-6 leading-tight">{data.subtitle}</h3>
                  <p className="mt-2 text-slate-500 font-medium text-lg tracking-wide">点击开始学习课程</p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 animate-fade-in bg-black">
                <iframe 
                  src={`${data.videoUrl || "//player.bilibili.com/player.html?bvid=BV1uv4y1q7vD&high_quality=1"}&autoplay=1`} 
                  className="absolute inset-0 w-full h-full"
                  frameBorder="no" 
                  scrolling="no" 
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

          {/* Prompt Terminal */}
          <section className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <span className="text-indigo-500">⚡</span>
                AI 核心指令控制台
              </h3>
            </div>
            <div className="relative group">
              <div className="relative bg-black rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden min-h-[320px] flex flex-col">
                <div className="px-10 py-6 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/40"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/40"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/40"></span>
                  </div>
                  <button onClick={() => handleCopy(data.terminalPrompt, 'terminal')} className="px-8 py-3 bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-black rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-green-500/40">
                    COPY COMMAND
                  </button>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                  <p className="text-xl md:text-2xl font-mono text-green-400 leading-relaxed font-black tracking-tight">"{data.terminalPrompt}"</p>
                </div>
              </div>
            </div>
          </section>

          {/* 实战目标 */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/[0.01] p-10 rounded-[2.5rem] border border-white/5">
              <h4 className="text-xl font-black text-white mb-6">🎯 本节实战目标</h4>
              <ul className="space-y-4">
                {data.takeaways.map((t, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-400 text-sm font-medium">
                    <span className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0 italic font-black text-[10px]">0{i+1}</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-indigo-600/[0.02] p-10 rounded-[2.5rem] border border-indigo-500/10 flex flex-col">
              <h4 className="text-xl font-black text-white mb-6">🎬 AI 视频分镜助手</h4>
              <div className="flex-1 bg-black/40 rounded-2xl p-6 mb-6 overflow-y-auto text-xs text-slate-400 font-mono italic">
                {videoScript || "点击下方按钮，生成针对本节课的营销短视频分镜脚本..."}
              </div>
              <button onClick={generateVideoScript} disabled={isGeneratingScript} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                {isGeneratingScript ? "正在生成..." : "生成百万级分镜脚本"}
              </button>
            </div>
          </section>

          <div className="flex flex-col items-center gap-8 pt-12 pb-20 border-t border-white/5">
            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
              {hasMore && (
                <button onClick={onNext} className="flex-1 px-10 py-6 bg-white text-indigo-900 rounded-[2rem] font-black text-lg transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-4 group">
                  继续下一节
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
              )}
              <button onClick={handleJoinCommunity} className="flex-1 px-10 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-lg transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-4 group">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.069.069 0 00-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
                加入社区交流
              </button>
            </div>
          </div>
        </div>
      </div>

      {notification && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 glass px-8 py-4 rounded-full border border-green-500/50 text-white font-black text-sm shadow-[0_0_50px_rgba(34,197,94,0.3)] animate-fade-in-up flex items-center gap-3">
          {notification}
        </div>
      )}
    </div>
  );
};

export default LessonView;
