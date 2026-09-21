'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, Bell, Shield, Calendar, Sparkles } from 'lucide-react';
import { NotificationsPopover } from './NotificationsPopover';
import { RoleSwitcherModal } from './RoleSwitcherModal';

interface Props {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectRep?: (repId: string) => void;
}

export const Header: React.FC<Props> = ({ searchQuery, setSearchQuery, onSelectRep }) => {
  const { currentUser } = useAuth();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/40 backdrop-blur-xl border-b border-purple-100/60 px-6 py-4 flex items-center justify-between gap-4">
      {/* Search Input - WalIQ Pill Style */}
      <div className="flex-1 max-w-md relative">
        <Search className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن مندوب، منطقة، صيدلية، أو صنف..."
          className="w-full bg-white/90 border border-purple-100/80 rounded-full pr-11 pl-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 shadow-sm transition-all text-right font-medium"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Date & Shift Widget */}
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-purple-100/80 text-xs text-slate-700 shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-purple-600" />
          <span className="font-bold">الأحد، ٢٠ سبتمبر</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="text-slate-400 font-semibold">شيفت الصباح</span>
        </div>

        {/* Quick Role Switcher Button */}
        <button
          onClick={() => setShowRoleModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/80 border border-purple-200 text-purple-700 hover:bg-purple-200/80 transition-all text-xs font-extrabold shadow-sm"
        >
          <Shield className="w-3.5 h-3.5 text-purple-600" />
          <span>الدور: {currentUser?.roleTitle.split(' ')[0]}</span>
          <Sparkles className="w-3 h-3 text-purple-500 animate-pulse" />
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="p-2.5 rounded-full bg-white border border-slate-200/80 text-slate-600 hover:text-purple-600 hover:border-purple-200 transition-all relative shadow-sm"
            title="الإشعارات"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-600 ring-4 ring-white animate-ping"></span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-600"></span>
          </button>
          {showNotifs && (
            <NotificationsPopover
              onClose={() => setShowNotifs(false)}
              onSelectRep={onSelectRep}
            />
          )}
        </div>

        {/* Profile Avatar */}
        {currentUser && (
          <div className="flex items-center gap-3 pr-2 border-r border-purple-100/80">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-purple-500 shadow-md shadow-purple-500/20"
            />
            <div className="hidden sm:block">
              <p className="text-xs font-black text-slate-900 leading-tight">{currentUser.name}</p>
              <p className="text-[10px] text-purple-600 font-bold">{currentUser.department}</p>
            </div>
          </div>
        )}
      </div>

      <RoleSwitcherModal isOpen={showRoleModal} onClose={() => setShowRoleModal(false)} />
    </header>
  );
};
