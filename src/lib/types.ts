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
  options: string[];
  correctAnswer: string;
};

export type Exam = {
  courseCode: string;
  courseTitle: string;
  creditUnit: number;
  department: string[];
  semester: 'Rain' | 'Harmattan';
  session: string;
  duration: number; // in minutes
  questions: Question[];
};
