import React from 'react';
import { 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  BarChart3, 
  Trash2, 
  ArrowRight,
  Sparkles,
  Flame
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
    <div className="space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Performance Analytics</h1>
          <p className="text-sm text-slate-400">
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/30 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear History
          </button>
        )}
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <span className="text-xs text-slate-400 font-medium flex items-center justify-between">
            Mock Tests Taken <TrendingUp className="w-4 h-4 text-teal-400" />
          </span>
          <p className="text-3xl font-extrabold text-white">{totalTests}</p>
          <span className="text-[11px] text-slate-500">{totalAttemptedQuestions} total answered</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <span className="text-xs text-slate-400 font-medium flex items-center justify-between">
            Best Score <Award className="w-4 h-4 text-amber-400" />
          </span>
          <p className="text-3xl font-extrabold text-white">{bestScore.toFixed(1)}</p>
          <span className="text-[11px] text-slate-500">Out of 200 marks</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <span className="text-xs text-slate-400 font-medium flex items-center justify-between">
            Overall Accuracy <BarChart3 className="w-4 h-4 text-emerald-400" />
          </span>
          <p className="text-3xl font-extrabold text-white">{overallAccuracy.toFixed(1)}%</p>
          <span className="text-[11px] text-slate-500">{totalCorrect} correct answers</span>
        </div>

        <div className="bg-rose-500/10 border border-rose-500/30 p-5 rounded-xl space-y-2">
          <span className="text-xs text-rose-300 font-medium flex items-center justify-between">
            Penalty Lost <AlertTriangle className="w-4 h-4 text-rose-400" />
          </span>
          <p className="text-3xl font-extrabold text-rose-400">-{totalPenalty.toFixed(2)}</p>
          <span className="text-[11px] text-rose-300/80">From negative marking (-0.25)</span>
        </div>
      </div>

      {/* Subject Distribution Progress */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-teal-400" />
          Official Subject Marks Weightage
        </h3>

        <div className="space-y-4 pt-1">
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

                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ width: `${percent}%`, backgroundColor: info.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top 12 Priority Units Diagnostic */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            Top 12 High-Yield Priority Units
          </h3>
          <span className="text-xs text-teal-400 font-semibold">Targets 70%+ of Paper</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {BIG_PRIORITY_LIST.map((unit, idx) => (
            <div 
              key={unit.name}
              className="bg-slate-800/50 border border-slate-700/60 p-3 rounded-xl flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-slate-800 text-teal-400 font-mono font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-medium text-slate-200">{unit.name}</span>
              </div>
              <span className="font-bold text-teal-400 font-mono">{unit.marks}M</span>
            </div>
          ))}
        </div>
      </div>

      {/* Test Records Table / List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">Exam Attempt Records</h3>

        {attempts.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-2">
            <Sparkles className="w-8 h-8 text-slate-600 mx-auto" />
            <h4 className="font-semibold text-slate-300">No Mock Tests Taken Yet</h4>
            <p className="text-xs text-slate-500">
              Complete a full 200-question grand mock or unit sprint to view your history and analytics here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {attempts.map(attempt => (
              <div
                key={attempt.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-sm">{attempt.examTitle}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {new Date(attempt.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {attempt.totalQuestions} Questions • Accuracy: {attempt.accuracyPercentage.toFixed(1)}% • Penalty Lost: -{attempt.negativePenalty.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-base font-extrabold text-teal-400">
                      {attempt.score.toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-500"> / {attempt.maxScore}</span>
                  </div>

                  <button
                    onClick={() => onOpenReview(attempt)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-colors"
                  >
                    Review <ArrowRight className="w-3.5 h-3.5" />
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
