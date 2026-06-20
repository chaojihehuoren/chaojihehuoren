// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Sparkles, Search, Bell } from 'lucide-react';

export function Banner() {
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = () => {
    console.log('搜索:', searchValue);
  };
  return <div className="relative bg-gradient-to-br from-[#5D8A66] via-[#6B9B76] to-[#7AAB86] px-4 pt-12 pb-8 rounded-b-3xl overflow-hidden">
      {/* 国风装饰元素 */}
      <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="150" cy="50" r="80" fill="#fff" />
          <path d="M50 180 Q100 100 180 150" stroke="#fff" strokeWidth="2" fill="none" />
          <circle cx="100" cy="100" r="30" fill="none" stroke="#fff" strokeWidth="1" />
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M10 80 Q50 20 90 60" stroke="#fff" strokeWidth="3" fill="none" />
          <circle cx="30" cy="40" r="15" fill="none" stroke="#fff" strokeWidth="1" />
        </svg>
      </div>

      {/* 顶部状态栏占位 */}
      <div className="h-8" />

      {/* 品牌信息 */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {/* 品牌 Logo */}
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-serif text-white tracking-wider">食愈空间站</h1>
              <p className="text-xs text-white/80">药食同源 · 顺时养生</p>
            </div>
          </div>
          
          {/* 通知图标 */}
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* 搜索框 */}
        <div className="relative">
          <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder="搜索人参、黄芪、枸杞..." className="w-full h-12 pl-12 pr-4 bg-white/90 backdrop-blur-sm rounded-full text-sm text-[#5C4033] placeholder-[#8B7355] focus:outline-none focus:ring-2 focus:ring-white/50" />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
        </div>
      </div>

      {/* 底部波浪装饰 */}
      <div className="absolute bottom-0 left-0 right-0 h-4">
        <svg viewBox="0 0 375 16" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 16 Q93.75 0 187.5 8 T375 0 V16 H0Z" fill="#FAF6F0" />
        </svg>
      </div>
    </div>;
}