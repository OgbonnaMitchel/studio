export type Department = {
  id: string;
  name: string;
};

export type Course = {
  id: string;
  code: string;
  title: string;
  departmentId: string;
  level: number;
};

export type Level = {
  id: string;
  value: number;
  label: string;
};

export type Question = {
  questionText: string;
  options: [string, string, string, string];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
};

export type Exam = {
  course: string;
  courseCode: string;
  courseTitle: string;
  creditUnit: number;
  departments: string[];
  semester: 'Rain' | 'Harmattan';
  session: string;
  duration: number; // in minutes
  questions: Question[];
};
