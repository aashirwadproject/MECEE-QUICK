import React, { useState } from 'react';
import { 
  Award, 
  Timer, 
  Flame, 
  Search, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  Eye, 
  BookOpen, 
  Sparkles, 
  ArrowLeft,
  Building2,
  Calendar,
  AlertTriangle
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
    // Generate the exact 200 questions for this mock
    const questionsForThisMock = getMockTestQuestions(mock.mockNumber, allQuestions);

    onStartExam({
      title: mock.title,
      type: 'FULL_200',
      questions: questionsForThisMock,
      durationMinutes: 180,
      isInstantFeedback: false
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 border border-teal-500/30 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Complete Series of 50 Grand Tests
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              50 Full-Length MECEE Mock Tests
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Experience the full 200-question, 3-hour examination pressure with 50 unique full-length mock papers.
              Sourced from official MEC models, IOM past questions, BPKIHS, KU, and premiere institute test series
              (NAME, Vibrant, Meditech, Apex, Orbit).
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700">
                <Timer className="w-3.5 h-3.5 text-teal-400" />
                180 Minutes (3 Hours)
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                200 Questions / 200 Marks
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700 text-rose-300">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                -0.25 Negative Marking
              </span>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-xl flex flex-col gap-3 min-w-[240px]">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Your Progress</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-teal-400">{attemptedCount}</span>
              <span className="text-slate-400 text-sm">/ {totalMocks} Completed</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-teal-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${(attemptedCount / totalMocks) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500">
              {totalMocks - attemptedCount} full mock tests remaining to master
            </p>
          </div>
        </div>
      </div>

      {/* Navigation & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by mock number, institute, topic (e.g. Mock 12, IOM, NAME)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filterCategory === 'ALL'
                ? 'bg-teal-500 text-slate-950'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All (50)
          </button>
          <button
            onClick={() => setFilterCategory('CEE_PAST')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filterCategory === 'CEE_PAST'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-300'
            }`}
          >
            CEE Past Papers (2020-2024 & IOM)
          </button>
          <button
            onClick={() => setFilterCategory('ONLINE_MOCKS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filterCategory === 'ONLINE_MOCKS'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300'
            }`}
          >
            Online High-Efficiency Mocks
          </button>
          <button
            onClick={() => setFilterCategory('INSTITUTE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filterCategory === 'INSTITUTE'
                ? 'bg-teal-500 text-slate-950'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Institutes (NAME/Vibrant)
          </button>
          <button
            onClick={() => setFilterCategory('ATTEMPTED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filterCategory === 'ATTEMPTED'
                ? 'bg-teal-500 text-slate-950'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Attempted ({attemptedCount})
          </button>
          <button
            onClick={() => setFilterCategory('UNATTEMPTED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filterCategory === 'UNATTEMPTED'
                ? 'bg-teal-500 text-slate-950'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Unattempted ({totalMocks - attemptedCount})
          </button>
        </div>
      </div>

      {/* Grid of 50 Mocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMocks.map((mock) => {
          const attempt = attemptedMap[mock.mockNumber];
          const hasAttempted = !!attempt;
          const isCeePast = mock.series.toLowerCase().includes('past') || mock.tags.some(t => t.toLowerCase().includes('past') || t.toLowerCase().includes('2024') || t.toLowerCase().includes('2023') || t.toLowerCase().includes('2022'));
          const isOnlineCbt = mock.series.toLowerCase().includes('online') || mock.tags.some(t => t.toLowerCase().includes('online') || t.toLowerCase().includes('cbt') || t.toLowerCase().includes('high-efficiency'));

          return (
            <div
              key={mock.id}
              className={`bg-slate-900/90 border rounded-xl p-5 flex flex-col justify-between space-y-4 transition-all hover:shadow-lg ${
                hasAttempted 
                  ? 'border-teal-500/40 hover:border-teal-400' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                {/* Header Badges */}
                <div className="flex items-center justify-between gap-1 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono font-bold text-xs">
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
                      <span className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-[10px]">
                        CEE Past Paper
                      </span>
                    )}
                    {isOnlineCbt && !isCeePast && mock.mockNumber !== 11 && mock.mockNumber !== 12 && (
                      <span className="px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold text-[10px]">
                        Online High-Efficiency
                      </span>
                    )}
                  </div>

                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    mock.difficulty === 'Challenging' 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : mock.difficulty === 'Past Paper Standard'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {mock.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white line-clamp-2 leading-snug">
                  {mock.title}
                </h3>

                {/* Source */}
                <div className="flex items-start gap-1.5 text-xs text-slate-400">
                  <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{mock.source}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {mock.description}
                </p>

                {/* Marks Breakdown Pill */}
                <div className="bg-slate-950/70 border border-slate-800/80 p-2.5 rounded-lg flex items-center justify-between text-[11px] font-mono">
                  <span className="text-rose-400 font-semibold">Zoo 40</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-emerald-400 font-semibold">Bot 40</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-purple-400 font-semibold">Chem 50</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-sky-400 font-semibold">Phys 50</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-amber-400 font-semibold">MAT 20</span>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 space-y-3">
                {hasAttempted && (
                  <div className="flex items-center justify-between text-xs bg-teal-500/10 border border-teal-500/20 px-3 py-1.5 rounded-lg">
                    <span className="text-teal-300 font-medium">Last Score:</span>
                    <span className="font-bold text-white">
                      {attempt.score.toFixed(2)} / 200 ({attempt.accuracyPercentage.toFixed(1)}% Acc)
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLaunchMock(mock)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
                  >
                    {hasAttempted ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5" />
                        Retake Test
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Start 3h Mock
                      </>
                    )}
                  </button>

                  {hasAttempted && (
                    <button
                      onClick={() => onOpenReview(attempt)}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
                      title="Review Answers & Solutions"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMocks.length === 0 && (
        <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Mock Tests Match Your Query</h3>
          <p className="text-xs text-slate-400">Try clearing your search keyword or switching the filter tab.</p>
          <button
            onClick={() => { setSearchQuery(''); setFilterCategory('ALL'); }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-400 text-xs font-semibold rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
