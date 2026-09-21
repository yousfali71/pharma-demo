'use client';

import React, { useState } from 'react';
import { MOCK_NOTIFICATIONS } from '../mock/repsData';
import { Bell, AlertTriangle, PackageCheck, CheckCircle2, X } from 'lucide-react';
import { SystemNotification } from '../types/pharma';

interface Props {
  onClose: () => void;
  onSelectRep?: (repId: string) => void;
}

export const NotificationsPopover: React.FC<Props> = ({ onClose, onSelectRep }) => {
  const [notifications, setNotifications] = useState<SystemNotification[]>(MOCK_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="absolute left-0 top-12 w-80 sm:w-96 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <button
            onClick={markAllRead}
            className="text-xs text-slate-400 hover:text-teal-400 transition-colors"
          >
            تحديد الكل كمقروء
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-cyan-500/20 text-cyan-300 text-xs px-2 py-0.5 rounded-full font-medium">
            {notifications.filter((n) => !n.read).length} جديد
          </span>
          <h3 className="font-semibold text-white text-sm">التنبيهات والطلبات</h3>
          <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
            <Bell className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => {
              if (notif.repId && onSelectRep) {
                onSelectRep(notif.repId);
                onClose();
              }
            }}
            className={`p-4 transition-colors hover:bg-slate-800/50 cursor-pointer flex gap-3 items-start ${
              !notif.read ? 'bg-cyan-950/20' : ''
            }`}
          >
            <div className="flex-1 text-right">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-slate-400">{notif.time}</span>
                <h4 className="text-xs font-semibold text-slate-200">{notif.title}</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{notif.message}</p>
              {notif.repId && (
                <span className="inline-block mt-2 text-[10px] font-medium text-teal-400 hover:underline">
                  انقر لعرض تفاصيل المندوب &larr;
                </span>
              )}
            </div>
            <div className="mt-0.5">
              {notif.type === 'CASH_ALERT' && (
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              )}
              {notif.type === 'STOCK_REQUEST' && (
                <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <PackageCheck className="w-4 h-4" />
                </div>
              )}
              {notif.type === 'SYSTEM' && (
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
