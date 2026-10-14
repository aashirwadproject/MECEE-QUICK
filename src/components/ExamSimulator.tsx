import React, { useState, useEffect } from 'react';
import { 
  Timer, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  Grid, 
  CheckCircle2, 
  AlertTriangle, 
  Bookmark, 
  BookmarkCheck, 
  RotateCcw,
  Send
} from 'lucide-react';
import { Question, ExamAttempt } from '../types';
import { SUBJECT_INFO } from '../data/syllabus';

interface ExamSimulatorProps {
  title: string;
  examType: 'FULL_200' | 'SUBJECT' | 'UNIT' | 'HIGH_YIELD' | 'PRACTICE';
  questions: Question[];
  totalDurationMinutes: number;
  isInstantFeedback?: boolean;
  onFinishExam: (attempt: ExamAttempt) => void;
  onExitExam: () => void;
  onToggleBookmark: (questionId: string) => boolean;
}

export const ExamSimulator: React.FC<ExamSimulatorProps> = ({
  title,
  examType,
  questions,
  totalDurationMinutes,
  isInstantFeedback = false,
  onFinishExam,
  onExitExam,
  onToggleBookmark
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(totalDurationMinutes * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [bookmarkedSet, setBookmarkedSet] = useState<Set<string>>(
    new Set(questions.filter(q => q.isBookmarked).map(q => q.id))
  );

  // Timer Countdown
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const currentQ = questions[currentIndex] || questions[0];
  const selectedOption = userAnswers[currentQ?.id];
  const isMarked = markedForReview.has(currentQ?.id);
  const isBookmarked = bookmarkedSet.has(currentQ?.id);

  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const handleClearOption = () => {
    setUserAnswers(prev => {
      const next = { ...prev };
      delete next[currentQ.id];
      return next;
    });
  };

  const handleToggleReview = () => {
    setMarkedForReview(prev => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) {
        next.delete(currentQ.id);
      } else {
        next.add(currentQ.id);
      }
      return next;
    });
  };

  const handleBookmark = () => {
    const isNowBookmarked = onToggleBookmark(currentQ.id);
    setBookmarkedSet(prev => {
      const next = new Set(prev);
      if (isNowBookmarked) next.add(currentQ.id);
      else next.delete(currentQ.id);
      return next;
    });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    questions.forEach(q => {
      const userAns = userAnswers[q.id];
      if (userAns === undefined) {
        unattemptedCount++;
      } else if (userAns === q.correctOptionIndex) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const negativePenalty = incorrectCount * 0.25;
    const rawScore = correctCount * 1.0 - negativePenalty;
    const score = Math.max(0, Math.round(rawScore * 100) / 100);
    const attemptedCount = correctCount + incorrectCount;
    const accuracy = attemptedCount > 0 ? (correctCount / attemptedCount) * 100 : 0;
    const timeSpent = Math.max(0, totalDurationMinutes * 60 - timeRemainingSeconds);

    const attempt: ExamAttempt = {
      id: `attempt_${Date.now()}`,
      examTitle: title,
      examType,
      totalQuestions: questions.length,
      attemptedCount,
      correctCount,
      incorrectCount,
      unattemptedCount,
      score,
      maxScore: questions.length,
      negativePenalty,
      accuracyPercentage: accuracy,
      timeSpentSeconds: timeSpent,
      timestamp: Date.now(),
      userAnswers,
      questionsSnapshot: questions
    };

    onFinishExam(attempt);
  };

  // Format Time Remaining
  const hours = Math.floor(timeRemainingSeconds / 3600);
  const minutes = Math.floor((timeRemainingSeconds % 3600) / 60);
  const seconds = timeRemainingSeconds % 60;
  const timeFormatted = hours > 0
    ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isLowTime = timeRemainingSeconds < 300;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* Top Test Header - Minimal & Sticky */}
      <div className="minimal-card p-3.5 sm:p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 sticky top-4 z-30 shadow-xl border border-white/[0.08] fade-in-up">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-white line-clamp-1">{title}</h2>
          <span className="text-xs text-slate-400">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Timer Display */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-bold border transition-colors ${
            isLowTime 
              ? 'bg-rose-500/15 border-rose-500/30 text-rose-400 animate-pulse'
              : 'bg-slate-900/80 border-white/[0.08] text-amber-300'
          }`}>
            <Timer className="w-4 h-4" />
            {timeFormatted}
          </div>

          {/* Palette button */}
          <button
            onClick={() => setShowPalette(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/[0.08] transition-all active:scale-95"
          >
            <Grid className="w-3.5 h-3.5 text-amber-400" />
            Palette
          </button>

          {/* Submit button */}
          <button
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 hover:opacity-95 text-slate-950 text-xs font-extrabold shadow-sm transition-all active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            Finish
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div key={currentIndex} className="minimal-card rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl border border-white/[0.08] fade-in-scale">
        {/* Question Metadata Row */}
        <div className="flex items-center justify-between text-xs border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-2">
            <span 
              className="font-bold px-2.5 py-0.5 rounded text-[11px] font-mono uppercase"
              style={{ 
                backgroundColor: `${SUBJECT_INFO[currentQ.subject]?.color || '#0ea5e9'}15`,
                color: SUBJECT_INFO[currentQ.subject]?.color || '#0ea5e9'
              }}
            >
              {SUBJECT_INFO[currentQ.subject]?.name || currentQ.subject}
            </span>
            <span className="bg-slate-800/80 px-2.5 py-0.5 rounded text-slate-300 font-medium text-[11px]">
              {currentQ.unit}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmark}
              className={`p-1.5 rounded-lg border transition-colors ${
                isBookmarked 
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300' 
                  : 'bg-slate-800 border-white/[0.06] text-slate-400 hover:text-white'
              }`}
              title="Bookmark Question"
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
            <span className="font-mono text-emerald-400 font-bold">+1.0</span>
            <span className="text-slate-600">/</span>
            <span className="font-mono text-rose-400 font-bold">-0.25</span>
          </div>
        </div>

        {/* Question Stem */}
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            <span className="text-amber-400 font-mono mr-2">{currentIndex + 1}.</span>
            {currentQ.questionText}
          </h3>
        </div>

        {/* Options List */}
        <div className="space-y-2.5">
          {[
            { label: 'A', text: currentQ.optionA, index: 0 },
            { label: 'B', text: currentQ.optionB, index: 1 },
            { label: 'C', text: currentQ.optionC, index: 2 },
            { label: 'D', text: currentQ.optionD, index: 3 }
          ].map(opt => {
            const isSelected = selectedOption === opt.index;

            let optionStyle = 'bg-slate-900/40 border-white/[0.06] hover:border-slate-600 text-slate-200';
            let badgeStyle = 'bg-slate-800 text-slate-400';

            if (isSelected) {
              optionStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500/80 font-medium shadow-sm';
              badgeStyle = 'bg-emerald-500 text-slate-950 font-black';
            }

            return (
              <div
                key={opt.label}
                onClick={() => handleSelectOption(opt.index)}
                className={`p-3.5 sm:p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-150 ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-colors shrink-0 ${badgeStyle}`}>
                    {opt.label}
                  </span>
                  <span className="text-xs sm:text-sm font-medium leading-relaxed">{opt.text}</span>
                </div>

                {isSelected && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-[11px] font-bold shrink-0 animate-in fade-in">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Selected
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Minimal Controls */}
      <div className="minimal-card p-3 sm:p-4 rounded-2xl flex items-center justify-between gap-3 shadow-xl border border-white/[0.08] fade-in-up">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-semibold border border-white/[0.06] transition-all active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>

          <button
            onClick={handleToggleReview}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all active:scale-95 ${
              isMarked
                ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                : 'bg-slate-800 hover:bg-slate-700 border-white/[0.06] text-slate-400'
            }`}
          >
            <Flag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mark for Review</span>
          </button>

          {selectedOption !== undefined && (
            <button
              onClick={handleClearOption}
              className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-semibold transition-colors active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>

        <button
          onClick={() => {
            if (currentIndex < questions.length - 1) {
              setCurrentIndex(prev => prev + 1);
            } else {
              setShowSubmitModal(true);
            }
          }}
          className="flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 hover:opacity-95 text-slate-950 text-xs font-bold shadow-sm transition-all active:scale-95"
        >
          {currentIndex < questions.length - 1 ? 'Next' : 'Review & Submit'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Question Palette Modal */}
      {showPalette && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="minimal-card bg-slate-900/95 border border-white/[0.1] rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[85vh] flex flex-col shadow-2xl fade-in-scale">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h3 className="font-extrabold text-white text-base">Question Palette</h3>
              <button onClick={() => setShowPalette(false)} className="text-slate-400 hover:text-white text-sm">✕</button>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Answered</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-500" /> Marked</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-slate-800 border border-slate-700" /> Skipped</span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 overflow-y-auto p-1 flex-1">
              {questions.map((q, idx) => {
                const isAns = userAnswers[q.id] !== undefined;
                const isRev = markedForReview.has(q.id);
                const isCur = idx === currentIndex;

                let boxColor = 'bg-slate-800 text-slate-400 border border-white/[0.06]';
                if (isRev) boxColor = 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold';
                else if (isAns) boxColor = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowPalette(false);
                    }}
                    className={`h-9 rounded-lg text-xs font-mono transition-all flex items-center justify-center ${boxColor} ${
                      isCur ? 'ring-2 ring-amber-400' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowPalette(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
            >
              Resume Test
            </button>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="minimal-card bg-slate-900/95 border border-white/[0.1] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl fade-in-scale">
            <h3 className="font-extrabold text-white text-base">Submit Mock Exam?</h3>

            <div className="bg-slate-800/50 border border-white/[0.06] rounded-xl p-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Total Questions:</span>
                <span className="font-bold text-white">{questions.length}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Answered:</span>
                <span className="font-bold">{Object.keys(userAnswers).length}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Unanswered / Skipped:</span>
                <span className="font-bold">{questions.length - Object.keys(userAnswers).length}</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>Marked for Review:</span>
                <span className="font-bold">{markedForReview.size}</span>
              </div>
              <div className="pt-2 border-t border-white/[0.06] text-[11px] text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                Negative marking: -0.25 will be deducted per wrong answer.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              >
                Continue Test
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 text-slate-950 text-xs font-bold shadow-md hover:opacity-95 transition-opacity"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
