import React, { useState } from 'react';
import { 
  FileUp, 
  PlusCircle, 
  Database, 
  Check, 
  Trash2, 
  Search, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { Question, SubjectType } from '../types';
import { SYLLABUS_UNITS, SUBJECT_INFO } from '../data/syllabus';

interface QuestionManagerProps {
  questions: Question[];
  onImportQuestions: (questions: Question[]) => void;
  onAddQuestion: (question: Question) => void;
  onDeleteQuestion: (id: string) => void;
  onBack: () => void;
}

export const QuestionManager: React.FC<QuestionManagerProps> = ({
  questions,
  onImportQuestions,
  onAddQuestion,
  onDeleteQuestion,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<'EXTRACTOR' | 'MANUAL' | 'BROWSE'>('EXTRACTOR');

  // Extractor state
  const [rawText, setRawText] = useState('');
  const [targetSubject, setTargetSubject] = useState<SubjectType>('ZOOLOGY');
  const [targetUnit, setTargetUnit] = useState(SYLLABUS_UNITS[0].name);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Manual Add state
  const [mQuestion, setMQuestion] = useState('');
  const [mOptA, setMOptA] = useState('');
  const [mOptB, setMOptB] = useState('');
  const [mOptC, setMOptC] = useState('');
  const [mOptD, setMOptD] = useState('');
  const [mCorrectIndex, setMCorrectIndex] = useState(0);
  const [mExplanation, setMExplanation] = useState('');
  const [mSuccess, setMSuccess] = useState<string | null>(null);

  // Browser state
  const [searchQuery, setSearchQuery] = useState('');

  const subjectUnits = SYLLABUS_UNITS.filter(u => u.subject === targetSubject);

  const handleBulkParseAndImport = () => {
    if (!rawText.trim()) return;

    const parsed: Question[] = [];
    const blocks = rawText.split(/\n(?=\d+[.)]\s+|Question\s+\d+[:.]|Q\d+[:.]|Q[:.]\s*)/gi);

    for (const block of blocks) {
      const trimmed = block.trim();
      if (trimmed.length < 15) continue;

      try {
        let optA = '';
        let optB = '';
        let optC = '';
        let optD = '';
        let correctIdx = 0;
        let explanation = 'Imported from custom syllabus material.';
        const questionLines: string[] = [];

        const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean);

        for (const line of lines) {
          if (/^(\([Aa]\)|[Aa][.)])\s*/i.test(line)) {
            optA = line.replace(/^(\([Aa]\)|[Aa][.)])\s*/i, '');
          } else if (/^(\([Bb]\)|[Bb][.)])\s*/i.test(line)) {
            optB = line.replace(/^(\([Bb]\)|[Bb][.)])\s*/i, '');
          } else if (/^(\([Cc]\)|[Cc][.)])\s*/i.test(line)) {
            optC = line.replace(/^(\([Cc]\)|[Cc][.)])\s*/i, '');
          } else if (/^(\([Dd]\)|[Dd][.)])\s*/i.test(line)) {
            optD = line.replace(/^(\([Dd]\)|[Dd][.)])\s*/i, '');
          } else if (/^(Ans|Answer|Correct)[:.]\s*/i.test(line)) {
            const upper = line.toUpperCase();
            if (upper.includes('A') && !upper.includes('B') && !upper.includes('C') && !upper.includes('D')) correctIdx = 0;
            else if (upper.includes('B')) correctIdx = 1;
            else if (upper.includes('C')) correctIdx = 2;
            else if (upper.includes('D')) correctIdx = 3;
          } else if (/^(Exp|Explanation|Reason)[:.]\s*/i.test(line)) {
            explanation = line.replace(/^(Exp|Explanation|Reason)[:.]\s*/i, '');
          } else {
            if (!optA) {
              const clean = line.replace(/^(\d+[.)]|Question\s+\d+[:.]|Q\d+[:.]|Q[:.])\s*/i, '');
              questionLines.push(clean);
            }
          }
        }

        const qText = questionLines.join(' ');
        if (qText && optA && optB) {
          parsed.push({
            id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            subject: targetSubject,
            unit: targetUnit,
            priority: 4,
            questionText: qText,
            optionA: optA,
            optionB: optB,
            optionC: optC || 'None of the above',
            optionD: optD || 'All of the above',
            correctOptionIndex: correctIdx,
            explanation,
            isUserAdded: true,
            createdAt: Date.now()
          });
        }
      } catch {
        // Skip
      }
    }

    if (parsed.length > 0) {
      onImportQuestions(parsed);
      setImportStatus(`Successfully extracted and imported ${parsed.length} questions into ${targetUnit}!`);
      setRawText('');
    } else {
      setImportStatus('Could not detect questions in standard format. Check format example below.');
    }
  };

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mQuestion || !mOptA || !mOptB) return;

    const newQ: Question = {
      id: `manual_${Date.now()}`,
      subject: targetSubject,
      unit: targetUnit,
      priority: 4,
      questionText: mQuestion,
      optionA: mOptA,
      optionB: mOptB,
      optionC: mOptC || 'None of the above',
      optionD: mOptD || 'All of the above',
      correctOptionIndex: mCorrectIndex,
      explanation: mExplanation || 'Added by student for MECEE revision.',
      isUserAdded: true,
      createdAt: Date.now()
    };

    onAddQuestion(newQ);
    setMSuccess(`Added question to ${targetUnit}!`);
    setMQuestion('');
    setMOptA('');
    setMOptB('');
    setMOptC('');
    setMOptD('');
    setMExplanation('');
  };

  const filteredQuestions = questions.filter(q => 
    searchQuery === '' ||
    q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.unit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Question Bank & PDF Extractor</h1>
          <p className="text-sm text-slate-400">
            Paste extracted question text from new syllabus PDFs to expand your offline bank ({questions.length} total).
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
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('EXTRACTOR')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'EXTRACTOR' ? 'bg-teal-500 text-slate-950' : 'bg-slate-900 border border-slate-800 text-slate-400'
          }`}
        >
          <FileUp className="w-3.5 h-3.5" />
          Bulk PDF / Text Extractor
        </button>

        <button
          onClick={() => setActiveTab('MANUAL')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'MANUAL' ? 'bg-teal-500 text-slate-950' : 'bg-slate-900 border border-slate-800 text-slate-400'
          }`}
        >
          <PlusCircle className="w-3.5 h-3.5" />
          Add Single Question
        </button>

        <button
          onClick={() => setActiveTab('BROWSE')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'BROWSE' ? 'bg-teal-500 text-slate-950' : 'bg-slate-900 border border-slate-800 text-slate-400'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          Browse Bank ({questions.length})
        </button>
      </div>

      {/* Tab 1: Extractor */}
      {activeTab === 'EXTRACTOR' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Target Subject</label>
              <select
                value={targetSubject}
                onChange={(e) => {
                  const s = e.target.value as SubjectType;
                  setTargetSubject(s);
                  const firstUnit = SYLLABUS_UNITS.find(u => u.subject === s);
                  if (firstUnit) setTargetUnit(firstUnit.name);
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500"
              >
                {(Object.keys(SUBJECT_INFO) as SubjectType[]).map(s => (
                  <option key={s} value={s}>{SUBJECT_INFO[s].name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Target Unit</label>
              <select
                value={targetUnit}
                onChange={(e) => setTargetUnit(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500"
              >
                {subjectUnits.map(u => (
                  <option key={u.id} value={u.name}>{u.name} ({u.marks}M)</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-300">Paste Text Extracted from PDF or Notes:</label>
              <button
                type="button"
                onClick={() => {
                  setRawText(`1. In human nephron, where does the filtration of blood take place?
A) Glomerulus inside Bowman's capsule
B) Loop of Henle
C) Distal convoluted tubule
D) Collecting duct
Ans: A
Exp: Ultrafiltration occurs across the glomerulus endothelial-capsular membrane into Bowman capsule under glomerular hydrostatic pressure.

2. Which enzyme in saliva initiates carbohydrate digestion?
A) Pepsin
B) Ptyalin (Salivary Amylase)
C) Trypsin
D) Renin
Ans: B
Exp: Salivary amylase (ptyalin) hydrolyzes dietary starches into maltose and dextrins at pH ~6.8.`);
                }}
                className="text-xs text-teal-400 hover:underline"
              >
                Load Sample Format
              </button>
            </div>

            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste raw text here...
1. Question text
A) Option A
B) Option B
C) Option C
D) Option D
Ans: B
Exp: Explanation..."
              rows={8}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-teal-500 leading-relaxed"
            />
          </div>

          {importStatus && (
            <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              importStatus.includes('Successfully')
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
            }`}>
              {importStatus.includes('Successfully') ? <Check className="w-4 h-4" /> : null}
              {importStatus}
            </div>
          )}

          <button
            onClick={handleBulkParseAndImport}
            disabled={!rawText.trim()}
            className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-md transition-colors"
          >
            Parse & Import Questions to Local Storage
          </button>
        </div>
      )}

      {/* Tab 2: Manual Add */}
      {activeTab === 'MANUAL' && (
        <form onSubmit={handleManualAdd} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Subject</label>
              <select
                value={targetSubject}
                onChange={(e) => {
                  const s = e.target.value as SubjectType;
                  setTargetSubject(s);
                  const firstUnit = SYLLABUS_UNITS.find(u => u.subject === s);
                  if (firstUnit) setTargetUnit(firstUnit.name);
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
              >
                {(Object.keys(SUBJECT_INFO) as SubjectType[]).map(s => (
                  <option key={s} value={s}>{SUBJECT_INFO[s].name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Unit</label>
              <select
                value={targetUnit}
                onChange={(e) => setTargetUnit(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
              >
                {subjectUnits.map(u => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Question Stem</label>
            <input
              type="text"
              value={mQuestion}
              onChange={(e) => setMQuestion(e.target.value)}
              placeholder="e.g. Which hormone regulates calcium homeostasis?"
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Option A', val: mOptA, setVal: setMOptA, idx: 0 },
              { label: 'Option B', val: mOptB, setVal: setMOptB, idx: 1 },
              { label: 'Option C', val: mOptC, setVal: setMOptC, idx: 2 },
              { label: 'Option D', val: mOptD, setVal: setMOptD, idx: 3 }
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correctOpt"
                  checked={mCorrectIndex === item.idx}
                  onChange={() => setMCorrectIndex(item.idx)}
                  className="accent-teal-500 w-4 h-4 cursor-pointer"
                />
                <input
                  type="text"
                  value={item.val}
                  onChange={(e) => item.setVal(e.target.value)}
                  placeholder={item.label}
                  required={item.idx < 2}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Scientific Explanation</label>
            <textarea
              value={mExplanation}
              onChange={(e) => setMExplanation(e.target.value)}
              placeholder="Why this answer is correct..."
              rows={2}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white"
            />
          </div>

          {mSuccess && (
            <p className="text-xs font-bold text-emerald-400">{mSuccess}</p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow transition-colors"
          >
            Save to Local Database
          </button>
        </form>
      )}

      {/* Tab 3: Browse */}
      {activeTab === 'BROWSE' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search question text or unit name..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="space-y-3">
            {filteredQuestions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span 
                      className="font-bold uppercase font-mono text-[10px]"
                      style={{ color: SUBJECT_INFO[q.subject]?.color }}
                    >
                      {SUBJECT_INFO[q.subject]?.name}
                    </span>
                    <span className="text-slate-400">• {q.unit}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">{q.questionText}</h4>
                  <p className="text-xs text-slate-400">
                    Ans: <strong className="text-teal-400">{['A', 'B', 'C', 'D'][q.correctOptionIndex]}</strong> • {q.explanation}
                  </p>
                </div>

                {q.isUserAdded && (
                  <button
                    onClick={() => onDeleteQuestion(q.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition-colors"
                    title="Delete custom question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
