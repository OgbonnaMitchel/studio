import type { ReactNode } from 'react';
import type { NavItem, IconName } from '@/components/shared/DashboardLayout';
import DashboardLayout from '@/components/shared/DashboardLayout';

const navItems: NavItem<IconName>[] = [
  { href: '/lecturer/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/lecturer/exam/create', label: 'Set Exam', icon: 'BookPlus' },
  { href: '/lecturer/results', label: 'View Results', icon: 'ClipboardList' },
];

export default function LecturerPortalLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      navItems={navItems}
      userName="Dr. Jane Smith"
      userRole="Lecturer"
    >
      {children}
    </DashboardLayout>
  );
}
