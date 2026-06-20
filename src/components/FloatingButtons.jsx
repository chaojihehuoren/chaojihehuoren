// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { MessageCircle, Home, ArrowUp } from 'lucide-react';

export function FloatingButtons() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const openCustomerService = () => {
    // 模拟打开客服
    console.log('打开客服');
  };
  return <div className="fixed right-4 bottom-24 flex flex-col gap-3 z-30">
      {/* 返回顶部 */}
      <button onClick={scrollToTop} className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:bg-white active:scale-95" style={{
      boxShadow: '0 4px 12px rgba(92, 64, 51, 0.15)'
    }}>
        <ArrowUp className="w-5 h-5 text-[#5C4033]" />
      </button>

      {/* 一键客服 */}
      <button onClick={openCustomerService} className="relative w-12 h-12 bg-gradient-to-br from-[#5D8A66] to-[#6B9B76] rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95" style={{
      boxShadow: '0 4px 12px rgba(93, 138, 102, 0.3)'
    }}>
        <MessageCircle className="w-6 h-6 text-white" />
        
        {/* 在线状态指示 */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </button>
    </div>;
}