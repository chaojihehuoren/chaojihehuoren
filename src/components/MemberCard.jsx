// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Crown, ChevronRight } from 'lucide-react';

export function MemberCard({
  memberInfo,
  onClick,
  isLoggedIn
}) {
  return <button onClick={onClick} className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95 min-w-[140px]">
      {/* 边框装饰 */}
      <div className="absolute inset-0 rounded-2xl border border-[#C4A77D]/20 pointer-events-none" />
      
      {/* 用户信息 */}
      <div className="flex items-center gap-3">
        {/* 头像 */}
        <div className="relative">
          <img src={memberInfo.avatar} alt="头像" className="w-10 h-10 rounded-full object-cover border-2 border-[#C4A77D]/30" />
          {/* 会员标识 */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-[#C4A77D] to-[#A85C4A] rounded-full flex items-center justify-center">
            <Crown className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* 文字信息 */}
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-[#5C4033] truncate max-w-[60px]">
            {memberInfo.name}
          </p>
          <p className="text-xs text-[#8B7355]">
            {memberInfo.level}
          </p>
        </div>
      </div>

      {/* 积分信息 */}
      <div className="mt-3 pt-3 border-t border-[#E8E0D5]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8B7355]">可用积分</p>
            <p className="text-lg font-semibold text-[#A85C4A]">{memberInfo.points}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8B7355]" />
        </div>
      </div>

      {/* 装饰角标 */}
      <div className="absolute -top-1 -right-1 w-4 h-4">
        <div className="w-full h-full bg-[#5D8A66] rounded-tr-xl rounded-bl-xl" />
      </div>
    </button>;
}