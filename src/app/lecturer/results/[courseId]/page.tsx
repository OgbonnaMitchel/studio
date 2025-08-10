
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import html2canvas from 'html2canvas';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { courses } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import type { Course } from '@/lib/types';

type Result = {
    name: string;
    reg: string;
    score: number;
    totalQuestions: number;
    grade: string;
};

function getGradeVariant(grade: string) {
    switch(grade) {
        case 'A': return 'default';
        case 'B': return 'secondary';
        case 'C': return 'secondary';
        case 'D': return 'outline';
        default: return 'destructive';
    }
}

export default function ResultsPage() {
  const params = useParams();
  const courseId = Array.isArray(params.courseId) ? params.courseId[0] : params.courseId;
  const [course, setCourse] = useState<Course | undefined>();
  const [results, setResults] = useState<Result[]>([]);
  const resultsTableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedCourses = localStorage.getItem('courses');
    const allCourses = storedCourses ? JSON.parse(storedCourses) : courses;
    setCourse(allCourses.find((c: Course) => c.id === courseId));

    if (courseId) {
      const storedResults = localStorage.getItem(`results_${courseId}`);
      if (storedResults) {
        setResults(JSON.parse(storedResults));
      }
    }
  }, [courseId]);
  
  const handlePrintResults = () => {
    if (resultsTableRef.current) {
        html2canvas(resultsTableRef.current).then((canvas) => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `exam-results-${course?.code}.png`;
            link.click();
        });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <header className='flex justify-between items-center'>
        <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">Exam Results</h1>
            <p className="text-muted-foreground">
            Showing results for: {course?.code} - {course?.title || 'Unknown Course'}
            </p>
        </div>
        <Button onClick={handlePrintResults} disabled={results.length === 0}>
            <Download className="mr-2 h-4 w-4" />
            Print Results
        </Button>
      </header>
      <Card ref={resultsTableRef} className="p-4">
        <CardHeader>
            <CardTitle>Student Scores</CardTitle>
            <CardDescription>List of students who took the exam and their grades.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Registration No.</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Grade</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {results.length > 0 ? (
                    results.map((result) => (
                        <TableRow key={result.reg}>
                        <TableCell className="font-medium">{result.name}</TableCell>
                        <TableCell>{result.reg}</TableCell>
                        <TableCell>{`${result.score}/${result.totalQuestions}`}</TableCell>
                        <TableCell>
                            <Badge variant={getGradeVariant(result.grade)}>{result.grade}</Badge>
                        </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">
                            No results found for this course yet.
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
