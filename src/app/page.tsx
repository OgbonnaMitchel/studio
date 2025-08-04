import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, UserSquare, UserCog } from 'lucide-react';
import AppLogo from '@/components/shared/AppLogo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="flex flex-col items-center text-center mb-12">
        <AppLogo />
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          The seamless, intelligent platform for conducting online examinations. Choose your portal to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <Card className="transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-primary/20">
          <CardHeader className="flex flex-col items-center text-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <GraduationCap className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Student Portal</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center gap-4">
            <p className="text-muted-foreground">
              Access your dashboard, take exams, and view your progress.
            </p>
            <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90">
              <Link href="/student/login">Student Login</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-primary/20">
          <CardHeader className="flex flex-col items-center text-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <UserSquare className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Lecturer Portal</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center gap-4">
            <p className="text-muted-foreground">
              Manage courses, set exams with AI, and track student results.
            </p>
            <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90">
              <Link href="/lecturer/login">Lecturer Login</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-primary/20">
          <CardHeader className="flex flex-col items-center text-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <UserCog className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Admin Portal</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center gap-4">
            <p className="text-muted-foreground">
              Manage system-wide data like courses and departments.
            </p>
            <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90">
              <Link href="/admin/login">Admin Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-muted-foreground">Need an account?</p>
        <div className="flex gap-4 justify-center mt-2">
          <Button asChild variant="link">
            <Link href="/student/signup">Register as Student</Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/lecturer/signup">Register as Lecturer</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
