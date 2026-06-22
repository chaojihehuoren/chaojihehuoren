// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ChevronRight, Grid3X3, Package, ShoppingBag, Heart, User } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

// @ts-ignore;
import { TabBar } from '@/components/TabBar.jsx';
export default function CategoryPage(props) {
  const [activeCategory, setActiveCategory] = useState('all');

  // 分类数据
  const categories = [{
    id: 'all',
    name: '全部商品',
    icon: '📦'
  }, {
    id: 'yaoshi',
    name: '药食同源',
    icon: '🌿'
  }, {
    id: 'health',
    name: '养生保健',
    icon: '💊'
  }, {
    id: 'tea',
    name: '茶饮冲调',
    icon: '🍵'
  }, {
    id: 'grain',
    name: '五谷杂粮',
    icon: '🌾'
  }, {
    id: 'nut',
    name: '坚果干货',
    icon: '🥜'
  }, {
    id: 'soup',
    name: '汤料炖品',
    icon: '🍲'
  }, {
    id: 'gift',
    name: '礼盒套装',
    icon: '🎁'
  }];

  // 商品数据（模拟）
  const products = [{
    id: 1,
    name: '枸杞红枣茶',
    category: 'yaoshi',
    price: 68,
    image: 'https://images.unsplash.com/photo-1590328068093-7c37e3f4b3c8?w=300&h=300&fit=crop',
    sales: 1234
  }, {
    id: 2,
    name: '黄芪党参汤料',
    category: 'yaoshi',
    price: 128,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop',
    sales: 856
  }, {
    id: 3,
    name: '养生五谷粉',
    category: 'grain',
    price: 88,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=300&fit=crop',
    sales: 2341
  }, {
    id: 4,
    name: '有机核桃仁',
    category: 'nut',
    price: 56,
    image: 'https://images.unsplash.com/photo-1590417975538-1400c2d6b110?w=300&h=300&fit=crop',
    sales: 987
  }, {
    id: 5,
    name: '菊花普洱',
    category: 'tea',
    price: 78,
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=300&h=300&fit=crop',
    sales: 1567
  }, {
    id: 6,
    name: '养生礼盒',
    category: 'gift',
    price: 298,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd8b?w=300&h=300&fit=crop',
    sales: 432
  }];

  // 筛选商品
  const filteredProducts = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);
  const handleProductClick = product => {
    props.$w.utils.navigateTo({
      pageId: 'product',
      params: {
        id: product.id
      }
    });
  };
  return <div className="min-h-screen bg-[#FAF6F0] pb-20">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E8E0D5]">
        <div className="flex items-center justify-between px-4 h-14">
          <h1 className="font-bold text-[#5C4033] text-lg">商品分类</h1>
          <button onClick={() => props.$w.utils.navigateTo({
          pageId: 'home'
        })} className="text-[#8B7355] text-sm">
            返回首页
          </button>
        </div>
      </header>
      
      <div className="flex">
        {/* 左侧分类导航 */}
        <div className="w-24 bg-white border-r border-[#E8E0D5] min-h-screen">
          <div className="py-2">
            {categories.map(category => <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`w-full p-3 flex flex-col items-center gap-1 text-xs transition-colors
                  ${activeCategory === category.id ? 'bg-[#FAF6F0] text-[#5C4033] font-bold border-r-2 border-[#5D8A66]' : 'text-[#8B7355] hover:bg-[#FAF6F0]/50'}`}>
                <span className="text-2xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>)}
          </div>
        </div>
        
        {/* 右侧商品列表 */}
        <div className="flex-1 p-3">
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map(product => <button key={product.id} onClick={() => handleProductClick(product)} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-medium text-[#5C4033] line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A85C4A] font-bold text-sm">
                      ¥{product.price}
                    </span>
                    <span className="text-[#8B7355] text-xs">
                      已售{product.sales}
                    </span>
                  </div>
                </div>
              </button>)}
          </div>
          
          {filteredProducts.length === 0 && <div className="text-center py-20 text-[#8B7355]">
              <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>该分类暂无商品</p>
            </div>}
        </div>
      </div>
      
      {/* 底部导航栏（简化版） */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E0D5] px-6 py-2">
        <div className="flex justify-around">
          <button onClick={() => props.$w.utils.navigateTo({
          pageId: 'home'
        })} className="flex flex-col items-center gap-1 text-[#8B7355]">
            <Grid3X3 className="w-5 h-5" />
            <span className="text-xs">首页</span>
          </button>
          <button onClick={() => props.$w.utils.navigateTo({
          pageId: 'category'
        })} className="flex flex-col items-center gap-1 text-[#5D8A66]">
            <Package className="w-5 h-5" />
            <span className="text-xs">分类</span>
          </button>
          <button onClick={() => props.$w.utils.navigateTo({
          pageId: 'cart'
        })} className="flex flex-col items-center gap-1 text-[#8B7355]">
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs">购物车</span>
          </button>
          <button onClick={() => props.$w.utils.navigateTo({
          pageId: 'member'
        })} className="flex flex-col items-center gap-1 text-[#8B7355]">
            <Heart className="w-5 h-5" />
            <span className="text-xs">我的</span>
          </button>
        </div>
      </div>
      
      {/* 底部导航栏 */}
      <TabBar activeTab="category" />
    </div>;
}