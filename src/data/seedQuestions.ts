import { Question } from '../types';
import { ZOOLOGY_QUESTIONS } from './questions/zoologyQuestions';
import { BOTANY_QUESTIONS } from './questions/botanyQuestions';
import { CHEMISTRY_QUESTIONS } from './questions/chemistryQuestions';
import { PHYSICS_QUESTIONS } from './questions/physicsQuestions';
import { MAT_QUESTIONS } from './questions/matQuestions';
import { CEE_PAST_YEAR_QUESTIONS } from './questions/ceePastYearQuestions';
import { generateSyllabusQuestions } from './questionGenerator';
import { PYQ_QAD_PHYSICS } from './questions/pyqQadPhysics';
import { PYQ_QAD_CHEMISTRY } from './questions/pyqQadChemistry';
import { PYQ_QAD_BOTANY } from './questions/pyqQadBotany';
import { PYQ_QAD_ZOOLOGY } from './questions/pyqQadZoology';
import { PYQ_QAD_MAT } from './questions/pyqQadMat';
import { COMPREHENSIVE_PYQ_QAD_BANK } from './questions/comprehensiveBank';

// Ensures all questions have their correct option evenly distributed across A, B, C, D (25% each)
export function balanceQuestionOptionOrder(q: Question): Question {
  const options = [q.optionA, q.optionB, q.optionC, q.optionD];
  const correctText = options[q.correctOptionIndex];

  // Hash ID deterministically to assign target index from 0 to 3
  let hash = 0;
  for (let i = 0; i < q.id.length; i++) {
    hash = (hash * 31 + q.id.charCodeAt(i)) | 0;
  }
  const targetIndex = Math.abs(hash) % 4;

  if (targetIndex !== q.correctOptionIndex) {
    const temp = options[targetIndex];
    options[targetIndex] = correctText;
    options[q.correctOptionIndex] = temp;
  }

  return {
    ...q,
    optionA: options[0],
    optionB: options[1],
    optionC: options[2],
    optionD: options[3],
    correctOptionIndex: targetIndex
  };
}

const rawSeedPool: Question[] = [
  ...ZOOLOGY_QUESTIONS,
  ...BOTANY_QUESTIONS,
  ...CHEMISTRY_QUESTIONS,
  ...PHYSICS_QUESTIONS,
  ...MAT_QUESTIONS,
  ...CEE_PAST_YEAR_QUESTIONS,
  ...generateSyllabusQuestions(),
  ...PYQ_QAD_PHYSICS,
  ...PYQ_QAD_CHEMISTRY,
  ...PYQ_QAD_BOTANY,
  ...PYQ_QAD_ZOOLOGY,
  ...PYQ_QAD_MAT,
  ...COMPREHENSIVE_PYQ_QAD_BANK
];

export const SEED_QUESTIONS: Question[] = rawSeedPool.map(balanceQuestionOptionOrder);
