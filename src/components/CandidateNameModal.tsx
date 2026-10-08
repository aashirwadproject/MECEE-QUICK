import React, { useState } from 'react';
import { User, Sparkles, X, Check, Award, ArrowRight } from 'lucide-react';

interface CandidateNameModalProps {
  initialName?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  title?: string;
  subtitle?: string;
  actionButtonText?: string;
  dailyMockVersion?: number;
  onUpdateDailyQuestions?: () => void;
}

export const CandidateNameModal: React.FC<CandidateNameModalProps> = ({
  initialName = '',
  isOpen,
  onClose,
  onSubmit,
  title = 'Register for Daily Mock Test',
  subtitle = 'Enter your name to appear on today\'s Live Daily Leaderboard and track your official rank against pre-medical aspirants.',
  actionButtonText = 'Proceed to Daily Mock (200 Qs)',
  dailyMockVersion = 1,
  onUpdateDailyQuestions
}) => {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name or preferred nickname to continue.');
      return;
    }
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters long.');
      return;
    }
    setError('');
    onSubmit(name.trim());
  };

  const sampleNames = ['Aarav Sharma', 'Bibek Shrestha', 'Diksha Acharya', 'Rohan Karki', 'Aryan Verma', 'Priya Thapa'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-teal-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                Daily Mock Examination • Paper Set #{dailyMockVersion}
              </span>
              {onUpdateDailyQuestions && (
                <button
                  type="button"
                  onClick={onUpdateDailyQuestions}
                  className="text-[11px] text-teal-400 hover:text-teal-300 underline font-semibold transition-colors"
                >
                  Quick Update Questions
                </button>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">{title}</h2>
          </div>
        </div>

        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          {subtitle}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
              Candidate Full Name / Roll Handle
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="e.g. Diksha Sharma, Rohan Karki..."
                autoFocus
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all font-medium"
              />
            </div>
            {error && (
              <p className="mt-1.5 text-xs text-rose-400 font-medium">{error}</p>
            )}
          </div>

          {/* Quick suggestions */}
          <div>
            <span className="text-[11px] text-slate-400 block mb-1.5">Or choose a quick handle:</span>
            <div className="flex flex-wrap gap-1.5">
              {sampleNames.map((sName) => (
                <button
                  key={sName}
                  type="button"
                  onClick={() => setName(sName)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
                >
                  {sName}
                </button>
              ))}
            </div>
          </div>

          {/* Rules highlight */}
          <div className="bg-slate-950/70 rounded-xl border border-slate-800 p-3.5 text-xs text-slate-400 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-300 font-semibold">
              <Check className="w-3.5 h-3.5 text-teal-400" />
              Official MECEE-BL 2027 Standard
            </div>
            <p className="leading-relaxed">
              200 MCQs (Zoology 40, Botany 40, Chemistry 50, Physics 50, MAT 20) with <span className="text-emerald-400 font-medium">+1.0</span> mark per correct and <span className="text-rose-400 font-medium">-0.25</span> penalty per wrong answer.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-sm transition-colors border border-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.01]"
            >
              <span>{actionButtonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
