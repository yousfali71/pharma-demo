'use client';

import React, { useState } from 'react';
import { MOCK_REPRESENTATIVES } from '../mock/repsData';
import { Landmark, ShieldAlert, CheckCircle2, FileText, AlertCircle, ArrowUpRight } from 'lucide-react';

const riskLabels: Record<string, string> = {
  LOW: 'منخفض',
  MEDIUM: 'متوسط',
  HIGH: 'عالي',
  CRITICAL: 'حرج',
};

export const FinancePortal: React.FC = () => {
  const [reconciledIds, setReconciledIds] = useState<string[]>([]);

  const toggleReconcile = (id: string) => {
    if (reconciledIds.includes(id)) {
      setReconciledIds(reconciledIds.filter((i) => i !== id));
    } else {
      setReconciledIds([...reconciledIds, id]);
    }
  };

  const totalOutstanding = MOCK_REPRESENTATIVES.reduce((s, r) => s + r.financialCustody.outstandingBalanceEgp, 0);

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
      <div className="p-5 sm:p-7 rounded-[24px] sm:rounded-[28px] bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-purple-500/20 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-right sm:text-left">
          <span className="text-[11px] sm:text-xs font-bold text-white/80 block uppercase">إجمالي المخاطر غير المودعة</span>
          <span className="text-xl sm:text-2xl font-black text-amber-300">{totalOutstanding.toLocaleString('en-US')} ج.م</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-right">
            <span className="text-[10px] font-extrabold uppercase bg-white/20 text-white px-3 py-0.5 rounded-full inline-block mb-1">
              الخزينة والمالية المؤسسية
            </span>
            <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">
              تسوية عهدة النقدية الميدانية وسجل الإيداعات
            </h1>
            <p className="text-xs text-white/80 font-bold mt-0.5">مراجعة عهدة النقدية المعلقة لدى المناديب والتحقق من إيصالات البنك.</p>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/20 shrink-0">
            <Landmark className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 rounded-[24px] sm:rounded-[28px] bg-white/90 backdrop-blur-md border border-purple-100/60 shadow-sm shadow-purple-900/5 space-y-4">
        <h2 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-purple-100/60 pb-3 justify-end">
          جدول تسوية نقدية المناديب الميدانيين
          <FileText className="w-4 h-4 text-purple-600" />
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-purple-100/60 text-slate-400 uppercase text-[11px] font-black">
                <th className="py-3.5 px-4 whitespace-nowrap">المندوب</th>
                <th className="py-3.5 px-4 whitespace-nowrap">المنطقة</th>
                <th className="py-3.5 px-4 whitespace-nowrap">محصل اليوم</th>
                <th className="py-3.5 px-4 whitespace-nowrap">مودع في البنك</th>
                <th className="py-3.5 px-4 whitespace-nowrap">العهدة المعلقة</th>
                <th className="py-3.5 px-4 whitespace-nowrap">مستوى الخطورة</th>
                <th className="py-3.5 px-4 text-left whitespace-nowrap">إجراء الخزينة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100/60">
              {MOCK_REPRESENTATIVES.map((rep) => {
                const isReconciled = reconciledIds.includes(rep.id);
                return (
                  <tr key={rep.id} className="hover:bg-purple-50/50">
                    <td className="py-3.5 px-4 font-extrabold text-slate-900 whitespace-nowrap">
                      <div className="flex items-center gap-2 justify-end">
                        {rep.name}
                        <img src={rep.avatar} alt={rep.name} className="w-8 h-8 rounded-full object-cover border border-purple-200" />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-600 whitespace-nowrap">{rep.territory}</td>
                    <td className="py-3.5 px-4 font-black text-slate-900 whitespace-nowrap">
                      {rep.financialCustody.collectedTodayEgp.toLocaleString('en-US')} ج.م
                    </td>
                    <td className="py-3.5 px-4 font-black text-emerald-600 whitespace-nowrap">
                      {rep.financialCustody.depositedTodayEgp.toLocaleString('en-US')} ج.م
                    </td>
                    <td className="py-3.5 px-4 font-black text-amber-600 whitespace-nowrap">
                      {rep.financialCustody.outstandingBalanceEgp.toLocaleString('en-US')} ج.م
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-extrabold ${
                          rep.financialCustody.riskStatus === 'CRITICAL'
                            ? 'bg-rose-50 text-rose-600 border border-rose-200'
                            : rep.financialCustody.riskStatus === 'HIGH'
                            ? 'bg-amber-50 text-amber-600 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        }`}
                      >
                        {riskLabels[rep.financialCustody.riskStatus] || rep.financialCustody.riskStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-left whitespace-nowrap">
                      <button
                        onClick={() => toggleReconcile(rep.id)}
                        className={`px-4 py-2 rounded-full font-extrabold text-xs transition-all shadow-sm cursor-pointer ${
                          isReconciled
                            ? 'bg-emerald-600 text-white'
                            : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200'
                        }`}
                      >
                        {isReconciled ? 'مُتحقق منه' : 'تحقق من الإيداع'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

