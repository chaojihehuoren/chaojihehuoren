// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ProductGallery({
  images = [],
  productName = ''
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const defaultImages = ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?w=600&h=600&fit=crop'];
  const displayImages = images.length > 0 ? images : defaultImages;
  const handlePrev = () => {
    setCurrentIndex(prev => prev === 0 ? displayImages.length - 1 : prev - 1);
  };
  const handleNext = () => {
    setCurrentIndex(prev => prev === displayImages.length - 1 ? 0 : prev + 1);
  };
  return <div className="relative">
      {/* 主图展示区 - 国风卷轴样式 */}
      <div className="relative bg-gradient-to-b from-[#F5EFE6] to-[#FAF6F0] rounded-b-3xl overflow-hidden">
        {/* 国风装饰边框 */}
        <div className="absolute inset-x-4 top-4 bottom-4 border-2 border-[#C4A77D]/30 rounded-lg pointer-events-none" />
        <div className="absolute inset-x-6 top-6 bottom-6 border border-[#C4A77D]/20 rounded-lg pointer-events-none" />
        
        {/* 主图 */}
        <div className="relative aspect-square">
          <img src={displayImages[currentIndex]} alt={`${productName} - 图片${currentIndex + 1}`} className="w-full h-full object-cover" />
          
          {/* 左右切换按钮 */}
          {displayImages.length > 1 && <>
            <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
              <ChevronLeft className="w-6 h-6 text-[#5C4033]" />
            </button>
            <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
              <ChevronRight className="w-6 h-6 text-[#5C4033]" />
            </button>
          </>}
          
          {/* 国风装饰角标 */}
          <div className="absolute top-6 left-6 px-3 py-1 bg-[#5D8A66] text-white text-xs rounded-full">
            道地药材
          </div>
        </div>
        
        {/* 图片指示器 */}
        <div className="flex justify-center gap-2 py-4">
          {displayImages.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-[#5D8A66] w-6' : 'bg-[#C4A77D]/40'}`} />)}
        </div>
        
        {/* 底部装饰线 */}
        <div className="h-2 bg-gradient-to-r from-transparent via-[#C4A77D]/30 to-transparent" />
      </div>
    </div>;
}