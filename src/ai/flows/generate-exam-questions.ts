'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating multiple-choice exam questions based on course content.
 *
 * @exports generateExamQuestions - A function that takes course content as input and returns AI-generated multiple-choice questions.
 * @exports GenerateExamQuestionsInput - The input type for the generateExamQuestions function.
 * @exports GenerateExamQuestionsOutput - The output type for the generateExamQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExamQuestionsInputSchema = z.object({
  courseContent: z
    .string()
    .describe('The content of the course for which to generate questions.'),
  numberOfQuestions: z
    .number()
    .default(5)
    .describe('The number of questions to generate. Defaults to 5.'),
});
export type GenerateExamQuestionsInput = z.infer<typeof GenerateExamQuestionsInputSchema>;

const GenerateExamQuestionsOutputSchema = z.object({
  questions: z.array(
    z.object({
      questionText: z.string().describe('The text of the question.'),
      options: z.array(z.string()).describe('The possible answer options.'),
      correctAnswer: z.string().describe('The correct answer option.'),
    })
  ).describe('The generated multiple-choice questions.'),
});
export type GenerateExamQuestionsOutput = z.infer<typeof GenerateExamQuestionsOutputSchema>;

export async function generateExamQuestions(input: GenerateExamQuestionsInput): Promise<GenerateExamQuestionsOutput> {
  return generateExamQuestionsFlow(input);
}

const generateExamQuestionsPrompt = ai.definePrompt({
  name: 'generateExamQuestionsPrompt',
  input: {schema: GenerateExamQuestionsInputSchema},
  output: {schema: GenerateExamQuestionsOutputSchema},
  prompt: `You are an expert in generating multiple-choice questions based on course content.

  Generate {{numberOfQuestions}} multiple-choice questions based on the following course content.

  Course Content: {{{courseContent}}}

  Each question should have four options (A, B, C, D) and a clearly indicated correct answer.

  Format the output as a JSON object with a 'questions' array. Each element in the array
  should be an object with 'questionText', 'options' (an array of four strings), and 'correctAnswer' (A, B, C, or D).

  Example:
  {
    "questions": [
      {
        "questionText": "What is the capital of France?",
        "options": ["A. London", "B. Paris", "C. Rome", "D. Berlin"],
        "correctAnswer": "B"
      },
      {
        "questionText": "What is the value of pi?",
        "options": ["A. 3.14", "B. 2.71", "C. 1.62", "D. 0.57"],
        "correctAnswer": "A"
      }
    ]
  }`,
});

const generateExamQuestionsFlow = ai.defineFlow(
  {
    name: 'generateExamQuestionsFlow',
    inputSchema: GenerateExamQuestionsInputSchema,
    outputSchema: GenerateExamQuestionsOutputSchema,
  },
  async input => {
    const {output} = await generateExamQuestionsPrompt(input);
    return output!;
  }
);
