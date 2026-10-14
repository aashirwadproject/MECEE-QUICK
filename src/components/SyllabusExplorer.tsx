import React, { useState } from 'react';
import { 
  Flame, 
  Play, 
  ArrowLeft,
  Sparkles,
  Info
} from 'lucide-react';
import { SubjectType } from '../types';
import { SYLLABUS_UNITS, SUBJECT_INFO, BIG_PRIORITY_LIST } from '../data/syllabus';

interface SyllabusExplorerProps {
  onStartExam: (config: {
    title: string;
    type: 'FULL_200' | 'SUBJECT' | 'UNIT' | 'HIGH_YIELD';
    subjectFilter?: SubjectType;
    unitFilter?: string;
    questionCount?: number;
    durationMinutes?: number;
  }) => void;
  onBack: () => void;
}

export const SyllabusExplorer: React.FC<SyllabusExplorerProps> = ({
  onStartExam,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<'PRIORITY' | SubjectType>('PRIORITY');

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 fade-in-up">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-base animate-pulse-subtle">📊</span>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">MECEE-BL 2027 Official Syllabus & Weightage</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-normal">
            Exact chapter/unit-wise marks distribution (200 questions / 200 marks / 3 hours)
          </p>
        </div>

        <button
          onClick={onBack}
          className="self-start sm:self-center flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-white/[0.08] transition-all hover:-translate-y-0.5 active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 fade-in-up delay-100">
        <button
          onClick={() => setActiveTab('PRIORITY')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'PRIORITY'
              ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-sm font-bold'
              : 'bg-slate-900/60 border border-white/[0.06] text-slate-400 hover:text-white'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse-subtle" />
          The BIG Priority List
        </button>

        {(Object.keys(SUBJECT_INFO) as SubjectType[]).map((subjKey) => (
          <button
            key={subjKey}
            onClick={() => setActiveTab(subjKey)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === subjKey
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-900/60 border border-white/[0.06] text-slate-400 hover:text-white'
            }`}
          >
            {SUBJECT_INFO[subjKey].name} ({SUBJECT_INFO[subjKey].marks}M)
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'PRIORITY' ? (
        <div className="space-y-4 fade-in-up delay-150">
          <div className="minimal-card rounded-2xl p-5 space-y-2 border border-amber-500/30">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-400 animate-sparkle" />
              MEC High-Yield Strategic Rule
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              To maximize your rank, master these units first in order! The top-weightage units account for more than 70% of the entire 200-mark paper rather than studying every unit with equal effort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BIG_PRIORITY_LIST.map((item, idx) => {
              const matchedUnit = SYLLABUS_UNITS.find(u => u.name.toLowerCase() === item.name.toLowerCase());
              const subjectColor = matchedUnit ? SUBJECT_INFO[matchedUnit.subject].color : '#0ea5e9';

              return (
                <div
                  key={item.name}
                  className="minimal-card-interactive p-4 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-slate-800/80 border border-white/[0.08] text-amber-400 font-bold font-mono text-xs flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors">{item.name}</h4>
                      {matchedUnit && (
                        <span 
                          className="text-[10px] font-bold font-mono uppercase"
                          style={{ color: subjectColor }}
                        >
                          {SUBJECT_INFO[matchedUnit.subject].name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs sm:text-sm font-extrabold text-amber-300 font-mono">
                      {item.marks} Marks
                    </span>

                    <button
                      onClick={() => onStartExam({
                        title: `${item.name} Unit Test (All Questions)`,
                        type: 'UNIT',
                        unitFilter: item.name
                      })}
                      className="p-2 rounded-lg bg-amber-500/15 hover:bg-amber-500 hover:text-slate-950 text-amber-300 transition-all active:scale-95"
                      title="Practice this unit (All questions)"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-4 fade-in-up delay-150">
          {/* Subject Overview Card */}
          <div className="minimal-card p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/[0.08]">
            <div className="space-y-1">
              <span className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">
                Subject Weightage
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                {SUBJECT_INFO[activeTab].name} — {SUBJECT_INFO[activeTab].marks} Marks
              </h3>
              <p className="text-xs text-slate-400">
                {activeTab === 'ZOOLOGY' && 'Human Biology alone = 15/40 marks = 37.5% of Zoology!'}
                {activeTab === 'BOTANY' && 'Biodiversity (9M), Genetics (6M), Plant Phys (6M) & Cell Bio (5M) form 65% of Botany.'}
                {activeTab === 'CHEMISTRY' && 'Physical (17M) + Organic (17M) = 34/50 marks = 68% of Chemistry. Massive priority!'}
                {activeTab === 'PHYSICS' && 'Modern Physics (12M) + Mechanics (10M) = 22/50 marks of Physics.'}
                {activeTab === 'MAT' && '4 balanced sections: Verbal, Numerical, Logical, Spatial Reasoning (5 marks each).'}
              </p>
            </div>

            <button
              onClick={() => onStartExam({
                title: `${SUBJECT_INFO[activeTab].name} Full Subject Test`,
                type: 'SUBJECT',
                subjectFilter: activeTab,
                questionCount: SUBJECT_INFO[activeTab].marks,
                durationMinutes: Math.round(SUBJECT_INFO[activeTab].marks * 0.9)
              })}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 hover:opacity-95 text-slate-950 text-xs font-bold self-start sm:self-center transition-all active:scale-95 shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Test All {SUBJECT_INFO[activeTab].marks} Marks
            </button>
          </div>

          {/* Unit Cards List with animated percentage bar */}
          <div className="space-y-3">
            {SYLLABUS_UNITS.filter(u => u.subject === activeTab).map((unit) => {
              const percent = ((unit.marks / SUBJECT_INFO[activeTab].marks) * 100);

              return (
                <div
                  key={unit.id}
                  className="minimal-card-interactive p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-2xl flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors">{unit.name}</h4>
                      <span className="text-xs">{unit.priorityFlames}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">{unit.description}</p>
                    
                    {/* Animated Weightage Bar */}
                    <div className="w-full max-w-md bg-slate-800 rounded-full h-1.5 overflow-hidden mt-2">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-yellow-300 h-1.5 rounded-full transition-all duration-700"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                    <div className="text-right">
                      <span className="text-sm sm:text-base font-extrabold text-amber-300 font-mono">
                        {unit.marks} Marks
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        {percent.toFixed(1)}% of subject
                      </span>
                    </div>

                    <button
                      onClick={() => onStartExam({
                        title: `${unit.name} Chapter Test (All Questions)`,
                        type: 'UNIT',
                        unitFilter: unit.name
                      })}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/[0.08] transition-all active:scale-95"
                    >
                      Practice ({unit.marks}M)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
