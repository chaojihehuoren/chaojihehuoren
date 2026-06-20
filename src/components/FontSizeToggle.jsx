// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Type, Minus, Plus } from 'lucide-react';

export function FontSizeToggle({
  isLarge,
  onToggle
}) {
  return <button onClick={onToggle} className={`fixed right-4 z-40 flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-lg border border-[#E8E0D5] transition-all ${isLarge ? 'top-28' : 'top-32'}`}>
    <Type className={`w-4 h-4 ${isLarge ? 'text-[#5D8A66]' : 'text-[#8B7355]'}`} />
    <span className={`text-xs font-medium ${isLarge ? 'text-[#5D8A66]' : 'text-[#8B7355]'}`}>
      {isLarge ? '大字体' : '标准'}
    </span>
  </button>;
}