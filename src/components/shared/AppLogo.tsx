import { TestTube2 } from 'lucide-react';
import Link from 'next/link';

export default function AppLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2">
      <TestTube2 className="h-8 w-8" />
      <span className="font-headline text-2xl font-bold">Online Examination System</span>
    </Link>
  );
}
