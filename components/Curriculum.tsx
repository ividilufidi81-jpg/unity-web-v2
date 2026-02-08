
import React, { useState, useMemo } from 'react';
import PricingModal from './PricingModal';
import LessonView from './LessonView';

interface CurriculumProps {
  onSelectLesson: (lesson: any) => void;
  activeLesson: any | null;
  isVipUnlocked: boolean;
  onVipUnlock: () => void;
  isLoggedIn: boolean;
  onOpenAuth: (message?: string) => void;
}

const CHAPTER_DATA = [
  {
    id: "01",
    tag: "FREE / 免费解锁",
    title: "【第 1 章：工具觉醒】",
    content: "让 Cursor 接管你的 Unity，从此告别手写代码。学会针对 Unity API 的提示词工程。",
    isFree: true,
    episodes: [
      { title: "EP01. 环境配置：配置 Cursor 与 Unity 6 的完美共生", duration: "12:45" },
      { title: "EP02. 提示词工程：如何写出让 AI 一次性通过的“完美指令”？", duration: "15:20" }
    ],
    lessonData: {
      title: "工具觉醒：环境配置与提示词工程",
      subtitle: "EP01. 扔掉 Visual Studio：配置 Cursor 与 Unity 6 的完美共生",
      duration: "12:45",
      terminalPrompt: "请帮我生成一个基于 CharacterController 的第一人称移动脚本。要求包含 WASD 移动逻辑、平滑的重力处理，并提供详尽的中文注释。",
      takeaways: [
        "为何 Cursor + Claude 3.5 是 Unity 开发的神器？",
        "独家提示词公式：结构化输入，0 报错产出。",
        "实战：让 AI 为你重构一个陈旧的控制器脚本。"
      ],
      prompts: [
        { label: "初始化环境", text: "我正在使用 Unity 6。请在编写代码时优先使用最新的 API 规范。"},
        { label: "生成移动脚本", text: "创建一个名为 PlayerMovement 的脚本，实现 WASD 移动和空格跳跃。"}
      ]
    }
  },
  {
    id: "02",
    tag: "FREE / 免费解锁",
    title: "【第 2 章：零代码实战】",
    content: "不仅是代码：用 AI 生成无版权的游戏贴图与 UI 界面。10分钟跑通 Flappy Bird。",
    isFree: true,
    episodes: [
      { title: "EP03. 美术革命：AI 生成无缝贴图与 UI 资产", duration: "18:10" },
      { title: "EP04. 10分钟挑战：只用对话做一个“Flappy Bird”", duration: "20:45" }
    ],
    lessonData: {
      title: "零代码实战：美术资产与上帝视角",
      subtitle: "EP02. 上帝视角：0 素材开局，AI 帮你搭建整个世界",
      duration: "15:30",
      terminalPrompt: "我有一个名为 'BuildingPrefab' 的预制体。请帮我写一个 C# 脚本，名为 CityGenerator。要求：1. 在 Start() 中生成一个 10x10 的网格城市。2. 每个建筑的高度在 1 到 10 之间随机 (Random.Range)。3. 为不同的高度设置不同的颜色（比如高楼是红色，低楼是蓝色）。4. 代码要包含详细的中文注释。",
      takeaways: [
        "0 素材起号：如何用 AI 生成无缝贴图 (Seamless Textures) 并应用到白模上。",
        "程序化生成：学会用 Instantiate 和循环语句，让代码替你“摆积木”。",
        "天空盒魔法：一键生成 8K 分辨率的游戏天空背景 (Skybox)。"
      ],
      prompts: [
        { label: "程序化城市生成", text: "帮我写一个 CityGenerator 脚本，在 10x10 网格中随机高度生成建筑预制体并染色。" },
        { label: "AI 贴图指令", text: "描述一个赛博朋克风格的金属地板纹理，要求是 2048x2048 的无缝贴图。" },
        { label: "AI 贴图指令", text: "生成一个带有霓虹灯光和紫色星云的 360 度全景天空盒贴图。" }
      ]
    }
  },
  {
    id: "03",
    tag: "PRO / 会员专享",
    title: "【第 3 章：赋予灵魂】",
    content: "恭喜解锁会员内容！本章将带你进入真正的游戏开发深水区。我们将利用 Cursor 构建一套完整的 AI 状态机，让你的 NPC 拥有思考能力。",
    isFree: false,
    episodes: [
      { title: "EP05. 赋予灵魂：用 AI 构建高智商敌人 (Agentic AI)", duration: "28:45" },
      { title: "EP06. 商业化：让 AI 帮你写 Steam 上架文案", duration: "22:15" }
    ],
    lessonData: {
      title: "进阶逻辑：Agentic AI 敌人系统",
      subtitle: "EP03. 赋予灵魂：用 AI 构建高智商敌人 (Agentic AI)",
      duration: "28:45",
      terminalPrompt: "请帮我写一个高级的 EnemyAI 脚本，使用 Switch-Case 实现有限状态机 (FSM)。要求：1. 定义枚举状态：Idle (待机), Patrol (巡逻), Chase (追逐), Attack (攻击)。2. 引入 NavMeshAgent 组件实现自动寻路。3. 逻辑要求：- 巡逻：在 3 个随机点之间移动。- 追逐：当玩家进入 10米 范围内时切换为追逐。- 攻击：距离小于 2米 时停下攻击。4. 代码需要极高的可读性，并包含 Debug.DrawLine 来可视化视线。",
      takeaways: [
        "状态机架构 (FSM)：不写面条代码，像架构师一样管理复杂的 AI 行为。",
        "自动寻路 (NavMesh)：教你用一行代码调用 Unity 的寻路系统，让敌人自动避障。",
        "可视化调试：让 AI 帮你画出敌人的“视线”和“巡逻路径”，Debug 不再靠猜。"
      ],
      prompts: [
        { label: "状态机逻辑", text: "为 EnemyAI 增加一个 'Flee' (逃跑) 状态，当生命值低于 20% 时触发。" },
        { label: "巡逻点算法", text: "编写一个方法，在当前位置 20 米范围内随机寻找一个可到达的 NavMesh 坐标点。" },
        { label: "攻击动画触发", text: "在 Attack 状态下，通过代码触发 Animator 中的 'Attack' 触发器并播放音效。" }
      ],
      videoUrl: "https://player.bilibili.com/player.html?bvid=BV1uv4y1q7vD&high_quality=1"
    }
  }
];

const Curriculum: React.FC<CurriculumProps> = ({ 
  onSelectLesson, 
  activeLesson, 
  isVipUnlocked, 
  onVipUnlock, 
  isLoggedIn,
  onOpenAuth
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const chapters = useMemo(() => {
    return CHAPTER_DATA.map(ch => ({
      ...ch,
      isUnlocked: ch.isFree || isVipUnlocked,
      tag: ch.isFree ? "FREE / 免费解锁" : (isVipUnlocked ? "PRO / 已永久解锁" : "PRO / 会员专享")
    }));
  }, [isVipUnlocked]);

  const handleAction = (index: number) => {
    const chapter = chapters[index];
    
    // 权限检查
    if (!isLoggedIn) {
      // 支付按钮点击时特别提示
      const message = !chapter.isFree ? "为了防止订单丢失，请先注册或登录账号。" : "登录后即可免费保存学习进度。";
      onOpenAuth(message);
      return;
    }

    if (!chapter.isUnlocked) {
      setIsModalOpen(true);
    } else {
      onSelectLesson(chapter.lessonData);
    }
  };

  const nextLesson = () => {
    const currentIndex = chapters.findIndex(ch => ch.lessonData?.title === activeLesson?.title);
    if (currentIndex !== -1 && currentIndex < chapters.length - 1) {
      const nextCh = chapters[currentIndex + 1];
      if (nextCh.isUnlocked) {
        onSelectLesson(nextCh.lessonData);
      } else {
        onSelectLesson(null);
        setIsModalOpen(true);
      }
    } else {
      onSelectLesson(null);
    }
  };

  return (
    <div id="curriculum" className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">实战课程大纲</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">从小白到独立开发者的 AI 进化路径</p>
      </div>

      <div className="space-y-8">
        {chapters.map((ch, idx) => {
          return (
            <div 
              key={ch.id} 
              onClick={() => handleAction(idx)}
              className={`group relative p-8 md:p-10 rounded-[2.5rem] border transition-all cursor-pointer ${
                ch.isUnlocked
                  ? 'bg-slate-900/40 border-indigo-500/20 hover:border-indigo-500/50 hover:bg-slate-900/60 shadow-xl' 
                  : 'bg-slate-950/80 border-white/5 opacity-80 hover:opacity-100 hover:border-indigo-500/30'
              }`}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex gap-8 items-start flex-1">
                  <span className="text-6xl font-black text-indigo-500/10 group-hover:text-indigo-500/30 transition-colors leading-none shrink-0">{ch.id}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${ch.isUnlocked ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-500 border-white/5'}`}>
                        {ch.tag}
                      </span>
                      {!ch.isUnlocked && (
                        <span className="text-xs text-indigo-400/60 font-bold">🔒 支付 ¥90 解锁进阶大厂逻辑</span>
                      )}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-3">{ch.title}</h3>
                    <p className="text-slate-400 text-sm md:text-base mb-6 leading-relaxed max-w-3xl">{ch.content}</p>
                    <div className="flex flex-wrap gap-3">
                      {ch.episodes?.map((ep, i) => (
                        <span key={i} className="text-[10px] font-bold text-slate-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 group-hover:border-white/10 transition-colors">● {ep.title}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="shrink-0">
                  <button className={`min-w-[140px] px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all whitespace-nowrap ${
                    ch.isUnlocked 
                      ? 'bg-indigo-600 text-white shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95' 
                      : 'bg-slate-800 text-slate-500 border border-white/5 group-hover:bg-slate-700 group-hover:text-slate-300'
                  }`}>
                    {ch.isUnlocked ? '立即学习' : '立即解锁专享'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <PricingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => {
          onVipUnlock();
        }}
      />
      
      {activeLesson && (
        <LessonView 
          data={activeLesson as any} 
          onClose={() => onSelectLesson(null)}
          onNext={nextLesson}
          hasMore={chapters.findIndex(ch => ch.lessonData?.title === activeLesson?.title) < chapters.length - 1}
        />
      )}
    </div>
  );
};

export default Curriculum;
