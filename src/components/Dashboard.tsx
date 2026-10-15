import React, { useState } from 'react';
import { 
  Play, 
  Flame, 
  Timer, 
  Award, 
  ArrowRight, 
  AlertTriangle, 
  Sparkles, 
  TrendingUp, 
  Trophy, 
  RefreshCw, 
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { ExamAttempt, Question, SubjectType } from '../types';
import { SUBJECT_INFO, BIG_PRIORITY_LIST } from '../data/syllabus';
import { MOCK_TESTS_METADATA, getMockTestQuestions } from '../data/mockTestsData';
import { FestiveBanner } from './FestiveBanner';

interface DashboardProps {
  onStartExam: (config: {
    title: string;
    type: 'FULL_200' | 'SUBJECT' | 'UNIT' | 'HIGH_YIELD';
    questions?: Question[];
    subjectFilter?: SubjectType;
    unitFilter?: string;
    questionCount?: number;
    durationMinutes?: number;
    isInstantFeedback?: boolean;
    onlyHighYield?: boolean;
  }) => void;
  onRequestDailyMock: () => void;
  onOpenReview: (attempt: ExamAttempt) => void;
  onNavigateTab: (tab: 'mocks' | 'leaderboard' | 'practice' | 'syllabus' | 'analytics' | 'import') => void;
  allQuestions: Question[];
  examAttempts: ExamAttempt[];
  dailyMockVersion?: number;
  onUpdateDailyQuestions?: () => void;
  isFestiveMode?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onStartExam,
  onRequestDailyMock,
  onOpenReview,
  onNavigateTab,
  allQuestions,
  examAttempts,
  dailyMockVersion = 1,
  onUpdateDailyQuestions,
  isFestiveMode = true
}) => {
  const [showUpdatedToast, setShowUpdatedToast] = useState(false);
  const totalAttempts = examAttempts.length;
  const totalQsAnswered = examAttempts.reduce((acc, a) => acc + a.attemptedCount, 0);
  const avgScore = totalAttempts > 0 
    ? (examAttempts.reduce((acc, a) => acc + a.score, 0) / totalAttempts) 
    : 0;
  const totalNegativePenalty = examAttempts.reduce((acc, a) => acc + a.negativePenalty, 0);

  // Festive highlighted mocks (CEE past paper + NAME/Vibrant high-efficiency CBT tests)
  const festiveHighlightMocks = [
    { mockNum: 1, label: '🌾 Dashain Pick', sub: 'CEE 2024 Past Paper', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { mockNum: 11, label: '🪔 Tihar CBT', sub: 'NAME Online Mega Mock', color: 'text-orange-400 border-orange-500/30 bg-orange-500/10' },
    { mockNum: 12, label: '🪔 Deepawali Ultra', sub: 'Vibrant Online MBBS CBT', color: 'text-red-400 border-red-500/30 bg-red-500/10' },
    { mockNum: 2, label: '☀️ Chhath Special', sub: 'CEE 2023 Past Paper', color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Festive Banner (Dashain, Tihar, Diwali, Chhath) */}
      {isFestiveMode && (
        <FestiveBanner
          onStartExam={onRequestDailyMock}
          onExploreMocks={() => onNavigateTab('mocks')}
        />
      )}

      {/* Hero Grand Mock 200 Card - Minimal & Animated */}
      <div className={`relative overflow-hidden rounded-2xl minimal-card p-6 sm:p-8 fade-in-up border transition-all ${
        isFestiveMode 
          ? 'border-amber-500/30 shadow-xl shadow-amber-950/10' 
          : 'border-white/[0.08]'
      }`}>
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                isFestiveMode 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
                  : 'bg-teal-500/10 border-teal-500/30 text-teal-300'
              }`}>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-sparkle" />
                <span>Official 2027 MECEE-BL Examination Model</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                🎯 Paper Set #{dailyMockVersion}
              </div>

              <button
                onClick={() => {
                  onUpdateDailyQuestions?.();
                  setShowUpdatedToast(true);
                  setTimeout(() => setShowUpdatedToast(false), 3500);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-amber-300 border border-white/[0.08] text-xs font-medium transition-all active:scale-95"
                title="Generate fresh, newly shuffled 200 questions for today's daily mock"
              >
                <RefreshCw className="w-3 h-3 text-amber-400 hover:rotate-180 transition-transform duration-500" />
                Quick Shuffle
              </button>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Today's MECEE Daily Mock Test (200 Marks)
            </h1>

            {showUpdatedToast && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Daily Test Mock questions updated! 200 fresh high-yield questions loaded for Paper Set #{dailyMockVersion}.</span>
              </div>
            )}
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Official Medical Education Commission daily simulation with live leaderboard rankings: <span className="text-rose-400 font-medium">Zoology (40)</span>, <span className="text-emerald-400 font-medium">Botany (40)</span>, <span className="text-purple-400 font-medium">Chemistry (50)</span>, <span className="text-sky-400 font-medium">Physics (50)</span>, and <span className="text-amber-400 font-medium">MAT (20)</span>. Real +1.0 / -0.25 negative scoring.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1 rounded-lg border border-white/[0.06]">
                <Timer className="w-3.5 h-3.5 text-amber-400" />
                180 Minutes (3 Hours)
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1 rounded-lg border border-white/[0.06]">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                200 Questions / 200 Marks
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1 rounded-lg border border-white/[0.06] text-rose-300">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                -0.25 Negative Marking
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 min-w-[210px] shrink-0">
            <button
              onClick={onRequestDailyMock}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all hover:-translate-y-0.5 active:scale-95 ${
                isFestiveMode
                  ? 'bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 hover:opacity-95 text-slate-950 shadow-amber-500/20'
                  : 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              Start Daily Mock (200 Qs)
            </button>

            <button
              onClick={() => onNavigateTab('leaderboard')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 font-semibold text-xs border border-amber-500/30 transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              Daily Leaderboard & Ranks
            </button>

            <button
              onClick={() => onNavigateTab('mocks')}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/60 text-slate-300 font-medium text-xs border border-white/[0.06] transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Browse 50 Full Mocks Series
            </button>
          </div>
        </div>
      </div>

      {/* 4 Minimal Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="minimal-card-interactive p-4 rounded-xl fade-in-up delay-50">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-medium">
            <span>Tests Completed</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-white tracking-tight">{totalAttempts}</p>
          <span className="text-[11px] text-slate-500">{totalQsAnswered} questions solved</span>
        </div>

        <div className="minimal-card-interactive p-4 rounded-xl fade-in-up delay-100">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-medium">
            <span>Average Score</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-white tracking-tight">{avgScore.toFixed(1)}</p>
          <span className="text-[11px] text-slate-500">Across all mock tests</span>
        </div>

        <div className="minimal-card-interactive p-4 rounded-xl fade-in-up delay-150">
          <div className="flex items-center justify-between text-rose-400 text-xs mb-1 font-medium">
            <span>Penalty Lost</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl font-extrabold text-rose-400 tracking-tight">-{totalNegativePenalty.toFixed(2)}</p>
          <span className="text-[11px] text-slate-500">From wrong answers (-0.25)</span>
        </div>

        <div className="minimal-card-interactive p-4 rounded-xl fade-in-up delay-200">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-medium">
            <span>Question Bank</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-extrabold text-white tracking-tight">{allQuestions.length}</p>
          <span className="text-[11px] text-amber-400 font-semibold cursor-pointer hover:underline" onClick={() => onNavigateTab('import')}>
            + Extract more from PDF
          </span>
        </div>
      </div>

      {/* Festive Season Special Highlights (Dashain, Tihar, Chhath) */}
      {isFestiveMode && (
        <div className="space-y-3.5 fade-in-up delay-150">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🪔</span>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Festive Season High-Efficiency Picks</span>
                  <span className="bg-red-500/10 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                    Dashain • Tihar • Chhath
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Recommended full CBT mocks for holiday practice — real CEE past papers & NAME/Vibrant CBT series.
                </p>
              </div>
            </div>
            <button 
              onClick={() => onNavigateTab('mocks')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 shrink-0"
            >
              See All 50 <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {festiveHighlightMocks.map((item, idx) => {
              const mock = MOCK_TESTS_METADATA.find(m => m.mockNumber === item.mockNum);
              if (!mock) return null;

              return (
                <div 
                  key={mock.id}
                  className={`minimal-card-interactive p-4 rounded-xl flex flex-col justify-between space-y-3 fade-in-up delay-${(idx + 1) * 50}`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.color}`}>
                        {item.label}
                      </span>
                      <span className="text-[10px] text-amber-300 font-mono">Mock #{mock.mockNumber}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {mock.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {mock.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">{item.sub}</span>
                    <button
                      onClick={() => {
                        const qs = getMockTestQuestions(mock.mockNumber, allQuestions);
                        onStartExam({
                          title: mock.title,
                          type: 'FULL_200',
                          questions: qs,
                          durationMinutes: 180,
                          isInstantFeedback: false
                        });
                      }}
                      className="px-3 py-1 rounded-lg bg-amber-500/15 hover:bg-gradient-to-r hover:from-red-600 hover:to-amber-500 hover:text-slate-950 text-amber-300 font-bold text-xs transition-all flex items-center gap-1 active:scale-95"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      Take Mock
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 50 Full-Length Mock Test Series Preview */}
      <div className="space-y-3.5 fade-in-up delay-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold text-white">50 Full-Length MECEE Mock Tests Series</h2>
            <span className="bg-amber-500/10 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
              50 Real Exams
            </span>
          </div>
          <button 
            onClick={() => onNavigateTab('mocks')}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
          >
            View All 50 Mocks <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {MOCK_TESTS_METADATA.slice(0, 4).map((mock) => (
            <div 
              key={mock.id}
              className="minimal-card-interactive p-4 rounded-xl flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    MOCK #{String(mock.mockNumber).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{mock.difficulty}</span>
                </div>
                <h4 className="text-sm font-bold text-white line-clamp-1">{mock.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">{mock.description}</p>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">200 Qs • 3h</span>
                <button
                  onClick={() => {
                    const qs = getMockTestQuestions(mock.mockNumber, allQuestions);
                    onStartExam({
                      title: mock.title,
                      type: 'FULL_200',
                      questions: qs,
                      durationMinutes: 180,
                      isInstantFeedback: false
                    });
                  }}
                  className="px-2.5 py-1 rounded-lg bg-teal-500/10 hover:bg-teal-500 hover:text-slate-950 text-teal-400 font-bold text-xs transition-colors flex items-center gap-1 active:scale-95"
                >
                  <Play className="w-3 h-3 fill-current" />
                  Launch
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The Big Priority List Section */}
      <div className="space-y-3.5 fade-in-up delay-250">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500 animate-pulse-subtle" />
            <h2 className="text-base sm:text-lg font-bold text-white">The Big Priority 2027 Units</h2>
            <span className="bg-orange-500/10 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-500/30">
              70%+ of Exam
            </span>
          </div>
          <button 
            onClick={() => onNavigateTab('syllabus')}
            className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
          >
            Full Weightage <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {BIG_PRIORITY_LIST.slice(0, 6).map((item, idx) => {
            const qCount = allQuestions.filter(q => q.unit.toLowerCase() === item.name.toLowerCase()).length;
            const pyqCount = allQuestions.filter(q => q.unit.toLowerCase() === item.name.toLowerCase() && (q.sourceType === 'PYQ' || q.year)).length;

            return (
              <div 
                key={item.name}
                className="minimal-card-interactive p-3.5 rounded-xl flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400 font-mono">#{idx + 1}</span>
                    <span className="text-[11px] font-bold px-2 py-0.2 rounded bg-slate-800 text-slate-300 border border-white/[0.06]">
                      {item.marks} Marks
                    </span>
                    <span className="text-[10px] text-amber-400 font-mono font-semibold">
                      {qCount} Qs ({pyqCount} PYQs)
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h3>
                </div>

                <button
                  onClick={() => onStartExam({
                    title: `${item.name} Priority Test (${qCount} Qs)`,
                    type: 'UNIT',
                    unitFilter: item.name,
                    questionCount: qCount,
                    durationMinutes: Math.max(30, Math.round(qCount * 1.1)),
                    isInstantFeedback: true
                  })}
                  className="p-2 rounded-lg bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-slate-950 transition-all active:scale-95"
                  title={`Practice ${item.name} (${qCount} Questions with Exam Years)`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Categorized Subjects Grid */}
      <div className="space-y-3.5 fade-in-up delay-300">
        <h2 className="text-base sm:text-lg font-bold text-white">Categorized Subjects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {(Object.keys(SUBJECT_INFO) as SubjectType[]).map((subjKey) => {
            const info = SUBJECT_INFO[subjKey];
            const qCount = allQuestions.filter(q => q.subject === subjKey).length;
            
            return (
              <div 
                key={subjKey}
                className="minimal-card p-4 rounded-xl space-y-3 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: info.color }}
                    />
                    <h3 className="font-bold text-white text-sm sm:text-base">{info.name}</h3>
                  </div>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/[0.06]">
                    {info.marks} Marks
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Available Qs</span>
                    <span className="font-mono text-white">{qCount}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Weightage</span>
                    <span className="font-mono text-teal-400 font-semibold">{`${((info.marks / 200) * 100).toFixed(0)}% (${info.marks} Marks)`}</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center gap-2">
                  <button
                    onClick={() => onStartExam({
                      title: `${info.name} Subject Test`,
                      type: 'SUBJECT',
                      subjectFilter: subjKey,
                      questionCount: info.marks,
                      durationMinutes: Math.round(info.marks * 0.9)
                    })}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    Test ({info.marks} Qs)
                  </button>
                  <button
                    onClick={() => onNavigateTab('practice')}
                    className="py-1.5 px-3 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 text-xs font-semibold transition-colors active:scale-95"
                  >
                    Units
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
