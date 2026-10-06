import React, { useState } from 'react';
import { 
  Flame, 
  BookOpen, 
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
    questionCount: number;
    durationMinutes: number;
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">MECEE-BL 2027 Official Syllabus & Weightage</h1>
          <p className="text-sm text-slate-400">
            Exact chapter/unit-wise marks distribution (200 questions / 200 marks / 3 hours)
          </p>
        </div>

        <button
          onClick={onBack}
          className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveTab('PRIORITY')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'PRIORITY'
              ? 'bg-orange-500 text-slate-950 shadow-md'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          The BIG Priority List
        </button>

        {(Object.keys(SUBJECT_INFO) as SubjectType[]).map((subjKey) => (
          <button
            key={subjKey}
            onClick={() => setActiveTab(subjKey)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === subjKey
                ? 'bg-teal-500 text-slate-950 shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {SUBJECT_INFO[subjKey].name} ({SUBJECT_INFO[subjKey].marks}M)
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'PRIORITY' ? (
        <div className="space-y-4">
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
              <Info className="w-4 h-4 text-teal-400" />
              MEC High-Yield Strategic Rule
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              If you want to maximize marks, master these units first in order! The top-weightage units account for more than 70% of the entire 200-mark paper rather than studying every unit with equal effort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BIG_PRIORITY_LIST.map((item, idx) => {
              const matchedUnit = SYLLABUS_UNITS.find(u => u.name.toLowerCase() === item.name.toLowerCase());
              const subjectColor = matchedUnit ? SUBJECT_INFO[matchedUnit.subject].color : '#0ea5e9';

              return (
                <div
                  key={item.name}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 rounded-xl flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-teal-400 font-bold font-mono text-sm flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.name}</h4>
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
                    <span className="text-sm font-extrabold text-teal-400 font-mono">
                      {item.marks} Marks
                    </span>

                    <button
                      onClick={() => onStartExam({
                        title: `${item.name} Priority Test`,
                        type: 'UNIT',
                        unitFilter: item.name,
                        questionCount: 15,
                        durationMinutes: 20
                      })}
                      className="p-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors"
                      title="Practice this unit"
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
        <div className="space-y-4">
          {/* Subject Overview Card */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold font-mono text-teal-400 uppercase tracking-wider">
                Subject Weightage
              </span>
              <h3 className="text-xl font-extrabold text-white">
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
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-extrabold self-start sm:self-center transition-colors shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Test All {SUBJECT_INFO[activeTab].marks} Marks
            </button>
          </div>

          {/* Unit Cards List */}
          <div className="space-y-3">
            {SYLLABUS_UNITS.filter(u => u.subject === activeTab).map((unit) => (
              <div
                key={unit.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white">{unit.name}</h4>
                    <span>{unit.priorityFlames}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{unit.description}</p>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-base font-extrabold text-teal-400 font-mono">
                      {unit.marks} Marks
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {((unit.marks / SUBJECT_INFO[activeTab].marks) * 100).toFixed(1)}% of subject
                    </span>
                  </div>

                  <button
                    onClick={() => onStartExam({
                      title: `${unit.name} Quiz`,
                      type: 'UNIT',
                      unitFilter: unit.name,
                      questionCount: 15,
                      durationMinutes: 20
                    })}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
                  >
                    Practice Unit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
