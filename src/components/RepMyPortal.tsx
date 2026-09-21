'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_REPRESENTATIVES } from '../mock/repsData';
import {
  CalendarCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Package,
  Banknote,
  Send,
  PlusCircle,
  AlertCircle,
  Car,
} from 'lucide-react';

export const RepMyPortal: React.FC = () => {
  const { currentUser } = useAuth();
  const rep = MOCK_REPRESENTATIVES.find((r) => r.name === currentUser?.name) || MOCK_REPRESENTATIVES[0];

  const [checkedIn, setCheckedIn] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderAmount, setOrderAmount] = useState('15000');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [cashCollected, setCashCollected] = useState('');
  const [collectionSuccess, setCollectionSuccess] = useState(false);

  const visitsList = [
    { id: 1, name: 'صيدلية الإيمان', type: 'صيدلية', status: 'COMPLETED', time: '09:30 ص', area: 'الحي السابع' },
    { id: 2, name: 'صيدلية سيف', type: 'صيدلية', status: 'COMPLETED', time: '10:45 ص', area: 'مكرم عبيد' },
    { id: 3, name: 'عيادة د. يوسف', type: 'عيادة طبيب', status: 'IN_PROGRESS', time: '11:45 ص', area: 'عباس العقاد' },
    { id: 4, name: 'صيدلية رشدي', type: 'صيدلية', status: 'PENDING', time: '01:30 م', area: 'كوربة' },
    { id: 5, name: 'د. علي لعظام والمفاصل', type: 'عيادة طبيب', status: 'PENDING', time: '02:45 م', area: 'مصر الجديدة' },
  ];

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setOrderModalOpen(false);
    }, 1500);
  };

  const handleCashCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cashCollected) return;
    setCollectionSuccess(true);
    setTimeout(() => {
      setCollectionSuccess(false);
      setCashCollected('');
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Rep Header Greeting */}
      <div className="p-7 rounded-[28px] bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => setCheckedIn(!checkedIn)}
          className={`px-6 py-3 rounded-full font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 ${
            checkedIn
              ? 'bg-emerald-400 text-slate-950 shadow-emerald-500/20'
              : 'bg-white text-purple-700 hover:bg-purple-50 shadow-purple-900/20 hover:scale-105'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {checkedIn ? 'تم تسجيل الحضور في عيادة د. يوسف' : 'تسجيل حضور GPS في الموقع الحالي'}
        </button>

        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2 justify-end">
              <span className="text-xs font-mono font-bold bg-white/20 text-white px-3 py-0.5 rounded-full">{rep.employeeCode}</span>
              <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold bg-white/20 text-white">
                بوابة المندوب الطبي
              </span>
            </div>
            <h1 className="text-xl font-black text-white tracking-tight mt-1 text-right">أهلاً، {rep.name}</h1>
            <p className="text-xs text-white/80 font-bold text-right">المنطقة: {rep.territory} | السيارة: {rep.vehiclePlate}</p>
          </div>
          <img
            src={rep.avatar}
            alt={rep.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
          />
        </div>
      </div>

      {/* Grid: Route Schedule & Quick Action Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Route Schedule Checklist */}
        <div className="lg:col-span-2 p-6 rounded-[28px] bg-white/90 backdrop-blur-md border border-purple-100/60 shadow-sm shadow-purple-900/5 space-y-4">
          <div className="flex items-center justify-between border-b border-purple-100/60 pb-3">
            <span className="text-xs font-extrabold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              ٣ من ٥ زيارات مكتملة
            </span>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900">جدول مسار اليوم المحدد</h2>
              <CalendarCheck className="w-5 h-5 text-purple-600" />
            </div>
          </div>

          <div className="space-y-3">
            {visitsList.map((visit) => (
              <div
                key={visit.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  visit.status === 'COMPLETED'
                    ? 'bg-purple-50/30 border-purple-100 opacity-80'
                    : visit.status === 'IN_PROGRESS'
                    ? 'bg-purple-50/80 border-purple-200 shadow-sm'
                    : 'bg-white border-slate-100'
                }`}
              >
                <div>
                  {visit.status === 'COMPLETED' && (
                    <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      زيارة مؤكدة
                    </span>
                  )}
                  {visit.status === 'IN_PROGRESS' && (
                    <button
                      onClick={() => setOrderModalOpen(true)}
                      className="px-4 py-2 rounded-full bg-purple-600 text-white text-xs font-extrabold shadow-md shadow-purple-500/20 hover:bg-purple-700 transition-all flex items-center gap-1"
                    >
                      <PlusCircle className="w-3.5 h-3.5" /> تقديم طلب
                    </button>
                  )}
                  {visit.status === 'PENDING' && (
                    <span className="text-[11px] font-bold text-slate-400">التالي في الطابور</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">
                        {visit.type}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-sm">{visit.name}</h3>
                    </div>
                    <p className="text-xs text-slate-500 font-bold flex items-center gap-1 mt-0.5 justify-end">
                      موعد: {visit.time} • {visit.area}
                      <MapPin className="w-3 h-3 text-purple-600" />
                    </p>
                  </div>
                  <div className="mt-0.5">
                    {visit.status === 'COMPLETED' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-amber-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Personal Car Custody Summary & Cash Collection Form */}
        <div className="space-y-6">
          {/* Personal Car Custody Card */}
          <div className="p-6 rounded-[28px] bg-white/90 backdrop-blur-md border border-purple-100/60 shadow-sm shadow-purple-900/5 space-y-3">
            <div className="flex items-center gap-2 border-b border-purple-100/60 pb-2 justify-end">
              <h3 className="text-sm font-black text-slate-900">عهدة صندوق سيارتي</h3>
              <Package className="w-4 h-4 text-purple-600" />
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-700">
                <span className="font-black text-slate-900">{rep.stockCustody.currentBalanceUnits} وحدة</span>
                <span className="font-bold">الرصيد الحالي:</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span className="font-black text-purple-600">
                  {rep.stockCustody.currentBalanceValueEgp.toLocaleString('en-US')} ج.م
                </span>
                <span className="font-bold">إجمالي القيمة:</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span className="font-black text-amber-600">
                  {rep.financialCustody.outstandingBalanceEgp.toLocaleString('en-US')} ج.م
                </span>
                <span className="font-bold">نقدية لم تودع:</span>
              </div>
            </div>
          </div>

          {/* Quick Cash Collection Form */}
          <div className="p-6 rounded-[28px] bg-white/90 backdrop-blur-md border border-purple-100/60 shadow-sm shadow-purple-900/5 space-y-3">
            <div className="flex items-center gap-2 border-b border-purple-100/60 pb-2 justify-end">
              <h3 className="text-sm font-black text-slate-900">تسجيل تحصيل نقدية</h3>
              <Banknote className="w-4 h-4 text-emerald-600" />
            </div>
            <form onSubmit={handleCashCollection} className="space-y-3">
              <div>
                <label className="text-[11px] font-extrabold text-slate-500 block mb-1 text-right">
                  المبلغ المحصل (ج.م)
                </label>
                <input
                  type="number"
                  value={cashCollected}
                  onChange={(e) => setCashCollected(e.target.value)}
                  placeholder="مثال: 12500"
                  className="w-full bg-slate-50 border border-purple-100 rounded-2xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 text-right font-bold"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> تسجيل إيصال التحصيل
              </button>
              {collectionSuccess && (
                <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-[11px] text-center font-extrabold animate-in fade-in">
                  تم تسجيل التحصيل بنجاح!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Submit Order Modal */}
      {orderModalOpen && typeof window !== 'undefined' && require('react-dom').createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
          <div className="w-full max-w-md bg-white border border-purple-100 rounded-[28px] p-6 shadow-2xl space-y-4 my-auto">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <button onClick={() => setOrderModalOpen(false)} className="text-slate-400 hover:text-purple-600 font-bold">
                ✕
              </button>
              <h3 className="text-base font-black text-slate-900">تقديم طلب صيدلية جديد</h3>
            </div>
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-extrabold text-slate-600 block mb-1 text-right">اختر المنتج</label>
                <select className="w-full bg-slate-50 border border-purple-100 rounded-2xl p-3 text-xs text-slate-900 font-bold text-right">
                  <option>كارديفول 5mg (أمراض القلب) - 20 علبة</option>
                  <option>أوجمنتين 1g (مضادات حيوية) - 30 علبة</option>
                  <option>ليبيستات 20mg (الكوليسترول) - 15 علبة</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-extrabold text-slate-600 block mb-1 text-right">قيمة الطلب الإجمالية (ج.م)</label>
                <input
                  type="number"
                  value={orderAmount}
                  onChange={(e) => setOrderAmount(e.target.value)}
                  className="w-full bg-slate-50 border border-purple-100 rounded-2xl p-3 text-xs text-slate-900 font-bold text-right"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-lg shadow-purple-500/20 transition-all"
              >
                إرسال الطلب للنظام
              </button>
              {orderSuccess && (
                <div className="p-3 rounded-2xl bg-purple-50 text-purple-700 text-xs text-center font-extrabold">
                  طلب رقم ORD-9981 تم تقديمه وخصم مخزون السيارة!
                </div>
              )}
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
