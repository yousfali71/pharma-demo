'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MedicalRep } from '../types/pharma';
import { MapVisual } from './MapVisual';
import { useAuth } from '../context/AuthContext';
import {
  X,
  MapPin,
  Clock,
  Package,
  Landmark,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Phone,
  Mail,
  Car,
  ShieldAlert,
} from 'lucide-react';
import { fmt } from '../utils/format';

interface Props {
  rep: MedicalRep | null;
  onClose: () => void;
}

const riskLabels: Record<string, string> = {
  LOW: 'منخفض',
  MEDIUM: 'متوسط',
  HIGH: 'عالي',
  CRITICAL: 'حرج',
};

export const RepDetailsDrawer: React.FC<Props> = ({ rep, onClose }) => {
  const { canApproveFinancials, canManageStockTransfers } = useAuth();
  const [depositNoticeSent, setDepositNoticeSent] = useState(false);
  const [auditRequested, setAuditRequested] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!rep || !mounted) return null;

  const stock = rep.stockCustody;
  const finance = rep.financialCustody;
  const visitProgressPct = Math.round((rep.actualVisits / rep.plannedVisits) * 100);

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-screen max-w-2xl bg-white/95 backdrop-blur-2xl border-r border-purple-100/80 shadow-2xl flex flex-col justify-between overflow-y-auto">
            {/* Top Bar Header */}
            <div>
              <div className="p-6 border-b border-purple-100/60 bg-white/80 sticky top-0 z-20 backdrop-blur-md flex items-center justify-between">
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-xs font-mono font-extrabold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                        {rep.employeeCode}
                      </span>
                      <h2 className="text-xl font-black text-slate-900 tracking-tight">{rep.name}</h2>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 font-bold justify-end">
                      <span className="flex items-center gap-1">
                        <Car className="w-3.5 h-3.5 text-purple-600" />
                        {rep.vehiclePlate}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-purple-600" />
                        {rep.territory}
                      </span>
                    </div>
                  </div>
                  <img
                    src={rep.avatar}
                    alt={rep.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-purple-500 shadow-md shadow-purple-500/20"
                  />
                </div>
              </div>

              {/* Main Content Body */}
              <div className="p-6 space-y-6">
                {/* Current Workflow Status Alert Banner */}
                <div className="p-5 rounded-[24px] bg-gradient-to-l from-purple-50 via-white to-white border border-purple-100 flex items-center justify-between shadow-sm">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1.5 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    نشط في الميدان
                  </span>
                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 block">
                        بيانات سير العمل الحالية
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-900">{rep.currentWorkflow}</h4>
                      <p className="text-xs text-slate-400 font-semibold">آخر نشاط: {rep.lastActiveTime}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-purple-100 text-purple-600">
                      <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
                    </div>
                  </div>
                </div>

                {/* Live GPS Telemetry Visual Map */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 justify-end">
                    بيانات GPS والمسار الميداني
                    <MapPin className="w-4 h-4 text-purple-600" />
                  </h3>
                  <MapVisual
                    location={rep.gpsLocation}
                    repName={rep.name}
                    status={rep.status}
                    currentWorkflow={rep.currentWorkflow}
                  />
                </div>

                {/* Closed-Loop Stock Custody Widget */}
                <div className="p-6 rounded-[24px] bg-white border border-purple-100/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-purple-100/60 pb-3">
                    {canManageStockTransfers && (
                      <button
                        onClick={() => setAuditRequested(true)}
                        disabled={auditRequested}
                        className="px-4 py-2 rounded-full bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white border border-purple-200 text-xs font-extrabold transition-all shadow-sm"
                      >
                        {auditRequested ? 'تم طلب المراجعة' : 'طلب مراجعة الصندوق'}
                      </button>
                    )}
                    <div className="flex items-center gap-2">
                      <div>
                        <h3 className="text-sm font-black text-slate-900 text-right">عهدة المخزون — صندوق السيارة</h3>
                        <p className="text-xs text-slate-400 font-semibold text-right">وحدات مطابقة ورصيد المخزون بالجنيه</p>
                      </div>
                      <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600">
                        <Package className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">رصيد الافتتاح</span>
                      <span className="text-sm font-black text-slate-800">{stock.openingUnits} وحدة</span>
                      <span className="text-[10px] text-slate-400 font-bold block">{stock.openingValueEgp.toLocaleString('en-US')} ج.م</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                      <span className="text-[10px] text-emerald-600 block uppercase font-bold">+ مُستلم اليوم</span>
                      <span className="text-sm font-black text-emerald-600">+{stock.receivedTodayUnits} وحدة</span>
                      <span className="text-[10px] text-emerald-700 font-bold block">{stock.receivedTodayValueEgp.toLocaleString('en-US')} ج.م</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-cyan-50/50 border border-cyan-100">
                      <span className="text-[10px] text-cyan-600 block uppercase font-bold">- مُباع / مُسلم</span>
                      <span className="text-sm font-black text-cyan-600">-{stock.soldTodayUnits} وحدة</span>
                      <span className="text-[10px] text-cyan-700 font-bold block">{stock.soldTodayValueEgp.toLocaleString('en-US')} ج.م</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-amber-50/50 border border-amber-100">
                      <span className="text-[10px] text-amber-600 block uppercase font-bold">- مُرتجع / تالف</span>
                      <span className="text-sm font-black text-amber-600">-{stock.returnedTodayUnits} وحدة</span>
                      <span className="text-[10px] text-amber-700 font-bold block">{stock.returnedTodayValueEgp.toLocaleString('en-US')} ج.م</span>
                    </div>
                  </div>

                  {/* Current Car Boot Balance Result */}
                  <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-100 text-purple-700">
                      مُطابق
                    </span>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-500">الرصيد الحالي في صندوق السيارة:</span>
                      <div className="flex items-baseline gap-2 justify-end">
                        <span className="text-xs text-slate-400 font-bold">
                          ({stock.currentBalanceValueEgp.toLocaleString('en-US')} ج.م)
                        </span>
                        <span className="text-lg font-black text-purple-700">{stock.currentBalanceUnits} وحدة</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Closed-Loop Financial Custody Widget */}
                <div className="p-6 rounded-[24px] bg-white border border-purple-100/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-purple-100/60 pb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                        finance.riskStatus === 'CRITICAL'
                          ? 'bg-rose-50 text-rose-600 border-rose-200'
                          : finance.riskStatus === 'HIGH'
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      }`}
                    >
                      خطورة {riskLabels[finance.riskStatus] || finance.riskStatus}
                    </span>
                    <div className="flex items-center gap-2">
                      <div>
                        <h3 className="text-sm font-black text-slate-900 text-right">العهدة المالية</h3>
                        <p className="text-xs text-slate-400 font-semibold text-right">نقدية مُحصلة، إيصالات إيداع، وعهدة معلقة</p>
                      </div>
                      <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600">
                        <Landmark className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">إجمالي النقدية المحصلة</span>
                      <span className="text-base font-black text-slate-900">
                        {finance.collectedTodayEgp.toLocaleString('en-US')} ج.م
                      </span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                      <span className="text-[10px] text-emerald-600 block uppercase font-bold">مُودَع في البنك</span>
                      <span className="text-base font-black text-emerald-600">
                        {finance.depositedTodayEgp.toLocaleString('en-US')} ج.م
                      </span>
                      {finance.lastDepositTime && (
                        <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">{finance.lastDepositTime}</span>
                      )}
                    </div>
                    <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200">
                      <span className="text-[10px] text-amber-600 block uppercase font-black">عهدة نقدية معلقة</span>
                      <span className="text-base font-black text-amber-600">
                        {finance.outstandingBalanceEgp.toLocaleString('en-US')} ج.م
                      </span>
                    </div>
                  </div>

                  {canApproveFinancials && finance.outstandingBalanceEgp > 0 && (
                    <div className="pt-2 flex justify-start">
                      <button
                        onClick={() => setDepositNoticeSent(true)}
                        disabled={depositNoticeSent}
                        className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center gap-2"
                      >
                        <ShieldAlert className="w-4 h-4" />
                        {depositNoticeSent ? 'تم إرسال طلب الإيداع للمندوب' : 'إرسال إشعار إيداع إجباري'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Recent Transactions Timeline (Audit Trail) */}
                <div className="p-6 rounded-[24px] bg-white border border-purple-100/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-purple-100/60 pb-3">
                    <span className="text-xs text-slate-400 font-mono font-bold">{rep.recentActions.length} سجل اليوم</span>
                    <div className="flex items-center gap-2">
                      <div>
                        <h3 className="text-sm font-black text-slate-900 text-right">سجل المعاملات والمراجعة</h3>
                        <p className="text-xs text-slate-400 font-semibold text-right">سجل مختوم بالوقت لأنشطة الميدان اليوم</p>
                      </div>
                      <div className="p-2.5 rounded-2xl bg-cyan-50 text-cyan-600">
                        <FileCheck2 className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Vertical Timeline */}
                  <div className="relative pr-6 space-y-6 before:absolute before:right-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-purple-100">
                    {rep.recentActions.map((action) => (
                      <div key={action.id} className="relative group">
                        {/* Node Bullet */}
                        <div className="absolute -right-6 top-0.5 w-5 h-5 rounded-full bg-white border-2 border-purple-600 flex items-center justify-center group-hover:scale-125 transition-transform shadow-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div>
                        </div>

                        <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 hover:border-purple-200 transition-all">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono text-slate-400 font-bold flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {action.time}
                            </span>
                            <h4 className="text-xs font-black text-slate-900 flex items-center gap-2 text-right">
                              {action.amountEgp && (
                                <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                  {action.amountEgp.toLocaleString('en-US')} ج.م
                                </span>
                              )}
                              {action.title}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-600 font-semibold leading-relaxed mb-2 text-right">{action.description}</p>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                            <span className="uppercase text-purple-700 font-extrabold bg-purple-100 px-2.5 py-0.5 rounded-full">
                              {action.category}
                            </span>
                            <span className="flex items-center gap-1 text-slate-600">
                              {action.locationName}
                              <Building2 className="w-3 h-3 text-purple-600" />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-5 border-t border-purple-100/60 bg-white sticky bottom-0 z-20 flex items-center justify-between">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-all cursor-pointer"
              >
                إغلاق الملف
              </button>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${rep.email}`}
                  className="px-4 py-2.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-extrabold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-purple-600" /> مراسلة
                </a>
                <a
                  href={`tel:${rep.phone}`}
                  className="px-4 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold transition-all flex items-center gap-2 shadow-md shadow-purple-500/20 cursor-pointer"
                >
                  <Phone className="w-4 h-4" /> اتصال
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
};

