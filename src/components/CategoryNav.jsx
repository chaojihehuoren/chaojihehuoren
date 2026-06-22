// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Circle, Calendar, Leaf, Heart } from 'lucide-react';

const iconMap = {
  Circle: Circle,
  Calendar: Calendar,
  Leaf: Leaf,
  Heart: Heart
};
export function CategoryNav({
  categories,
  onCategoryClick
}) {
  return <div className="grid grid-cols-4 gap-3">
      {categories.map((category, index) => {
      const IconComponent = iconMap[category.icon] || Leaf;
      return <button key={category.id} onClick={() => onCategoryClick(category)} className={`
              relative flex flex-col items-center p-4 rounded-2xl 
              transition-all duration-300 ease-out
              hover:scale-105 active:scale-95
              ${index % 2 === 0 ? 'bg-gradient-to-br from-[#E8F0E4] to-[#F5F0E8]' : 'bg-gradient-to-br from-[#F5EDE4] to-[#FAF6F0]'}
            `} style={{
        boxShadow: '0 2px 8px rgba(93, 138, 102, 0.1)'
      }}>
            {/* 图标容器 */}
            <div className={`
              w-12 h-12 rounded-xl mb-2 flex items-center justify-center
              ${index % 2 === 0 ? 'bg-[#5D8A66]/10' : 'bg-[#C4A77D]/15'}
            `}>
              <IconComponent className={`w-6 h-6 ${index % 2 === 0 ? 'text-[#5D8A66]' : 'text-[#C4A77D]'}`} />
            </div>
            
            {/* 分类名称 */}
            <span className="text-sm font-medium text-[#5C4033] mb-1">
              {category.name}
            </span>
            
            {/* 描述文字 */}
            <span className="text-xs text-[#8B7355] text-center leading-tight">
              {category.desc}
            </span>

            {/* 装饰角标 */}
            <div className={`
              absolute top-2 right-2 w-2 h-2 rounded-full
              ${index % 2 === 0 ? 'bg-[#5D8A66]/40' : 'bg-[#C4A77D]/40'}
            `} />
          </button>;
    })}
    </div>;
}