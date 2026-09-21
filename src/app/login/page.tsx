'use client';

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { DEMO_USERS } from '../../mock/usersData';
import { useRouter } from 'next/navigation';
import { Activity, ShieldCheck, Crown, Briefcase, UserCheck, Package, Landmark, ArrowLeft } from 'lucide-react';
import { UserRole } from '../../types/pharma';

const ROLE_ICONS: Record<UserRole, React.ReactNode> = {
  SUPER_ADMIN: <Crown className="w-5 h-5 text-amber-400" />,
  SALES_MANAGER: <Briefcase className="w-5 h-5 text-cyan-400" />,
  MEDICAL_REP: <UserCheck className="w-5 h-5 text-teal-400" />,
  INVENTORY_OFFICER: <Package className="w-5 h-5 text-indigo-400" />,
  FINANCE_OFFICER: <Landmark className="w-5 h-5 text-emerald-400" />,
};

const ROLE_TITLES_AR: Record<UserRole, string> = {
  SUPER_ADMIN: 'المشرف العام',
  SALES_MANAGER: 'مدير المبيعات',
  MEDICAL_REP: 'المندوب الطبي',
  INVENTORY_OFFICER: 'مسؤول المخزون',
  FINANCE_OFFICER: 'مسؤول الخزينة',
};

export default function LoginPage() {
  const { loginAsUser } = useAuth();
  const router = useRouter();

  const handleQuickLogin = (userId: string) => {
    loginAsUser(userId);
    router.push('/');
  };

  return (
    <div className="min-h-screen text-slate-900 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      <div className="w-full max-w-4xl relative z-10 space-y-8">
        {/* Header Logo */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/90 border border-purple-100 shadow-sm mb-2">
            <span className="text-lg font-black tracking-tight text-slate-900">
              فارما-demo <span className="text-purple-600">ERP & CRM</span>
            </span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-md shadow-purple-500/20">
              <Activity className="w-5 h-5 text-white font-bold" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            نظام تتبع المناديب — الدخول متعدد الأدوار
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-bold max-w-xl mx-auto">
            تجربة تتبع القوة الميدانية الفوري، عهدة مخزون السيارات، وتسوية نقدية الخزينة.
          </p>
        </div>

        {/* 1-Click Role Quick Login Cards */}
        <div className="p-7 rounded-[28px] bg-white/90 border border-purple-100/60 shadow-xl backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-purple-100/60 pb-4">
            <span className="text-xs font-extrabold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100 flex items-center gap-1">
              اختر أي دور
            </span>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-slate-900">الدخول السريع بنقرة واحدة</h2>
              <ShieldCheck className="w-5 h-5 text-purple-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEMO_USERS.map((user) => (
              <div
                key={user.id}
                onClick={() => handleQuickLogin(user.id)}
                className="p-4.5 rounded-2xl bg-slate-50/70 border border-purple-100 hover:border-purple-300 hover:bg-purple-50/40 transition-all duration-200 cursor-pointer group flex items-center justify-between shadow-sm"
              >
                <button className="px-4 py-2 rounded-full bg-purple-100 group-hover:bg-purple-600 text-purple-700 group-hover:text-white font-extrabold text-xs transition-all flex items-center gap-1 shrink-0 cursor-pointer">
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  <span>دخول</span>
                </button>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      {ROLE_ICONS[user.role]}
                      <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-purple-600 transition-colors">
                        {user.name}
                      </h3>
                    </div>
                    <p className="text-xs text-purple-600 font-bold">{user.roleTitle}</p>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">{user.department}</p>
                  </div>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-200 group-hover:border-purple-500 transition-colors shadow-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-slate-400 font-bold">
          مبني بـ Next.js 15، TypeScript وTailwind CSS — فارما-demo ERP
        </p>
      </div>
    </div>
  );
}
