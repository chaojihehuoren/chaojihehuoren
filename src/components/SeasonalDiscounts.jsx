// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Clock, Percent, ShoppingCart, Flame } from 'lucide-react';

// 限时折扣商品数据
const DISCOUNT_PRODUCTS = [{
  id: 1,
  name: '野生荷叶粉',
  originalPrice: 128,
  discountPrice: 88,
  discount: 31,
  stock: 58,
  image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=200&h=200&fit=crop',
  tag: '清热解暑',
  endTime: '2026-06-22 23:59:59'
}, {
  id: 2,
  name: '茯苓块',
  originalPrice: 98,
  discountPrice: 68,
  discount: 31,
  stock: 32,
  image: 'https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=200&h=200&fit=crop',
  tag: '健脾祛湿',
  endTime: '2026-06-22 23:59:59'
}, {
  id: 3,
  name: '薏苡仁',
  originalPrice: 58,
  discountPrice: 38,
  discount: 34,
  stock: 86,
  image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=200&h=200&fit=crop',
  tag: '利水渗湿',
  endTime: '2026-06-23 23:59:59'
}, {
  id: 4,
  name: '夏桑菊颗粒',
  originalPrice: 88,
  discountPrice: 58,
  discount: 34,
  stock: 24,
  image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=200&h=200&fit=crop',
  tag: '清肝明目',
  endTime: '2026-06-23 23:59:59'
}];
export function SeasonalDiscounts({
  onAddToCart
}) {
  const [quantities, setQuantities] = useState({});
  const handleQuantityChange = (id, value) => {
    setQuantities(prev => ({
      ...prev,
      [id]: value
    }));
  };
  const handleAddToCart = product => {
    const quantity = quantities[product.id] || 1;
    onAddToCart?.({
      ...product,
      quantity
    });
  };
  return <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 shadow-sm">
      {/* 头部 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="text-orange-500" size={20} />
          <h3 className="font-serif font-bold text-stone-800">夏至特惠</h3>
          <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full">
            限时3天
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-stone-500">
          <Clock size={14} className="text-orange-500" />
          距结束
        </div>
      </div>

      {/* 倒计时 */}
      <div className="flex gap-2 mb-4">
        {['12', '35', '28'].map((val, i) => <div key={i} className="bg-stone-800 text-white px-2 py-1 rounded text-center min-w-[36px]">
            <span className="text-lg font-bold">{val}</span>
            <div className="text-[10px] text-stone-400">
              {['时', '分', '秒'][i]}
            </div>
          </div>)}
      </div>

      {/* 商品网格 */}
      <div className="grid grid-cols-2 gap-3">
        {DISCOUNT_PRODUCTS.map(product => <div key={product.id} className="bg-white rounded-xl p-3 shadow-sm">
            {/* 商品图片 */}
            <div className="relative">
              <img src={product.image} alt={product.name} className="w-full aspect-square rounded-lg object-cover" />
              {/* 折扣标签 */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                <Percent size={10} />
                {product.discount}%
              </span>
              {/* 库存提示 */}
              {product.stock < 50 && <span className="absolute bottom-1 left-1 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded">
                  仅剩{product.stock}件
                </span>}
            </div>

            {/* 商品信息 */}
            <div className="mt-2">
              <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                {product.tag}
              </span>
              <h4 className="font-medium text-stone-800 text-sm mt-1 leading-snug">
                {product.name}
              </h4>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-red-500 font-bold">¥{product.discountPrice}</span>
                <span className="text-stone-400 text-xs line-through">¥{product.originalPrice}</span>
              </div>

              {/* 数量选择 */}
              <div className="flex items-center gap-1 mt-2">
                <button onClick={() => handleQuantityChange(product.id, Math.max(1, (quantities[product.id] || 1) - 1))} className="w-6 h-6 bg-stone-100 rounded text-stone-600 hover:bg-stone-200">
                  -
                </button>
                <input type="number" value={quantities[product.id] || 1} onChange={e => handleQuantityChange(product.id, parseInt(e.target.value) || 1)} className="w-10 h-6 text-center text-sm border rounded" />
                <button onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)} className="w-6 h-6 bg-stone-100 rounded text-stone-600 hover:bg-stone-200">
                  +
                </button>
              </div>

              {/* 加入购物车 */}
              <button onClick={() => handleAddToCart(product)} className="w-full mt-2 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm rounded-lg flex items-center justify-center gap-1 hover:from-amber-600 hover:to-orange-600 transition-all">
                <ShoppingCart size={14} />
                加入购物车
              </button>
            </div>
          </div>)}
      </div>

      {/* 查看更多 */}
      <button className="w-full mt-4 py-2 text-amber-600 text-sm font-medium border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors">
        查看全部夏至特惠商品 →
      </button>
    </div>;
}