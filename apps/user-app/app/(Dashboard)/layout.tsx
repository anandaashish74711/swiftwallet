"use client"

import type { ReactElement } from 'react';
import DashboardSidebar from '@/app/(Dashboard)/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 ml-64 p-6"> {/* Main content area with margin */}
        {children}
      </main>
    </div>
  );
}
