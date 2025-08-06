'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const formSchema = z.object({
  regNumber: z.string().min(1, 'Registration number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function StudentLoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      regNumber: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const storedUser = localStorage.getItem(`student_${values.regNumber}`);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === values.password) {
        localStorage.setItem('currentUser', JSON.stringify({ ...user, role: 'Student' }));
        toast({
          title: 'Login Successful',
          description: 'Redirecting to your dashboard...',
        });
        router.push('/student/dashboard');
        return;
      }
    }

    toast({
        title: 'Login Failed',
        description: 'Invalid credentials or user not found.',
        variant: 'destructive',
    });
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4 pt-6">
            <FormField
              control={form.control}
              name="regNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 2021/12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...field} />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" size="lg">Login</Button>
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Button variant="link" asChild className="p-0">
                <Link href="/student/signup">Sign up</Link>
              </Button>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
