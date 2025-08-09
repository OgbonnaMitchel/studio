
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
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { courses as initialCourses, departments, levels } from '@/lib/data';
import { MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react';
import type { Course } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function LecturerDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [userName, setUserName] = useState('Lecturer');
  const [lecturerCourses, setLecturerCourses] = useState<Course[]>([]);
  const [examStatus, setExamStatus] = useState<Record<string, boolean>>({});

  const checkExamStatus = () => {
    const status: Record<string, boolean> = {};
    lecturerCourses.forEach(course => {
      const exam = localStorage.getItem(`exam_${course.id}`);
      status[course.id] = !!exam;
    });
    setExamStatus(status);
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedCourses = localStorage.getItem('courses');
    const courses: Course[] = storedCourses ? JSON.parse(storedCourses) : initialCourses;

    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role === 'Lecturer') {
        setUserName(user.name);
        const assignedCourses = courses.filter(course => user.courses.includes(course.id));
        setLecturerCourses(assignedCourses);
      }
    }
  }, []);

  useEffect(() => {
    if (lecturerCourses.length > 0) {
      checkExamStatus();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lecturerCourses]);


  const handleSetExam = (courseId: string) => {
    router.push(`/lecturer/exam/create?courseId=${courseId}`);
  };

  const handleEditExam = (courseId: string) => {
    router.push(`/lecturer/exam/edit/${courseId}`);
  };

  const handleViewExam = (courseId: string) => {
    router.push(`/lecturer/exam/view/${courseId}`);
  };

  const handleDeleteExam = (courseId: string) => {
    localStorage.removeItem(`exam_${courseId}`);
    checkExamStatus();
    toast({
        title: 'Exam Deleted',
        description: 'The exam has been successfully deleted.',
    });
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
                <TableHead>Exam Status</TableHead>
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
                    <TableCell>
                      {examStatus[course.id] ? (
                        <Badge variant="default">Set</Badge>
                      ) : (
                        <Badge variant="secondary">Not Set</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {examStatus[course.id] ? (
                              <>
                                <DropdownMenuItem onClick={() => handleViewExam(course.id)}>
                                  <Eye className="mr-2 h-4 w-4" /> View Exam
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditExam(course.id)}>
                                  <Pencil className="mr-2 h-4 w-4" /> Edit Exam
                                </DropdownMenuItem>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem
                                      className="text-destructive focus:text-destructive"
                                      onSelect={(e) => e.preventDefault()}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" /> Delete Exam
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleViewResults(course.id)}>
                                  View Results
                                </DropdownMenuItem>
                              </>
                            ) : (
                              <DropdownMenuItem onClick={() => handleSetExam(course.id)}>
                                Set Exam
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the exam for this course. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteExam(course.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
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
