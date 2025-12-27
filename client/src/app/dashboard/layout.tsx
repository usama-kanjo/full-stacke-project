import type { Metadata } from 'next'
import DashboardClient from '@/components/dashboard/DashboardClient';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard uygulaması',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardClient>{children}</DashboardClient>;
}
