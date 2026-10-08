import React, { useState } from 'react';
import { 
  Play, 
  Flame, 
  Sparkles, 
  Filter, 
  Zap, 
  Timer, 
  ArrowLeft 
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
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Chapter & Unit Practice</h1>
          <p className="text-sm text-slate-400">
            Practice individual units with instant rationale or take timed chapter quizzes.
          </p>
        </div>

        <button
          onClick={onBack}
          className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedSubject('ALL')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            selectedSubject === 'ALL'
              ? 'bg-teal-500 text-slate-950'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          All Subjects
        </button>

        {(Object.keys(SUBJECT_INFO) as SubjectType[]).map((subjKey) => (
          <button
            key={subjKey}
            onClick={() => setSelectedSubject(subjKey)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              selectedSubject === subjKey
                ? 'bg-teal-500 text-slate-950'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {SUBJECT_INFO[subjKey].name} ({SUBJECT_INFO[subjKey].marks}M)
          </button>
        ))}

        <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

        <button
          onClick={() => setOnlyHighYield(!onlyHighYield)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            onlyHighYield
              ? 'bg-orange-500 text-slate-950'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-orange-400'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          Top Priority Only (🔥🔥🔥🔥+)
        </button>
      </div>

      {/* Units List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUnits.map((unit) => {
          const countInBank = allQuestions.filter(q => q.unit.toLowerCase() === unit.name.toLowerCase()).length;
          const subjectColor = SUBJECT_INFO[unit.subject].color;

          return (
            <div
              key={unit.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 p-5 rounded-xl flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span 
                    className="text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono tracking-wider"
                    style={{ backgroundColor: `${subjectColor}20`, color: subjectColor }}
                  >
                    {SUBJECT_INFO[unit.subject].name}
                  </span>

                  <div className="flex items-center gap-1 text-xs">
                    <span>{unit.priorityFlames}</span>
                    <span className="font-extrabold text-teal-400 ml-1.5">{unit.marks} Marks</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white">{unit.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{unit.description}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                <span className="text-slate-500">
                  {countInBank > 0 ? `${countInBank} questions available` : 'Curated question pool'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onStartExam({
                      title: `${unit.name} Practice Quiz (${countInBank} Qs)`,
                      type: 'UNIT',
                      unitFilter: unit.name,
                      questionCount: countInBank,
                      durationMinutes: Math.max(30, Math.round(countInBank * 1.2)),
                      isInstantFeedback: false
                    })}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Practice ({countInBank})
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
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-colors"
                  >
                    <Timer className="w-3.5 h-3.5" />
                    Timed (All {countInBank})
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
