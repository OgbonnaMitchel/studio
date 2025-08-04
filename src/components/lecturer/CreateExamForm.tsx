'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { courses, departments } from '@/lib/data';
import AiQuestionGenerator from './AiQuestionGenerator';
import type { Question } from '@/lib/types';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';

const questionSchema = z.object({
  questionText: z.string().min(1, 'Question text is required.'),
  options: z.tuple([
    z.string().min(1, 'Option A is required.'),
    z.string().min(1, 'Option B is required.'),
    z.string().min(1, 'Option C is required.'),
    z.string().min(1, 'Option D is required.'),
  ]),
  correctAnswer: z.enum(['A', 'B', 'C', 'D']),
});

const formSchema = z.object({
  course: z.string().min(1, 'Please select a course'),
  creditUnit: z.string().min(1, 'Please select credit unit'),
  departments: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one department.",
  }),
  semester: z.enum(['Rain', 'Harmattan']),
  session: z.string().regex(/^\d{4}\/\d{4}$/, 'Invalid session format (e.g., 2024/2025)'),
  duration: z.coerce.number().min(1, 'Duration must be at least 1 minute'),
  questions: z.array(questionSchema).min(1, 'At least one question is required.'),
});

type ExamFormValues = z.infer<typeof formSchema>;

export default function CreateExamForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ExamFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: '',
      creditUnit: '',
      departments: [],
      semester: 'Harmattan',
      session: '2024/2025',
      duration: 60,
      questions: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: 'questions',
  });

  const handleAddQuestion = () => {
    append({
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: 'A',
    });
  };

  const handleQuestionsGenerated = (generatedQuestions: Question[]) => {
    const formattedQuestions = generatedQuestions.map((q) => ({
      questionText: q.questionText,
      options: [
        q.options[0]?.substring(3) || '',
        q.options[1]?.substring(3) || '',
        q.options[2]?.substring(3) || '',
        q.options[3]?.substring(3) || '',
      ] as [string, string, string, string],
      correctAnswer: q.correctAnswer as 'A' | 'B' | 'C' | 'D',
    }));
    replace(formattedQuestions);
  };

  function onSubmit(values: ExamFormValues) {
    console.log(values);
    toast({
      title: 'Exam Created Successfully!',
      description: 'The exam has been set and is ready for students.',
    });
    router.push('/lecturer/dashboard');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Exam Details</CardTitle>
            <CardDescription>
              Define the parameters for your new exam.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courses.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.code} - {c.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="creditUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credit Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select credit unit" /></SelectTrigger></FormControl>
                    <SelectContent>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="departments"
                render={() => (
                    <FormItem>
                    <FormLabel>Departments</FormLabel>
                    <div className="space-y-2 rounded-md border p-4">
                        {departments.map((dep) => (
                            <FormField
                            key={dep.id}
                            control={form.control}
                            name="departments"
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                    checked={field.value.includes(dep.id)}
                                    onCheckedChange={(checked) => {
                                        return checked
                                        ? field.onChange([...field.value, dep.id])
                                        : field.onChange(field.value.filter((id) => id !== dep.id));
                                    }}
                                    />
                                </FormControl>
                                <FormLabel className="font-normal">{dep.name}</FormLabel>
                                </FormItem>
                            )}
                            />
                        ))}
                    </div>
                    <FormMessage />
                    </FormItem>
                )}
                />
            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semester</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                        <SelectItem value="Harmattan">Harmattan</SelectItem>
                        <SelectItem value="Rain">Rain</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="session"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session</FormLabel>
                  <FormControl><Input placeholder="e.g., 2024/2025" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (in minutes)</FormLabel>
                  <FormControl><Input type="number" placeholder="60" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="font-headline">Exam Questions</CardTitle>
                        <CardDescription>
                        Add questions manually or use AI to generate them.
                        </CardDescription>
                    </div>
                    <AiQuestionGenerator onQuestionsGenerated={handleQuestionsGenerated} />
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                        <FormLabel className="font-semibold">Question {index + 1}</FormLabel>
                        <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => remove(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <FormField
                            control={form.control}
                            name={`questions.${index}.questionText`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Question</FormLabel>
                                    <FormControl><Input placeholder="Enter question text" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(['A', 'B', 'C', 'D'] as const).map((option, optIndex) => (
                                <FormField
                                    key={optIndex}
                                    control={form.control}
                                    name={`questions.${index}.options.${optIndex}`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Option {option}</FormLabel>
                                            <FormControl><Input placeholder={`Option ${option}`} {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                         <FormField
                            control={form.control}
                            name={`questions.${index}.correctAnswer`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correct Answer</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="A">A</SelectItem>
                                            <SelectItem value="B">B</SelectItem>
                                            <SelectItem value="C">C</SelectItem>
                                            <SelectItem value="D">D</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={handleAddQuestion} className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Question
                </Button>
                {form.formState.errors.questions && (
                  <p className="text-sm font-medium text-destructive">{form.formState.errors.questions.message}</p>
                )}
            </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90">
            Create Exam
          </Button>
        </div>
      </form>
    </Form>
  );
}
