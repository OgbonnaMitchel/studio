'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
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
import type { Question } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Clock, CheckCircle2 } from 'lucide-react';

const mockQuestions: Question[] = [
    {
        questionText: 'What is the correct syntax to output "Hello World" in Python?',
        options: ['A. echo "Hello World"', 'B. print("Hello World")', 'C. p("Hello World")', 'D. cout << "Hello World"'],
        correctAnswer: 'B',
    },
    {
        questionText: 'Which of the following is a dynamically typed language?',
        options: ['A. Java', 'B. C++', 'C. JavaScript', 'D. C#'],
        correctAnswer: 'C',
    },
    {
        questionText: 'In object-oriented programming, what is encapsulation?',
        options: ['A. The ability of an object to take on many forms', 'B. The process of bundling data and methods that operate on the data into a single unit', 'C. The mechanism by which one class acquires the properties of another class', 'D. The practice of hiding implementation details from the user'],
        correctAnswer: 'B',
    },
];

const EXAM_DURATION = 1 * 60; // 1 minute for demo

export default function ExamInterface() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [isFinished, setIsFinished] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = () => {
    console.log('Submitting answers:', answers);
    setIsFinished(true);
    toast({
      title: 'Exam Submitted!',
      description: 'Thanks for writing the exam.',
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
                    <p className="text-lg text-muted-foreground">Thanks for writing the exam.</p>
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

  const currentQuestion = mockQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;
  const timeProgress = (timeLeft / EXAM_DURATION) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleNext = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
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
            <CardTitle className="font-headline text-2xl">CSC 101: Intro to CS</CardTitle>
            <div className="flex items-center gap-2 text-lg font-semibold text-destructive">
                <Clock className="h-6 w-6" />
                <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
            </div>
        </div>
        <Progress value={timeProgress} className="w-full h-2 [&>div]:bg-destructive" />
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
            <p className="text-sm text-muted-foreground mb-2">Question {currentQuestionIndex + 1} of {mockQuestions.length}</p>
            <h2 className="text-xl font-semibold">{currentQuestion.questionText}</h2>
        </div>
        <RadioGroup
            onValueChange={handleAnswerChange}
            value={answers[currentQuestionIndex]}
            className="space-y-4"
        >
          {currentQuestion.options.map((option, index) => (
            <Label key={index} htmlFor={option} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-secondary has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary transition-colors">
              <RadioGroupItem value={option.split('.')[0]} id={option} />
              <span className="ml-4 text-base">{option}</span>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
            Progress: {currentQuestionIndex + 1} / {mockQuestions.length}
            <Progress value={progress} className="w-32 mt-1"/>
        </div>
        <div className="flex gap-4">
            <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
                Previous
            </Button>
            
            {currentQuestionIndex < mockQuestions.length - 1 ? (
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
