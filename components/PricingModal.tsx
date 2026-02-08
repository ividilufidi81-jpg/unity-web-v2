
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [activationCode, setActivationCode] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleUnlock = async () => {
    // 1. 校验激活码 (不区分大小写)
    if (activationCode.trim().toUpperCase() !== 'VIP2026') {
      alert('❌ 激活码错误！请检查或联系管理员获取。');
      return;
    }

    setLoading(true);

    try {
      // 2. 获取当前用户
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert('⚠️ 请先登录账号，再进行激活操作！');
        setLoading(false);
        return;
      }

      // 3. 更新数据库
      const { error } = await supabase
        .from('profiles')
        .update({ is_vip: true })
        .eq('id', user.id);

      if (error) throw error;

      // 同步更新本地模拟缓存（如果存在）
      const savedMockUser = localStorage.getItem('unity_ai_mock_user');
      if (savedMockUser) {
        const data = JSON.parse(savedMockUser);
        data.is_vip = true;
        localStorage.setItem('unity_ai_mock_user', JSON.stringify(data));
      }

      // 4. 成功后的动作 (不刷新页面，防止崩溃)
      alert('🎉 激活成功！您已获得永久 VIP 权限！\n(请刷新页面或点击下方确定后查看金色图标)');
      
      if (onSuccess) onSuccess();
      onClose();
      
    } catch (error: any) {
      console.error('Error:', error);
      alert('激活失败，请重试。错误信息：' + (error.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 rounded-[2.5rem] border border-slate-700 shadow-2xl overflow-hidden">
        
        {/* 关闭按钮 */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors p-2 z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div className="p-8 text-center">
          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">解锁全套课程</h2>
          <p className="text-slate-400 text-sm mb-8">获取完整源码 + AI 实战工作流 + 导师答疑</p>

          {/* 收款码区域 */}
          <div className="bg-white p-3 rounded-2xl w-48 h-48 mx-auto mb-6 shadow-inner flex items-center justify-center overflow-hidden border border-white/10">
            <img 
              src="https://i.postimg.cc/tTbbnCVr/shou-kuan.jpg" 
              alt="Payment QR Code" 
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent) {
                  parent.innerText = '收款码加载失败，请联系管理员';
                  parent.className = "p-4 text-xs text-slate-500 italic flex items-center justify-center text-center";
                }
              }}
            />
          </div>

          <div className="space-y-2 mb-8">
            <p className="text-yellow-400 font-black text-lg">🔥 开通请添加管理员微信</p>
            <p className="text-white text-xl font-mono select-all">微信号：s1903940246</p>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">(备注：开通课程)</p>
          </div>

          {/* 激活码输入框 */}
          <div className="mb-6">
            <input 
              type="text" 
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value)}
              placeholder="请输入激活码 (VIP2026)"
              className="w-full px-4 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-center tracking-widest font-mono text-sm transition-all uppercase"
            />
          </div>

          {/* 激活按钮 */}
          <button
            onClick={handleUnlock}
            disabled={loading || !activationCode}
            className={`w-full py-5 rounded-2xl font-black text-white transition-all text-sm uppercase tracking-widest
              ${loading || !activationCode 
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] shadow-xl shadow-indigo-600/20 active:scale-95'
              }`}
          >
            {loading ? '正在激活...' : '输入激活码，立即解锁'}
          </button>

          <p className="mt-6 text-[10px] text-slate-600 font-medium">
            虚拟商品发货后不支持退款 | 遇到问题请联系管理员
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
