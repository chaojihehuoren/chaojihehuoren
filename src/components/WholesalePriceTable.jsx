// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ChevronDown, ChevronUp, Plus, Minus, ShoppingCart } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

const PRODUCTS = [{
  id: 'P001',
  name: '野生黄芪片 250g',
  spec: '250g/罐',
  origin: '甘肃陇西',
  retailPrice: 68,
  image: 'https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=200&h=200&fit=crop',
  tiers: [{
    min: 10,
    max: 49,
    price: 52,
    discount: '7.6折'
  }, {
    min: 50,
    max: 99,
    price: 45,
    discount: '6.6折'
  }, {
    min: 100,
    max: null,
    price: 38,
    discount: '5.6折'
  }]
}, {
  id: 'P002',
  name: '宁夏枸杞原浆 30ml×10',
  spec: '30ml×10支/盒',
  origin: '宁夏中卫',
  retailPrice: 128,
  image: 'https://images.unsplash.com/photo-1583720385346-18d1d3e9e68f?w=200&h=200&fit=crop',
  tiers: [{
    min: 10,
    max: 49,
    price: 98,
    discount: '7.7折'
  }, {
    min: 50,
    max: 99,
    price: 85,
    discount: '6.6折'
  }, {
    min: 100,
    max: null,
    price: 72,
    discount: '5.6折'
  }]
}, {
  id: 'P003',
  name: '西洋参切片 100g',
  spec: '100g/罐',
  origin: '吉林长白山',
  retailPrice: 198,
  image: 'https://images.unsplash.com/photo-1563234455-324ac9e17cf4?w=200&h=200&fit=crop',
  tiers: [{
    min: 10,
    max: 49,
    price: 158,
    discount: '8折'
  }, {
    min: 50,
    max: 99,
    price: 138,
    discount: '7折'
  }, {
    min: 100,
    max: null,
    price: 118,
    discount: '6折'
  }]
}, {
  id: 'P004',
  name: '红豆薏米茶 30包/盒',
  spec: '30包/盒',
  origin: '贵州黔东南',
  retailPrice: 45,
  image: 'https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=200&h=200&fit=crop',
  tiers: [{
    min: 50,
    max: 99,
    price: 32,
    discount: '7.1折'
  }, {
    min: 100,
    max: 499,
    price: 27,
    discount: '6折'
  }, {
    min: 500,
    max: null,
    price: 22,
    discount: '4.9折'
  }]
}];
export function WholesalePriceTable({
  onAddToCart
}) {
  const {
    toast
  } = useToast();
  const [expandedId, setExpandedId] = useState(null);
  const [quantities, setQuantities] = useState({});
  const handleQuantityChange = (productId, delta) => {
    setQuantities(prev => {
      const current = prev[productId] || 0;
      const newValue = Math.max(0, current + delta);
      return {
        ...prev,
        [productId]: newValue
      };
    });
  };
  const handleAddToCart = product => {
    const qty = quantities[product.id] || 0;
    if (qty === 0) {
      toast({
        title: '请输入采购数量',
        description: '数量不能为0',
        variant: 'destructive'
      });
      return;
    }
    onAddToCart({
      ...product,
      quantity: qty
    });
    setQuantities(prev => ({
      ...prev,
      [product.id]: 0
    }));
    toast({
      title: '已加入采购清单',
      description: `${product.name} × ${qty}`
    });
  };
  return <div className="p-4">
      <h2 className="text-lg font-bold text-[#5C4033] mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-[#5D8A66] rounded-full"></span>
        批发价目表
      </h2>

      <div className="space-y-3">
        {PRODUCTS.map((product, index) => {
        const isExpanded = expandedId === product.id;
        const qty = quantities[product.id] || 0;
        const lowestTier = product.tiers[product.tiers.length - 1];
        const currentTier = product.tiers.find(t => qty >= t.min && (t.max === null || qty <= t.max));
        const currentPrice = currentTier ? currentTier.price : product.retailPrice;
        return <div key={product.id} className={`bg-white rounded-xl border transition-all ${index % 2 === 0 ? 'border-[#E8E0D5]' : 'border-[#D4C4B0]'}`}>
              {/* 商品基础信息 */}
              <div className="p-3">
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-lg bg-[#FAF6F0] overflow-hidden flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#5C4033] text-sm mb-1">{product.name}</h3>
                    <p className="text-[#8B7355] text-xs mb-2">{product.spec} | {product.origin}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[#A85C4A] font-bold">¥{currentPrice}</span>
                      <span className="text-[#8B7355] text-xs line-through">¥{product.retailPrice}</span>
                      {currentTier && <span className="text-xs bg-[#A85C4A] text-white px-1.5 py-0.5 rounded">
                          {currentTier.discount}
                        </span>}
                    </div>
                  </div>
                </div>

                {/* 采购操作 */}
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleQuantityChange(product.id, -10)} className="w-8 h-8 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#5C4033]">
                      <span className="text-sm font-bold">-</span>
                    </button>
                    <input type="number" value={qty} onChange={e => setQuantities(prev => ({
                  ...prev,
                  [product.id]: parseInt(e.target.value) || 0
                }))} className="w-16 h-8 rounded-lg border border-[#D4C4B0] text-center text-[#5C4033] font-bold" />
                    <button onClick={() => handleQuantityChange(product.id, 10)} className="w-8 h-8 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#5C4033]">
                      <span className="text-sm font-bold">+</span>
                    </button>
                  </div>
                  <button onClick={() => handleAddToCart(product)} className="flex-1 h-8 bg-[#5D8A66] text-white rounded-lg text-sm font-bold flex items-center justify-center gap-1">
                    <ShoppingCart className="w-4 h-4" />
                    加入清单
                  </button>
                  <button onClick={() => setExpandedId(isExpanded ? null : product.id)} className="w-8 h-8 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#5D8A66]">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 阶梯价格展开 */}
              {isExpanded && <div className="border-t border-[#E8E0D5] p-3 bg-[#FAF6F0]">
                  <p className="text-xs text-[#8B7355] mb-2">阶梯批发价</p>
                  <div className="grid grid-cols-3 gap-2">
                    {product.tiers.map((tier, idx) => <div key={idx} className={`bg-white rounded-lg p-2 text-center ${qty >= tier.min && (tier.max === null || qty <= tier.max) ? 'ring-2 ring-[#5D8A66]' : ''}`}>
                        <p className="text-xs text-[#8B7355]">
                          {tier.min}件{tier.max ? `-${tier.max}件` : '以上'}
                        </p>
                        <p className="font-bold text-[#5D8A66]">¥{tier.price}</p>
                        <p className="text-xs text-[#A85C4A]">{tier.discount}</p>
                      </div>)}
                  </div>
                </div>}
            </div>;
      })}
      </div>
    </div>;
}