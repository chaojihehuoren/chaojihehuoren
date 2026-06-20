// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, Compass, ShoppingCart, User, Leaf } from 'lucide-react';

const tabs = [{
  id: 'home',
  label: '首页',
  icon: Home
}, {
  id: 'category',
  label: '分类',
  icon: Compass
}, {
  id: 'cart',
  label: '购物车',
  icon: ShoppingCart
}, {
  id: 'user',
  label: '我的',
  icon: User
}];
export function TabBar({
  activeTab = 'home'
}) {
  const handleTabClick = tabId => {
    // 使用路由导航
    window.location.hash = `#/${tabId}`;
  };
  return <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-[#E8E0D5] z-40 safe-area-bottom">
      {/* iOS 安全区域 */}
      <div className="h-safe-area-inset-bottom bg-white" />
      
      <div className="flex items-center justify-around py-2 px-4">
        {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return <button key={tab.id} onClick={() => handleTabClick(tab.id)} className={`
                flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200
                ${isActive ? 'text-[#5D8A66]' : 'text-[#8B7355] hover:text-[#5C4033]'}
              `}>
              <div className={`
                p-1.5 rounded-xl transition-colors
                ${isActive ? 'bg-[#5D8A66]/10' : ''}
              `}>
                <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : ''}`} />
              </div>
              <span className={`text-xs mt-1 font-medium ${isActive ? 'text-[#5D8A66]' : ''}`}>
                {tab.label}
              </span>
              
              {/* 选中指示器 */}
              {isActive && <div className="absolute bottom-1 w-1 h-1 bg-[#5D8A66] rounded-full" />}
            </button>;
      })}
      </div>
    </div>;
}