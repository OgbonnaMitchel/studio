'use client';

import { useState, useEffect, type ReactNode } from 'react';
import type { NavItem, IconName } from '@/components/shared/DashboardLayout';
import DashboardLayout from '@/components/shared/DashboardLayout';

const navItems: NavItem<IconName>[] = [
  { href: '/lecturer/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/lecturer/exam/create', label: 'Set Exam', icon: 'BookPlus' },
  { href: '/lecturer/results', label: 'View Results', icon: 'ClipboardList' },
];

export default function LecturerPortalLayout({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState('Lecturer');

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role === 'Lecturer') {
        setUserName(user.name);
      }
    }
  }, []);

  return (
    <DashboardLayout
      navItems={navItems}
      userName={userName}
      userRole="Lecturer"
    >
      {children}
    </DashboardLayout>
  );
}
