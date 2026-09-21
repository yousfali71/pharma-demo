'use client';

import React, { useState } from 'react';
import { MedicalRep } from '../types/pharma';
import {
  Crown,
  Shield,
  Activity,
  TrendingUp,
  AlertTriangle,
  Radio,
  Building,
  Layers,
  CreditCard,
  ArrowUpLeft,
  ArrowDownRight,
  MoreHorizontal,
  ChevronDown,
  ShoppingBag,
  Clock,
  DollarSign,
  Briefcase,
  Users
} from 'lucide-react';
import { fmt } from '../utils/format';

interface Props {
  reps: MedicalRep[];
  onSelectTab: (tab: string) => void;
  onSelectRep: (rep: MedicalRep) => void;
}

export const SuperAdminOverview: React.FC<Props> = ({ reps, onSelectTab, onSelectRep }) => {
  const totalReps = reps.length;
  const totalStockLiquidity = reps.reduce((sum, r) => sum + r.stockCustody.currentBalanceValueEgp, 0);
  const totalCashRisk = reps.reduce((sum, r) => sum + r.financialCustody.outstandingBalanceEgp, 0);
  const totalDailyRevenue = reps.reduce((sum, r) => sum + r.stockCustody.soldTodayValueEgp, 0);

  const [activeHoverPoint, setActiveHoverPoint] = useState<number | null>(4);

  // Activity list items (walIQ Transaction History style)
  const recentTransactions = [
    { title: 'تحصيل صيدلية العزبي المعادي', date: '٢٠ سبتمبر ٢٠٢٦', amount: '+ 12,500 ج.م', type: 'collection', icon: DollarSign, color: 'bg-emerald-100 text-emerald-600' },
    { title: 'صرف عهدة عينات د. علي عظام', date: '٢٠ سبتمبر ٢٠٢٦', amount: '- 3,400 ج.م', type: 'samples', icon: ShoppingBag, color: 'bg-purple-100 text-purple-600' },
    { title: 'إيداع بنك مصر — د. أحمد سامي', date: '١٩ سبتمبر ٢٠٢٦', amount: '+ 45,000 ج.م', type: 'deposit', icon: Briefcase, color: 'bg-indigo-100 text-indigo-600' },
    { title: 'تسليم فاتورة صيدليات مصر', date: '١٩ سبتمبر ٢٠٢٦', amount: '+ 8,900 ج.م', type: 'invoice', icon: Clock, color: 'bg-cyan-100 text-cyan-600' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Main Grid Layout - WalIQ 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Main Column (WalIQ Dashboard & Income Grid) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header Greeting */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">الرئيسية</h1>
              <p className="text-xs text-slate-500 font-semibold">مرحباً بك، المشرف العام - مركز تتبع القوة الميدانية</p>
            </div>
            <button
              onClick={() => onSelectTab('field-force')}
              className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-500/20 transition-all flex items-center gap-1.5"
            >
              <span>متابعة الخريطة</span>
              <ArrowUpLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* WalIQ Gradient Credit Card */}
          <div className="p-7 rounded-[28px] bg-gradient-to-tr from-[#a855f7] via-[#6366f1] to-[#06b6d4] text-white shadow-2xl shadow-indigo-500/25 relative overflow-hidden group">
            {/* Background glowing circle overlays */}
            <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="absolute right-10 top-0 w-32 h-32 bg-cyan-300/20 rounded-full blur-lg pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <span className="text-xs font-bold text-white/80 uppercase tracking-widest block mb-1">بطاقة العهدة والمبيعات</span>
                <span className="text-[11px] font-mono bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white font-semibold">
                  00/26
                </span>
              </div>
              <div className="flex items-center gap-1.5 opacity-90">
                <div className="w-7 h-7 rounded-full bg-white/30 backdrop-blur-md"></div>
                <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md -mr-3"></div>
              </div>
            </div>

            <div className="my-6 relative z-10">
              <p className="text-xs text-white/75 font-semibold">إجمالي المبيعات النشطة</p>
              <div className="text-3xl font-black tracking-wider font-mono mt-1">
                {fmt(totalDailyRevenue + totalStockLiquidity)} <span className="text-base font-bold">ج.م</span>
              </div>
              <p className="text-[11px] font-mono text-white/80 mt-2 tracking-widest">
                4354 1123 6432 7889
              </p>
            </div>

            <div className="flex justify-between items-end pt-4 border-t border-white/15 relative z-10 text-xs">
              <div>
                <p className="text-[10px] text-white/70 font-medium">حامل البطاقة</p>
                <p className="font-extrabold text-white text-sm">أحمد منصور (المدير الإقليمي)</p>
              </div>
              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full font-bold">
                نشط الآن
              </span>
            </div>
          </div>

          {/* WalIQ Income Sub-Cards Grid (2x2) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-extrabold text-slate-800">مؤشرات الأداء والسداد</h2>
              <button onClick={() => onSelectTab('financials')} className="text-xs text-purple-600 font-bold hover:underline">
                عرض المزيد
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="p-5 rounded-[24px] bg-white/90 backdrop-blur-md border border-purple-100/60 shadow-sm shadow-purple-900/5 hover:shadow-md transition-all">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-400">مبيعات اليوم</span>
                  <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl font-black text-slate-900">{fmt(totalDailyRevenue)} ج.م</div>
                <span className="inline-block mt-2 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  +12.4% هذا الأسبوع
                </span>
              </div>

              {/* Card 2 */}
              <div className="p-5 rounded-[24px] bg-white/90 backdrop-blur-md border border-purple-100/60 shadow-sm shadow-purple-900/5 hover:shadow-md transition-all">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-400">عهدة السيارات</span>
                  <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl font-black text-slate-900">{fmt(totalStockLiquidity)} ج.م</div>
                <span className="inline-block mt-2 text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-full">
                  مخزون مسجل
                </span>
              </div>

              {/* Card 3 */}
              <div className="p-5 rounded-[24px] bg-white/90 backdrop-blur-md border border-purple-100/60 shadow-sm shadow-purple-900/5 hover:shadow-md transition-all">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-400">مخاطر النقدية</span>
                  <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl font-black text-amber-600">{fmt(totalCashRisk)} ج.م</div>
                <span className="inline-block mt-2 text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full">
                  في انتظار الإيداع
                </span>
              </div>

              {/* Card 4 */}
              <div className="p-5 rounded-[24px] bg-white/90 backdrop-blur-md border border-purple-100/60 shadow-sm shadow-purple-900/5 hover:shadow-md transition-all">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-400">القوة النشطة</span>
                  <div className="p-2.5 rounded-2xl bg-cyan-50 text-cyan-600">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl font-black text-slate-900">{totalReps} مناديب</div>
                <span className="inline-block mt-2 text-[10px] text-cyan-600 font-bold bg-cyan-50 px-2 py-0.5 rounded-full">
                  تغطية ١٠٠٪
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Main Column (WalIQ Balance Graph & Transaction History) */}
        <div className="lg:col-span-5 space-y-6">
          {/* WalIQ Smooth Spline Chart Card ("My Balance") */}
          <div className="p-6 rounded-[28px] bg-white/90 backdrop-blur-md border border-purple-100/60 shadow-sm shadow-purple-900/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-slate-400 font-bold">الرصيد والسيولة</p>
                <h3 className="text-2xl font-black text-purple-700 mt-0.5">
                  {fmt(totalDailyRevenue + totalStockLiquidity)} <span className="text-sm font-bold text-slate-500">ج.م</span>
                </h3>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100">
                <span>شهرياً</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Smooth Spline SVG Line Graph */}
            <div className="h-44 w-full relative mt-6">
              {/* Tooltip Overlay */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-1 rounded-xl text-[11px] font-bold shadow-lg flex items-center gap-1 z-20">
                <span>التحصيل:</span>
                <span className="text-purple-400 font-mono">28,450 ج.م</span>
              </div>

              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Spline Area Fill */}
                <path
                  d="M 0,90 Q 40,40 80,70 T 160,50 T 240,20 T 320,60 T 400,30 L 400,120 L 0,120 Z"
                  fill="url(#purpleGradient)"
                />

                {/* Smooth Spline Line */}
                <path
                  d="M 0,90 Q 40,40 80,70 T 160,50 T 240,20 T 320,60 T 400,30"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Active Highlight Circle Point */}
                <circle cx="240" cy="20" r="6" fill="#8b5cf6" stroke="#ffffff" strokeWidth="3" className="shadow-md" />
              </svg>

              {/* Month Labels */}
              <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-2 px-1">
                <span>مايو</span>
                <span>يونيو</span>
                <span>يوليو</span>
                <span className="text-purple-700 font-extrabold underline underline-offset-4">أغسطس</span>
                <span>سبتمبر</span>
                <span>أكتوبر</span>
              </div>
            </div>
          </div>

          {/* WalIQ Transaction History List */}
          <div className="p-6 rounded-[28px] bg-white/90 backdrop-blur-md border border-purple-100/60 shadow-sm shadow-purple-900/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-slate-800">سجل النشاط المالي الميداني</h3>
              <button className="flex items-center gap-1 text-xs text-purple-600 font-bold hover:underline">
                <span>ترتيب حسب</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {recentTransactions.map((tx, idx) => {
                const Icon = tx.icon;
                return (
                  <div key={idx} className="flex items-center justify-between p-2.5 hover:bg-purple-50/50 rounded-2xl transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-2xl ${tx.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-slate-900">{tx.title}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">{tx.date}</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-slate-800 font-mono">{tx.amount}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
