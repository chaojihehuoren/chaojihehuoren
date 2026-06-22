// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, Package, Heart } from 'lucide-react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';

// @ts-ignore;
import { TabBar } from '@/components/TabBar.jsx';
export default function CartPage(props) {
  const {
    toast
  } = useToast();

  // 购物车数据（模拟）
  const [cartItems, setCartItems] = useState([{
    id: 1,
    name: '枸杞红枣茶',
    price: 68,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1590328068093-7c37e3f4b3c8?w=300&h=300&fit=crop',
    checked: true
  }, {
    id: 2,
    name: '黄芪党参汤料',
    price: 128,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop',
    checked: true
  }, {
    id: 3,
    name: '养生五谷粉',
    price: 88,
    quantity: 3,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=300&fit=crop',
    checked: false
  }]);

  // 更新数量
  const updateQuantity = (id, delta) => {
    setCartItems(items => items.map(item => item.id === id ? {
      ...item,
      quantity: Math.max(1, item.quantity + delta)
    } : item));
  };

  // 删除商品
  const removeItem = id => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: '已删除',
      description: '商品已从购物车移除'
    });
  };

  // 切换选中状态
  const toggleCheck = id => {
    setCartItems(items => items.map(item => item.id === id ? {
      ...item,
      checked: !item.checked
    } : item));
  };

  // 计算总价
  const totalPrice = cartItems.filter(item => item.checked).reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cartItems.filter(item => item.checked).reduce((sum, item) => sum + item.quantity, 0);

  // 全选/取消全选
  const toggleAll = () => {
    const allChecked = cartItems.every(item => item.checked);
    setCartItems(items => items.map(item => ({
      ...item,
      checked: !allChecked
    })));
  };
  const handleCheckout = () => {
    if (totalQuantity === 0) {
      toast({
        title: '请选择商品',
        description: '至少选择一个商品才能结算'
      });
      return;
    }
    toast({
      title: '功能开发中',
      description: '结算功能即将上线'
    });
  };
  return <div className="min-h-screen bg-[#FAF6F0] pb-20">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E8E0D5]">
        <div className="flex items-center justify-between px-4 h-14">
          <h1 className="font-bold text-[#5C4033] text-lg">购物车</h1>
          <span className="text-[#8B7355] text-sm">
            {cartItems.length}件商品
          </span>
        </div>
      </header>
      
      {/* 购物车列表 */}
      <div className="px-4 py-3 space-y-3">
        {cartItems.length > 0 ? cartItems.map(item => <div key={item.id} className="bg-white rounded-xl p-3 flex gap-3 shadow-sm">
              {/* 选中按钮 */}
              <button onClick={() => toggleCheck(item.id)} className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-8 transition-colors
                  ${item.checked ? 'bg-[#5D8A66] border-[#5D8A66]' : 'border-[#D4C4B0]'}`}>
                {item.checked && <svg className="w-3 h-3 text-white m-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>}
              </button>
              
              {/* 商品图片 */}
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              
              {/* 商品信息 */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-[#5C4033] text-sm line-clamp-2 mb-1">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[#A85C4A] font-bold">
                    ¥{item.price}
                  </span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 rounded-full border border-[#E8E0D5] flex items-center justify-center">
                      <Minus className="w-3 h-3 text-[#8B7355]" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-[#5C4033]">
                      {item.quantity}
                    </span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 rounded-full border border-[#E8E0D5] flex items-center justify-center">
                      <Plus className="w-3 h-3 text-[#8B7355]" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* 删除按钮 */}
              <button onClick={() => removeItem(item.id)} className="text-[#8B7355] hover:text-red-500 transition-colors flex-shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>) : <div className="text-center py-20 text-[#8B7355]">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="mb-4">购物车是空的</p>
            <Button onClick={() => props.$w.utils.navigateTo({
          pageId: 'home'
        })} className="bg-[#5D8A66] hover:bg-[#4A7C59] text-white">
              去逛逛
            </Button>
          </div>}
      </div>
      
      {/* 底部结算栏 */}
      {cartItems.length > 0 && <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E0D5] px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <button onClick={toggleAll} className="flex items-center gap-2 text-sm text-[#5C4033]">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                ${cartItems.every(item => item.checked) ? 'bg-[#5D8A66] border-[#5D8A66]' : 'border-[#D4C4B0]'}`}>
                {cartItems.every(item => item.checked) && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>}
              </div>
              <span>全选</span>
            </button>
            <div className="text-right">
              <p className="text-sm text-[#8B7355]">
                合计：<span className="text-[#A85C4A] font-bold text-lg">¥{totalPrice}</span>
              </p>
              <p className="text-xs text-[#8B7355]">
                共{totalQuantity}件
              </p>
            </div>
          </div>
          <Button onClick={handleCheckout} className="w-full h-12 bg-[#5D8A66] hover:bg-[#4A7C59] text-white font-bold rounded-xl">
            结算({totalQuantity})
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>}
      
      {/* 底部导航栏（简化版） */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E0D5] px-6 py-2" style={{
      paddingBottom: cartItems.length > 0 ? '80px' : '0'
    }}>
        <div className="flex justify-around">
          <button onClick={() => props.$w.utils.navigateTo({
          pageId: 'home'
        })} className="flex flex-col items-center gap-1 text-[#8B7355]">
            <Package className="w-5 h-5" />
            <span className="text-xs">首页</span>
          </button>
          <button onClick={() => props.$w.utils.navigateTo({
          pageId: 'category'
        })} className="flex flex-col items-center gap-1 text-[#8B7355]">
            <Package className="w-5 h-5" />
            <span className="text-xs">分类</span>
          </button>
          <button onClick={() => props.$w.utils.navigateTo({
          pageId: 'cart'
        })} className="flex flex-col items-center gap-1 text-[#5D8A66]">
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
      <TabBar activeTab="cart" />
    </div>;
}