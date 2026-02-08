
import React, { useState, useEffect } from 'react';

interface MockUser {
  id: string;
  email: string;
  user_metadata: { username: string };
  is_vip: boolean;
  created_at: string;
}

const AdminDashboard: React.FC<{ user: any, onBack: () => void }> = ({ user, onBack }) => {
  const [users, setUsers] = useState<MockUser[]>([]);
  const [filter, setFilter] = useState('');
  
  const ADMIN_EMAIL = "2733945210@qq.com";

  useEffect(() => {
    // 强制鉴权
    if (user.email !== ADMIN_EMAIL) {
      onBack();
      return;
    }

    const loadUsers = () => {
      const data = localStorage.getItem('unity_ai_mock_users_list');
      if (data) setUsers(JSON.parse(data));
    };
    loadUsers();
  }, [user, onBack]);

  const toggleVip = (email: string) => {
    const updated = users.map(u => u.email === email ? { ...u, is_vip: !u.is_vip } : u);
    setUsers(updated);
    localStorage.setItem('unity_ai_mock_users_list', JSON.stringify(updated));
    
    // 如果是当前用户本人，同步更新当前 Session
    const current = JSON.parse(localStorage.getItem('unity_ai_mock_user') || '{}');
    if (current.email === email) {
      current.is_vip = !current.is_vip;
      localStorage.setItem('unity_ai_mock_user', JSON.stringify(current));
    }
    
    window.dispatchEvent(new Event('storage'));
  };

  const deleteUser = (email: string) => {
    if (!confirm(`确定要永久注销用户 ${email} 吗？`)) return;
    const updated = users.filter(u => u.email !== email);
    setUsers(updated);
    localStorage.setItem('unity_ai_mock_users_list', JSON.stringify(updated));
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(filter.toLowerCase()) || 
    u.user_metadata.username.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 p-8 md:p-12 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-slate-400 hover:text-white"
            >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            </button>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                全栈商业系统后台 <span className="text-xs font-black uppercase tracking-[0.3em] px-2 py-1 bg-indigo-600 rounded">Admin Only</span>
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-bold">管理本地模拟数据库中存储的所有注册用户</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <input 
                type="text" 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="搜索用户或邮箱..."
                className="bg-slate-900 border border-white/10 rounded-xl px-10 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all w-64"
              />
              <svg className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <button 
              onClick={() => { localStorage.removeItem('unity_ai_mock_users_list'); setUsers([]); }}
              className="px-6 py-3 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-red-500/20"
            >
              重置数据库
            </button>
          </div>
        </div>

        <div className="glass rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900/50 border-b border-white/5">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">用户信息 / User</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">权限状态 / Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">注册时间 / Joined</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">操作 / Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.length > 0 ? filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white ${u.is_vip ? 'bg-indigo-600 shadow-lg shadow-indigo-600/20' : 'bg-slate-800'}`}>
                          {u.user_metadata.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm">{u.user_metadata.username}</div>
                          <div className="text-slate-500 text-xs font-medium">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      {u.is_vip ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black text-indigo-400 uppercase tracking-widest">
                          <span className="w-1 h-1 rounded-full bg-indigo-400 animate-pulse"></span>
                          VIP MEMBER
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                          FREE PLAN
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-slate-400 text-xs font-mono">
                      {new Date(u.created_at).toLocaleString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => toggleVip(u.email)}
                            className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${u.is_vip ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
                          >
                            {u.is_vip ? '取消 VIP' : '一键开通 VIP'}
                          </button>
                          <button 
                            onClick={() => deleteUser(u.email)}
                            className="w-8 h-8 rounded-lg bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                       </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center text-slate-500 font-bold italic">
                      暂无注册用户数据
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
