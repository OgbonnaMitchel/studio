import type { ReactNode } from 'react';
import { LayoutDashboard, BookOpenCheck, BarChart2 } from 'lucide-react';
import DashboardLayout, { type NavItem } from '@/components/shared/DashboardLayout';

const navItems: NavItem[] = [
  { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/student/exam/mock-exam', label: 'Take Exam', icon: BookOpenCheck },
  { href: '/student/results', label: 'My Results', icon: BarChart2 },
];

export default function StudentPortalLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      navItems={navItems}
      userName="John Doe"
      userRole="Student"
    >
      {children}
    </DashboardLayout>
  );
}
