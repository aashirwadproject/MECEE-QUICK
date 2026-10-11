import React, { useState } from 'react';
import { 
  Play, 
  Flame, 
  Timer, 
  Award, 
  ArrowRight, 
  AlertTriangle, 
  FileUp, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Trophy, 
  RefreshCw, 
  CheckCircle2,
  Calendar,
  Zap
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
    { mockNum: 1, label: '🌾 Dashain Top Pick', sub: 'CEE 2024 Past Paper', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { mockNum: 11, label: '🪔 Tihar Lights of Success', sub: 'NAME Online Mega CBT', color: 'text-orange-400 border-orange-500/30 bg-orange-500/10' },
    { mockNum: 12, label: '🪔 Deepawali Ultra Mock', sub: 'Vibrant Online MBBS CBT', color: 'text-red-400 border-red-500/30 bg-red-500/10' },
    { mockNum: 2, label: '☀️ Chhath Arghya Dedicated', sub: 'CEE 2023 Past Paper', color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Festive Banner (Dashain, Tihar, Diwali, Chhath) */}
      {isFestiveMode && (
        <FestiveBanner
          onStartExam={onRequestDailyMock}
          onExploreMocks={() => onNavigateTab('mocks')}
        />
      )}

      {/* Hero Grand Mock 200 Card */}
      <div className={`relative overflow-hidden rounded-2xl border p-6 sm:p-8 shadow-2xl transition-all ${
        isFestiveMode 
          ? 'bg-gradient-to-r from-red-950/60 via-slate-900 to-amber-950/60 border-amber-500/40 festive-card-glow' 
          : 'bg-gradient-to-r from-teal-900/40 via-slate-900 to-indigo-950/40 border-teal-500/30'
      }`}>
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                isFestiveMode 
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' 
                  : 'bg-teal-500/20 border-teal-500/40 text-teal-300'
              }`}>
                <Sparkles className="w-3.5 h-3.5" />
                {isFestiveMode ? '🌸 Official 2027 MECEE-BL Examination Model' : 'Official 2027 MECEE-BL Examination Model'}
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                🎯 Paper Set #{dailyMockVersion}
              </div>

              <button
                onClick={() => {
                  onUpdateDailyQuestions?.();
                  setShowUpdatedToast(true);
                  setTimeout(() => setShowUpdatedToast(false), 3500);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 hover:bg-amber-500/20 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 border border-slate-700 text-xs font-semibold transition-all active:scale-95`}
                title="Generate fresh, newly shuffled 200 questions for today's daily mock"
              >
                <RefreshCw className="w-3 h-3 text-amber-400" />
                Quick Update Questions
              </button>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Today's MECEE Daily Mock Test (200 Marks)
            </h1>

            {showUpdatedToast && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Daily Test Mock questions updated! 200 fresh high-yield questions loaded for Paper Set #{dailyMockVersion}.</span>
              </div>
            )}
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Official Medical Education Commission daily simulation with live leaderboard rankings: <span className="text-rose-400 font-semibold">Zoology (40)</span>, <span className="text-emerald-400 font-semibold">Botany (40)</span>, <span className="text-purple-400 font-semibold">Chemistry (50)</span>, <span className="text-sky-400 font-semibold">Physics (50)</span>, and <span className="text-amber-400 font-semibold">MAT (20)</span>. Real +1.0 / -0.25 negative scoring.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700">
                <Timer className="w-3.5 h-3.5 text-amber-400" />
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

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
            <button
              onClick={onRequestDailyMock}
              className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all hover:scale-[1.02] ${
                isFestiveMode
                  ? 'bg-gradient-to-r from-red-600 via-amber-600 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-slate-950 shadow-amber-500/20'
                  : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 shadow-teal-500/20'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              Start Daily Mock
            </button>

            <button
              onClick={() => onNavigateTab('leaderboard')}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 font-bold text-sm border border-amber-500/40 transition-colors"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              Daily Leaderboard & Ranks
            </button>

            <button
              onClick={() => onNavigateTab('mocks')}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-colors"
            >
              <Award className="w-4 h-4 text-amber-400" />
              Browse 50 Full Mocks Series
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-medium">
            <span>Tests Completed</span>
            <TrendingUp className="w-4 h-4 text-teal-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{totalAttempts}</p>
          <span className="text-[11px] text-slate-500">{totalQsAnswered} questions solved</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-medium">
            <span>Average Score</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{avgScore.toFixed(1)}</p>
          <span className="text-[11px] text-slate-500">Across all mock tests</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-rose-400 text-xs mb-1 font-medium">
            <span>Penalty Lost</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl font-extrabold text-rose-400">-{totalNegativePenalty.toFixed(2)}</p>
          <span className="text-[11px] text-slate-500">From wrong answers (-0.25)</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-medium">
            <span>Question Bank</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{allQuestions.length}</p>
          <span className="text-[11px] text-amber-400 font-semibold cursor-pointer hover:underline" onClick={() => onNavigateTab('import')}>
            + Extract more from PDF
          </span>
        </div>
      </div>

      {/* Festive Season Special Highlights (Dashain, Tihar, Chhath) */}
      {isFestiveMode && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🪔</span>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Festive Season High-Efficiency Picks</span>
                  <span className="bg-gradient-to-r from-red-600/30 to-amber-500/30 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/40">
                    Dashain • Tihar • Chhath
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Top recommended full CBT mocks for holiday practice — featuring real CEE past papers & NAME/Vibrant CBT series.
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
            {festiveHighlightMocks.map((item) => {
              const mock = MOCK_TESTS_METADATA.find(m => m.mockNumber === item.mockNum);
              if (!mock) return null;

              return (
                <div 
                  key={mock.id}
                  className="bg-slate-900/95 border border-amber-500/30 hover:border-amber-400 p-4 rounded-xl flex flex-col justify-between space-y-3 transition-all shadow-md hover:shadow-amber-500/10 group"
                >
                  <div className="space-y-2">
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

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
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
                      className="px-3 py-1 rounded bg-amber-500/20 hover:bg-gradient-to-r hover:from-red-600 hover:to-amber-500 hover:text-slate-950 text-amber-300 font-bold text-xs transition-all flex items-center gap-1"
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

      {/* 50 Full-Length Mock Test Series Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">50 Full-Length MECEE Mock Tests Series</h2>
            <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
              50 Real Exams (10,000 Qs)
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
              className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 p-4 rounded-xl flex flex-col justify-between space-y-3 transition-all"
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

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
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
                  className="px-2.5 py-1 rounded bg-teal-500/10 hover:bg-teal-500 hover:text-slate-950 text-teal-400 font-bold text-xs transition-colors flex items-center gap-1"
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-bold text-white">The Big Priority 2027 Units</h2>
            <span className="bg-orange-500/20 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-500/30">
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
          {BIG_PRIORITY_LIST.slice(0, 6).map((item, idx) => (
            <div 
              key={item.name}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 p-4 rounded-xl flex items-center justify-between group transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-teal-400 font-mono">#{idx + 1}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {item.marks} Marks
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-teal-300 transition-colors">
                  {item.name}
                </h3>
              </div>

              <button
                onClick={() => onStartExam({
                  title: `${item.name} Chapter Test`,
                  type: 'UNIT',
                  unitFilter: item.name,
                  isInstantFeedback: true
                })}
                className="p-2.5 rounded-lg bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-slate-950 transition-colors"
                title="Practice Unit (All Questions)"
              >
                <Play className="w-4 h-4 fill-current" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Categorized Subjects Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Categorized Subjects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(Object.keys(SUBJECT_INFO) as SubjectType[]).map((subjKey) => {
            const info = SUBJECT_INFO[subjKey];
            const qCount = allQuestions.filter(q => q.subject === subjKey).length;
            
            return (
              <div 
                key={subjKey}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-5 rounded-xl space-y-4 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: info.color }}
                    />
                    <h3 className="font-bold text-white text-base">{info.name}</h3>
                  </div>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {info.marks} Marks
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Available Qs</span>
                    <span className="font-mono text-white">{qCount}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Weightage</span>
                    <span className="font-mono text-teal-400 font-semibold">{`${((info.marks / 200) * 100).toFixed(0)}% (${info.marks} Marks)`}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onStartExam({
                      title: `${info.name} Subject Test`,
                      type: 'SUBJECT',
                      subjectFilter: subjKey,
                      questionCount: info.marks,
                      durationMinutes: Math.round(info.marks * 0.9)
                    })}
                    className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    Test ({info.marks} Qs)
                  </button>
                  <button
                    onClick={() => onNavigateTab('practice')}
                    className="py-2 px-3 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 text-xs font-semibold transition-colors"
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
