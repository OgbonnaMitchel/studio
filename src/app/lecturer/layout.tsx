import type { ReactNode } from 'react';
import { LayoutDashboard, BookPlus, ClipboardList } from 'lucide-react';
import DashboardLayout, { type NavItem } from '@/components/shared/DashboardLayout';

const navItems: NavItem[] = [
  { href: '/lecturer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/lecturer/exam/create', label: 'Set Exam', icon: BookPlus },
  { href: '/lecturer/results', label: 'View Results', icon: ClipboardList },
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
