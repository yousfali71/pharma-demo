'use client';

import React from 'react';
import { MedicalRep } from '../types/pharma';
import { Users, Target, Banknote, ShoppingBag, ArrowUpRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { fmt } from '../utils/format';

interface Props {
  reps: MedicalRep[];
}

export const KpiWidgets: React.FC<Props> = ({ reps }) => {
  const activeRepsCount = reps.filter((r) => r.status === 'ACTIVE' || r.status === 'EN_ROUTE').length;
  const totalRepsCount = reps.length;

  const totalPlannedVisits = reps.reduce((sum, r) => sum + r.plannedVisits, 0);
  const totalActualVisits = reps.reduce((sum, r) => sum + r.actualVisits, 0);
  const coveragePct = Math.round((totalActualVisits / totalPlannedVisits) * 100);

  const totalOutstandingFinance = reps.reduce((sum, r) => sum + r.financialCustody.outstandingBalanceEgp, 0);
  const totalTodayOrders = reps.reduce((sum, r) => sum + r.stockCustody.soldTodayValueEgp, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {/* Widget 1: Active Representatives */}
      <div className="p-4 sm:p-5 rounded-[20px] sm:rounded-[24px] bg-white/90 backdrop-blur-md border border-purple-100/60 shadow-sm shadow-purple-900/5 hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] sm:text-xs font-extrabold text-slate-400 uppercase tracking-wider">المناديب النشطون اليوم</span>
          <div className="p-2 sm:p-2.5 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{activeRepsCount}</span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-bold">/ {totalRepsCount} مندوب</span>
          </div>
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            مباشر
          </span>
        </div>
        <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${(activeRepsCount / totalRepsCount) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Widget 2: Field Coverage % */}
      <div className="p-4 sm:p-5 rounded-[20px] sm:rounded-[24px] bg-white/90 backdrop-blur-md border border-purple-100/60 shadow-sm shadow-purple-900/5 hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] sm:text-xs font-extrabold text-slate-400 uppercase tracking-wider">تغطية الزيارات الميدانية</span>
          <div className="p-2 sm:p-2.5 rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-100">
            <Target className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{coveragePct}%</span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-bold">({totalActualVisits}/{totalPlannedVisits})</span>
          </div>
          <span className="flex items-center text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-100">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> +5.2%
          </span>
        </div>
        <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${coveragePct}%` }}
          ></div>
        </div>
      </div>

      {/* Widget 3: Financial Custody */}
      <div className="p-4 sm:p-5 rounded-[20px] sm:rounded-[24px] bg-white/90 backdrop-blur-md border border-purple-100/60 shadow-sm shadow-purple-900/5 hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] sm:text-xs font-extrabold text-slate-400 uppercase tracking-wider">العهدة المالية المعلقة</span>
          <div className="p-2 sm:p-2.5 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100">
            <Banknote className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xl sm:text-2xl font-black text-amber-600 tracking-tight">
              {fmt(totalOutstandingFinance)} ج.م
            </span>
            <p className="text-[10px] text-slate-400 font-semibold">في انتظار الإيداع البنكي</p>
          </div>
          <span className="flex items-center text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
            <AlertCircle className="w-3 h-3 mr-1" /> مخاطرة عالية
          </span>
        </div>
        <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full w-3/4"></div>
        </div>
      </div>

      {/* Widget 4: Today's Orders Value */}
      <div className="p-4 sm:p-5 rounded-[20px] sm:rounded-[24px] bg-white/90 backdrop-blur-md border border-purple-100/60 shadow-sm shadow-purple-900/5 hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] sm:text-xs font-extrabold text-slate-400 uppercase tracking-wider">قيمة مبيعات اليوم</span>
          <div className="p-2 sm:p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {fmt(totalTodayOrders)} ج.م
            </span>
            <p className="text-[10px] text-slate-400 font-semibold">فواتير صيدليات مسلمة</p>
          </div>
          <span className="flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            <CheckCircle2 className="w-3 h-3 mr-0.5" /> في المسار
          </span>
        </div>
        <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full w-4/5"></div>
        </div>
      </div>
    </div>
  );
};

