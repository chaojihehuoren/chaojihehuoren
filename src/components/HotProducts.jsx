// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { TrendingUp, ChevronRight, Star } from 'lucide-react';

export function HotProducts({
  products,
  onProductClick
}) {
  return <div>
      {/* 标题区 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#A85C4A] to-[#C4A77D] rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-serif text-[#5C4033]">热销爆款</h2>
        </div>
        <button className="flex items-center gap-1 text-sm text-[#8B7355] hover:text-[#5D8A66] transition-colors">
          <span>查看更多</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 商品列表 - 非对称网格 */}
      <div className="grid grid-cols-2 gap-4">
        {products.map((product, index) => <button key={product.id} onClick={() => onProductClick(product)} className={`
              relative bg-white rounded-2xl overflow-hidden transition-all duration-300
              hover:shadow-lg active:scale-98
              ${index === 0 ? 'row-span-2' : ''}
            `} style={{
        boxShadow: '0 2px 12px rgba(92, 64, 51, 0.08)'
      }}>
            {/* 商品图片 */}
            <div className={`relative ${index === 0 ? 'h-52' : 'h-36'} overflow-hidden`}>
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              
              {/* 销量标签 */}
              <div className="absolute top-2 left-2 bg-[#A85C4A]/90 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>已售 {product.sales}</span>
              </div>

              {/* 限时折扣 */}
              {product.originalPrice > product.price && <div className="absolute top-2 right-2 bg-[#5D8A66] text-white text-xs px-2 py-1 rounded-full">
                  特惠
                </div>}
            </div>

            {/* 商品信息 */}
            <div className="p-3 text-left">
              <h3 className="text-sm font-medium text-[#5C4033] mb-1 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-xs text-[#8B7355] mb-2 line-clamp-1">
                {product.subtitle}
              </p>
              
              {/* 价格信息 */}
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-semibold text-[#A85C4A]">
                  ¥{product.price}
                </span>
                {product.originalPrice > product.price && <span className="text-xs text-[#8B7355] line-through">
                    ¥{product.originalPrice}
                  </span>}
              </div>

              {/* 评分 */}
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-3 h-3 text-[#C4A77D] fill-[#C4A77D]" />
                <span className="text-xs text-[#8B7355]">4.8</span>
              </div>
            </div>
          </button>)}
      </div>
    </div>;
}