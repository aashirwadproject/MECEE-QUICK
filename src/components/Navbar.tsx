import React from 'react';
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  Flame, 
  BarChart3, 
  FileUp,
  Award,
  Trophy,
  Sparkles
} from 'lucide-react';

export type NavTab = 'dashboard' | 'mocks' | 'leaderboard' | 'practice' | 'syllabus' | 'analytics' | 'import';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isExamActive: boolean;
  isFestiveMode?: boolean;
  onToggleFestiveMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  onSelectTab, 
  isExamActive,
  isFestiveMode = true,
  onToggleFestiveMode 
}) => {
  if (isExamActive) return null;

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
      isFestiveMode 
        ? 'bg-slate-950/95 border-amber-600/40 shadow-lg shadow-amber-950/20' 
        : 'bg-slate-900/90 border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div 
            onClick={() => onSelectTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all ${
              isFestiveMode
                ? 'bg-gradient-to-tr from-amber-600/30 to-red-600/30 border border-amber-400/50 text-amber-300 shadow-md shadow-amber-500/10'
                : 'bg-teal-500/20 border border-teal-500/30 text-teal-400'
            }`}>
              {isFestiveMode ? (
                <span className="text-xl">🪔</span>
              ) : (
                <GraduationCap className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-extrabold text-lg tracking-tight ${
                  isFestiveMode ? 'text-amber-100 font-serif' : 'text-white'
                }`}>
                  MECEE QUICK
                </span>
                {isFestiveMode ? (
                  <span className="bg-gradient-to-r from-red-600/30 to-amber-500/30 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/40 flex items-center gap-1 shadow-sm">
                    <span>🌾</span>
                    <span>दशैं-तिहार विशेष</span>
                  </span>
                ) : (
                  <span className="bg-teal-500/20 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-500/30">
                    2027 MBBS
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {isFestiveMode 
                  ? 'Bada Dashain, Tihar & Chhath Festive Mocks • 2027 Syllabus' 
                  : '50 Full Mock Tests • 2027 Syllabus • Analytics'}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'dashboard' 
                  ? (isFestiveMode ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md' : 'bg-teal-500 text-white shadow-sm')
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Home
            </button>

            <button
              onClick={() => onSelectTab('mocks')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                activeTab === 'mocks' 
                  ? (isFestiveMode ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md' : 'bg-teal-500 text-white shadow-sm')
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>50 Full Mocks</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                50
              </span>
            </button>

            <button
              onClick={() => onSelectTab('leaderboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                activeTab === 'leaderboard' 
                  ? (isFestiveMode ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md' : 'bg-teal-500 text-white shadow-sm')
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Daily Leaderboard</span>
              <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full border ${
                isFestiveMode 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              }`}>
                Live
              </span>
            </button>

            <button
              onClick={() => onSelectTab('practice')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'practice' 
                  ? (isFestiveMode ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md' : 'bg-teal-500 text-white shadow-sm')
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Chapters (50+ Qs)
            </button>

            <button
              onClick={() => onSelectTab('syllabus')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'syllabus' 
                  ? (isFestiveMode ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md' : 'bg-teal-500 text-white shadow-sm')
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-400" />
              Syllabus
            </button>

            <button
              onClick={() => onSelectTab('analytics')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'analytics' 
                  ? (isFestiveMode ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md' : 'bg-teal-500 text-white shadow-sm')
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>

            <button
              onClick={() => onSelectTab('import')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'import' 
                  ? (isFestiveMode ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md' : 'bg-teal-500 text-white shadow-sm')
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileUp className="w-4 h-4" />
              PDF Extractor
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            {/* Festive Mode Switcher Button */}
            {onToggleFestiveMode && (
              <button
                onClick={onToggleFestiveMode}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  isFestiveMode
                    ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'
                }`}
                title="Toggle Festive Dashain-Tihar Theme"
              >
                <span>{isFestiveMode ? '🪔' : '✨'}</span>
                <span className="hidden sm:inline">
                  {isFestiveMode ? 'Festive Mode On' : 'Festive Mode Off'}
                </span>
              </button>
            )}

            {/* Marking Scheme Badge */}
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-lg text-xs font-mono">
              <span className="text-emerald-400 font-bold">+1.0</span>
              <span className="text-slate-500">/</span>
              <span className="text-rose-400 font-bold">-0.25</span>
              <span className="text-slate-400 hidden sm:inline ml-1 font-sans">MECEE marking</span>
            </div>
          </div>
        </div>

        {/* Mobile Nav Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800 text-[11px]">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`flex flex-col items-center py-1 font-medium ${
              activeTab === 'dashboard' ? (isFestiveMode ? 'text-amber-400' : 'text-teal-400') : 'text-slate-400'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mb-0.5" />
            Home
          </button>
          <button
            onClick={() => onSelectTab('mocks')}
            className={`flex flex-col items-center py-1 font-medium ${
              activeTab === 'mocks' ? (isFestiveMode ? 'text-amber-400' : 'text-teal-400') : 'text-slate-400'
            }`}
          >
            <Award className="w-5 h-5 mb-0.5 text-amber-400" />
            50 Mocks
          </button>
          <button
            onClick={() => onSelectTab('leaderboard')}
            className={`flex flex-col items-center py-1 font-medium ${
              activeTab === 'leaderboard' ? 'text-amber-400' : 'text-slate-400'
            }`}
          >
            <Trophy className="w-5 h-5 mb-0.5 text-amber-400" />
            Ranks
          </button>
          <button
            onClick={() => onSelectTab('practice')}
            className={`flex flex-col items-center py-1 font-medium ${
              activeTab === 'practice' ? (isFestiveMode ? 'text-amber-400' : 'text-teal-400') : 'text-slate-400'
            }`}
          >
            <BookOpen className="w-5 h-5 mb-0.5" />
            Chapters
          </button>
          <button
            onClick={() => onSelectTab('syllabus')}
            className={`flex flex-col items-center py-1 font-medium ${
              activeTab === 'syllabus' ? (isFestiveMode ? 'text-amber-400' : 'text-teal-400') : 'text-slate-400'
            }`}
          >
            <Flame className="w-5 h-5 mb-0.5 text-orange-400" />
            Syllabus
          </button>
          <button
            onClick={() => onSelectTab('analytics')}
            className={`flex flex-col items-center py-1 font-medium ${
              activeTab === 'analytics' ? (isFestiveMode ? 'text-amber-400' : 'text-teal-400') : 'text-slate-400'
            }`}
          >
            <BarChart3 className="w-5 h-5 mb-0.5" />
            Analytics
          </button>
          <button
            onClick={() => onSelectTab('import')}
            className={`flex flex-col items-center py-1 font-medium ${
              activeTab === 'import' ? (isFestiveMode ? 'text-amber-400' : 'text-teal-400') : 'text-slate-400'
            }`}
          >
            <FileUp className="w-5 h-5 mb-0.5" />
            Import
          </button>
        </div>
      </div>
    </header>
  );
};
