// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';

import { WholesaleHeader } from '@/components/WholesaleHeader';
import { WholesaleTabs } from '@/components/WholesaleTabs';
import { WholesalePriceTable } from '@/components/WholesalePriceTable';
import { WholesaleCart } from '@/components/WholesaleCart';
import { InvoiceSection } from '@/components/InvoiceSection';
import { StorePickup } from '@/components/StorePickup';
import { ChannelRebate } from '@/components/ChannelRebate';
import { DistributorPerformance } from '@/components/DistributorPerformance';
export default function Wholesale() {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('purchase');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const handleSwitchMode = mode => {
    if (mode === 'C') {
      toast({
        title: '切换至C端零售',
        description: '正在跳转零售页面...'
      });
      // 实际项目中应该调用导航方法
      // props.$w.utils.navigateTo({ pageId: 'home', params: {} });
    }
  };
  const handleAddToCart = product => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? {
          ...item,
          quantity: item.quantity + product.quantity
        } : item);
      }
      return [...prev, product];
    });
  };
  const handleRemoveFromCart = productId => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };
  const handleUpdateCartQty = (productId, delta) => {
    setCartItems(prev => prev.map(item => item.id === productId ? {
      ...item,
      quantity: Math.max(0, item.quantity + delta)
    } : item).filter(item => item.quantity > 0));
  };
  const handleSubmitOrder = selectedIds => {
    toast({
      title: '采购单已提交',
      description: `已提交 ${selectedIds.length} 件商品，等待审核...`
    });
    setShowCart(false);
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 'purchase':
        return <div>
            <WholesalePriceTable onAddToCart={handleAddToCart} />
            {cartItems.length > 0 && <div className="fixed bottom-16 left-0 right-0 p-4">
                <button onClick={() => setShowCart(true)} className="w-full h-14 bg-[#5D8A66] text-white rounded-xl font-bold text-base shadow-lg flex items-center justify-center gap-2">
                  <span>查看采购清单</span>
                  <span className="bg-white text-[#5D8A66] px-2 py-0.5 rounded-full text-sm">
                    {cartItems.length}
                  </span>
                </button>
              </div>}
          </div>;
      case 'pickup':
        return <StorePickup />;
      case 'statement':
        return <ChannelRebate />;
      case 'performance':
        return <DistributorPerformance />;
      default:
        return null;
    }
  };
  return <div className="min-h-screen bg-[#FAF6F0]">
      {/* 头部 */}
      <WholesaleHeader onSwitchMode={handleSwitchMode} />

      {/* Tab切换 */}
      <WholesaleTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 内容区 */}
      <div className={`pb-20 ${showCart ? 'hidden' : ''}`}>
        {renderTabContent()}
      </div>

      {/* 采购清单抽屉 */}
      {showCart && <div className="fixed inset-0 bg-black/50 z-40">
          <div className="absolute bottom-0 left-0 right-0 h-[85vh] bg-[#FAF6F0] rounded-t-3xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#E8E0D5]">
              <h2 className="font-bold text-[#5C4033] text-lg">采购清单</h2>
              <button onClick={() => setShowCart(false)} className="text-[#8B7355] text-2xl">
                ×
              </button>
            </div>
            <div className="h-[calc(100%-60px)] overflow-y-auto">
              <WholesaleCart items={cartItems} onRemove={handleRemoveFromCart} onUpdateQty={handleUpdateCartQty} onSubmitOrder={handleSubmitOrder} />
            </div>
          </div>
        </div>}
    </div>;
}