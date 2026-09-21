'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Activity,
  MapPin,
  Users,
  Package,
  Landmark,
  Settings,
  ChevronRight,
  ChevronLeft,
  LogOut,
  CalendarCheck,
  Truck,
  X,
} from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab, isOpenMobile = false, onCloseMobile }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser, isSuperAdmin, isSalesManager, isMedicalRep, isInventoryOfficer, isFinanceOfficer, logout } =
    useAuth();

  const getNavItems = () => {
    if (isSuperAdmin) {
      return [
        { id: 'overview', label: 'المركز التنفيذي', icon: Activity, badge: 'C-Suite' },
        { id: 'field-force', label: 'تتبع القوة الميدانية', icon: MapPin, badge: 'مباشر' },
        { id: 'crm', label: 'CRM والأطباء', icon: Users },
        { id: 'inventory', label: 'المخزون وعهدة السيارة', icon: Package },
        { id: 'financials', label: 'الخزينة والنقدية', icon: Landmark },
        { id: 'settings', label: 'إعدادات النظام', icon: Settings },
      ];
    }
    if (isSalesManager) {
      return [
        { id: 'field-force', label: 'القوة الميدانية النشطة', icon: MapPin, badge: '٦ نشطين' },
        { id: 'crm', label: 'CRM والأطباء', icon: Users },
        { id: 'inventory', label: 'عهدة المخزون', icon: Package },
        { id: 'financials', label: 'العهدة المالية', icon: Landmark },
        { id: 'settings', label: 'إعدادات الفريق', icon: Settings },
      ];
    }
    if (isMedicalRep) {
      return [
        { id: 'my-portal', label: 'مساري اليومي', icon: CalendarCheck, badge: 'اليوم' },
        { id: 'inventory', label: 'مخزون صندوق السيارة', icon: Package },
        { id: 'financials', label: 'تحصيل النقدية', icon: Landmark },
      ];
    }
    if (isInventoryOfficer) {
      return [
        { id: 'inventory', label: 'المستودع والتحويلات', icon: Truck, badge: 'معلق' },
        { id: 'field-force', label: 'عرض مخزون السيارات', icon: MapPin },
        { id: 'settings', label: 'إعدادات المخزون', icon: Settings },
      ];
    }
    if (isFinanceOfficer) {
      return [
        { id: 'financials', label: 'الخزينة ومخاطر النقدية', icon: Landmark, badge: 'مراجعة' },
        { id: 'field-force', label: 'عهدة نقدية المناديب', icon: MapPin },
        { id: 'settings', label: 'القواعد المالية', icon: Settings },
      ];
    }
    return [];
  };

  const navItems = getNavItems();

  const handleTabSelect = (tabId: string) => {
    setActiveTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  const sidebarContent = (
    <aside
      className={`h-full bg-white/95 backdrop-blur-2xl border-l border-purple-100/70 transition-all duration-300 z-40 flex flex-col justify-between shadow-xl shadow-purple-900/5 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        {/* Logo & Header */}
        <div className="p-5 border-b border-purple-100/60 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-md shadow-purple-500/25 shrink-0">
                <Activity className="w-5 h-5 text-white font-bold" />
              </div>
              <div className="truncate">
                <h1 className="font-black text-slate-900 text-base tracking-tight flex items-center gap-1.5">
                  فارما-demo <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">ERP</span>
                </h1>
                <p className="text-[10px] text-slate-400 font-semibold truncate">نظام CRM والعهدة المؤسسية</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-md shadow-purple-500/25 mx-auto">
              <Activity className="w-5 h-5 text-white font-bold" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-colors hidden md:block"
            title={collapsed ? 'توسيع القائمة' : 'طي القائمة'}
          >
            {collapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Section */}
        <div className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)]">
          {!collapsed && (
            <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              القائمة الرئيسية
            </p>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabSelect(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-l from-purple-600 via-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                    : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/80 border border-transparent'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </div>
                {!collapsed && item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* User Role Card & Logout */}
      <div className="p-3 border-t border-purple-100/60 bg-white/40">
        {!collapsed && currentUser && (
          <div className="p-2.5 rounded-2xl bg-purple-50/60 border border-purple-100 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-purple-500 shadow-sm shrink-0"
              />
              <div className="truncate">
                <p className="text-xs font-extrabold text-slate-900 truncate">{currentUser.name}</p>
                <p className="text-[10px] text-purple-600 font-bold truncate">{currentUser.roleTitle}</p>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            logout();
            if (onCloseMobile) onCloseMobile();
          }}
          className={`w-full flex items-center justify-center gap-2 p-2.5 rounded-2xl font-bold text-xs text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-colors border border-rose-100 cursor-pointer ${
            collapsed ? 'p-3' : ''
          }`}
          title="تسجيل الخروج"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>تسجيل الخروج</span>}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-screen sticky top-0 shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile Off-Canvas Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm animate-in fade-in"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 h-full max-w-[280px] w-full animate-in slide-in-from-right duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

