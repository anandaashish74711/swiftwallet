
import type { ReactElement } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return <>{children}</>;
}