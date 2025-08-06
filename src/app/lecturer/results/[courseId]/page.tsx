'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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

type Result = {
    name: string;
    reg: string;
    score: number;
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
  const course = courses.find((c) => c.id === courseId);
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    if (courseId) {
      const storedResults = localStorage.getItem(`results_${courseId}`);
      if (storedResults) {
        setResults(JSON.parse(storedResults));
      }
    }
  }, [courseId]);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Exam Results</h1>
        <p className="text-muted-foreground">
          Showing results for: {course?.code} - {course?.title || 'Unknown Course'}
        </p>
      </header>
      <Card>
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
                    <TableHead>Score (%)</TableHead>
                    <TableHead>Grade</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {results.length > 0 ? (
                    results.map((result) => (
                        <TableRow key={result.reg}>
                        <TableCell className="font-medium">{result.name}</TableCell>
                        <TableCell>{result.reg}</TableCell>
                        <TableCell>{result.score}</TableCell>
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
