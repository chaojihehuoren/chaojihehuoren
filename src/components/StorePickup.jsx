// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { MapPin, QrCode, CheckCircle, Clock, Package } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

const STORES = [{
  id: 'S01',
  name: '济南仓储中心',
  address: '山东省济南市历下区经十路188号',
  distance: '12km'
}, {
  id: 'S02',
  name: '泰安配送站',
  address: '山东省泰安市泰山区东岳大街56号',
  distance: '45km'
}, {
  id: 'S03',
  name: '淄博中转仓',
  address: '山东省淄博市张店区人民路28号',
  distance: '78km'
}];
const PENDING_PICKUPS = [{
  id: 'PU-2024-0456',
  store: '济南仓储中心',
  items: [{
    name: '野生黄芪片 250g',
    qty: 50
  }, {
    name: '宁夏枸杞原浆 30ml×10',
    qty: 30
  }],
  totalAmount: 4850,
  createTime: '2024-03-18 09:30',
  status: '待提货'
}, {
  id: 'PU-2024-0448',
  store: '泰安配送站',
  items: [{
    name: '西洋参切片 100g',
    qty: 100
  }],
  totalAmount: 11800,
  createTime: '2024-03-17 14:20',
  status: '待提货'
}];
export function StorePickup() {
  const {
    toast
  } = useToast();
  const [selectedStore, setSelectedStore] = useState(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const handleVerifyPickup = () => {
    if (verifyCode.length < 6) {
      toast({
        title: '核销码错误',
        description: '请输入6位核销码',
        variant: 'destructive'
      });
      return;
    }
    toast({
      title: '核销成功',
      description: '提货已完成，商品已出库'
    });
    setShowVerifyModal(false);
    setVerifyCode('');
  };
  return <div className="p-4">
      <h2 className="text-lg font-bold text-[#5C4033] mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-[#5D8A66] rounded-full"></span>
        线下门店提货核销
      </h2>

      {/* 门店选择 */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-4 mb-4">
        <h3 className="font-bold text-[#5C4033] mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#5D8A66]" />
          选择提货门店
        </h3>
        <div className="space-y-2">
          {STORES.map(store => <button key={store.id} onClick={() => setSelectedStore(store)} className={`w-full p-3 rounded-xl border-2 transition-all text-left ${selectedStore?.id === store.id ? 'border-[#5D8A66] bg-[#5D8A66]/5' : 'border-[#E8E0D5]'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-[#5C4033] text-sm">{store.name}</p>
                  <p className="text-xs text-[#8B7355] mt-1">{store.address}</p>
                </div>
                <span className="text-xs text-[#A85C4A] font-bold">{store.distance}</span>
              </div>
            </button>)}
        </div>
      </div>

      {/* 待核销清单 */}
      <h3 className="font-bold text-[#5C4033] mb-3 flex items-center gap-2">
        <Clock className="w-4 h-4 text-[#5D8A66]" />
        待核销提货单
      </h3>
      <div className="space-y-3 mb-6">
        {PENDING_PICKUPS.map(pickup => <div key={pickup.id} className="bg-white rounded-xl border border-[#E8E0D5] p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-[#5C4033] text-sm">{pickup.id}</p>
                <p className="text-xs text-[#8B7355] mt-1">{pickup.store}</p>
              </div>
              <span className="flex items-center gap-1 text-xs text-[#4A7C9B] bg-[#4A7C9B]/10 px-2 py-1 rounded-full">
                <Clock className="w-3 h-3" />
                {pickup.status}
              </span>
            </div>
            <div className="bg-[#FAF6F0] rounded-lg p-3 mb-3">
              {pickup.items.map((item, idx) => <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-[#5C4033]">{item.name}</span>
                  <span className="text-[#8B7355]">×{item.qty}</span>
                </div>)}
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#8B7355]">提货总额</span>
              <span className="font-bold text-[#A85C4A]">¥{pickup.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#8B7355] mb-3">
              <span>下单时间：{pickup.createTime}</span>
            </div>
            <button onClick={() => setShowVerifyModal(true)} className="w-full h-10 bg-[#4A7C9B] text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2">
              <QrCode className="w-4 h-4" />
              到店出示核销码
            </button>
          </div>)}
      </div>

      {/* 历史核销记录 */}
      <h3 className="font-bold text-[#5C4033] mb-3 flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-[#5D8A66]" />
        已完成核销
      </h3>
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5D8A66]/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-[#5D8A66]" />
            </div>
            <div>
              <p className="font-bold text-[#5C4033] text-sm">PU-2024-0432</p>
              <p className="text-xs text-[#8B7355]">济南仓储中心 | 2024-03-15</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-xs text-[#5D8A66] font-bold">
            <CheckCircle className="w-3 h-3" />
            已完成
          </span>
        </div>
      </div>

      {/* 核销弹窗 */}
      {showVerifyModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6">
            <h3 className="font-bold text-[#5C4033] text-lg mb-4 text-center">
              输入核销码
            </h3>
            <input type="text" value={verifyCode} onChange={e => setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="请输入6位核销码" className="w-full h-14 rounded-xl border-2 border-[#E8E0D5] text-center text-2xl font-bold tracking-widest mb-4 focus:border-[#5D8A66] outline-none" />
            <div className="flex gap-3">
              <button onClick={() => setShowVerifyModal(false)} className="flex-1 h-12 rounded-xl border border-[#E8E0D5] text-[#5C4033] font-bold">
                取消
              </button>
              <button onClick={handleVerifyPickup} className="flex-1 h-12 rounded-xl bg-[#5D8A66] text-white font-bold">
                确认核销
              </button>
            </div>
          </div>
        </div>}
    </div>;
}