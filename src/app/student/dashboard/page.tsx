'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { courses } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function StudentDashboard() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const router = useRouter();

  const handleStartExam = () => {
    if (selectedCourse) {
      router.push(`/student/exam/${selectedCourse}`);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Welcome, John Doe!</h1>
        <p className="text-muted-foreground">Select a course to begin your examination.</p>
      </header>

      <Card className="max-w-2xl mx-auto w-full shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Start a New Exam</CardTitle>
          <CardDescription>Choose from your registered courses below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={setSelectedCourse} value={selectedCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Select a course..." />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.code} - {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <Button onClick={handleStartExam} disabled={!selectedCourse} className="w-full bg-accent hover:bg-accent/90">
            Start Exam
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
