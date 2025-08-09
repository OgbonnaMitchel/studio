'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Exam } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ViewExamPage() {
  const params = useParams();
  const courseId = Array.isArray(params.courseId) ? params.courseId[0] : params.courseId;
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      const storedExam = localStorage.getItem(`exam_${courseId}`);
      if (storedExam) {
        setExam(JSON.parse(storedExam));
      }
    }
    setLoading(false);
  }, [courseId]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]">Loading exam details...</div>;
  }

  if (!exam) {
    return <div className="flex items-center justify-center min-h-[60vh]">Exam details not found.</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-tight">View Exam Details</h1>
        <p className="text-muted-foreground">
          Viewing details for the exam: {exam.courseCode} - {exam.courseTitle}
        </p>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle>Exam Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div><p className="font-semibold">Course</p><p>{exam.courseCode} - {exam.courseTitle}</p></div>
            <div><p className="font-semibold">Credit Unit</p><p>{exam.creditUnit}</p></div>
            <div><p className="font-semibold">Session</p><p>{exam.session}</p></div>
            <div><p className="font-semibold">Semester</p><p>{exam.semester}</p></div>
            <div><p className="font-semibold">Duration</p><p>{exam.duration} minutes</p></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Questions</CardTitle>
          <CardDescription>
            {exam.questions.length} question(s) in total. The correct answer is highlighted.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {exam.questions.map((q, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <p className="font-semibold mb-2">
                Question {index + 1}: {q.questionText}
              </p>
              <div className="space-y-2">
                {q.options.map((option, optIndex) => {
                  const optionLetter = ['A', 'B', 'C', 'D'][optIndex];
                  const isCorrect = optionLetter === q.correctAnswer;
                  return (
                    <div
                      key={optIndex}
                      className={`flex items-center p-2 rounded-md ${
                        isCorrect ? 'bg-green-100 dark:bg-green-900/50' : 'bg-transparent'
                      }`}
                    >
                      {isCorrect ? <Check className="h-4 w-4 mr-2 text-green-600" /> : <X className="h-4 w-4 mr-2 text-red-500 opacity-20" />}
                      <span>{optionLetter}. {option}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" asChild>
          <Link href="/lecturer/dashboard">Back to Dashboard</Link>
        </Button>
        <Button asChild>
          <Link href={`/lecturer/exam/edit/${courseId}`}>Edit this Exam</Link>
        </Button>
      </div>
    </div>
  );
}
