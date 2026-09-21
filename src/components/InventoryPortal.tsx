'use client';

import React, { useState } from 'react';
import { MOCK_REPRESENTATIVES } from '../mock/repsData';
import { Package, Truck, CheckCircle2, ArrowRightLeft, ShieldCheck, AlertCircle } from 'lucide-react';

export const InventoryPortal: React.FC = () => {
  const [transfers, setTransfers] = useState([
    { id: 'TRF-101', repName: 'طارق محمود', units: 40, item: 'أوجمنتين 1g', value: '32,000 ج.م', status: 'PENDING' },
    { id: 'TRF-102', repName: 'حسن الشامي', units: 60, item: 'حقن الأورام', value: '50,000 ج.م', status: 'APPROVED' },
    { id: 'TRF-103', repName: 'كريم عبد العزيز', units: 50, item: 'شراب مضادات حيوية', value: '45,000 ج.م', status: 'COMPLETED' },
  ]);

  const approveTransfer = (id: string) => {
    setTransfers(transfers.map((t) => (t.id === id ? { ...t, status: 'APPROVED' } : t)));
  };

  const statusLabels: Record<string, string> = {
    PENDING: 'معلق',
    APPROVED: 'معتمد',
    COMPLETED: 'مكتمل',
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
      <div className="p-5 sm:p-7 rounded-[24px] sm:rounded-[28px] bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-purple-500/20 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="p-3 sm:p-3.5 rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/20 shrink-0">
          <Truck className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <div className="text-right">
          <span className="text-[10px] font-extrabold uppercase bg-white/20 text-white px-3 py-0.5 rounded-full inline-block mb-1">
            بوابة سلسلة التوريد وإدارة المخزون
          </span>
          <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">
            مخزون صندوق السيارة ومركز تحويلات المستودع
          </h1>
          <p className="text-xs text-white/80 font-bold mt-0.5">اعتماد تحويلات المخزون من المستودع للسيارة ومراقبة سيولة المخزون الميداني.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Pending Transfer Requests */}
        <div className="lg:col-span-2 p-4 sm:p-6 rounded-[24px] sm:rounded-[28px] bg-white/90 backdrop-blur-md border border-purple-100/60 shadow-sm shadow-purple-900/5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-purple-100/60 pb-3 gap-2">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-purple-600" />
              طلبات تحويل المخزون من المناديب الميدانيين
            </h2>
            <span className="text-xs text-purple-700 bg-purple-50 px-3 py-1 rounded-full font-extrabold border border-purple-100 self-start sm:self-auto">
              {transfers.filter((t) => t.status === 'PENDING').length} في انتظار الاعتماد
            </span>
          </div>

          <div className="space-y-3">
            {transfers.map((t) => (
              <div key={t.id} className="p-3.5 sm:p-4 rounded-2xl bg-purple-50/40 border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-start sm:justify-end">
                    <h3 className="font-extrabold text-slate-900 text-sm">{t.repName}</h3>
                    <span className="font-mono text-xs font-bold text-purple-600">{t.id}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    مطلوب: <span className="text-slate-900 font-bold">{t.units} وحدة</span> من {t.item} ({t.value})
                  </p>
                </div>
                <div>
                  {t.status === 'PENDING' ? (
                    <button
                      onClick={() => approveTransfer(t.id)}
                      className="w-full sm:w-auto px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-500/20 transition-all cursor-pointer"
                    >
                      اعتماد التحويل
                    </button>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-100 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> معتمد
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rep Vehicle Car Boot Stock Audit Overview */}
        <div className="p-4 sm:p-6 rounded-[24px] sm:rounded-[28px] bg-white/90 backdrop-blur-md border border-purple-100/60 shadow-sm shadow-purple-900/5 space-y-4">
          <h2 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-purple-100/60 pb-3 justify-end">
            أرصدة صناديق السيارات النشطة
            <Package className="w-4 h-4 text-purple-600" />
          </h2>
          <div className="space-y-3">
            {MOCK_REPRESENTATIVES.map((r) => (
              <div key={r.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div className="text-left">
                  <span className="font-black text-purple-700 block">{r.stockCustody.currentBalanceUnits} وحدة</span>
                  <span className="text-[10px] text-slate-400 font-bold">{r.stockCustody.currentBalanceValueEgp.toLocaleString('en-US')} ج.م</span>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-slate-900">{r.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold">{r.territory}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

