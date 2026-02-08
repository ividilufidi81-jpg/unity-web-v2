import { createClient } from '@supabase/supabase-js';

// 1. 这里我已经帮你填好了你的真实 URL (来自你的截图)
const supabaseUrl = "https://luhnrcinhopqnkhshtif.supabase.co";

// 2. 🚨 请把你的 Key 粘贴在下面引号里 (就是你之前复制的那一长串 sb_publishable... 或 eyJ...)
const supabaseAnonKey = "sb_publishable_RdP0B5E7IutHCvHPm72HYQ__j1V8K-2";

// 3. 创建客户端
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 调试信息：让你在控制台看到现在的配置
console.log("✅ 强制连接模式:", { url: supabaseUrl });
