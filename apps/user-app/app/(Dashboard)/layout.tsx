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
      <main style={{ flex: 1, padding: '20px' }}> {/* Main content area */}
        {children}
      </main>
    </div>
  );
}
