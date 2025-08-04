import AppLogo from '@/components/shared/AppLogo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-card">
        <div className="container flex h-16 items-center justify-between">
          <AppLogo />
          <nav>
            <Button asChild variant="ghost">
                <Link href="/">Exit Admin</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-8">
        {children}
      </main>
    </div>
  );
}
