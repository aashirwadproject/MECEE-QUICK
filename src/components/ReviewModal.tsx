import React, { useState, useMemo } from 'react';
import { 
  Check, 
  X, 
  AlertTriangle, 
  Lightbulb, 
  ArrowLeft, 
  RotateCcw,
  Printer,
  Award,
  TrendingUp,
  Clock,
  Target,
  BookOpen,
  Zap,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Search,
  FileText,
  CheckCircle2,
  BarChart2,
  Layers,
  Flame
} from 'lucide-react';
import { ExamAttempt, SubjectType, Question } from '../types';
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
  const [activeTab, setActiveTab] = useState<'ANALYTICS' | 'QUESTIONS'>('ANALYTICS');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'INCORRECT' | 'CORRECT' | 'SKIPPED'>('ALL');
  const [subjectFilter, setSubjectFilter] = useState<SubjectType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedSet, setBookmarkedSet] = useState<Set<string>>(() => {
    const set = new Set<string>();
    attempt.questionsSnapshot?.forEach(q => {
      if (q.isBookmarked) set.add(q.id);
    });
    return set;
  });

  const questions = attempt.questionsSnapshot || [];
  const minutesSpent = Math.max(1, Math.round(attempt.timeSpentSeconds / 60));
  const avgSecondsPerQ = attempt.attemptedCount > 0 
    ? Math.round(attempt.timeSpentSeconds / attempt.attemptedCount) 
    : 0;

  // 1. Subject-Wise Breakdown
  const subjectBreakdown = useMemo(() => {
    const list: Array<{
      subject: SubjectType;
      name: string;
      color: string;
      total: number;
      attempted: number;
      correct: number;
      incorrect: number;
      unattempted: number;
      penalty: number;
      score: number;
      accuracy: number;
    }> = [];

    (Object.keys(SUBJECT_INFO) as SubjectType[]).forEach(subj => {
      const qList = questions.filter(q => q.subject === subj);
      if (qList.length === 0) return;

      let c = 0, inc = 0, un = 0;
      qList.forEach(q => {
        const userAns = attempt.userAnswers[q.id];
        if (userAns === undefined) un++;
        else if (userAns === q.correctOptionIndex) c++;
        else inc++;
      });

      const att = c + inc;
      const penalty = inc * 0.25;
      const score = Math.max(0, c * 1.0 - penalty);
      const acc = att > 0 ? (c / att) * 100 : 0;

      list.push({
        subject: subj,
        name: SUBJECT_INFO[subj].name,
        color: SUBJECT_INFO[subj].color,
        total: qList.length,
        attempted: att,
        correct: c,
        incorrect: inc,
        unattempted: un,
        penalty,
        score,
        accuracy: acc
      });
    });

    return list;
  }, [questions, attempt]);

  // 2. Unit/Chapter Diagnostics (Strengths vs Weaknesses)
  const unitBreakdown = useMemo(() => {
    const map: Record<string, {
      unitName: string;
      subject: SubjectType;
      total: number;
      correct: number;
      incorrect: number;
      unattempted: number;
      accuracy: number;
    }> = {};

    questions.forEach(q => {
      const u = q.unit || 'General';
      if (!map[u]) {
        map[u] = {
          unitName: u,
          subject: q.subject,
          total: 0,
          correct: 0,
          incorrect: 0,
          unattempted: 0,
          accuracy: 0
        };
      }
      map[u].total++;
      const userAns = attempt.userAnswers[q.id];
      if (userAns === undefined) map[u].unattempted++;
      else if (userAns === q.correctOptionIndex) map[u].correct++;
      else map[u].incorrect++;
    });

    return Object.values(map).map(u => {
      const att = u.correct + u.incorrect;
      return {
        ...u,
        accuracy: att > 0 ? (u.correct / att) * 100 : 0
      };
    }).sort((a, b) => b.total - a.total);
  }, [questions, attempt]);

  // 3. Question Provenance Breakdown (PYQs vs QADs)
  const provenanceBreakdown = useMemo(() => {
    let pyqTotal = 0, pyqCorrect = 0, pyqIncorrect = 0;
    let qadTotal = 0, qadCorrect = 0, qadIncorrect = 0;

    questions.forEach(q => {
      const ans = attempt.userAnswers[q.id];
      const isCorrect = ans === q.correctOptionIndex;
      const isIncorrect = ans !== undefined && !isCorrect;

      const isPyq = q.sourceType === 'PYQ' || (q.year && (q.year.includes('CEE') || q.year.includes('IOM') || q.year.includes('BPKIHS') || q.year.includes('KU')));
      if (isPyq) {
        pyqTotal++;
        if (isCorrect) pyqCorrect++;
        else if (isIncorrect) pyqIncorrect++;
      } else {
        qadTotal++;
        if (isCorrect) qadCorrect++;
        else if (isIncorrect) qadIncorrect++;
      }
    });

    const pyqAtt = pyqCorrect + pyqIncorrect;
    const qadAtt = qadCorrect + qadIncorrect;

    return {
      pyq: {
        total: pyqTotal,
        correct: pyqCorrect,
        accuracy: pyqAtt > 0 ? (pyqCorrect / pyqAtt) * 100 : 0
      },
      qad: {
        total: qadTotal,
        correct: qadCorrect,
        accuracy: qadAtt > 0 ? (qadCorrect / qadAtt) * 100 : 0
      }
    };
  }, [questions, attempt]);

  // 4. Merit Rank & Percentile Prediction (Normalized to 200)
  const rankPrediction = useMemo(() => {
    const scaledScore = attempt.maxScore > 0 ? (attempt.score / attempt.maxScore) * 200 : 0;
    if (scaledScore >= 165) {
      return {
        rank: 'Top 1 - 25',
        percentile: '99.8th Percentile',
        status: 'Open Merit Rank 1st Choice (IOM Maharajgunj / BPKIHS Top Merit)',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/30'
      };
    } else if (scaledScore >= 150) {
      return {
        rank: 'Rank 26 - 150',
        percentile: '98.5th Percentile',
        status: 'Open Merit Government Full Scholarship Guaranteed',
        color: 'text-teal-400',
        bg: 'bg-teal-500/10 border-teal-500/30'
      };
    } else if (scaledScore >= 135) {
      return {
        rank: 'Rank 151 - 450',
        percentile: '95.0th Percentile',
        status: 'Likely Government Scholarship / Zonal Merit Seat',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/30'
      };
    } else if (scaledScore >= 115) {
      return {
        rank: 'Rank 451 - 1,200',
        percentile: '89.0th Percentile',
        status: 'Paying Seat Guaranteed (KMC, CMC, NMC, Nepalgunj Medical)',
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10 border-cyan-500/30'
      };
    } else if (scaledScore >= 100) {
      return {
        rank: 'Rank 1,201 - 2,500',
        percentile: '78.0th Percentile',
        status: 'Borderline Paying Merit Eligibility',
        color: 'text-orange-400',
        bg: 'bg-orange-500/10 border-orange-500/30'
      };
    } else {
      return {
        rank: 'Rank 2,501+',
        percentile: '< 50th Percentile',
        status: 'Below Qualifying Cutoff (Minimum 100/200 Required)',
        color: 'text-rose-400',
        bg: 'bg-rose-500/10 border-rose-500/30'
      };
    }
  }, [attempt]);

  // 5. Filtered Questions for Question-by-Question review
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const selected = attempt.userAnswers[q.id];
      const isCorrect = selected === q.correctOptionIndex;
      const isSkipped = selected === undefined;

      // Status filter
      if (statusFilter === 'INCORRECT' && (isSkipped || isCorrect)) return false;
      if (statusFilter === 'CORRECT' && !isCorrect) return false;
      if (statusFilter === 'SKIPPED' && !isSkipped) return false;

      // Subject filter
      if (subjectFilter !== 'ALL' && q.subject !== subjectFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const qText = q.questionText.toLowerCase();
        const expl = q.explanation.toLowerCase();
        const search = searchQuery.toLowerCase();
        if (!qText.includes(search) && !expl.includes(search) && !q.unit.toLowerCase().includes(search)) {
          return false;
        }
      }

      return true;
    });
  }, [questions, attempt, statusFilter, subjectFilter, searchQuery]);

  const handleToggleBookmarkItem = (questionId: string) => {
    const isNow = onToggleBookmark(questionId);
    setBookmarkedSet(prev => {
      const next = new Set(prev);
      if (isNow) next.add(questionId);
      else next.delete(questionId);
      return next;
    });
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-20 print:p-0 print:space-y-4">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 fade-in-up print:hidden">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-white/[0.08] transition-all hover:-translate-y-0.5 active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrintReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-white/[0.08] transition-all hover:-translate-y-0.5 active:scale-95"
            title="Print or Save PDF Detailed Report"
          >
            <Printer className="w-3.5 h-3.5 text-teal-400" />
            Print Report
          </button>

          <button
            onClick={onRetake}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 hover:opacity-95 text-slate-950 text-xs font-bold shadow-sm transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Retake Test
          </button>
        </div>
      </div>

      {/* Main Scorecard Hero Card */}
      <div className="minimal-card p-6 sm:p-8 rounded-2xl space-y-6 shadow-xl border border-white/[0.08] fade-in-up delay-50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/[0.06] pb-6">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                Detailed Result & Diagnostic Card
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {minutesSpent} mins used ({avgSecondsPerQ}s/Q)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {attempt.examTitle}
            </h1>
            <p className="text-xs text-slate-400">
              Exam submitted on {new Date(attempt.timestamp).toLocaleDateString()} at {new Date(attempt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Total Questions: {attempt.totalQuestions}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 self-start lg:self-center">
            {/* Final Score */}
            <div className="text-left sm:text-right">
              <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">NET SCORE</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-amber-300 font-mono">
                  {attempt.score.toFixed(2)}
                </span>
                <span className="text-xs text-slate-500 font-mono">/ {attempt.maxScore}</span>
              </div>
            </div>

            {/* Accuracy */}
            <div className="text-left sm:text-right pl-4 sm:pl-6 border-l border-white/[0.08]">
              <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">ACCURACY</span>
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                {attempt.accuracyPercentage.toFixed(1)}%
              </span>
            </div>

            {/* Estimated CEE Rank */}
            <div className="text-left sm:text-right pl-4 sm:pl-6 border-l border-white/[0.08]">
              <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">EST. CEE RANK</span>
              <span className={`text-lg sm:text-xl font-extrabold font-mono ${rankPrediction.color}`}>
                {rankPrediction.rank}
              </span>
            </div>
          </div>
        </div>

        {/* Merit & Scholarship Prediction Banner */}
        <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${rankPrediction.bg}`}>
          <div className="flex items-center gap-3">
            <Award className={`w-5 h-5 shrink-0 ${rankPrediction.color}`} />
            <div>
              <span className="text-xs font-bold text-white block">
                {rankPrediction.status}
              </span>
              <span className="text-[11px] text-slate-300 font-normal">
                Based on MECEE-BL past official cutoff marks distributions (CEE 2024-2021 cohort benchmark).
              </span>
            </div>
          </div>

          <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/[0.08] ${rankPrediction.color} self-start sm:self-center shrink-0`}>
            {rankPrediction.percentile}
          </span>
        </div>

        {/* 4 Primary Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="minimal-card p-3 rounded-xl border border-emerald-500/20">
            <span className="text-[11px] text-emerald-400 font-bold block mb-0.5">Correct (+1.0)</span>
            <span className="text-xl sm:text-2xl font-extrabold text-emerald-300 font-mono">{attempt.correctCount}</span>
            <span className="text-[10px] text-slate-500 block">+{attempt.correctCount}.00 Marks</span>
          </div>

          <div className="minimal-card p-3 rounded-xl border border-rose-500/20">
            <span className="text-[11px] text-rose-400 font-bold block mb-0.5">Incorrect (-0.25)</span>
            <span className="text-xl sm:text-2xl font-extrabold text-rose-300 font-mono">{attempt.incorrectCount}</span>
            <span className="text-[10px] text-rose-400/80 block">-{attempt.negativePenalty.toFixed(2)} Lost</span>
          </div>

          <div className="minimal-card p-3 rounded-xl">
            <span className="text-[11px] text-slate-400 font-bold block mb-0.5">Skipped (0.0)</span>
            <span className="text-xl sm:text-2xl font-extrabold text-slate-300 font-mono">{attempt.unattemptedCount}</span>
            <span className="text-[10px] text-slate-500 block">0.00 Penalty</span>
          </div>

          <div className="minimal-card p-3 rounded-xl border border-amber-500/20">
            <span className="text-[11px] text-amber-400 font-bold block mb-0.5">Attempt Rate</span>
            <span className="text-xl sm:text-2xl font-extrabold text-amber-300 font-mono">
              {((attempt.attemptedCount / attempt.totalQuestions) * 100).toFixed(0)}%
            </span>
            <span className="text-[10px] text-slate-500 block">{attempt.attemptedCount} / {attempt.totalQuestions} Qs</span>
          </div>
        </div>
      </div>

      {/* Tabs Switcher: Detailed Analytics vs Question Solutions */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 fade-in-up delay-100 print:hidden">
        <button
          onClick={() => setActiveTab('ANALYTICS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'ANALYTICS'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          Detailed Performance Analytics
        </button>

        <button
          onClick={() => setActiveTab('QUESTIONS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'QUESTIONS'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <FileText className="w-4 h-4" />
          Question-by-Question Solutions ({questions.length})
        </button>
      </div>

      {/* VIEW 1: DETAILED PERFORMANCE ANALYTICS */}
      {activeTab === 'ANALYTICS' && (
        <div className="space-y-6 fade-in-up">
          {/* Section 1: Subject-Wise Breakdown Table */}
          <div className="minimal-card rounded-2xl p-6 space-y-4 border border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <h2 className="text-base sm:text-lg font-bold text-white">Subject-Wise Detailed Breakdown</h2>
              </div>
              <span className="text-xs text-slate-400">Total Marks Scored per Subject</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.08] text-slate-400 uppercase font-mono text-[11px]">
                    <th className="py-2.5 font-bold">Subject</th>
                    <th className="py-2.5 font-bold text-center">Questions</th>
                    <th className="py-2.5 font-bold text-center text-emerald-400">Correct (+1)</th>
                    <th className="py-2.5 font-bold text-center text-rose-400">Incorrect (-0.25)</th>
                    <th className="py-2.5 font-bold text-center">Skipped</th>
                    <th className="py-2.5 font-bold text-center text-amber-300">Accuracy</th>
                    <th className="py-2.5 font-bold text-right text-amber-300">Net Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {subjectBreakdown.map((s) => (
                    <tr key={s.subject} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 font-semibold text-white flex items-center gap-2">
                        <span 
                          className="w-2.5 h-2.5 rounded-full shrink-0" 
                          style={{ backgroundColor: s.color }} 
                        />
                        <span>{s.name}</span>
                      </td>
                      <td className="py-3 text-center text-slate-300 font-mono">{s.total}</td>
                      <td className="py-3 text-center text-emerald-400 font-mono font-bold">+{s.correct}</td>
                      <td className="py-3 text-center text-rose-400 font-mono font-bold">-{s.incorrect}</td>
                      <td className="py-3 text-center text-slate-400 font-mono">{s.unattempted}</td>
                      <td className="py-3 text-center">
                        <span className={`font-mono font-bold ${s.accuracy >= 75 ? 'text-emerald-400' : s.accuracy >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                          {s.accuracy.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 text-right font-mono font-extrabold text-amber-300 text-sm">
                        {s.score.toFixed(2)} / {s.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Visual Subject Accuracy Progress Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/[0.06]">
              {subjectBreakdown.map(s => (
                <div key={s.subject} className="space-y-1 bg-slate-900/40 p-3 rounded-xl border border-white/[0.04]">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-white">{s.name}</span>
                    <span className="font-mono text-slate-300 font-bold">{s.score.toFixed(2)} / {s.total} ({s.accuracy.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-2 rounded-full transition-all duration-700"
                      style={{ 
                        width: `${s.total > 0 ? (s.score / s.total) * 100 : 0}%`,
                        backgroundColor: s.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Priority Units Diagnostic (Strengths & Weaknesses) */}
          <div className="minimal-card rounded-2xl p-6 space-y-4 border border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400 animate-pulse-subtle" />
                <h2 className="text-base sm:text-lg font-bold text-white">Chapter & Unit Diagnostics</h2>
              </div>
              <span className="text-xs text-slate-400">Priority Chapter Mastery</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {unitBreakdown.slice(0, 9).map(u => {
                const isMastered = u.accuracy >= 75;
                const isNeedsWork = u.accuracy < 50;

                return (
                  <div 
                    key={u.unitName}
                    className="p-3.5 rounded-xl bg-slate-900/50 border border-white/[0.05] space-y-2 hover:border-white/[0.1] transition-all"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white truncate max-w-[170px]" title={u.unitName}>
                        {u.unitName}
                      </span>
                      <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                        isMastered ? 'bg-emerald-500/20 text-emerald-300' : isNeedsWork ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {u.accuracy.toFixed(0)}% Acc
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>{u.total} Qs Tested</span>
                      <span className="text-emerald-400">+{u.correct} Correct</span>
                      <span className="text-rose-400">-{u.incorrect} Wrong</span>
                    </div>

                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-1.5 rounded-full ${isMastered ? 'bg-emerald-400' : isNeedsWork ? 'bg-rose-400' : 'bg-amber-400'}`}
                        style={{ width: `${u.accuracy}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Negative Marking Diagnostic & Speed Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Negative Marking Advice */}
            <div className="minimal-card rounded-2xl p-5 space-y-3 border border-rose-500/20">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Negative Marking & Guessing Impact
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                You lost <strong className="text-rose-400 font-mono font-bold">-{attempt.negativePenalty.toFixed(2)} marks</strong> strictly due to wrong guesses.
              </p>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.04] space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Pure Score (No Guessing):</span>
                  <span className="font-mono text-emerald-400 font-bold">+{attempt.correctCount}.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Deduction from {attempt.incorrectCount} Errors:</span>
                  <span className="font-mono text-rose-400 font-bold">-{attempt.negativePenalty.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-white/[0.06] pt-1">
                  <span className="text-white font-bold">Final Net Result:</span>
                  <span className="font-mono text-amber-300 font-bold">{attempt.score.toFixed(2)}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                💡 <em>Rule of Thumb for MECEE:</em> Only guess if you have eliminated at least 2 options (50% probability). Random blind guesses statistically reduce rank!
              </p>
            </div>

            {/* Time & Provenance Mastery */}
            <div className="minimal-card rounded-2xl p-5 space-y-3 border border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Target className="w-4 h-4 text-amber-400" />
                PYQs vs QADs Mastery & Time Pace
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-white/[0.04]">
                  <div>
                    <span className="font-bold text-white block">Past Year Questions (CEE/IOM/BPKIHS)</span>
                    <span className="text-[11px] text-slate-400">{provenanceBreakdown.pyq.total} past exam items in test</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    {provenanceBreakdown.pyq.accuracy.toFixed(0)}% Accuracy
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-white/[0.04]">
                  <div>
                    <span className="font-bold text-white block">Coaching Discussion QADs (NAME/Vibrant)</span>
                    <span className="text-[11px] text-slate-400">{provenanceBreakdown.qad.total} conceptual discussion items</span>
                  </div>
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    {provenanceBreakdown.qad.accuracy.toFixed(0)}% Accuracy
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-white/[0.04]">
                  <div>
                    <span className="font-bold text-white block">Average Speed Pace</span>
                    <span className="text-[11px] text-slate-400">Standard MECEE pace is 54s / question</span>
                  </div>
                  <span className="font-mono font-bold text-teal-400 text-sm">
                    {avgSecondsPerQ}s / Question
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: QUESTION-BY-QUESTION SOLUTIONS */}
      {activeTab === 'QUESTIONS' && (
        <div className="space-y-4 fade-in-up">
          {/* Controls & Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/60 border border-white/[0.06]">
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === 'ALL' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                All ({questions.length})
              </button>

              <button
                onClick={() => setStatusFilter('INCORRECT')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === 'INCORRECT' ? 'bg-rose-500 text-white font-bold' : 'bg-slate-800 text-rose-400 hover:bg-slate-700'
                }`}
              >
                Incorrect ({attempt.incorrectCount})
              </button>

              <button
                onClick={() => setStatusFilter('CORRECT')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === 'CORRECT' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-emerald-400 hover:bg-slate-700'
                }`}
              >
                Correct ({attempt.correctCount})
              </button>

              <button
                onClick={() => setStatusFilter('SKIPPED')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === 'SKIPPED' ? 'bg-slate-700 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                Skipped ({attempt.unattemptedCount})
              </button>
            </div>

            {/* Subject Selector & Search */}
            <div className="flex items-center gap-2">
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value as any)}
                className="bg-slate-800 border border-white/[0.08] text-slate-200 text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-amber-500"
              >
                <option value="ALL">All Subjects</option>
                {subjectBreakdown.map(s => (
                  <option key={s.subject} value={s.subject}>{s.name}</option>
                ))}
              </select>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-800 border border-white/[0.08] text-slate-200 text-xs rounded-lg pl-8 pr-3 py-1.5 outline-none focus:border-amber-500 w-36 sm:w-48"
                />
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-3.5">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12 minimal-card rounded-2xl space-y-2">
                <p className="text-slate-400 text-sm">No questions match the current filter selection.</p>
                <button
                  onClick={() => { setStatusFilter('ALL'); setSubjectFilter('ALL'); setSearchQuery(''); }}
                  className="text-xs text-amber-400 font-bold hover:underline"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredQuestions.map((q, idx) => {
                const userChoice = attempt.userAnswers[q.id];
                const isCorrect = userChoice === q.correctOptionIndex;
                const isSkipped = userChoice === undefined;
                const isBookmarked = bookmarkedSet.has(q.id);

                return (
                  <div
                    key={q.id}
                    className="minimal-card rounded-xl p-5 space-y-3.5 border border-white/[0.06] fade-in-up"
                  >
                    {/* Question Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        <span 
                          className="font-bold px-2.5 py-0.5 rounded text-[10px] font-mono uppercase"
                          style={{ 
                            backgroundColor: `${SUBJECT_INFO[q.subject]?.color || '#0ea5e9'}15`,
                            color: SUBJECT_INFO[q.subject]?.color || '#0ea5e9'
                          }}
                        >
                          {SUBJECT_INFO[q.subject]?.name || q.subject}
                        </span>
                        <span className="text-slate-400 font-medium">{q.unit}</span>
                        {(q.year || q.sourceType) && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold font-mono text-[10px]">
                            📜 {q.year || ''} {q.sourceType ? `(${q.sourceType})` : ''}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleBookmarkItem(q.id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isBookmarked 
                              ? 'bg-amber-500/15 border-amber-500/40 text-amber-300' 
                              : 'bg-slate-800 border-white/[0.06] text-slate-400 hover:text-white'
                          }`}
                          title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                        >
                          {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                        </button>

                        {isCorrect && (
                          <span className="bg-emerald-500/15 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1 text-[11px]">
                            <Check className="w-3 h-3" /> +1.0 Mark
                          </span>
                        )}
                        {!isCorrect && !isSkipped && (
                          <span className="bg-rose-500/15 text-rose-300 font-bold px-2 py-0.5 rounded border border-rose-500/30 flex items-center gap-1 text-[11px]">
                            <X className="w-3 h-3" /> -0.25 Penalty
                          </span>
                        )}
                        {isSkipped && (
                          <span className="bg-slate-800 text-slate-400 font-semibold px-2 py-0.5 rounded text-[11px]">
                            0.0 Skipped
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stem */}
                    <h4 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                      <span className="text-amber-400 font-mono mr-2">{idx + 1}.</span>
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

                        let optClass = 'bg-slate-900/30 border-white/[0.04] text-slate-300';
                        let badgeClass = 'bg-slate-800 text-slate-400';
                        if (isCorrectAnswer) {
                          optClass = 'bg-emerald-500/15 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500/40 font-semibold';
                          badgeClass = 'bg-emerald-500 text-slate-950 font-black';
                        } else if (isUserSelection) {
                          optClass = 'bg-rose-500/15 border-rose-500 text-rose-100 ring-1 ring-rose-500/40 font-semibold';
                          badgeClass = 'bg-rose-500 text-white font-black';
                        }

                        return (
                          <div
                            key={opt.label}
                            className={`p-3 rounded-lg border flex items-center justify-between text-xs sm:text-sm ${optClass}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[11px] ${badgeClass}`}>{opt.label}</span>
                              <span className="leading-relaxed">{opt.text}</span>
                            </div>

                            {isCorrectAnswer && (
                              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1 shrink-0">
                                <Check className="w-3 h-3 text-emerald-400" />
                                {isUserSelection ? 'Correct (+1.0 Mark)' : 'Correct Answer'}
                              </span>
                            )}
                            {isUserSelection && !isCorrectAnswer && (
                              <span className="text-[10px] font-bold text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/40 flex items-center gap-1 shrink-0">
                                <X className="w-3 h-3 text-rose-400" /> Your Choice (-0.25)
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed Medical Rationale & Explanation */}
                    <div className="minimal-card rounded-xl p-3.5 space-y-1 border border-white/[0.06]">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                        Key Medical Concept & Explanation
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
