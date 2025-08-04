'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { generateExamQuestions } from '@/ai/flows/generate-exam-questions';
import type { Question } from '@/lib/types';
import { Wand2, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type AiQuestionGeneratorProps = {
  onQuestionsGenerated: (questions: Question[]) => void;
};

export default function AiQuestionGenerator({
  onQuestionsGenerated,
}: AiQuestionGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [courseContent, setCourseContent] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!courseContent.trim()) {
      toast({
        title: 'Error',
        description: 'Course content cannot be empty.',
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await generateExamQuestions({
          courseContent,
          numberOfQuestions: numQuestions,
        });

        if (result && result.questions) {
          onQuestionsGenerated(result.questions);
          toast({
            title: 'Success!',
            description: `${result.questions.length} questions have been generated and added.`,
          });
          setIsOpen(false);
          setCourseContent('');
        } else {
            throw new Error('Invalid response from AI.');
        }
      } catch (error) {
        console.error('Error generating questions:', error);
        toast({
          title: 'Generation Failed',
          description:
            'Could not generate questions. Please try again later.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Wand2 className="mr-2 h-4 w-4" />
          Generate with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-headline">AI Question Generator</DialogTitle>
          <DialogDescription>
            Paste your course material below, and the AI will generate
            multiple-choice questions for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="course-content">Course Content</Label>
            <Textarea
              id="course-content"
              value={courseContent}
              onChange={(e) => setCourseContent(e.target.value)}
              placeholder="Paste course notes, lecture transcripts, or textbook excerpts here..."
              className="min-h-[200px]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="num-questions">Number of Questions</Label>
            <Select
              value={String(numQuestions)}
              onValueChange={(val) => setNumQuestions(Number(val))}
            >
              <SelectTrigger id="num-questions" className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleGenerate}
            disabled={isPending || !courseContent.trim()}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Questions'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
