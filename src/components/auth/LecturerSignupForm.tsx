'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { departments, courses } from '@/lib/data';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';

const formSchema = z.object({
    name: z.string().min(2, 'Name is too short'),
    department: z.string().min(1, 'Please select a department'),
    courses: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one course.",
    }),
    lecturerId: z.string().min(1, 'Lecturer ID is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function LecturerSignupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      lecturerId: '',
      password: '',
      confirmPassword: '',
      courses: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // In a real app, you'd save this to a database.
    // For this demo, we'll use localStorage to simulate user accounts.
    localStorage.setItem(`lecturer_${values.lecturerId}`, JSON.stringify(values));
    toast({
        title: 'Registration Successful',
        description: 'You can now log in with your credentials.',
    });
    router.push('/lecturer/login');
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4 pt-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. Jane Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select your department" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {departments.map(dep => (
                                <SelectItem key={dep.id} value={dep.id}>{dep.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
              control={form.control}
              name="courses"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Courses</FormLabel>
                  </div>
                  <div className="space-y-2">
                  {courses.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="courses"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.code} - {item.title}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

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
             <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                        <Input type={showConfirmPassword ? 'text' : 'password'} placeholder="••••••••" {...field} />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                            {showConfirmPassword ? <EyeOff /> : <Eye />}
                        </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" size="lg">Create Account</Button>
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Button variant="link" asChild className="p-0">
                <Link href="/lecturer/login">Login</Link>
              </Button>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
