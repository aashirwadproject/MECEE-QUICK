import { Question } from '../types';
import { ZOOLOGY_QUESTIONS } from './questions/zoologyQuestions';
import { BOTANY_QUESTIONS } from './questions/botanyQuestions';
import { CHEMISTRY_QUESTIONS } from './questions/chemistryQuestions';
import { PHYSICS_QUESTIONS } from './questions/physicsQuestions';
import { MAT_QUESTIONS } from './questions/matQuestions';
import { generateSyllabusQuestions } from './questionGenerator';

const generatedPool = generateSyllabusQuestions();

export const SEED_QUESTIONS: Question[] = [
  ...ZOOLOGY_QUESTIONS,
  ...BOTANY_QUESTIONS,
  ...CHEMISTRY_QUESTIONS,
  ...PHYSICS_QUESTIONS,
  ...MAT_QUESTIONS,
  ...generatedPool
];
