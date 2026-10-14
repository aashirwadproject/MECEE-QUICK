import React, { useState } from 'react';
import { User, Sparkles, X, Award } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg minimal-card bg-slate-900/95 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden fade-in-scale">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-300">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-400 animate-sparkle" />
                Daily Mock • Set #{dailyMockVersion}
              </span>
              {onUpdateDailyQuestions && (
                <button
                  type="button"
                  onClick={onUpdateDailyQuestions}
                  className="text-[11px] text-amber-400 hover:text-amber-300 underline font-semibold transition-colors"
                >
                  Shuffle Questions
                </button>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white">{title}</h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed font-normal">
          {subtitle}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
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
                placeholder="e.g. Aarav Sharma"
                className="w-full bg-slate-950/80 border border-white/[0.08] focus:border-amber-400/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-xs text-rose-400 mt-1.5 font-medium">{error}</p>
            )}
          </div>

          <div>
            <span className="text-[11px] text-slate-400 block mb-1.5">Quick suggestion:</span>
            <div className="flex flex-wrap gap-1.5">
              {sampleNames.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setName(s)}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-white/[0.06] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 hover:opacity-95 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95"
            >
              {actionButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
