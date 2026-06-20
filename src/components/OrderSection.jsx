// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Package, DollarSign, SwapHorizontal, FileText, ChevronRight } from 'lucide-react';

const orderTabs = [{
  id: 'all',
  label: '全部',
  icon: Package
}, {
  id: 'pending',
  label: '待付款',
  icon: DollarSign
}, {
  id: 'shipping',
  label: '待收货',
  icon: Package
}, {
  id: 'refund',
  label: '退款/售后',
  icon: SwapHorizontal
}];
const recentOrders = [{
  id: '1234567890',
  status: '待发货',
  product: '野生黄芪片 250g',
  amount: 168,
  count: 2
}, {
  id: '1234567891',
  status: '已完成',
  product: '枸杞原浆 30支装',
  amount: 298,
  count: 1
}];
export function OrderSection({
  onNavigate
}) {
  return <div className="bg-white rounded-xl shadow-sm border border-herb-brown/10">
      <div className="p-4 border-b border-herb-brown/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-herb-green" />
            <h3 className="font-semibold text-herb-dark">我的订单</h3>
          </div>
          <button onClick={() => onNavigate?.('orders')} className="flex items-center gap-1 text-sm text-herb-brown">
            全部订单
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 订单Tab */}
      <div className="grid grid-cols-4 py-4">
        {orderTabs.map(tab => {
        const IconComponent = tab.icon;
        return <button key={tab.id} onClick={() => onNavigate?.(`orders?tab=${tab.id}`)} className="flex flex-col items-center gap-2">
              <div className="relative">
                <IconComponent className="w-6 h-6 text-herb-green" />
                {tab.id === 'pending' && <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">2</span>}
              </div>
              <span className="text-sm text-herb-dark">{tab.label}</span>
            </button>;
      })}
      </div>

      {/* 最近订单 */}
      <div className="border-t border-herb-brown/5 p-4">
        <p className="text-sm text-herb-brown mb-3">最近订单</p>
        {recentOrders.map(order => <div key={order.id} className="flex items-center justify-between py-2 border-b border-herb-brown/5 last:border-0">
            <div>
              <p className="text-sm text-herb-dark font-medium">{order.product}</p>
              <p className="text-xs text-herb-brown">订单号: {order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-herb-dark">¥{order.amount}</p>
              <span className={`text-xs px-2 py-0.5 rounded ${order.status === '待发货' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                {order.status}
              </span>
            </div>
          </div>)}
      </div>
    </div>;
}
export function CouponSection({
  onNavigate
}) {
  return <div className="bg-white rounded-xl p-4 shadow-sm border border-herb-brown/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-rose-500" />
          </div>
          <div>
            <p className="text-sm text-herb-brown">我的优惠券</p>
            <p className="text-lg font-bold text-herb-dark">3张可用</p>
          </div>
        </div>
        <button onClick={() => onNavigate?.('coupons')} className="flex items-center gap-1 text-sm text-herb-brown">
          领取优惠券
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="flex gap-3">
        <div className="flex-1 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg p-3 text-center">
          <p className="text-2xl font-bold">¥20</p>
          <p className="text-xs opacity-80">满99可用</p>
        </div>
        <div className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-lg p-3 text-center">
          <p className="text-2xl font-bold">¥50</p>
          <p className="text-xs opacity-80">满299可用</p>
        </div>
        <div className="flex-1 bg-gradient-to-r from-herb-green to-herb-green/80 text-white rounded-lg p-3 text-center">
          <p className="text-lg font-bold">95折</p>
          <p className="text-xs opacity-80">全品类</p>
        </div>
      </div>
    </div>;
}