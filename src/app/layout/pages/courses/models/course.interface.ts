export interface PaginationResult {
  currentPage: number;
  limit: number;
  numberOfPages: number;
  totalResults: number;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  numberOfHours: string;
  numberOfMinutes: string;
  price: number;
  priceLevel: 'Free' | 'Paid'; // ميزة الـ TypeScript لتحديد قيم ثابتة
  numberOfLectures: number;
  courseImage: string;
  rating: number;
  category: string;
  level: 'All Levels' | 'Intermediate' | 'Advanced' | 'Beginner';
  language: string;
  createdAt?: string; // علامة الاستفهام تعني أنه اختياري لأن بعض الكورسات قد لا تحتويه
  updatedAt: string;
  __v: number;
}

export interface CourseApiResponse {
  status: string;
  results: number;
  paginationResult: PaginationResult;
  data: Course[] | Course;
}
