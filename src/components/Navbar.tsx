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

  const navItems = [
    { id: 'dashboard' as NavTab, label: 'Home', icon: LayoutDashboard },
    { id: 'mocks' as NavTab, label: '50 Mocks', icon: Award, badge: '50' },
    { id: 'leaderboard' as NavTab, label: 'Leaderboard', icon: Trophy, badge: 'Live', isLive: true },
    { id: 'practice' as NavTab, label: 'Chapters', icon: BookOpen },
    { id: 'syllabus' as NavTab, label: 'Syllabus', icon: Flame },
    { id: 'analytics' as NavTab, label: 'Analytics', icon: BarChart3 },
    { id: 'import' as NavTab, label: 'PDF Extractor', icon: FileUp },
  ];

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-300 ${
      isFestiveMode 
        ? 'bg-slate-950/85 border-amber-500/20 shadow-lg shadow-amber-950/10' 
        : 'bg-slate-950/80 border-slate-800/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div 
            onClick={() => onSelectTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
              isFestiveMode
                ? 'bg-gradient-to-tr from-amber-600/20 to-red-600/20 border border-amber-400/40 text-amber-300 shadow-sm shadow-amber-500/10'
                : 'bg-teal-500/15 border border-teal-500/30 text-teal-400'
            }`}>
              {isFestiveMode ? (
                <span className="text-lg animate-pulse-subtle">🪔</span>
              ) : (
                <GraduationCap className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-black tracking-tight text-base sm:text-lg ${
                  isFestiveMode ? 'text-amber-100 font-serif' : 'text-white'
                }`}>
                  MECEE QUICK
                </span>
                {isFestiveMode ? (
                  <span className="bg-red-500/15 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30 flex items-center gap-1 shadow-sm">
                    <span className="text-[10px]">🌾</span>
                    <span>दशैं-तिहार</span>
                  </span>
                ) : (
                  <span className="bg-teal-500/15 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-500/30">
                    2027 MBBS
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {isFestiveMode 
                  ? 'Bada Dashain & Tihar Festive Mocks • 200 Marks CBT' 
                  : '50 Full Mock Tests • 2027 Syllabus • Analytics'}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive 
                      ? (isFestiveMode 
                          ? 'bg-gradient-to-r from-red-600/90 to-amber-600/90 text-white shadow-sm shadow-amber-500/20' 
                          : 'bg-teal-500 text-slate-950 shadow-sm font-bold')
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>

                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.1 rounded-full ${
                      item.isLive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-amber-400 text-slate-950 font-extrabold'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            {/* Festive Mode Switcher Button */}
            {onToggleFestiveMode && (
              <button
                onClick={onToggleFestiveMode}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  isFestiveMode
                    ? 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/10'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-white/[0.08]'
                }`}
                title="Toggle Festive Dashain-Tihar Theme"
              >
                <span>{isFestiveMode ? '🪔' : '✨'}</span>
                <span className="hidden sm:inline">
                  {isFestiveMode ? 'Festive Mode' : 'Minimal Dark'}
                </span>
              </button>
            )}

            {/* Marking Scheme Badge */}
            <div className="flex items-center gap-1.5 bg-slate-900/60 border border-white/[0.08] px-2.5 py-1.5 rounded-lg text-[11px] font-mono">
              <span className="text-emerald-400 font-bold">+1.0</span>
              <span className="text-slate-600">/</span>
              <span className="text-rose-400 font-bold">-0.25</span>
              <span className="text-slate-400 hidden lg:inline font-sans ml-0.5">MECEE</span>
            </div>
          </div>
        </div>

        {/* Mobile Minimal Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-white/[0.06] text-[10px]">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex flex-col items-center py-1 transition-colors ${
                  isActive ? (isFestiveMode ? 'text-amber-300 font-bold' : 'text-teal-400 font-bold') : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
