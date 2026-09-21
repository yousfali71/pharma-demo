'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types/pharma';
import { DEMO_USERS } from '../mock/usersData';

interface AuthContextType {
  currentUser: User | null;
  switchRole: (role: UserRole) => void;
  loginAsUser: (userId: string) => void;
  logout: () => void;
  isSuperAdmin: boolean;
  isSalesManager: boolean;
  isMedicalRep: boolean;
  isInventoryOfficer: boolean;
  isFinanceOfficer: boolean;
  canViewAllReps: boolean;
  canApproveFinancials: boolean;
  canManageStockTransfers: boolean;
  canPerformCheckIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Super Admin for initial demo experience
  const [currentUser, setCurrentUser] = useState<User | null>(DEMO_USERS[0]);

  const switchRole = (role: UserRole) => {
    const targetUser = DEMO_USERS.find((u) => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
    }
  };

  const loginAsUser = (userId: string) => {
    const targetUser = DEMO_USERS.find((u) => u.id === userId);
    if (targetUser) {
      setCurrentUser(targetUser);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const role = currentUser?.role;

  const isSuperAdmin = role === 'SUPER_ADMIN';
  const isSalesManager = role === 'SALES_MANAGER';
  const isMedicalRep = role === 'MEDICAL_REP';
  const isInventoryOfficer = role === 'INVENTORY_OFFICER';
  const isFinanceOfficer = role === 'FINANCE_OFFICER';

  const canViewAllReps = isSuperAdmin || isSalesManager || isInventoryOfficer || isFinanceOfficer;
  const canApproveFinancials = isSuperAdmin || isFinanceOfficer || isSalesManager;
  const canManageStockTransfers = isSuperAdmin || isInventoryOfficer || isSalesManager;
  const canPerformCheckIn = isSuperAdmin || isMedicalRep;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        switchRole,
        loginAsUser,
        logout,
        isSuperAdmin,
        isSalesManager,
        isMedicalRep,
        isInventoryOfficer,
        isFinanceOfficer,
        canViewAllReps,
        canApproveFinancials,
        canManageStockTransfers,
        canPerformCheckIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
