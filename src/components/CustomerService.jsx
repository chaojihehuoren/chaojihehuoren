// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Phone, MessageCircle, HeadphonesIcon, ChevronRight, Clock } from 'lucide-react';

export function CustomerService() {
  return <div className="bg-white rounded-xl shadow-sm border border-herb-brown/10 overflow-hidden">
      <div className="p-4 border-b border-herb-brown/5">
        <h3 className="font-semibold text-herb-dark">联系客服</h3>
      </div>
      <div className="p-4 space-y-3">
        <a href="tel:400-888-9999" className="flex items-center justify-between p-3 bg-herb-green/10 rounded-xl hover:bg-herb-green/20 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-herb-green flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-herb-dark">电话客服</p>
              <p className="text-sm text-herb-brown">400-888-9999</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-herb-brown/40" />
        </a>

        <button className="w-full flex items-center justify-between p-3 bg-herb-brown/10 rounded-xl hover:bg-herb-brown/20 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-herb-brown flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-herb-dark">在线客服</p>
              <p className="text-sm text-herb-brown">即时响应</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-herb-brown/40" />
        </button>

        <div className="flex items-center gap-2 text-sm text-herb-brown p-3 bg-herb-brown/5 rounded-xl">
          <Clock className="w-4 h-4" />
          <span>服务时间：每天 9:00 - 21:00</span>
        </div>
      </div>
    </div>;
}