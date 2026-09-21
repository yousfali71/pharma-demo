export type UserRole = 
  | 'SUPER_ADMIN'
  | 'SALES_MANAGER'
  | 'MEDICAL_REP'
  | 'INVENTORY_OFFICER'
  | 'FINANCE_OFFICER';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  roleTitle: string;
  department: string;
  territory?: string;
  employeeCode: string;
}

export type RepStatus = 'ACTIVE' | 'EN_ROUTE' | 'ON_BREAK' | 'OFFLINE';

export interface StockCustody {
  openingUnits: number;
  openingValueEgp: number;
  receivedTodayUnits: number;
  receivedTodayValueEgp: number;
  soldTodayUnits: number;
  soldTodayValueEgp: number;
  returnedTodayUnits: number;
  returnedTodayValueEgp: number;
  currentBalanceUnits: number;
  currentBalanceValueEgp: number;
}

export interface FinancialCustody {
  openingDebtEgp: number;
  collectedTodayEgp: number;
  depositedTodayEgp: number;
  outstandingBalanceEgp: number;
  riskStatus: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  lastDepositTime?: string;
}

export interface AuditAction {
  id: string;
  time: string;
  category: 'CHECK_IN' | 'CASH_COLLECTION' | 'ORDER_SUBMIT' | 'STOCK_TRANSFER' | 'DEPOSIT';
  title: string;
  description: string;
  locationName: string;
  amountEgp?: number;
}

export interface GPSLocation {
  lat: number;
  lng: number;
  address: string;
  accuracyMeters: number;
  signalStrength: 'Strong' | 'Moderate' | 'Weak';
  batteryLevelPct: number;
}

export interface MedicalRep {
  id: string;
  employeeCode: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  territory: string;
  region: 'Cairo North' | 'Cairo South' | 'Giza' | 'Alexandria' | 'Delta';
  status: RepStatus;
  currentWorkflow: string;
  lastActiveTime: string;
  plannedVisits: number;
  actualVisits: number;
  vehiclePlate: string;
  stockCustody: StockCustody;
  financialCustody: FinancialCustody;
  gpsLocation: GPSLocation;
  recentActions: AuditAction[];
}

export interface SystemNotification {
  id: string;
  time: string;
  title: string;
  message: string;
  type: 'STOCK_REQUEST' | 'CASH_ALERT' | 'CHECKIN_MISS' | 'SYSTEM';
  read: boolean;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  repId?: string;
}
