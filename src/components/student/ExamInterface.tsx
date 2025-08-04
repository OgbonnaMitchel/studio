'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
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
import type { Exam } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Clock, CheckCircle2 } from 'lucide-react';

interface ExamInterfaceProps {
    exam: Exam;
    courseId: string;
}

export default function ExamInterface({ exam, courseId }: ExamInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);
  const [isFinished, setIsFinished] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const getGrade = (score: number, total: number): { grade: string, percentage: number } => {
    const percentage = (score / total) * 100;
    if (percentage >= 70) return { grade: 'A', percentage };
    if (percentage >= 60) return { grade: 'B', percentage };
    if (percentage >= 50) return { grade: 'C', percentage };
    if (percentage >= 45) return { grade: 'D', percentage };
    return { grade: 'F', percentage };
  }

  const handleSubmit = () => {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
        toast({ title: 'Error', description: 'Could not find user details.', variant: 'destructive'});
        router.push('/student/login');
        return;
    }
    const user = JSON.parse(storedUser);

    let score = 0;
    exam.questions.forEach((q, index) => {
        const selectedOptionPrefix = answers[index] ? answers[index].split('.')[0] : '';
        if (selectedOptionPrefix === q.correctAnswer) {
            score++;
        }
    });

    const { grade, percentage } = getGrade(score, exam.questions.length);

    const result = {
        name: user.name,
        reg: user.regNumber,
        score: percentage.toFixed(0),
        grade,
    };
    
    const existingResultsRaw = localStorage.getItem(`results_${courseId}`);
    const existingResults = existingResultsRaw ? JSON.parse(existingResultsRaw) : [];
    const updatedResults = [...existingResults, result];

    localStorage.setItem(`results_${courseId}`, JSON.stringify(updatedResults));
    
    setIsFinished(true);
    toast({
      title: 'Exam Submitted!',
      description: 'Your results have been recorded.',
    });
  };

  useEffect(() => {
    if (isFinished) return;
    
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isFinished]);

  if (isFinished) {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-lg text-center shadow-xl">
                <CardHeader>
                    <div className="mx-auto bg-green-100 p-4 rounded-full dark:bg-green-900/50">
                        <CheckCircle2 className="h-12 w-12 text-accent" />
                    </div>
                    <CardTitle className="font-headline text-2xl mt-4">Exam Completed</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-muted-foreground">Your results have been submitted successfully.</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => router.push('/student/dashboard')} className="w-full">
                        Back to Dashboard
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100;
  const timeProgress = (timeLeft / (exam.duration * 60)) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleNext = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestionIndex]: value });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
            <CardTitle className="font-headline text-2xl">{exam.courseCode}: {exam.courseTitle}</CardTitle>
            <div className="flex items-center gap-2 text-lg font-semibold text-destructive">
                <Clock className="h-6 w-6" />
                <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
            </div>
        </div>
        <Progress value={timeProgress} className="w-full h-2 [&>div]:bg-destructive" />
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
            <p className="text-sm text-muted-foreground mb-2">Question {currentQuestionIndex + 1} of {exam.questions.length}</p>
            <h2 className="text-xl font-semibold">{currentQuestion.questionText}</h2>
        </div>
        <RadioGroup
            onValueChange={handleAnswerChange}
            value={answers[currentQuestionIndex]}
            className="space-y-4"
        >
          {currentQuestion.options.map((option, index) => (
            <Label key={index} htmlFor={`${currentQuestion.questionText}-${option}`} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-secondary has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary transition-colors">
              <RadioGroupItem value={`${['A', 'B', 'C', 'D'][index]}. ${option}`} id={`${currentQuestion.questionText}-${option}`} />
              <span className="ml-4 text-base">{['A', 'B', 'C', 'D'][index]}. {option}</span>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
            Progress: {currentQuestionIndex + 1} / {exam.questions.length}
            <Progress value={progress} className="w-32 mt-1"/>
        </div>
        <div className="flex gap-4">
            <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
                Previous
            </Button>
            
            {currentQuestionIndex < exam.questions.length - 1 ? (
                <Button onClick={handleNext}>Next</Button>
            ) : (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="bg-accent hover:bg-accent/90">Submit</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to submit?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. You will not be able to change your answers after submission.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>No, continue</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSubmit} className="bg-accent hover:bg-accent/90">
                            Yes, submit
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
      </CardFooter>
    </Card>
  );
}
