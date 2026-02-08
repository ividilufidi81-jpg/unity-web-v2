
import React from 'react';

const PainPoints: React.FC = () => {
  const points = [
    {
      title: "C# 语法劝退",
      bad: "背不完的变量、类、接口，还没开始做游戏就倒在了“Hello World”。",
      good: "不写代码，只审阅代码：教你用自然语言指挥 Cursor 编写 3A 级逻辑。",
      icon: "❌"
    },
    {
      title: "素材到处找",
      bad: "模型、贴图、音效，要么太贵，要么版权纠纷。素材荒是独立开发者的噩梦。",
      good: "一人成团：教你用生成式 AI (Stable Diffusion/Meshy) 搞定美术和音乐。",
      icon: "❌"
    },
    {
      title: "报错修不好",
      bad: "一个红字报错卡三天，百度搜不到，最后无奈放弃。感觉没有天赋。",
      good: "你的 24 小时导师：学会构建自己的 AI 知识库，报错秒级诊断并修复。",
      icon: "❌"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-24">
        <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
          为什么你买了那么多教程，<br />
          <span className="text-slate-500">却还是做不出游戏？</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {points.map((point, idx) => (
          <div key={idx} className="group glass rounded-[2.5rem] p-10 border border-white/5 hover:border-indigo-500/20 transition-all flex flex-col h-full">
            <div className="text-4xl mb-6">{point.icon}</div>
            <h3 className="text-2xl font-black text-white mb-4">{point.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
              {point.bad}
            </p>
            <div className="mt-auto pt-8 border-t border-white/5">
              <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3">The AI Way:</div>
              <p className="text-slate-200 text-sm font-bold leading-relaxed">
                {point.good}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-28 p-12 glass rounded-[2.5rem] text-center border-indigo-500/20 relative overflow-hidden group">
        <div className="absolute inset-0 bg-indigo-600/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-[2s]"></div>
        <p className="text-xl md:text-3xl font-medium text-slate-300 relative z-10">
          核心理念：<span className="text-indigo-400 font-black tracking-tight underline underline-offset-8">AI 负责技术细节，你负责伟大的创意。</span>
        </p>
      </div>
    </div>
  );
};

export default PainPoints;
