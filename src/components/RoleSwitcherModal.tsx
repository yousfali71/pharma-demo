'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../context/AuthContext';
import { DEMO_USERS } from '../mock/usersData';
import { Crown, Briefcase, UserCheck, Package, Landmark, X, ShieldCheck } from 'lucide-react';
import { UserRole } from '../types/pharma';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ROLE_ICONS: Record<UserRole, React.ReactNode> = {
  SUPER_ADMIN: <Crown className="w-5 h-5 text-amber-500" />,
  SALES_MANAGER: <Briefcase className="w-5 h-5 text-purple-600" />,
  MEDICAL_REP: <UserCheck className="w-5 h-5 text-indigo-600" />,
  INVENTORY_OFFICER: <Package className="w-5 h-5 text-cyan-600" />,
  FINANCE_OFFICER: <Landmark className="w-5 h-5 text-emerald-600" />,
};

export const RoleSwitcherModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { currentUser, switchRole } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white/95 backdrop-blur-2xl border border-purple-100 rounded-[28px] shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-6 border-b border-purple-100/60 bg-purple-50/40 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-purple-600 hover:bg-purple-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <h2 className="text-lg font-black text-slate-900">تبديل الدور التجريبي — RBAC</h2>
              <p className="text-xs text-slate-500 font-semibold">اختر أي دور لاختبار صلاحيات التفويض فوراً</p>
            </div>
            <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Roles List */}
        <div className="p-6 grid grid-cols-1 gap-3.5 max-h-[70vh] overflow-y-auto">
          {DEMO_USERS.map((user) => {
            const isSelected = currentUser?.id === user.id;
            return (
              <div
                key={user.id}
                onClick={() => {
                  switchRole(user.role);
                  onClose();
                }}
                className={`p-4.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-purple-50/80 border-purple-300 shadow-sm shadow-purple-500/10'
                    : 'bg-slate-50/60 border-slate-100 hover:border-purple-200 hover:bg-purple-50/40'
                }`}
              >
                <div className="text-right">
                  <span
                    className={`inline-block px-3.5 py-1 rounded-full text-xs font-extrabold ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/20'
                        : 'bg-slate-200/80 text-slate-600'
                    }`}
                  >
                    {isSelected ? 'الدور الحالي' : 'التبديل إليه'}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      {ROLE_ICONS[user.role]}
                      <h3 className="font-extrabold text-slate-900 text-sm">{user.name}</h3>
                    </div>
                    <p className="text-xs text-purple-600 font-bold">{user.roleTitle}</p>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">{user.department}</p>
                  </div>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-200 shadow-sm"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
};


