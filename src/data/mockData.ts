import { User, Student, StudentProgress } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'faculty',
    email: 'faculty@example.com',
    password: 'password123'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'headmaster',
    email: 'headmaster@example.com',
    password: 'password123'
  },
  {
    id: '3',
    name: 'Michael Brown',
    role: 'parent',
    email: 'parent@example.com',
    password: 'password123'
  }
];

export const students: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    age: 10,
    grade: '4th',
    parentId: '3'
  },
  {
    id: '2',
    name: 'Jamie Williams',
    age: 8,
    grade: '2nd',
    parentId: '3'
  },
  {
    id: '3',
    name: 'Taylor Davis',
    age: 12,
    grade: '6th',
    parentId: '4'
  }
];

export const studentProgress: StudentProgress[] = [
  {
    studentId: '1',
    studentName: 'Alex Johnson',
    date: '2025-05-01',
    domains: [
      { domain: 'Communication', score: 65, previousScore: 55, maxScore: 100 },
      { domain: 'Social Skills', score: 70, previousScore: 60, maxScore: 100 },
      { domain: 'Motor Skills', score: 80, previousScore: 75, maxScore: 100 },
      { domain: 'Academic', score: 60, previousScore: 50, maxScore: 100 },
      { domain: 'Self-Care', score: 75, previousScore: 65, maxScore: 100 }
    ]
  },
  {
    studentId: '2',
    studentName: 'Jamie Williams',
    date: '2025-05-01',
    domains: [
      { domain: 'Communication', score: 55, previousScore: 45, maxScore: 100 },
      { domain: 'Social Skills', score: 60, previousScore: 50, maxScore: 100 },
      { domain: 'Motor Skills', score: 70, previousScore: 65, maxScore: 100 },
      { domain: 'Academic', score: 50, previousScore: 40, maxScore: 100 },
      { domain: 'Self-Care', score: 65, previousScore: 55, maxScore: 100 }
    ]
  },
  {
    studentId: '3',
    studentName: 'Taylor Davis',
    date: '2025-05-01',
    domains: [
      { domain: 'Communication', score: 75, previousScore: 65, maxScore: 100 },
      { domain: 'Social Skills', score: 80, previousScore: 70, maxScore: 100 },
      { domain: 'Motor Skills', score: 85, previousScore: 80, maxScore: 100 },
      { domain: 'Academic', score: 70, previousScore: 60, maxScore: 100 },
      { domain: 'Self-Care', score: 85, previousScore: 75, maxScore: 100 }
    ]
  }
];