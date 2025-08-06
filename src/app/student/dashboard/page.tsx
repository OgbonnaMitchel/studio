
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { courses as initialCourses } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import type { Course } from '@/lib/types';

export default function StudentDashboard() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [userName, setUserName] = useState('Student');
  const [availableExams, setAvailableExams] = useState<Course[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedCourses = localStorage.getItem('courses');
    const allCourses: Course[] = storedCourses ? JSON.parse(storedCourses) : initialCourses;

    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role === 'Student') {
        setUserName(user.name);

        const studentCourses = allCourses.filter(course => 
          course.departmentId === user.department && String(course.level) === user.level
        );
        
        const examsForStudent = studentCourses.filter(course => {
            return localStorage.getItem(`exam_${course.id}`) !== null;
        });

        setAvailableExams(examsForStudent);
      }
    }
  }, []);

  const handleStartExam = () => {
    if (selectedCourse) {
      router.push(`/student/exam/${selectedCourse}`);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Welcome, {userName}!</h1>
        <p className="text-muted-foreground">Select a course to begin your examination.</p>
      </header>

      <Card className="max-w-2xl mx-auto w-full shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Start a New Exam</CardTitle>
          <CardDescription>Choose from available exams for your registered courses below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={setSelectedCourse} value={selectedCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Select a course..." />
            </SelectTrigger>
            <SelectContent>
              {availableExams.length > 0 ? (
                availableExams.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                    {course.code} - {course.title}
                    </SelectItem>
                ))
              ) : (
                <div className='p-4 text-sm text-muted-foreground text-center'>No exams currently available for you.</div>
              )}
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
