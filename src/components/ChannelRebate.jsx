// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Calendar, Download, TrendingUp, TrendingDown, FileText, ChevronDown } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

const MONTHLY_STATEMENTS = [{
  month: '2024-03',
  period: '2024年3月',
  totalAmount: 128580,
  rebateRate: 3,
  rebateAmount: 3857,
  paidAmount: 0,
  status: '未结算'
}, {
  month: '2024-02',
  period: '2024年2月',
  totalAmount: 98600,
  rebateRate: 3,
  rebateAmount: 2958,
  paidAmount: 2958,
  status: '已结算'
}, {
  month: '2024-01',
  period: '2024年1月',
  totalAmount: 142350,
  rebateRate: 3.5,
  rebateAmount: 4982,
  paidAmount: 4982,
  status: '已结算'
}];
export function ChannelRebate() {
  const {
    toast
  } = useToast();
  const [selectedMonth, setSelectedMonth] = useState('2024-03');
  const [expandedMonths, setExpandedMonths] = useState([]);
  const toggleMonth = month => {
    setExpandedMonths(prev => prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]);
  };
  const currentStatement = MONTHLY_STATEMENTS.find(s => s.month === selectedMonth);
  const handleDownload = month => {
    toast({
      title: '下载中',
      description: `正在生成${month}对账单...`
    });
    setTimeout(() => {
      toast({
        title: '下载完成',
        description: '对账单已保存至Downloads目录'
      });
    }, 1500);
  };
  return <div className="p-4">
      <h2 className="text-lg font-bold text-[#5C4033] mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-[#5D8A66] rounded-full"></span>
        渠道返利月度对账单
      </h2>

      {/* 月份选择器 */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-4 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-[#5D8A66]" />
          <span className="font-bold text-[#5C4033]">选择月份</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {MONTHLY_STATEMENTS.map(stmt => <button key={stmt.month} onClick={() => setSelectedMonth(stmt.month)} className={`py-2 rounded-lg font-bold text-sm transition-all ${selectedMonth === stmt.month ? 'bg-[#5D8A66] text-white' : 'bg-[#FAF6F0] text-[#5C4033]'}`}>
              {stmt.period}
            </button>)}
        </div>
      </div>

      {/* 当前月份汇总 */}
      {currentStatement && <div className="bg-gradient-to-br from-[#5C4033] to-[#8B6914] rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#D4A574] text-sm">{currentStatement.period} 对账单</span>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${currentStatement.status === '已结算' ? 'bg-[#5D8A66] text-white' : 'bg-[#A85C4A] text-white'}`}>
              {currentStatement.status}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-[#D4A574] text-xs mb-1">采购总额</p>
              <p className="text-white font-bold text-xl">¥{currentStatement.totalAmount.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-[#D4A574] text-xs mb-1">返利比例</p>
              <p className="text-white font-bold text-xl">{currentStatement.rebateRate}%</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#D4A574] text-xs mb-1">应得返利</p>
              <p className="text-[#D4A574] font-bold text-2xl">
                ¥{currentStatement.rebateAmount.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[#D4A574] text-xs mb-1">已结金额</p>
              <p className="text-white font-bold text-xl">
                ¥{currentStatement.paidAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>})

      {/* 历史月份明细 */}
      <h3 className="font-bold text-[#5C4033] mb-3">历史对账明细</h3>
      <div className="space-y-3">
        {MONTHLY_STATEMENTS.map(stmt => {
        const isExpanded = expandedMonths.includes(stmt.month);
        return <div key={stmt.month} className="bg-white rounded-xl border border-[#E8E0D5] overflow-hidden">
            <button onClick={() => toggleMonth(stmt.month)} className="w-full p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stmt.status === '已结算' ? 'bg-[#5D8A66]/10' : 'bg-[#A85C4A]/10'}`}>
                  <FileText className={`w-5 h-5 ${stmt.status === '已结算' ? 'text-[#5D8A66]' : 'text-[#A85C4A]'}`} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-[#5C4033] text-sm">{stmt.period}</p>
                  <p className="text-xs text-[#8B7355]">
                    采购 ¥{stmt.totalAmount.toLocaleString()} | 返利 ¥{stmt.rebateAmount.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${stmt.status === '已结算' ? 'text-[#5D8A66]' : 'text-[#A85C4A]'}`}>
                  {stmt.status}
                </span>
                <ChevronDown className={`w-4 h-4 text-[#8B7355] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </div>
            </button>
            {isExpanded && <div className="border-t border-[#E8E0D5] p-4 bg-[#FAF6F0]">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8B7355]">采购总额</span>
                    <span className="font-bold text-[#5C4033]">¥{stmt.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8B7355]">返利比例</span>
                    <span className="font-bold text-[#5C4033]">{stmt.rebateRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8B7355]">返利金额</span>
                    <span className="font-bold text-[#5D8A66]">¥{stmt.rebateAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8B7355]">已结金额</span>
                    <span className="font-bold text-[#5C4033]">¥{stmt.paidAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-[#D4C4B0]">
                    <span className="text-[#5C4033] font-bold">待结金额</span>
                    <span className="font-bold text-[#A85C4A]">
                      ¥{(stmt.rebateAmount - stmt.paidAmount).toLocaleString()}
                    </span>
                  </div>
                </div>
                <button onClick={() => handleDownload(stmt.period)} className="w-full h-10 bg-white rounded-lg border border-[#E8E0D5] text-[#5C4033] font-bold text-sm flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  下载对账单
                </button>
              </div>}
          </div>;
      })}
      </div>
    </div>;
}