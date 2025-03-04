export interface User {
  id: string;
  name: string;
  role: 'faculty' | 'headmaster' | 'parent';
  email: string;
  password: string;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  parentId: string;
}

export interface DomainProgress {
  domain: string;
  score: number;
  previousScore: number;
  maxScore: number;
}

export interface StudentProgress {
  studentId: string;
  studentName: string;
  date: string;
  domains: DomainProgress[];
}