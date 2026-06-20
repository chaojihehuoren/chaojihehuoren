// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { FileText, Download, CheckCircle, Clock } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

const INVOICE_HISTORY = [{
  id: 'INV-2024-0892',
  type: '增值税专用发票',
  amount: 28500,
  status: '已开票',
  date: '2024-03-15'
}, {
  id: 'INV-2024-0867',
  type: '增值税普通发票',
  amount: 15800,
  status: '已开票',
  date: '2024-03-01'
}, {
  id: 'INV-2024-0823',
  type: '增值税专用发票',
  amount: 42600,
  status: '已开票',
  date: '2024-02-18'
}];
export function InvoiceSection() {
  const {
    toast
  } = useToast();
  const [invoiceType, setInvoiceType] = useState('special');
  const [taxRate, setTaxRate] = useState('6');
  const handleApplyInvoice = () => {
    toast({
      title: '发票申请已提交',
      description: '预计3个工作日内开具，请注意查收邮件'
    });
  };
  return <div className="p-4">
      <h2 className="text-lg font-bold text-[#5C4033] mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-[#5D8A66] rounded-full"></span>
        电子发票申请
      </h2>

      {/* 发票类型选择 */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-4 mb-4">
        <h3 className="font-bold text-[#5C4033] mb-3">发票类型</h3>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setInvoiceType('special')} className={`p-3 rounded-xl border-2 transition-all ${invoiceType === 'special' ? 'border-[#5D8A66] bg-[#5D8A66]/5' : 'border-[#E8E0D5]'}`}>
            <FileText className={`w-6 h-6 mx-auto mb-2 ${invoiceType === 'special' ? 'text-[#5D8A66]' : 'text-[#8B7355]'}`} />
            <p className={`font-bold text-sm ${invoiceType === 'special' ? 'text-[#5D8A66]' : 'text-[#5C4033]'}`}>
              增值税专用发票
            </p>
            <p className="text-xs text-[#8B7355] mt-1">可抵扣进项税</p>
          </button>
          <button onClick={() => setInvoiceType('normal')} className={`p-3 rounded-xl border-2 transition-all ${invoiceType === 'normal' ? 'border-[#5D8A66] bg-[#5D8A66]/5' : 'border-[#E8E0D5]'}`}>
            <FileText className={`w-6 h-6 mx-auto mb-2 ${invoiceType === 'normal' ? 'text-[#5D8A66]' : 'text-[#8B7355]'}`} />
            <p className={`font-bold text-sm ${invoiceType === 'normal' ? 'text-[#5D8A66]' : 'text-[#5C4033]'}`}>
              增值税普通发票
            </p>
            <p className="text-xs text-[#8B7355] mt-1">不可抵扣进项税</p>
          </button>
        </div>
      </div>

      {/* 税率选择 */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-4 mb-4">
        <h3 className="font-bold text-[#5C4033] mb-3">开票税率</h3>
        <div className="flex gap-2">
          {['6', '9', '13'].map(rate => <button key={rate} onClick={() => setTaxRate(rate)} className={`flex-1 py-2 rounded-lg font-bold transition-all ${taxRate === rate ? 'bg-[#5D8A66] text-white' : 'bg-[#FAF6F0] text-[#5C4033]'}`}>
              {rate}%
            </button>)}
        </div>
      </div>

      {/* 发票抬头信息 */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-4 mb-4">
        <h3 className="font-bold text-[#5C4033] mb-3">发票抬头</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-[#8B7355]">单位名称</label>
            <input type="text" value="济南本草堂大药房有限公司" readOnly className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E8E0D5] bg-[#FAF6F0] text-[#5C4033]" />
          </div>
          <div>
            <label className="text-sm text-[#8B7355]">税号</label>
            <input type="text" value="91370105MA3Q7JK8X6" readOnly className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E8E0D5] bg-[#FAF6F0] text-[#5C4033]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-[#8B7355]">开户银行</label>
              <input type="text" value="中国银行济南分行" readOnly className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E8E0D5] bg-[#FAF6F0] text-[#5C4033]" />
            </div>
            <div>
              <label className="text-sm text-[#8B7355]">银行账号</label>
              <input type="text" value="623258914762****" readOnly className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E8E0D5] bg-[#FAF6F0] text-[#5C4033]" />
            </div>
          </div>
        </div>
      </div>

      {/* 申请按钮 */}
      <button onClick={handleApplyInvoice} className="w-full h-12 bg-[#5D8A66] text-white rounded-xl font-bold text-base mb-6">
        申请开具发票
      </button>

      {/* 历史记录 */}
      <h3 className="font-bold text-[#5C4033] mb-3">历史开票记录</h3>
      <div className="space-y-3">
        {INVOICE_HISTORY.map(invoice => <div key={invoice.id} className="bg-white rounded-xl border border-[#E8E0D5] p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-bold text-[#5C4033] text-sm">{invoice.id}</p>
                <p className="text-xs text-[#8B7355] mt-1">{invoice.type}</p>
              </div>
              <span className="flex items-center gap-1 text-xs text-[#5D8A66] bg-[#5D8A66]/10 px-2 py-1 rounded-full">
                <CheckCircle className="w-3 h-3" />
                {invoice.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-[#8B7355]">开票金额：</span>
                <span className="font-bold text-[#A85C4A]">¥{invoice.amount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#8B7355]">{invoice.date}</span>
                <button className="flex items-center gap-1 text-xs text-[#5D8A66] font-bold">
                  <Download className="w-3 h-3" />
                  下载
                </button>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
}