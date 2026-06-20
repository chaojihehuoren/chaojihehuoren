// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Coins, Clock, ChevronRight, Gift } from 'lucide-react';

export function PointsCard({
  pointsInfo
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });
  useEffect(() => {
    if (pointsInfo?.expiryDate) {
      const calculateTimeLeft = () => {
        const now = new Date();
        const expiry = new Date(pointsInfo.expiryDate);
        const diff = expiry - now;
        if (diff > 0) {
          setTimeLeft({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
            minutes: Math.floor(diff % (1000 * 60 * 60) / (1000 * 60))
          });
        }
      };
      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 60000);
      return () => clearInterval(timer);
    }
  }, [pointsInfo?.expiryDate]);
  return <div className="bg-white rounded-xl p-4 shadow-sm border border-herb-brown/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <Coins className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-herb-brown">可用积分</p>
            <p className="text-2xl font-bold text-herb-dark">{pointsInfo?.balance || 2880}</p>
          </div>
        </div>
        <button className="bg-herb-green text-white rounded-full px-4 py-2 text-sm font-medium">
          积分商城
        </button>
      </div>

      {/* 到期提醒 */}
      <div className="bg-rose-50 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-rose-500" />
          <span className="text-sm text-rose-600">积分即将到期</span>
        </div>
        <div className="flex items-center gap-1 text-rose-600 font-semibold">
          <span className="bg-rose-600 text-white rounded px-2 py-0.5 text-xs">{timeLeft.days}</span>
          <span>天</span>
          <span className="bg-rose-600 text-white rounded px-2 py-0.5 text-xs">{timeLeft.hours}</span>
          <span>时</span>
        </div>
      </div>
    </div>;
}
export function StorageCard({
  storageInfo
}) {
  return <div className="bg-white rounded-xl p-4 shadow-sm border border-herb-brown/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <Gift className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-herb-brown">储值余额</p>
            <p className="text-2xl font-bold text-herb-dark">¥{storageInfo?.balance || 500}</p>
          </div>
        </div>
        <button className="bg-herb-brown text-white rounded-full px-4 py-2 text-sm font-medium">
          充值
        </button>
      </div>
      <div className="bg-emerald-50 rounded-lg p-3">
        <div className="flex justify-between text-sm">
          <span className="text-emerald-600">储值送积分</span>
          <span className="text-emerald-600">再充100元得150积分</span>
        </div>
      </div>
    </div>;
}