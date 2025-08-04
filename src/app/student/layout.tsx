'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { LayoutDashboard, BookOpenCheck } from 'lucide-react';
import DashboardLayout, { type NavItem } from '@/components/shared/DashboardLayout';
import type { IconName } from '@/components/shared/DashboardLayout';

const navItems: NavItem<IconName>[] = [
  { href: '/student/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/student/exam/mock-exam', label: 'Take Exam', icon: 'BookOpenCheck' },
];

export default function StudentPortalLayout({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState('Student');

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role === 'Student') {
        setUserName(user.name);
      }
    }
  }, []);

  return (
    <DashboardLayout
      navItems={navItems}
      userName={userName}
      userRole="Student"
    >
      {children}
    </DashboardLayout>
  );
}
