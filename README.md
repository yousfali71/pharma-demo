# pharma-demo

Enterprise static Next.js 15, TypeScript, and Tailwind CSS Representative Management, CRM & ERP Dashboard for Pharmaceutical Companies in Egypt.

## Features
- **WalIQ Soft Glassmorphism Design System**: Vibrant pastel mesh gradient background, custom SVG spline curve chart, rounded-3xl white glass cards, interactive tooltips, and pill search bar.
- **Full Arabic Cairo Typography**: Complete RTL orientation (`dir="rtl"`) with Google Cairo font.
- **Hydration-Safe Number Formatting**: Locale-pinned EGP numbers (`en-US`) preventing SSR/client hydration mismatches (`1,140,000 ج.م`).
- **Role-Based Access Control (RBAC)**: Interactive role switcher modal (`RoleSwitcherModal`) supporting Super Admin, Sales Manager, Medical Rep, Inventory Officer, and Finance Officer.
- **Representative Field Telemetry**: Real-time status badges, GPS route checklist, car boot inventory custody tracking, and financial risk assessment drawers.
- **Viewport-Centered Modals**: React `createPortal` implementation for zero layout offset.

## Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Typography**: Google Cairo Font

## Getting Started

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build Production Release
```bash
npm run build
```
