// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { ArrowLeft, Share2, Collection } from 'lucide-react';

export function ProductDetailHeader({
  productName = '',
  onBack
}) {
  return <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E8E0D5]">
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5EFE6] hover:bg-[#E8E0D5] transition-colors">
          <ArrowLeft className="w-5 h-5 text-[#5C4033]" />
        </button>
        <h1 className="flex-1 text-center font-serif text-[#5C4033] text-base truncate px-4">
          {productName || '商品详情'}
        </h1>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5EFE6] hover:bg-[#E8E0D5] transition-colors">
            <Share2 className="w-5 h-5 text-[#5C4033]" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5EFE6] hover:bg-[#E8E0D5] transition-colors">
            <Collection className="w-5 h-5 text-[#5C4033]" />
          </button>
        </div>
      </div>
    </div>;
}