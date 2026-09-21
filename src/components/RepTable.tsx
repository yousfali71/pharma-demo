'use client';

import React, { useState } from 'react';
import { MedicalRep, RepStatus } from '../types/pharma';
import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  MapPin,
  Car,
  CheckCircle,
  AlertTriangle,
  ChevronLeft,
  TrendingUp,
} from 'lucide-react';
import { fmt } from '../utils/format';

interface Props {
  reps: MedicalRep[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectRep: (rep: MedicalRep) => void;
}

export const RepTable: React.FC<Props> = ({ reps, searchQuery, setSearchQuery, onSelectRep }) => {
  const [selectedTerritory, setSelectedTerritory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'name' | 'visits' | 'stock' | 'finance'>('visits');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredReps = reps.filter((rep) => {
    const matchesSearch =
      rep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.territory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.employeeCode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTerritory =
      selectedTerritory === 'ALL' || rep.region.toLowerCase().includes(selectedTerritory.toLowerCase());

    const matchesStatus = selectedStatus === 'ALL' || rep.status === selectedStatus;

    return matchesSearch && matchesTerritory && matchesStatus;
  });

  const sortedReps = [...filteredReps].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'visits') {
      const aPct = a.actualVisits / a.plannedVisits;
      const bPct = b.actualVisits / b.plannedVisits;
      comparison = aPct - bPct;
    } else if (sortBy === 'stock') {
      comparison = a.stockCustody.currentBalanceValueEgp - b.stockCustody.currentBalanceValueEgp;
    } else if (sortBy === 'finance') {
      comparison = a.financialCustody.outstandingBalanceEgp - b.financialCustody.outstandingBalanceEgp;
    }
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  const toggleSort = (field: 'name' | 'visits' | 'stock' | 'finance') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const statusLabels: Record<string, string> = {
    ACTIVE: 'نشط',
    EN_ROUTE: 'في الطريق',
    OFFLINE: 'غير متصل',
  };

  const riskLabels: Record<string, string> = {
    LOW: 'منخفض',
    MEDIUM: 'متوسط',
    HIGH: 'عالي',
    CRITICAL: 'حرج',
  };

  return (
    <div className="bg-white/90 backdrop-blur-md border border-purple-100/60 rounded-[20px] sm:rounded-[28px] shadow-sm shadow-purple-900/5 overflow-hidden">
      {/* Table Toolbar / Controls */}
      <div className="p-4 sm:p-6 border-b border-purple-100/60 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 bg-purple-50/40">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            تتبع القوة الميدانية — المناديب بلحظية فورية
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">
            مراقبة {sortedReps.length} مندوب — الزيارات اليومية، عهدة المخزون وتسوية النقدية
          </p>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Territory Filter */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white border border-purple-100 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs shadow-sm">
            <Filter className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <select
              value={selectedTerritory}
              onChange={(e) => setSelectedTerritory(e.target.value)}
              className="bg-transparent text-slate-800 focus:outline-none cursor-pointer text-xs font-bold"
            >
              <option value="ALL">كل المناطق</option>
              <option value="Cairo">منطقة القاهرة</option>
              <option value="Giza">منطقة الجيزة</option>
              <option value="Alexandria">منطقة الإسكندرية</option>
              <option value="Delta">منطقة الدلتا</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white border border-purple-100 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs shadow-sm">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-slate-800 focus:outline-none cursor-pointer text-xs font-bold"
            >
              <option value="ALL">كل الحالات</option>
              <option value="ACTIVE">نشط في الميدان</option>
              <option value="EN_ROUTE">في الطريق</option>
              <option value="OFFLINE">غير متصل</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-purple-100/60 bg-purple-50/20 text-[11px] font-black text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">الحالة</th>
              <th className="py-4 px-6 cursor-pointer hover:text-purple-700" onClick={() => toggleSort('name')}>
                <div className="flex items-center gap-1.5 justify-end">
                  اسم المندوب
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-4 px-6">المنطقة</th>
              <th className="py-4 px-6 cursor-pointer hover:text-purple-700" onClick={() => toggleSort('visits')}>
                <div className="flex items-center gap-1.5 justify-end">
                  تقدم الزيارات
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-4 px-6 cursor-pointer hover:text-purple-700" onClick={() => toggleSort('stock')}>
                <div className="flex items-center gap-1.5 justify-end">
                  عهدة المخزون
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-4 px-6 cursor-pointer hover:text-purple-700" onClick={() => toggleSort('finance')}>
                <div className="flex items-center gap-1.5 justify-end">
                  العهدة المالية
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-4 px-6 text-left">الإجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100/60 text-xs">
            {sortedReps.map((rep) => {
              const visitPct = Math.round((rep.actualVisits / rep.plannedVisits) * 100);
              const isHighRisk = rep.financialCustody.riskStatus === 'HIGH' || rep.financialCustody.riskStatus === 'CRITICAL';

              return (
                <tr
                  key={rep.id}
                  className="hover:bg-purple-50/50 transition-colors group cursor-pointer"
                  onClick={() => onSelectRep(rep)}
                >
                  {/* Status Indicator */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    {rep.status === 'ACTIVE' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        نشط
                      </span>
                    )}
                    {rep.status === 'EN_ROUTE' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-100">
                        <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                        في الطريق
                      </span>
                    )}
                    {rep.status === 'OFFLINE' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                        غير متصل
                      </span>
                    )}
                  </td>

                  {/* Rep Name & Avatar */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-3 justify-end">
                      <div>
                        <div className="font-extrabold text-slate-900 text-sm group-hover:text-purple-600 transition-colors text-right">
                          {rep.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono text-right">{rep.employeeCode}</div>
                      </div>
                      <img
                        src={rep.avatar}
                        alt={rep.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-purple-200 group-hover:border-purple-500 transition-colors"
                      />
                    </div>
                  </td>

                  {/* Territory */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-slate-700 font-bold justify-end">
                      <span>{rep.territory}</span>
                      <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    </div>
                  </td>

                  {/* Visits Progress Bar */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="w-40">
                      <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                        <span className={visitPct >= 80 ? 'text-emerald-600' : 'text-amber-600'}>{visitPct}%</span>
                        <span className="text-slate-800">
                          {rep.actualVisits} / {rep.plannedVisits} زيارة
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            visitPct >= 80
                              ? 'bg-gradient-to-r from-purple-500 to-indigo-600'
                              : 'bg-gradient-to-r from-amber-500 to-orange-500'
                          }`}
                          style={{ width: `${visitPct}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  {/* Stock Custody */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div>
                      <div className="font-black text-slate-900">{rep.stockCustody.currentBalanceUnits} وحدة</div>
                      <div className="text-[11px] text-slate-400 font-bold">
                        {fmt(rep.stockCustody.currentBalanceValueEgp)} ج.م
                      </div>
                    </div>
                  </td>

                  {/* Financial Custody */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div>
                      <div className={`font-black ${isHighRisk ? 'text-amber-600' : 'text-slate-900'}`}>
                        {fmt(rep.financialCustody.outstandingBalanceEgp)} ج.م
                      </div>
                      <span
                        className={`text-[10px] font-bold ${
                          isHighRisk ? 'text-amber-600' : 'text-slate-400'
                        }`}
                      >
                        خطورة {riskLabels[rep.financialCustody.riskStatus] || rep.financialCustody.riskStatus}
                      </span>
                    </div>
                  </td>

                  {/* Action Button */}
                  <td className="py-4 px-6 whitespace-nowrap text-left" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onSelectRep(rep)}
                      className="px-4 py-2 rounded-full bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white border border-purple-200 font-extrabold text-xs transition-all flex items-center gap-1.5 mr-auto group/btn shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>عرض التفاصيل</span>
                      <ChevronLeft className="w-3.5 h-3.5 group-hover/btn:-translate-x-0.5 transition-transform" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
