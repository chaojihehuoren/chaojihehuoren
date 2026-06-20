// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ShoppingCart, Trash2, Minus, Plus, FileText } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

export function WholesaleCart({
  items,
  onRemove,
  onUpdateQty,
  onSubmitOrder
}) {
  const {
    toast
  } = useToast();
  const [selectedItems, setSelectedItems] = useState([]);
  const totalAmount = selectedItems.reduce((sum, item) => {
    const itemData = items.find(i => i.id === item.id);
    return sum + (itemData ? itemData.retailPrice * item.quantity : 0);
  }, 0);
  const totalSaving = selectedItems.reduce((sum, item) => {
    const itemData = items.find(i => i.id === item.id);
    if (!itemData) return sum;
    const lowestTier = itemData.tiers[itemData.tiers.length - 1];
    return sum + (itemData.retailPrice - lowestTier.price) * item.quantity;
  }, 0);
  const handleToggleSelect = itemId => {
    setSelectedItems(prev => prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]);
  };
  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(i => i.id));
    }
  };
  const handleSubmit = () => {
    if (selectedItems.length === 0) {
      toast({
        title: '请选择采购商品',
        description: '至少选择一件商品',
        variant: 'destructive'
      });
      return;
    }
    onSubmitOrder(selectedItems);
  };
  if (items.length === 0) {
    return <div className="p-6 text-center">
        <ShoppingCart className="w-16 h-16 mx-auto text-[#D4C4B0] mb-4" />
        <p className="text-[#8B7355] mb-4">采购清单为空</p>
        <p className="text-sm text-[#B0A090]">请从上方价目表添加商品</p>
      </div>;
  }
  return <div className="p-4">
      {/* 头部 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#5C4033] flex items-center gap-2">
          <span className="w-1 h-5 bg-[#5D8A66] rounded-full"></span>
          采购清单
        </h2>
        <label className="flex items-center gap-2 text-sm text-[#8B7355]">
          <input type="checkbox" checked={selectedItems.length === items.length} onChange={handleSelectAll} className="w-4 h-4 accent-[#5D8A66]" />
          全选
        </label>
      </div>

      {/* 清单列表 */}
      <div className="space-y-3 mb-20">
        {items.map(item => <div key={item.id} className="bg-white rounded-xl border border-[#E8E0D5] p-3">
            <div className="flex items-start gap-3">
              <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => handleToggleSelect(item.id)} className="w-4 h-4 accent-[#5D8A66] mt-4" />
              <div className="w-14 h-14 rounded-lg bg-[#FAF6F0] overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#5C4033] text-sm mb-1">{item.name}</h3>
                <p className="text-[#8B7355] text-xs mb-2">{item.spec}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button onClick={() => onUpdateQty(item.id, -10)} className="w-6 h-6 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#5C4033]">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-12 text-center font-bold text-[#5C4033]">
                      {item.quantity}
                    </span>
                    <button onClick={() => onUpdateQty(item.id, 10)} className="w-6 h-6 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#5C4033]">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center text-red-400">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#A85C4A]">¥{item.retailPrice * item.quantity}</p>
                <p className="text-xs text-[#8B7355] line-through">
                  ¥{item.retailPrice * item.quantity}
                </p>
              </div>
            </div>
          </div>)}
      </div>

      {/* 底部结算栏 */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-[#E8E0D5] p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#8B7355] text-sm">已选 {selectedItems.length} 件</span>
          <div className="text-right">
            <p className="text-[#8B7355] text-xs">节省 ¥{totalSaving}</p>
            <p className="font-bold text-lg text-[#5D8A66]">
              ¥{selectedItems.reduce((sum, id) => {
              const item = items.find(i => i.id === id);
              const lowestTier = item.tiers[item.tiers.length - 1];
              return sum + lowestTier.price * item.quantity;
            }, 0)}
            </p>
          </div>
        </div>
        <button onClick={handleSubmit} className="w-full h-12 bg-[#5D8A66] text-white rounded-xl font-bold text-base flex items-center justify-center gap-2">
          <FileText className="w-5 h-5" />
          提交采购单
        </button>
      </div>
    </div>;
}