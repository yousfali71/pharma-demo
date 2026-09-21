'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { KpiWidgets } from '../components/KpiWidgets';
import { RepTable } from '../components/RepTable';
import { RepDetailsDrawer } from '../components/RepDetailsDrawer';
import { SuperAdminOverview } from '../components/SuperAdminOverview';
import { RepMyPortal } from '../components/RepMyPortal';
import { InventoryPortal } from '../components/InventoryPortal';
import { FinancePortal } from '../components/FinancePortal';
import { MOCK_REPRESENTATIVES } from '../mock/repsData';
import { MedicalRep } from '../types/pharma';
import { useRouter } from 'next/navigation';
import { Users, Building2, Stethoscope, ShieldCheck, Save } from 'lucide-react';

export default function DashboardPage() {
  const { currentUser, isSuperAdmin, isSalesManager, isMedicalRep, isInventoryOfficer, isFinanceOfficer } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  const getDefaultTab = () => {
    if (isSuperAdmin) return 'overview';
    if (isSalesManager) return 'field-force';
    if (isMedicalRep) return 'my-portal';
    if (isInventoryOfficer) return 'inventory';
    if (isFinanceOfficer) return 'financials';
    return 'field-force';
  };

  const [activeTab, setActiveTab] = useState(getDefaultTab());
  const [selectedRep, setSelectedRep] = useState<MedicalRep | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setActiveTab(getDefaultTab());
  }, [currentUser?.role]);

  if (!currentUser) return null;

  return (
    <div className="min-h-screen text-slate-900 flex flex-col md:flex-row font-cairo selection:bg-purple-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectRep={(repId) => {
            const found = MOCK_REPRESENTATIVES.find((r) => r.id === repId);
            if (found) setSelectedRep(found);
          }}
        />

        {/* Dashboard Body Content */}
        <main className="p-6 flex-1 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'overview' && (
            <SuperAdminOverview
              reps={MOCK_REPRESENTATIVES}
              onSelectTab={setActiveTab}
              onSelectRep={setSelectedRep}
            />
          )}

          {activeTab === 'field-force' && (
            <div>
              <KpiWidgets reps={MOCK_REPRESENTATIVES} />
              <RepTable
                reps={MOCK_REPRESENTATIVES}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSelectRep={(rep) => setSelectedRep(rep)}
              />
            </div>
          )}

          {activeTab === 'my-portal' && <RepMyPortal />}
          {activeTab === 'inventory' && <InventoryPortal />}
          {activeTab === 'financials' && <FinancePortal />}

          {/* CRM & Doctors Directory Tab */}
          {activeTab === 'crm' && (
            <div className="p-6 rounded-[28px] bg-white/90 backdrop-blur-md border border-purple-100/60 shadow-sm shadow-purple-900/5 space-y-6 animate-in fade-in">
              <div className="flex items-center gap-3 border-b border-purple-100/60 pb-4">
                <div className="p-3 rounded-2xl bg-purple-50 text-purple-600">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">شبكة CRM والكوادر الطبية</h2>
                  <p className="text-xs text-slate-400 font-semibold">دليل عيادات القلب، الأعصاب والأطفال المستهدفة</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'مركز د. علي لجراحة العظام', specialty: 'جراحة عظام', area: 'مدينة نصر', visits: '١٢ زيارة/شهر' },
                  { name: 'سلسلة صيدليات العزبي', specialty: 'صيدلية تجزئة', area: 'المعادي', visits: '٢٨ طلب/شهر' },
                  { name: 'د. يوسف لأمراض القلب', specialty: 'أمراض القلب', area: 'دجلة', visits: '٨ زيارات/شهر' },
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <h3 className="font-extrabold text-slate-900 text-sm text-right">{item.name}</h3>
                    <p className="text-xs text-purple-600 font-bold mt-1 text-right">{item.specialty} • {item.area}</p>
                    <span className="inline-block mt-3 text-[10px] bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold">
                      {item.visits}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="p-6 rounded-[28px] bg-white/90 backdrop-blur-md border border-purple-100/60 shadow-sm shadow-purple-900/5 space-y-6 animate-in fade-in">
              <div className="flex items-center gap-3 border-b border-purple-100/60 pb-4">
                <div className="p-3 rounded-2xl bg-purple-50 text-purple-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">إعدادات النظام والتفويضات</h2>
                  <p className="text-xs text-slate-400 font-semibold">ضبط حدود مخاطر العهدة المالية وقواعد تتبع GPS</p>
                </div>
              </div>

              <div className="max-w-xl space-y-4 text-xs">
                <div>
                  <label className="text-slate-600 font-extrabold block mb-1 text-right">
                    الحد الأقصى لمخاطر العهدة المالية غير المودعة (ج.م)
                  </label>
                  <input
                    type="text"
                    defaultValue="100,000 ج.م"
                    className="w-full bg-slate-50 border border-purple-100 rounded-2xl p-3 text-slate-900 font-bold text-right focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-extrabold block mb-1 text-right">
                    فترة إرسال إشارة GPS لتتبع المناديب
                  </label>
                  <select className="w-full bg-slate-50 border border-purple-100 rounded-2xl p-3 text-slate-900 font-bold text-right focus:outline-none focus:border-purple-500">
                    <option>كل دقيقتين (دقة عالية)</option>
                    <option>كل 5 دقائق (قياسي)</option>
                  </select>
                </div>
                <button className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-500/20 flex items-center gap-2">
                  <Save className="w-4 h-4" /> حفظ الإعدادات
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Representative Drill-Down Slide-over Side Drawer */}
      <RepDetailsDrawer rep={selectedRep} onClose={() => setSelectedRep(null)} />
    </div>
  );
}
