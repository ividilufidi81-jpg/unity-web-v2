import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Activity, Code, Bug, Terminal, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'ai' | 'system' | 'log';
  text: string;
  type?: 'warning' | 'success' | 'code' | 'error';
  isDiagnosis?: boolean;
}

const ChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: '你好！我是你的 Unity AI 导师。你可以直接向我描述你想要实现的功能（例如：“如何实现二段跳？”），或者开启“实时扫描”让我帮你检查项目中的潜在问题。' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const [status, setStatus] = useState({ text: 'ONLINE', color: 'bg-green-500' });
  const scrollRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isScanning, isFixing]);

  // 1. 模拟扫描功能
  const triggerScan = async () => {
    if (isScanning || isLoading || isFixing) return;
    
    setIsScanning(true);
    setStatus({ text: 'ANALYZING SCENE...', color: 'bg-yellow-500 animate-pulse' });
    
    const logs = [
      "Connecting to Unity Editor (v6.0.1)...", 
      "Parsing Scene Hierarchy: 142 objects found.", 
      "Analyzing Script Dependencies...",
      "Validating Physics Layer Matrix...",
      "Checking Prefab Instances...",
      "⚠ THREAT DETECTED: Missing Physics Component"
    ];

    for (const log of logs) {
      await new Promise(r => setTimeout(r, 400));
      setMessages(prev => [...prev, { role: 'log', text: `> ${log}` }]);
    }
    
    setTimeout(() => {
      setIsScanning(false);
      setStatus({ text: 'DIAGNOSTIC COMPLETE', color: 'bg-red-500' });
      setMessages(prev => [...prev, { 
        role: 'ai', 
        type: 'warning',
        text: '⚠️ 扫描报告：\n\n检测到你的 "Player" 对象拥有脚本但没有 [Rigidbody] 或 [CharacterController] 组件。这将导致物理交互失效。\n\n建议方案：自动挂载 Rigidbody 并优化碰撞参数。',
        isDiagnosis: true
      }]);
    }, 500);
  };

  // 2. 模拟一键修复
  const handleFix = () => {
    setIsFixing(true);
    setStatus({ text: 'APPLYING FIX...', color: 'bg-indigo-500 animate-pulse' });
    setMessages(prev => prev.map(m => m.isDiagnosis ? { ...m, isDiagnosis: false } : m));

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'system', 
        type: 'code',
        text: '/* AI 自动生成补丁 */\nGameObject player = GameObject.Find("Player");\nRigidbody rb = player.AddComponent<Rigidbody>();\nrb.interpolation = RigidbodyInterpolation.Interpolate;\nrb.collisionDetectionMode = CollisionDetectionMode.Continuous;' 
      }]);
      
      setTimeout(() => {
        setIsFixing(false);
        setStatus({ text: 'ONLINE', color: 'bg-green-500' });
        setMessages(prev => [...prev, { 
          role: 'ai', 
          type: 'success',
          text: '✅ 物理环境优化完成！\n\nRigidbody 已自动添加并开启了平滑插值（Interpolate），现在物体移动将不再有抖动感。' 
        }]);
      }, 1500);
    }, 1000);
  };

  // 3. 模拟 AI 对话回复 (智能逻辑升级版)
  const handleSend = async () => {
    const userText = input.trim();
    if (!userText || isLoading || isScanning || isFixing) return;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    let responseText = "";
    let codeSnippet = "";

    const lowerText = userText.toLowerCase();

    // --- 智能判断逻辑开始 ---

    // 1. 处理无效或过短输入 (例如: "11", "a", "你好")
    if (userText.length < 2 || /^\d+$/.test(userText)) {
       responseText = "请具体描述你想在 Unity 中实现的功能，例如：“如何实现二段跳” 或 “物体怎么跟随鼠标”。";
    }
    else if (['你好', 'hi', 'hello', '在吗'].some(w => lowerText.includes(w))) {
       responseText = "你好！我是你的 AI 编程助手。请问在游戏开发中遇到了什么具体问题？";
    }
    // 2. 关键词匹配 (特定功能)
    else if (lowerText.includes("二段跳") || lowerText.includes("jump")) {
      responseText = "实现二段跳的核心在于记录跳跃次数。这里是一个标准的实现方案：";
      codeSnippet = `
void Update() {
  if (isGrounded) jumpCount = 0;
  
  if (Input.GetButtonDown("Jump") && jumpCount < 2) {
    rb.velocity = Vector2.up * jumpForce;
    jumpCount++;
  }
}`;
    } else if (lowerText.includes("跟随") || lowerText.includes("follow") || lowerText.includes("鼠标")) {
      responseText = "物体跟随鼠标通常需要将屏幕坐标转换为世界坐标。参考代码如下：";
      codeSnippet = `
void Update() {
  Vector3 mousePos = Input.mousePosition;
  mousePos.z = 10; // 摄像机距离
  Vector3 worldPos = Camera.main.ScreenToWorldPoint(mousePos);
  transform.position = Vector3.Lerp(transform.position, worldPos, Time.deltaTime * 5);
}`;
    } else if (lowerText.includes("抖动") || lowerText.includes("jitter")) {
      responseText = "移动抖动通常是因为 Update 和 FixedUpdate 不同步。请尝试将移动逻辑放在 FixedUpdate 中，或者开启 Rigidbody 的 Interpolate 选项。";
    } 
    // 3. 兜底回复 (诚实模式)
    else {
      responseText = "这是一个非常棒的功能点！\n\n不过作为「体验版 AI」，我目前主要学习了关于【角色控制】和【物理系统】的知识。\n\n你可以试着问我：“如何实现二段跳？”或者点击下方的快捷提示词来体验代码生成！";
    }

    // 模拟打字机延迟
    await new Promise(r => setTimeout(r, 800)); 
    setIsLoading(false);
    
    setMessages(prev => [...prev, { role: 'ai', text: responseText }]);
    
    if (codeSnippet) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'system', type: 'code', text: codeSnippet }]);
      }, 500);
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto glass rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col h-[600px]">
      
      {/* 顶部状态栏 */}
      <div className="bg-[#0f172a]/95 p-6 border-b border-white/5 flex items-center justify-between backdrop-blur-2xl relative z-40 shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white italic shadow-lg group-hover:scale-110 transition-transform">
              AI
            </div>
            <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-4 border-[#0f172a] rounded-full transition-colors duration-500 ${status.color}`}></div>
          </div>
          <div>
            <span className="block font-black text-white text-lg leading-none tracking-tight">Unity Mentor AI</span>
            <span className="block text-[9px] text-indigo-400 font-black tracking-widest uppercase mt-1 flex items-center gap-2">
              SESSION: <span className="text-white">ACTIVE</span> 
              <span className="w-px h-2 bg-white/20"></span>
              STATUS: <span className="text-white">{status.text}</span>
            </span>
          </div>
        </div>
        
        <button 
          onClick={triggerScan}
          disabled={isScanning || isFixing || isLoading}
          className="px-5 py-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-xl text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2.5 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
        >
          <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-yellow-500 animate-ping' : 'bg-indigo-400'}`}></div>
          {isScanning ? 'SCANNING...' : '开启实时扫描'}
        </button>
      </div>

      {/* 聊天内容区域 */}
      <div className="relative flex-1 bg-[#020617]/60 overflow-hidden">
        {isScanning && (
          <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center bg-indigo-500/5 animate-fade-in">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-indigo-400 shadow-[0_0_20px_#6366f1] animate-scanline"></div>
            <div className="w-[600px] h-[600px] border border-indigo-500/10 rounded-full animate-radar-pulse"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="text-indigo-400/80 font-mono text-[10px] uppercase tracking-[0.8em] animate-pulse bg-black/50 px-4 py-2 rounded">
              Analyzing Scene Hierarchy...
            </div>
          </div>
        )}

        <div 
          ref={scrollRef}
          className="h-full overflow-y-auto p-6 md:p-10 space-y-6 scroll-smooth no-scrollbar"
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
              {msg.role === 'log' ? (
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 bg-white/5 px-3 py-1.5 rounded border border-white/5 w-fit">
                   <Terminal className="w-3 h-3" />
                   {msg.text}
                </div>
              ) : (
                <div className={`max-w-[85%] p-5 rounded-[1.5rem] transition-all relative group ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none shadow-xl shadow-indigo-600/20' 
                    : msg.type === 'warning'
                    ? 'bg-red-500/10 border border-red-500/30 text-red-100 rounded-bl-none shadow-[0_10px_40px_rgba(239,68,68,0.1)]'
                    : msg.type === 'success'
                    ? 'bg-green-500/10 border border-green-500/30 text-green-100 rounded-bl-none'
                    : msg.type === 'code'
                    ? 'bg-[#0d1117] border border-white/10 text-slate-300 font-mono text-xs rounded-xl p-6 leading-relaxed shadow-inner overflow-x-auto w-full'
                    : 'bg-slate-800 text-slate-200 rounded-bl-none border border-white/5 shadow-lg'
                }`}>
                  {msg.role === 'ai' && !msg.type && (
                     <div className="absolute -left-12 top-0 w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/30">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                     </div>
                  )}
                  
                  {msg.type === 'code' ? (
                     <pre className="font-mono text-xs language-csharp"><code className="text-green-400">{msg.text}</code></pre>
                  ) : (
                     <p className="whitespace-pre-wrap leading-relaxed font-medium text-sm md:text-base">{msg.text}</p>
                  )}
                  
                  {msg.isDiagnosis && (
                    <button 
                      onClick={handleFix}
                      className="mt-6 flex items-center gap-3 bg-white text-indigo-950 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg animate-pulse-slow hover:animate-none"
                    >
                      {isFixing ? (
                        <div className="w-4 h-4 border-2 border-indigo-900/30 border-t-indigo-900 rounded-full animate-spin"></div>
                      ) : (
                        <Bug className="w-4 h-4" />
                      )}
                      {isFixing ? '正在应用补丁...' : '一键自动修复'}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start pl-12">
              <div className="bg-slate-800 p-4 rounded-2xl rounded-bl-none border border-white/5 flex gap-1.5 items-center w-16 justify-center">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-duration:0.6s]"></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 底部输入框 */}
      <div className="p-6 bg-[#0f172a]/95 backdrop-blur-2xl border-t border-white/5 shrink-0">
        <div className="flex gap-4 max-w-4xl mx-auto">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="描述功能，AI 生成代码 (例如: 如何实现二段跳?)"
            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all font-medium text-sm focus:ring-1 focus:ring-indigo-500/50"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || isScanning || isFixing || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed font-bold flex items-center gap-2 group shadow-xl shadow-indigo-600/20 active:scale-95"
          >
            <Send className="w-4 h-4" />
            发送
          </button>
        </div>
        
        {/* 快捷提示词 */}
        <div className="flex justify-center flex-wrap gap-3 mt-4">
            {["如何实现二段跳？", "物体怎么跟随鼠标？", "角色移动抖动怎么办？"].map((q, i) => (
              <button 
                key={i} 
                onClick={() => { setInput(q); }} 
                className="text-[10px] font-bold text-slate-500 hover:text-indigo-400 transition-colors uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-lg border border-transparent hover:border-indigo-500/30"
              >
                {q}
              </button>
            ))}
        </div>
      </div>

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(600px); opacity: 0; }
        }
        .animate-scanline { animation: scanline 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        
        @keyframes radar-pulse {
          0% { transform: scale(0.1); opacity: 0.8; border-width: 2px; }
          100% { transform: scale(1.5); opacity: 0; border-width: 0px; }
        }
        .animate-radar-pulse { animation: radar-pulse 3s ease-out infinite; }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        
        @keyframes pulse-slow {
          0%, 100% { box-shadow: 0 0 0 rgba(255, 255, 255, 0); }
          50% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.2); }
        }
        .animate-pulse-slow { animation: pulse-slow 3s infinite; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default ChatDemo;