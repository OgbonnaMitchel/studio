'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

const formSchema = z.object({
  lecturerId: z.string().min(1, 'Lecturer ID is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function LecturerLoginForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lecturerId: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const storedUser = localStorage.getItem(`lecturer_${values.lecturerId}`);
    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.password === values.password) {
            localStorage.setItem('currentUser', JSON.stringify({ ...user, role: 'Lecturer' }));
            toast({
              title: 'Login Successful',
              description: 'Redirecting to your dashboard...',
            });
            router.push('/lecturer/dashboard');
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
              name="lecturerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lecturer ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., LEC-123" {...field} />
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
                    <Input type="password" placeholder="••••••••" {...field} />
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
                <Link href="/lecturer/signup">Sign up</Link>
              </Button>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
