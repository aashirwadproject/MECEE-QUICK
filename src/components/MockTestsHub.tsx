import React, { useState } from 'react';
import { 
  Award, 
  Timer, 
  Search, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  Eye, 
  Sparkles, 
  ArrowLeft,
  Building2,
  AlertTriangle,
  X
} from 'lucide-react';
import { ExamAttempt, Question } from '../types';
import { MOCK_TESTS_METADATA, MockTestMeta, getMockTestQuestions } from '../data/mockTestsData';

interface MockTestsHubProps {
  allQuestions: Question[];
  examAttempts: ExamAttempt[];
  onStartExam: (config: {
    title: string;
    type: 'FULL_200' | 'SUBJECT' | 'UNIT' | 'HIGH_YIELD' | 'PRACTICE';
    questions: Question[];
    durationMinutes: number;
    isInstantFeedback?: boolean;
  }) => void;
  onOpenReview: (attempt: ExamAttempt) => void;
  onBack: () => void;
}

export const MockTestsHub: React.FC<MockTestsHubProps> = ({
  allQuestions,
  examAttempts,
  onStartExam,
  onOpenReview,
  onBack
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'CEE_PAST' | 'ONLINE_MOCKS' | 'INSTITUTE' | 'ATTEMPTED' | 'UNATTEMPTED'>('ALL');

  // Map attempted mock exams by title or mock number
  const attemptedMap: Record<number, ExamAttempt> = {};
  examAttempts.forEach(attempt => {
    const match = attempt.examTitle.match(/Mock\s+(\d+)/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (!attemptedMap[num] || attempt.timestamp > attemptedMap[num].timestamp) {
        attemptedMap[num] = attempt;
      }
    }
  });

  const attemptedCount = Object.keys(attemptedMap).length;
  const totalMocks = MOCK_TESTS_METADATA.length; // 50

  const filteredMocks = MOCK_TESTS_METADATA.filter(mock => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = (
        mock.title + ' ' + 
        mock.source + ' ' + 
        mock.description + ' ' + 
        mock.tags.join(' ') + 
        ' mock ' + mock.mockNumber
      ).toLowerCase();
      if (!matchText.includes(q)) return false;
    }

    // Category filter
    const isAttempted = !!attemptedMap[mock.mockNumber];
    if (filterCategory === 'ATTEMPTED' && !isAttempted) return false;
    if (filterCategory === 'UNATTEMPTED' && isAttempted) return false;
    if (filterCategory === 'CEE_PAST') {
      const isPast = mock.series.toLowerCase().includes('past') || 
        mock.tags.some(t => t.toLowerCase().includes('past') || t.toLowerCase().includes('iom') || t.toLowerCase().includes('bpkihs') || t.toLowerCase().includes('ku') || t.toLowerCase().includes('moe') || t.toLowerCase().includes('pahs'));
      if (!isPast) return false;
    }
    if (filterCategory === 'ONLINE_MOCKS') {
      const isOnline = mock.series.toLowerCase().includes('online') || mock.series.toLowerCase().includes('efficient') ||
        mock.tags.some(t => t.toLowerCase().includes('online') || t.toLowerCase().includes('cbt') || t.toLowerCase().includes('high-efficiency'));
      if (!isOnline) return false;
    }
    if (filterCategory === 'INSTITUTE') {
      const isInst = mock.tags.some(t => t.toLowerCase().includes('name') || t.toLowerCase().includes('vibrant') || t.toLowerCase().includes('meditech') || t.toLowerCase().includes('apex') || t.toLowerCase().includes('orbit'));
      if (!isInst) return false;
    }

    return true;
  });

  const handleLaunchMock = (mock: MockTestMeta) => {
    const questionsForThisMock = getMockTestQuestions(mock.mockNumber, allQuestions);
    onStartExam({
      title: mock.title,
      type: 'FULL_200',
      questions: questionsForThisMock,
      durationMinutes: 180,
      isInstantFeedback: false
    });
  };

  const categories = [
    { id: 'ALL' as const, label: 'All 50 Mocks' },
    { id: 'CEE_PAST' as const, label: 'CEE Past Papers (2020-2024)' },
    { id: 'ONLINE_MOCKS' as const, label: 'Online CBT Series' },
    { id: 'INSTITUTE' as const, label: 'Institutes (NAME/Vibrant)' },
    { id: 'ATTEMPTED' as const, label: `Attempted (${attemptedCount})` },
    { id: 'UNATTEMPTED' as const, label: `Unattempted (${totalMocks - attemptedCount})` },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Top Minimal Banner */}
      <div className="relative overflow-hidden rounded-2xl minimal-card p-6 sm:p-8 fade-in-up border border-white/[0.08]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-sparkle" />
              <span>Complete Series of 50 Grand Tests • 10,000 Questions</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              50 Full-Length MECEE Mock Tests
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Official 200-question computer-based testing simulation. Sourced from official CEE models, IOM past papers, BPKIHS, KU, and premiere institute test series (NAME Online, Vibrant MBBS CBT, Meditech, Apex).
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-white/[0.06]">
                <Timer className="w-3.5 h-3.5 text-amber-400" />
                180 Minutes (3 Hours)
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-white/[0.06]">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                200 Questions / 200 Marks
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-white/[0.06] text-rose-300">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                -0.25 Negative Marking
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={onBack}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-white/[0.08] text-xs font-semibold transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Dashboard
            </button>
            <div className="text-center text-xs text-slate-400">
              Progress: <strong className="text-amber-300">{attemptedCount}</strong> / {totalMocks} completed
            </div>
          </div>
        </div>
      </div>

      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 fade-in-up delay-100">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search mock by year, institute, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/60 border border-white/[0.08] focus:border-amber-400/60 rounded-xl pl-9 pr-9 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterCategory === cat.id
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-sm'
                  : 'bg-slate-900/60 border border-white/[0.06] text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 50 Mocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMocks.map((mock, idx) => {
          const attempt = attemptedMap[mock.mockNumber];
          const hasAttempted = !!attempt;
          const isCeePast = mock.series.toLowerCase().includes('past') || mock.tags.some(t => t.toLowerCase().includes('past') || t.toLowerCase().includes('2024') || t.toLowerCase().includes('2023') || t.toLowerCase().includes('2022'));
          const isOnlineCbt = mock.series.toLowerCase().includes('online') || mock.tags.some(t => t.toLowerCase().includes('online') || t.toLowerCase().includes('cbt') || t.toLowerCase().includes('high-efficiency'));

          return (
            <div
              key={mock.id}
              className={`minimal-card-interactive p-4 sm:p-5 rounded-xl flex flex-col justify-between space-y-3.5 fade-in-up delay-${Math.min(idx * 30, 300)} ${
                hasAttempted 
                  ? 'border-emerald-500/30' 
                  : 'hover:border-amber-500/40'
              }`}
            >
              <div className="space-y-2.5">
                {/* Header Badges */}
                <div className="flex items-center justify-between gap-1 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono font-bold text-xs">
                      MOCK #{String(mock.mockNumber).padStart(2, '0')}
                    </span>
                    {mock.mockNumber === 1 && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-[10px] flex items-center gap-1">
                        🌾 Dashain Pick
                      </span>
                    )}
                    {(mock.mockNumber === 11 || mock.mockNumber === 12) && (
                      <span className="px-2 py-0.5 rounded bg-orange-500/20 border border-orange-500/40 text-orange-300 font-bold text-[10px] flex items-center gap-1">
                        🪔 Deepawali CBT
                      </span>
                    )}
                    {mock.mockNumber === 2 && (
                      <span className="px-2 py-0.5 rounded bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 font-bold text-[10px] flex items-center gap-1">
                        ☀️ Chhath Special
                      </span>
                    )}
                    {isCeePast && mock.mockNumber !== 1 && mock.mockNumber !== 2 && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-medium text-[10px]">
                        CEE Past Paper
                      </span>
                    )}
                    {isOnlineCbt && !isCeePast && mock.mockNumber !== 11 && mock.mockNumber !== 12 && (
                      <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-medium text-[10px]">
                        Online CBT
                      </span>
                    )}
                  </div>

                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    mock.difficulty === 'Challenging' 
                      ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                      : mock.difficulty === 'Past Paper Standard'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {mock.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug group-hover:text-amber-200 transition-colors">
                  {mock.title}
                </h3>

                {/* Source */}
                <div className="flex items-start gap-1.5 text-xs text-slate-400">
                  <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{mock.source}</span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {mock.description}
                </p>

                {/* Attempt status if completed */}
                {hasAttempted && (
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Score: {attempt.score} / 200</span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Acc: {attempt.accuracyPercentage.toFixed(0)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400 font-mono">200 Qs • 3h</span>

                <div className="flex items-center gap-2">
                  {hasAttempted ? (
                    <>
                      <button
                        onClick={() => onOpenReview(attempt)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1 active:scale-95"
                      >
                        <Eye className="w-3 h-3" /> Review
                      </button>
                      <button
                        onClick={() => handleLaunchMock(mock)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500 hover:text-slate-950 text-amber-300 text-xs font-bold transition-all flex items-center gap-1 active:scale-95"
                      >
                        <RotateCcw className="w-3 h-3" /> Retake
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleLaunchMock(mock)}
                      className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 hover:opacity-95 text-slate-950 font-bold text-xs transition-all flex items-center gap-1 shadow-sm active:scale-95"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      Launch Exam
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
