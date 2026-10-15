import React, { useState } from 'react';
import { 
  Play, 
  Flame, 
  Zap, 
  Timer, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { Question, SubjectType } from '../types';
import { SYLLABUS_UNITS, SUBJECT_INFO } from '../data/syllabus';

interface PracticeProps {
  onStartExam: (config: {
    title: string;
    type: 'FULL_200' | 'SUBJECT' | 'UNIT' | 'HIGH_YIELD';
    subjectFilter?: SubjectType;
    unitFilter?: string;
    questionCount?: number;
    durationMinutes: number;
    isInstantFeedback?: boolean;
    onlyHighYield?: boolean;
  }) => void;
  onBack: () => void;
  allQuestions: Question[];
}

export const Practice: React.FC<PracticeProps> = ({
  onStartExam,
  onBack,
  allQuestions
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | 'ALL'>('ALL');
  const [onlyHighYield, setOnlyHighYield] = useState(false);

  const filteredUnits = SYLLABUS_UNITS.filter(unit => {
    if (selectedSubject !== 'ALL' && unit.subject !== selectedSubject) return false;
    if (onlyHighYield && unit.priorityLevel < 4) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header - Minimal & Animated */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 fade-in-up">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-base animate-pulse-subtle">📖</span>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Chapter & Unit Practice</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-normal">
            Practice individual syllabus units with instant rationale or take timed chapter quizzes.
          </p>
        </div>

        <button
          onClick={onBack}
          className="self-start sm:self-center flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-white/[0.08] transition-all hover:-translate-y-0.5 active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 fade-in-up delay-100">
        <button
          onClick={() => setSelectedSubject('ALL')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            selectedSubject === 'ALL'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
              : 'bg-slate-900/60 border border-white/[0.06] text-slate-400 hover:text-white'
          }`}
        >
          All Subjects
        </button>

        {(Object.keys(SUBJECT_INFO) as SubjectType[]).map((subjKey) => (
          <button
            key={subjKey}
            onClick={() => setSelectedSubject(subjKey)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSubject === subjKey
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-900/60 border border-white/[0.06] text-slate-400 hover:text-white'
            }`}
          >
            {SUBJECT_INFO[subjKey].name} ({SUBJECT_INFO[subjKey].marks}M)
          </button>
        ))}

        <div className="h-4 w-px bg-white/[0.08] mx-1 hidden sm:block" />

        <button
          onClick={() => setOnlyHighYield(!onlyHighYield)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            onlyHighYield
              ? 'bg-orange-500 text-slate-950 font-bold'
              : 'bg-slate-900/60 border border-white/[0.06] text-slate-400 hover:text-orange-400'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse-subtle" />
          Top Priority (🔥🔥🔥🔥+)
        </button>
      </div>

      {/* Units List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUnits.map((unit, idx) => {
          const countInBank = allQuestions.filter(q => q.unit.toLowerCase() === unit.name.toLowerCase()).length;
          const subjectColor = SUBJECT_INFO[unit.subject].color;

          return (
            <div
              key={unit.id}
              className={`minimal-card-interactive p-5 rounded-xl flex flex-col justify-between space-y-3.5 fade-in-up delay-${Math.min(idx * 30, 300)}`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span 
                    className="text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono tracking-wider"
                    style={{ backgroundColor: `${subjectColor}15`, color: subjectColor }}
                  >
                    {SUBJECT_INFO[unit.subject].name}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-[11px]">{unit.priorityFlames}</span>
                    <span className="font-extrabold text-amber-300 font-mono">{unit.marks} Marks</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                  {unit.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {unit.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs">
                {(() => {
                  const pyqCount = allQuestions.filter(q => q.unit.toLowerCase() === unit.name.toLowerCase() && (q.sourceType === 'PYQ' || q.year)).length;
                  return (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-300 font-semibold text-[11px]">
                        {countInBank > 0 ? `${countInBank} Qs available` : 'Curated question pool'}
                      </span>
                      {pyqCount > 0 && (
                        <span className="text-amber-400 font-mono text-[10px] font-bold">
                          📜 {pyqCount} PYQs & QADs
                        </span>
                      )}
                    </div>
                  );
                })()}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onStartExam({
                      title: `${unit.name} Practice Quiz (${countInBank} Qs)`,
                      type: 'UNIT',
                      unitFilter: unit.name,
                      questionCount: countInBank,
                      durationMinutes: Math.max(30, Math.round(countInBank * 1.2)),
                      isInstantFeedback: true
                    })}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors active:scale-95"
                    title="Instant answer & explanation feedback after each question"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Instant Rationale
                  </button>

                  <button
                    onClick={() => onStartExam({
                      title: `${unit.name} Chapter Quiz (All ${countInBank} Qs)`,
                      type: 'UNIT',
                      unitFilter: unit.name,
                      questionCount: countInBank,
                      durationMinutes: Math.max(30, Math.round(countInBank * 1.0)),
                      isInstantFeedback: false
                    })}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 hover:opacity-95 text-slate-950 font-bold text-xs transition-all active:scale-95"
                  >
                    <Timer className="w-3.5 h-3.5" />
                    Timed Exam
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
