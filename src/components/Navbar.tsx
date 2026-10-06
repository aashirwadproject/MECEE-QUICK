import React from 'react';
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  Flame, 
  BarChart3, 
  FileUp 
} from 'lucide-react';

export type NavTab = 'dashboard' | 'practice' | 'syllabus' | 'analytics' | 'import';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isExamActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, isExamActive }) => {
  if (isExamActive) return null;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div 
            onClick={() => onSelectTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white">MECEE QUICK</span>
                <span className="bg-teal-500/20 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-500/30">
                  2027 MBBS
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Official 200-Mark Entrance Simulator & Analytics</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'dashboard' 
                  ? 'bg-teal-500 text-white shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Home
            </button>

            <button
              onClick={() => onSelectTab('practice')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'practice' 
                  ? 'bg-teal-500 text-white shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Practice
            </button>

            <button
              onClick={() => onSelectTab('syllabus')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'syllabus' 
                  ? 'bg-teal-500 text-white shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-400" />
              Syllabus 2027
            </button>

            <button
              onClick={() => onSelectTab('analytics')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'analytics' 
                  ? 'bg-teal-500 text-white shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>

            <button
              onClick={() => onSelectTab('import')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'import' 
                  ? 'bg-teal-500 text-white shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileUp className="w-4 h-4" />
              PDF Extractor
            </button>
          </nav>

          {/* Right Marking scheme badge */}
          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-lg text-xs font-mono">
            <span className="text-emerald-400 font-bold">+1.0</span>
            <span className="text-slate-500">/</span>
            <span className="text-rose-400 font-bold">-0.25</span>
            <span className="text-slate-400 hidden sm:inline ml-1 font-sans">MECEE marking</span>
          </div>
        </div>

        {/* Mobile Nav Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`flex flex-col items-center py-1 text-xs font-medium ${
              activeTab === 'dashboard' ? 'text-teal-400' : 'text-slate-400'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mb-0.5" />
            Home
          </button>
          <button
            onClick={() => onSelectTab('practice')}
            className={`flex flex-col items-center py-1 text-xs font-medium ${
              activeTab === 'practice' ? 'text-teal-400' : 'text-slate-400'
            }`}
          >
            <BookOpen className="w-5 h-5 mb-0.5" />
            Practice
          </button>
          <button
            onClick={() => onSelectTab('syllabus')}
            className={`flex flex-col items-center py-1 text-xs font-medium ${
              activeTab === 'syllabus' ? 'text-teal-400' : 'text-slate-400'
            }`}
          >
            <Flame className="w-5 h-5 mb-0.5 text-orange-400" />
            Syllabus
          </button>
          <button
            onClick={() => onSelectTab('analytics')}
            className={`flex flex-col items-center py-1 text-xs font-medium ${
              activeTab === 'analytics' ? 'text-teal-400' : 'text-slate-400'
            }`}
          >
            <BarChart3 className="w-5 h-5 mb-0.5" />
            Analytics
          </button>
          <button
            onClick={() => onSelectTab('import')}
            className={`flex flex-col items-center py-1 text-xs font-medium ${
              activeTab === 'import' ? 'text-teal-400' : 'text-slate-400'
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
