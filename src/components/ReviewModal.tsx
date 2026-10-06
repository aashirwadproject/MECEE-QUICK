import React, { useState } from 'react';
import { 
  Check, 
  X, 
  AlertTriangle, 
  Lightbulb, 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck,
  RotateCcw,
  Award,
  Clock
} from 'lucide-react';
import { ExamAttempt } from '../types';
import { SUBJECT_INFO } from '../data/syllabus';

interface ReviewModalProps {
  attempt: ExamAttempt;
  onClose: () => void;
  onRetake: () => void;
  onToggleBookmark: (questionId: string) => boolean;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  attempt,
  onClose,
  onRetake,
  onToggleBookmark
}) => {
  const [filter, setFilter] = useState<'ALL' | 'INCORRECT' | 'CORRECT' | 'SKIPPED'>('ALL');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const questions = attempt.questionsSnapshot || [];

  const filteredQuestions = questions.filter(q => {
    const selected = attempt.userAnswers[q.id];
    const isCorrect = selected === q.correctOptionIndex;
    const isSkipped = selected === undefined;

    if (filter === 'INCORRECT') return !isSkipped && !isCorrect;
    if (filter === 'CORRECT') return isCorrect;
    if (filter === 'SKIPPED') return isSkipped;
    return true;
  });

  const minutesSpent = Math.round(attempt.timeSpentSeconds / 60);

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>

        <button
          onClick={onRetake}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold shadow"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Retake Test
        </button>
      </div>

      {/* Scorecard Hero Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider font-mono">
              Exam Result Summary
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {attempt.examTitle}
            </h2>
            <span className="text-xs text-slate-400">
              Completed on {new Date(attempt.timestamp).toLocaleString()} • Duration: {minutesSpent} mins
            </span>
          </div>

          <div className="flex items-center gap-6 self-start sm:self-center">
            <div className="text-right">
              <span className="text-xs text-slate-400 font-medium block">FINAL SCORE</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-teal-400">
                  {attempt.score.toFixed(2)}
                </span>
                <span className="text-sm text-slate-500">/ {attempt.maxScore}</span>
              </div>
            </div>

            <div className="text-right pl-6 border-l border-slate-800">
              <span className="text-xs text-slate-400 font-medium block">ACCURACY</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {attempt.accuracyPercentage.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* 4-Stat Breakdown Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-slate-800/60 border border-slate-700/60 p-3 rounded-xl">
            <span className="text-xs text-slate-400 block mb-0.5">Correct (+1)</span>
            <span className="text-xl font-extrabold text-emerald-400">{attempt.correctCount}</span>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 p-3 rounded-xl">
            <span className="text-xs text-slate-400 block mb-0.5">Incorrect (-0.25)</span>
            <span className="text-xl font-extrabold text-rose-400">{attempt.incorrectCount}</span>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 p-3 rounded-xl">
            <span className="text-xs text-slate-400 block mb-0.5">Unattempted (0)</span>
            <span className="text-xl font-extrabold text-slate-300">{attempt.unattemptedCount}</span>
          </div>

          <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl">
            <span className="text-xs text-rose-300 block mb-0.5">Penalty Deduction</span>
            <span className="text-xl font-extrabold text-rose-400">-{attempt.negativePenalty.toFixed(2)}</span>
          </div>
        </div>

        {/* Negative Penalty Warning */}
        {attempt.incorrectCount > 0 && (
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <p className="text-xs text-rose-200 leading-relaxed">
              Negative marking reduced your score by <strong className="font-bold text-rose-300">-{attempt.negativePenalty.toFixed(2)} marks</strong> from {attempt.correctCount} raw correct marks down to {attempt.score.toFixed(2)}. Filter by <em>"Incorrect (-0.25)"</em> below to eliminate recurring traps!
            </p>
          </div>
        )}
      </div>

      {/* Review Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            filter === 'ALL' ? 'bg-teal-500 text-slate-950' : 'bg-slate-900 border border-slate-800 text-slate-400'
          }`}
        >
          All ({questions.length})
        </button>

        <button
          onClick={() => setFilter('INCORRECT')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            filter === 'INCORRECT' ? 'bg-rose-500 text-white' : 'bg-slate-900 border border-slate-800 text-rose-400'
          }`}
        >
          Incorrect ({attempt.incorrectCount})
        </button>

        <button
          onClick={() => setFilter('CORRECT')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            filter === 'CORRECT' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-800 text-emerald-400'
          }`}
        >
          Correct ({attempt.correctCount})
        </button>

        <button
          onClick={() => setFilter('SKIPPED')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            filter === 'SKIPPED' ? 'bg-slate-700 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400'
          }`}
        >
          Skipped ({attempt.unattemptedCount})
        </button>
      </div>

      {/* Question Details List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const userChoice = attempt.userAnswers[q.id];
          const isCorrect = userChoice === q.correctOptionIndex;
          const isSkipped = userChoice === undefined;

          return (
            <div
              key={q.id}
              className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span 
                    className="font-bold px-2 py-0.5 rounded text-[10px] font-mono uppercase"
                    style={{ 
                      backgroundColor: `${SUBJECT_INFO[q.subject]?.color || '#0ea5e9'}20`,
                      color: SUBJECT_INFO[q.subject]?.color || '#0ea5e9'
                    }}
                  >
                    {SUBJECT_INFO[q.subject]?.name || q.subject}
                  </span>
                  <span className="text-slate-400 font-medium">{q.unit}</span>
                </div>

                <div className="flex items-center gap-2">
                  {isCorrect && (
                    <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <Check className="w-3 h-3" /> +1.0 Mark
                    </span>
                  )}
                  {!isCorrect && !isSkipped && (
                    <span className="bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <X className="w-3 h-3" /> -0.25 Penalty
                    </span>
                  )}
                  {isSkipped && (
                    <span className="bg-slate-800 text-slate-400 font-semibold px-2 py-0.5 rounded">
                      0.0 Skipped
                    </span>
                  )}
                </div>
              </div>

              {/* Stem */}
              <h4 className="text-base font-semibold text-white leading-relaxed">
                <span className="text-teal-400 font-mono mr-2">{idx + 1}.</span>
                {q.questionText}
              </h4>

              {/* Options */}
              <div className="space-y-2">
                {[
                  { label: 'A', text: q.optionA, index: 0 },
                  { label: 'B', text: q.optionB, index: 1 },
                  { label: 'C', text: q.optionC, index: 2 },
                  { label: 'D', text: q.optionD, index: 3 }
                ].map(opt => {
                  const isCorrectAnswer = opt.index === q.correctOptionIndex;
                  const isUserSelection = userChoice === opt.index;

                  let optClass = 'bg-slate-800/40 border-slate-800 text-slate-300';
                  if (isCorrectAnswer) {
                    optClass = 'bg-emerald-500/15 border-emerald-500 text-emerald-200 font-semibold';
                  } else if (isUserSelection) {
                    optClass = 'bg-rose-500/15 border-rose-500 text-rose-200 line-through';
                  }

                  return (
                    <div
                      key={opt.label}
                      className={`p-3 rounded-lg border flex items-center justify-between text-xs sm:text-sm ${optClass}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold font-mono">{opt.label}.</span>
                        <span>{opt.text}</span>
                      </div>

                      {isCorrectAnswer && (
                        <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Correct Answer
                        </span>
                      )}
                      {isUserSelection && !isCorrectAnswer && (
                        <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1">
                          <X className="w-3.5 h-3.5" /> Your Choice
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanation Box */}
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  Key Medical Concept & Explanation
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {q.explanation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
