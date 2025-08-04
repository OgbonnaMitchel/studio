import type { Department, Level, Course } from './types';

export const departments: Department[] = [
  { id: '1', name: 'Computer Science' },
  { id: '2', name: 'Electrical Engineering' },
  { id: '3', name: 'Mechanical Engineering' },
  { id: '4', name: 'Business Administration' },
];

export const levels: Level[] = [
  { id: '1', value: 100, label: '100 Level' },
  { id: '2', value: 200, label: '200 Level' },
  { id: '3', value: 300, label: '300 Level' },
  { id: '4', value: 400, label: '400 Level' },
];

export const courses: Course[] = [
    { id: 'cs101', code: 'CSC 101', title: 'Introduction to Computer Science', departmentId: '1', level: 100 },
    { id: 'cs201', code: 'CSC 201', title: 'Data Structures', departmentId: '1', level: 200 },
    { id: 'ee202', code: 'EEE 202', title: 'Circuit Theory', departmentId: '2', level: 200 },
    { id: 'me301', code: 'MEE 301', title: 'Thermodynamics', departmentId: '3', level: 300 },
    { id: 'ba401', code: 'BUS 401', title: 'Corporate Strategy', departmentId: '4', level: 400 },
];
