'use client';

import React from 'react';
import { GPSLocation, RepStatus } from '../types/pharma';
import { Navigation, Wifi, BatteryCharging, Compass, Radio } from 'lucide-react';

interface Props {
  location: GPSLocation;
  repName: string;
  status: RepStatus;
  currentWorkflow: string;
}

export const MapVisual: React.FC<Props> = ({ location, repName, status, currentWorkflow }) => {
  return (
    <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-inner group">
      {/* Map Graphic Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
      
      {/* Stylized Vector Map Roads & Regions */}
      <svg className="absolute inset-0 w-full h-full opacity-30 stroke-teal-500/30 fill-none" strokeWidth="2">
        <path d="M -50 80 Q 150 120 400 60" strokeDasharray="6 6" />
        <path d="M 120 -20 Q 180 140 240 250" strokeWidth="3" className="stroke-cyan-500/40" />
        <path d="M 0 180 L 350 140" strokeWidth="2" />
        <circle cx="180" cy="110" r="45" className="fill-teal-500/5 stroke-teal-400/20" strokeDasharray="4 4" />
      </svg>

      {/* Realtime Pulsing Pin Indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative flex items-center justify-center">
          {/* Pulsing Radar Ring */}
          <span className="absolute w-20 h-20 rounded-full bg-teal-500/20 animate-ping"></span>
          <span className="absolute w-12 h-12 rounded-full bg-cyan-500/30 animate-pulse"></span>
          
          {/* Main Pin */}
          <div className="relative z-10 p-3 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-400 text-slate-950 shadow-xl shadow-teal-500/40 ring-4 ring-slate-900 flex items-center justify-center transform hover:scale-110 transition-transform">
            <Navigation className="w-5 h-5 fill-slate-950 transform rotate-45" />
          </div>

          {/* Pin Label Banner */}
          <div className="absolute top-12 whitespace-nowrap bg-slate-900/95 border border-teal-500/40 px-3 py-1.5 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-white">{repName}</span>
            <span className="text-[10px] text-teal-300 font-mono">({location.lat.toFixed(4)}, {location.lng.toFixed(4)})</span>
          </div>
        </div>
      </div>

      {/* Top Telemetry Bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 px-3 py-1 rounded-xl flex items-center gap-2 text-[10px] text-slate-300 font-semibold shadow-md">
          <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
          <span>إشارة GPS مباشرة</span>
          <span className="text-emerald-400 font-mono">±{location.accuracyMeters}م</span>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 px-3 py-1 rounded-xl text-[10px] text-slate-300 font-semibold shadow-md">
          <div className="flex items-center gap-1">
            <Wifi className="w-3 h-3 text-cyan-400" />
            <span>{location.signalStrength}</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1">
            <BatteryCharging className="w-3 h-3 text-emerald-400" />
            <span>{location.batteryLevelPct}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Address Footer */}
      <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-2.5 rounded-xl flex items-center justify-between text-xs text-slate-200 shadow-xl">
        <div className="flex items-center gap-2 truncate">
          <Compass className="w-4 h-4 text-teal-400 shrink-0" />
          <span className="font-medium truncate">{location.address}</span>
        </div>
        <span className="text-[10px] text-teal-300 font-semibold uppercase bg-teal-500/10 px-2 py-0.5 rounded-md border border-teal-500/20 shrink-0 ml-2">
          التتبع نشط
        </span>
      </div>
    </div>
  );
};
