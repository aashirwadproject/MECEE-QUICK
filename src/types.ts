export type SubjectType = 'ZOOLOGY' | 'BOTANY' | 'CHEMISTRY' | 'PHYSICS' | 'MAT';

export interface SyllabusUnit {
  id: string;
  subject: SubjectType;
  name: string;
  marks: number;
  priorityLevel: number; // 1 to 5
  priorityFlames: string;
  description: string;
  isTopPriority?: boolean;
}

export interface Question {
  id: string;
  subject: SubjectType;
  unit: string;
  priority: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOptionIndex: number; // 0: A, 1: B, 2: C, 3: D
  explanation: string;
  isBookmarked?: boolean;
  isUserAdded?: boolean;
  createdAt?: number;
}

export interface ExamAttempt {
  id: string;
  examTitle: string;
  examType: 'FULL_200' | 'SUBJECT' | 'UNIT' | 'HIGH_YIELD' | 'PRACTICE';
  subjectFilter?: string;
  unitFilter?: string;
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  score: number;
  maxScore: number;
  accuracyPercentage: number;
  negativePenalty: number;
  timeSpentSeconds: number;
  timestamp: number;
  userAnswers: Record<string, number>; // questionId -> optionIndex
  questionsSnapshot: Question[];
}

export interface ReviewQuestionItem {
  question: Question;
  selectedOptionIndex?: number;
  isCorrect: boolean;
  penalty: number;
}
