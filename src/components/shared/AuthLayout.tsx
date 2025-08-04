import type { ReactNode } from 'react';
import AppLogo from './AppLogo';

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
};

export default function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
             <AppLogo />
          </div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {children}
      </div>
    </main>
  );
}
