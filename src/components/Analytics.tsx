import React from 'react';
import { 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  BarChart3, 
  Trash2, 
  Sparkles, 
  Flame,
  Clock,
  ArrowRight
} from 'lucide-react';
import { ExamAttempt, SubjectType } from '../types';
import { SUBJECT_INFO, BIG_PRIORITY_LIST } from '../data/syllabus';

interface AnalyticsProps {
  attempts: ExamAttempt[];
  onOpenReview: (attempt: ExamAttempt) => void;
  onDeleteAttempt: (id: string) => void;
  onClearAll: () => void;
}

export const Analytics: React.FC<AnalyticsProps> = ({
  attempts,
  onOpenReview,
  onDeleteAttempt,
  onClearAll
}) => {
  const totalTests = attempts.length;
  const totalAttemptedQuestions = attempts.reduce((acc, a) => acc + a.attemptedCount, 0);
  const totalCorrect = attempts.reduce((acc, a) => acc + a.correctCount, 0);
  const overallAccuracy = totalAttemptedQuestions > 0 ? (totalCorrect / totalAttemptedQuestions) * 100 : 0;
  const bestScore = attempts.length > 0 ? Math.max(...attempts.map(a => a.score)) : 0;
  const totalPenalty = attempts.reduce((acc, a) => acc + a.negativePenalty, 0);

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header - Minimal & Animated */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 fade-in-up">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-base animate-pulse-subtle">📈</span>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Performance Analytics</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-normal">
            Track your progress across mock tests, negative marks lost, and subject readiness.
          </p>
        </div>

        {attempts.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete all exam history?')) {
                onClearAll();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/30 transition-all active:scale-95 self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear History
          </button>
        )}
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="minimal-card-interactive p-4 rounded-xl space-y-1.5 fade-in-up delay-50">
          <span className="text-xs text-slate-400 font-medium flex items-center justify-between">
            Mock Tests Taken <TrendingUp className="w-4 h-4 text-emerald-400" />
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{totalTests}</p>
          <span className="text-[11px] text-slate-500">{totalAttemptedQuestions} total answered</span>
        </div>

        <div className="minimal-card-interactive p-4 rounded-xl space-y-1.5 fade-in-up delay-100">
          <span className="text-xs text-slate-400 font-medium flex items-center justify-between">
            Best Score <Award className="w-4 h-4 text-amber-400" />
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-300 tracking-tight">{bestScore.toFixed(1)}</p>
          <span className="text-[11px] text-slate-500">Out of 200 marks</span>
        </div>

        <div className="minimal-card-interactive p-4 rounded-xl space-y-1.5 fade-in-up delay-150">
          <span className="text-xs text-slate-400 font-medium flex items-center justify-between">
            Overall Accuracy <BarChart3 className="w-4 h-4 text-emerald-400" />
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-300 tracking-tight">{overallAccuracy.toFixed(1)}%</p>
          <span className="text-[11px] text-slate-500">{totalCorrect} correct answers</span>
        </div>

        <div className="minimal-card-interactive p-4 rounded-xl space-y-1.5 fade-in-up delay-200">
          <span className="text-xs text-rose-300 font-medium flex items-center justify-between">
            Penalty Lost <AlertTriangle className="w-4 h-4 text-rose-400" />
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-rose-400 tracking-tight">-{totalPenalty.toFixed(2)}</p>
          <span className="text-[11px] text-slate-500">From wrong answers (-0.25)</span>
        </div>
      </div>

      {/* Subject Distribution Progress */}
      <div className="minimal-card rounded-2xl p-5 sm:p-6 space-y-4 fade-in-up delay-200 border border-white/[0.08]">
        <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-amber-400" />
          Official Subject Marks Weightage
        </h3>

        <div className="space-y-3.5 pt-1">
          {(Object.keys(SUBJECT_INFO) as SubjectType[]).map((subjKey) => {
            const info = SUBJECT_INFO[subjKey];
            const percent = (info.marks / 200) * 100;

            return (
              <div key={subjKey} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: info.color }}
                    />
                    <span className="font-semibold text-slate-200">{info.name}</span>
                    <span className="text-slate-400">({info.marks} Marks)</span>
                  </div>
                  <span className="font-bold text-white font-mono">{percent}% of Exam</span>
                </div>

                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${percent}%`, backgroundColor: info.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top 12 Priority Units Diagnostic */}
      <div className="minimal-card rounded-2xl p-5 sm:p-6 space-y-4 fade-in-up delay-250 border border-white/[0.08]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400 animate-pulse-subtle" />
            Top 12 High-Yield Priority Units
          </h3>
          <span className="text-xs text-amber-400 font-semibold">Targets 70%+ of Paper</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {BIG_PRIORITY_LIST.map((unit, idx) => (
            <div 
              key={unit.name}
              className="minimal-card p-3 rounded-xl flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-slate-800 text-amber-400 font-mono font-bold text-[11px] flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-medium text-slate-200">{unit.name}</span>
              </div>
              <span className="font-bold text-amber-300 font-mono">{unit.marks}M</span>
            </div>
          ))}
        </div>
      </div>

      {/* Test Records Table / List */}
      <div className="space-y-3.5 fade-in-up delay-300">
        <h3 className="text-base font-bold text-white">Exam Attempt Records</h3>

        {attempts.length === 0 ? (
          <div className="minimal-card rounded-2xl p-8 text-center space-y-2 border border-white/[0.08]">
            <Sparkles className="w-8 h-8 text-slate-600 mx-auto" />
            <h4 className="font-semibold text-slate-300">No Mock Tests Taken Yet</h4>
            <p className="text-xs text-slate-500">
              Complete a full 200-question grand mock or unit sprint to view your history and analytics here.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {attempts.map(attempt => (
              <div
                key={attempt.id}
                className="minimal-card-interactive p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm sm:text-base">{attempt.examTitle}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                      {attempt.score} / {attempt.totalQuestions}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{new Date(attempt.timestamp).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">{attempt.accuracyPercentage.toFixed(0)}% Accuracy</span>
                    <span>•</span>
                    <span className="text-rose-400">-{attempt.negativePenalty.toFixed(2)} Penalty</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => onOpenReview(attempt)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500 hover:text-slate-950 text-amber-300 text-xs font-bold transition-all active:scale-95 flex items-center gap-1"
                  >
                    Review Attempt <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onDeleteAttempt(attempt.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
