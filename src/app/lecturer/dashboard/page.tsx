'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { courses, departments, levels } from '@/lib/data';
import { MoreHorizontal } from 'lucide-react';
import type { Course } from '@/lib/types';

export default function LecturerDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState('Lecturer');
  const [lecturerCourses, setLecturerCourses] = useState<Course[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role === 'Lecturer') {
        setUserName(user.name);
        // Filter courses based on what the lecturer signed up for
        const assignedCourses = courses.filter(course => user.courses.includes(course.id));
        setLecturerCourses(assignedCourses);
      }
    }
  }, []);


  const handleSetExam = (courseId: string) => {
    router.push(`/lecturer/exam/create?courseId=${courseId}`);
  };

  const handleViewResults = (courseId: string) => {
    router.push(`/lecturer/results/${courseId}`);
  };

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Welcome, {userName}!</h1>
        <p className="text-muted-foreground">Here are the courses assigned to you.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>My Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Code</TableHead>
                <TableHead>Course Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Level</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lecturerCourses.length > 0 ? (
                lecturerCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.code}</TableCell>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>
                      {departments.find((d) => d.id === course.departmentId)?.name}
                    </TableCell>
                    <TableCell>
                      {levels.find((l) => l.value === course.level)?.label}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleSetExam(course.id)}>
                            Set Exam
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewResults(course.id)}>
                            View Results
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    You have not been assigned any courses yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
