// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ShoppingCart, Package, Minus, Plus, MessageCircle, ArrowLeft } from 'lucide-react';

export function BuySection({
  product,
  userType = 'C',
  onAddToCart,
  onBuyNow,
  onSwitchToB,
  onSwitchToC,
  largeFontMode = false
}) {
  const [quantity, setQuantity] = useState(1);
  const [showB2BEntry, setShowB2BEntry] = useState(false);

  // 零售价格
  const retailPrice = product?.retailPrice || product?.price || 128;
  const originalPrice = product?.originalPrice || retailPrice * 1.3;

  // B端批发阶梯价
  const b2bTiers = [{
    minQty: 10,
    maxQty: 49,
    price: retailPrice * 0.8,
    label: '10件起'
  }, {
    minQty: 50,
    maxQty: 99,
    price: retailPrice * 0.7,
    label: '50件起'
  }, {
    minQty: 100,
    maxQty: null,
    price: retailPrice * 0.6,
    label: '100件起'
  }];
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };
  const increaseQty = () => {
    setQuantity(prev => prev + 1);
  };

  // 根据数量计算B端价格
  const getB2BPrice = () => {
    for (const tier of b2bTiers) {
      if (quantity >= tier.minQty && (!tier.maxQty || quantity <= tier.maxQty)) {
        return tier.price;
      }
    }
    return b2bTiers[b2bTiers.length - 1].price;
  };
  const isB2B = userType === 'B';
  const currentPrice = isB2B ? getB2BPrice() : retailPrice;
  return <div className={`bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] border-t border-[#E8E0D5] ${largeFontMode ? 'p-5' : 'p-4'}`}>
      {/* 价格信息区 */}
      <div className={`flex items-end justify-between mb-4 ${largeFontMode ? 'mb-5' : ''}`}>
        <div>
          <div className="flex items-baseline gap-2">
            <span className={`font-bold text-[#A85C4A] ${largeFontMode ? 'text-2xl' : 'text-xl'}`}>
              ¥{currentPrice.toFixed(0)}
            </span>
            {isB2B ? <span className={`text-[#8B7355] ${largeFontMode ? 'text-sm' : 'text-xs'}`}>
                /件 ({quantity}件)
              </span> : <span className={`text-[#8B7355] line-through ${largeFontMode ? 'text-sm' : 'text-xs'}`}>
                ¥{originalPrice.toFixed(0)}
              </span>}
          </div>
          {isB2B && <p className={`text-[#5D8A66] ${largeFontMode ? 'text-xs' : 'text-[10px]'} mt-1`}>
              批发价·量大从优
            </p>}
        </div>
        
        {/* C/B端切换提示 */}
        <button onClick={() => isB2B ? onSwitchToC?.() : onSwitchToB?.()} className={`px-3 py-1.5 bg-[#5D8A66]/10 text-[#5D8A66] rounded-full ${largeFontMode ? 'text-sm' : 'text-xs'} font-medium hover:bg-[#5D8A66]/20 transition-colors`}>
          {isB2B ? '切换C端零售' : '切换B端批发'}
        </button>
      </div>
      
      {/* B端阶梯价展示 */}
      {isB2B && <div className={`mb-4 p-3 bg-[#F5EFE6] rounded-xl ${largeFontMode ? 'p-4 mb-5' : ''}`}>
          <p className={`text-[#5C4033] ${largeFontMode ? 'text-sm' : 'text-xs'} mb-2 font-medium`}>
            批发阶梯价（请选择数量）
          </p>
          <div className="flex gap-2">
            {b2bTiers.map((tier, index) => <div key={index} className={`flex-1 p-2 bg-white rounded-lg text-center ${quantity >= tier.minQty ? 'ring-2 ring-[#5D8A66]' : ''}`}>
                <p className={`text-[#A85C4A] ${largeFontMode ? 'text-sm' : 'text-xs'} font-bold`}>
                  ¥{tier.price.toFixed(0)}
                </p>
                <p className={`text-[#8B7355] ${largeFontMode ? 'text-xs' : 'text-[10px]'}`}>
                  {tier.label}
                </p>
              </div>)}
          </div>
        </div>}
      
      {/* 数量选择 */}
      <div className={`flex items-center justify-between mb-4 ${largeFontMode ? 'mb-5' : ''}`}>
        <span className={`text-[#5C4033] ${largeFontMode ? 'text-base' : 'text-sm'}`}>
          购买数量
        </span>
        <div className="flex items-center gap-3">
          <button onClick={decreaseQty} className={`w-10 h-10 bg-[#F5EFE6] rounded-full flex items-center justify-center hover:bg-[#E8E0D5] transition-colors ${largeFontMode ? 'w-12 h-12' : ''}`} disabled={quantity <= 1}>
            <Minus className={`w-4 h-4 text-[#5C4033] ${quantity <= 1 ? 'opacity-30' : ''}`} />
          </button>
          <span className={`w-16 text-center font-medium text-[#5C4033] ${largeFontMode ? 'text-xl' : 'text-base'}`}>
            {quantity}
          </span>
          <button onClick={increaseQty} className={`w-10 h-10 bg-[#5D8A66] rounded-full flex items-center justify-center hover:bg-[#4A7053] transition-colors ${largeFontMode ? 'w-12 h-12' : ''}`}>
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
      
      {/* B端特殊入口 */}
      {isB2B && <div className={`mb-4 p-3 bg-[#5D8A66]/5 rounded-xl ${largeFontMode ? 'p-4 mb-5' : ''}`}>
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#5D8A66]" />
            <div className="flex-1">
              <p className={`text-[#5C4033] ${largeFontMode ? 'text-sm' : 'text-xs'} font-medium`}>
                经销商专属服务
              </p>
              <p className={`text-[#8B7355] ${largeFontMode ? 'text-xs' : 'text-[10px]'}`}>
                支持批量采购、发票申请、门店自提
              </p>
            </div>
            <button className={`text-[#5D8A66] ${largeFontMode ? 'text-sm' : 'text-xs'} font-medium`}>
              了解更多
            </button>
          </div>
        </div>}
      
      {/* 底部操作按钮 */}
      <div className="flex gap-3">
        <button onClick={onAddToCart} className={`flex-1 py-4 rounded-full flex items-center justify-center gap-2 bg-[#F5EFE6] text-[#5C4033] font-medium ${largeFontMode ? 'text-base py-5' : 'text-sm'} hover:bg-[#E8E0D5] transition-colors`}>
          <ShoppingCart className="w-5 h-5" />
          <span>加入购物车</span>
        </button>
        <button onClick={onBuyNow} className={`flex-1 py-4 rounded-full flex items-center justify-center gap-2 bg-[#5D8A66] text-white font-medium ${largeFontMode ? 'text-base py-5' : 'text-sm'} hover:bg-[#4A7053] transition-colors`}>
          <span>{isB2B ? '立即采购' : '立即购买'}</span>
        </button>
        <button className={`w-14 h-14 bg-[#A85C4A]/10 rounded-full flex items-center justify-center ${largeFontMode ? 'w-16 h-16' : ''}`}>
          <MessageCircle className={`w-6 h-6 text-[#A85C4A] ${largeFontMode ? 'w-7 h-7' : ''}`} />
        </button>
      </div>
    </div>;
}