import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Flame, 
  Search, 
  Award, 
  Play, 
  Edit3, 
  RefreshCw,
  Share2
} from 'lucide-react';
import { 
  generateDailyLeaderboard, 
  formatTimeTaken 
} from '../data/dailyLeaderboardData';
import { CandidateNameModal } from './CandidateNameModal';

interface DailyLeaderboardProps {
  candidateName: string;
  onUpdateCandidateName: (name: string) => void;
  onStartDailyMock: () => void;
  userExamScore: {
    score: number;
    correct: number;
    incorrect: number;
    unattempted: number;
    timeSpentSeconds: number;
    accuracy: number;
  } | null;
  dailyMockVersion?: number;
  onUpdateDailyQuestions?: () => void;
}

export const DailyLeaderboard: React.FC<DailyLeaderboardProps> = ({
  candidateName,
  onUpdateCandidateName,
  onStartDailyMock,
  userExamScore,
  dailyMockVersion = 1,
  onUpdateDailyQuestions
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'NEPAL' | 'INDIA' | 'TOP_20'>('ALL');
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [updatedAlert, setUpdatedAlert] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Generate today's leaderboard with user's score automatically integrated
  const leaderboardData = useMemo(() => {
    return generateDailyLeaderboard(candidateName, userExamScore || undefined);
  }, [candidateName, userExamScore, dailyMockVersion]);

  const userRankEntry = leaderboardData.find(e => e.isCurrentUser);

  // Filtered leaderboard
  const filteredList = useMemo(() => {
    return leaderboardData.filter(entry => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = entry.candidateName.toLowerCase().includes(q) || 
                      entry.location.toLowerCase().includes(q) || 
                      entry.institute.toLowerCase().includes(q);
        if (!match) return false;
      }

      if (selectedFilter === 'NEPAL' && !entry.location.includes('Nepal')) return false;
      if (selectedFilter === 'INDIA' && !entry.location.includes('India')) return false;
      if (selectedFilter === 'TOP_20' && entry.rank > 20) return false;

      return true;
    });
  }, [leaderboardData, searchQuery, selectedFilter]);

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const topThree = leaderboardData.slice(0, 3);

  return (
    <div className="space-y-6 pb-16">
      {/* Hero Header - Minimal & Animated */}
      <div className="relative overflow-hidden rounded-2xl minimal-card p-6 sm:p-8 fade-in-up border border-amber-500/30">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                Live Daily Mock Leaderboard
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <span>🪔</span> दशैं-तिहार विशेष श्रेणी
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {todayFormatted}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <Trophy className="w-7 h-7 text-amber-400 shrink-0" />
              <span>Daily Pre-Med Ranks & Scores</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Official Medical Education Commission (+1.0 / -0.25) evaluated rankings. Daily mock test refreshed every 24 hours with top contenders from Nepal and India.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
              <span className="bg-slate-900/60 px-2.5 py-1 rounded-lg border border-white/[0.06] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse-subtle" />
                {leaderboardData.length + 780} Aspirants Tested Today
              </span>
              <span className="bg-slate-900/60 px-2.5 py-1 rounded-lg border border-white/[0.06] flex items-center gap-1.5 text-amber-300">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                200 Marks Standard
              </span>
              <button
                onClick={() => setShowCelebration(!showCelebration)}
                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-500/30 flex items-center gap-1.5 transition-all active:scale-95"
              >
                <span>✨</span>
                <span>{showCelebration ? 'Hide Fireworks' : 'Celebrate Top Rankers!'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 min-w-[210px] shrink-0">
            <button
              onClick={onStartDailyMock}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 hover:opacity-95 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              Start Daily Mock
            </button>

            <button
              onClick={() => {
                onUpdateDailyQuestions?.();
                setUpdatedAlert(true);
                setTimeout(() => setUpdatedAlert(false), 3000);
              }}
              className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 font-semibold text-xs border border-amber-500/30 transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Shuffle Set #{dailyMockVersion}
            </button>

            {updatedAlert && (
              <div className="text-[11px] text-emerald-400 text-center animate-in fade-in">
                ✓ Paper Set #{dailyMockVersion} questions refreshed!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Celebration Festive Burst Indicator */}
      {showCelebration && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/60 via-amber-950/60 to-slate-900 border border-amber-400/40 text-center space-y-2 fade-in-scale">
          <div className="text-2xl animate-bounce-subtle">
            🎆 🪔 🌾 🩺 ✨ 🪔 🎆
          </div>
          <h4 className="text-sm font-extrabold text-amber-200">
            शुभ विजयादशमी तथा दिपावली उत्सव! Celebrating Academic Excellence in MECEE!
          </h4>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            Hearty congratulations to the top contenders! May your dedication during festive holidays lead directly to the white coat of your dreams!
          </p>
        </div>
      )}

      {/* Animated Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 fade-in-up delay-100">
        {/* #2 Silver */}
        {topThree[1] && (
          <div className="minimal-card p-4 rounded-xl flex flex-col justify-between space-y-2 order-2 md:order-1 border-slate-400/20 hover:border-slate-300/40">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-slate-400/20 text-slate-200 text-xs font-bold font-mono">
                🥈 Rank #2
              </span>
              <span className="text-xs text-slate-400">{topThree[1].location}</span>
            </div>
            <div>
              <h4 className="text-base font-extrabold text-white">{topThree[1].candidateName}</h4>
              <p className="text-xs text-slate-400 line-clamp-1">{topThree[1].institute}</p>
            </div>
            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="font-mono text-slate-300">{topThree[1].score} / 200</span>
              <span className="text-emerald-400 font-mono font-semibold">{topThree[1].accuracy.toFixed(0)}% Acc</span>
            </div>
          </div>
        )}

        {/* #1 Gold - Elevated */}
        {topThree[0] && (
          <div className="minimal-card p-5 rounded-xl flex flex-col justify-between space-y-3 order-1 md:order-2 border-amber-400/50 shadow-lg shadow-amber-500/10 md:-translate-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 text-xs font-black font-mono shadow-sm flex items-center gap-1">
                <span>👑</span> Rank #1 Champion
              </span>
              <span className="text-xs text-amber-300 font-medium">{topThree[0].location}</span>
            </div>
            <div>
              <h4 className="text-lg font-black text-white">{topThree[0].candidateName}</h4>
              <p className="text-xs text-slate-300 line-clamp-1">{topThree[0].institute}</p>
            </div>
            <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-amber-300 text-sm">{topThree[0].score} / 200</span>
              <span className="text-emerald-400 font-mono font-bold">{topThree[0].accuracy.toFixed(0)}% Acc</span>
            </div>
          </div>
        )}

        {/* #3 Bronze */}
        {topThree[2] && (
          <div className="minimal-card p-4 rounded-xl flex flex-col justify-between space-y-2 order-3 border-amber-700/30 hover:border-amber-600/50">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-amber-700/20 text-amber-400 text-xs font-bold font-mono">
                🥉 Rank #3
              </span>
              <span className="text-xs text-slate-400">{topThree[2].location}</span>
            </div>
            <div>
              <h4 className="text-base font-extrabold text-white">{topThree[2].candidateName}</h4>
              <p className="text-xs text-slate-400 line-clamp-1">{topThree[2].institute}</p>
            </div>
            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="font-mono text-slate-300">{topThree[2].score} / 200</span>
              <span className="text-emerald-400 font-mono font-semibold">{topThree[2].accuracy.toFixed(0)}% Acc</span>
            </div>
          </div>
        )}
      </div>

      {/* User's Current Standing Card */}
      {candidateName && (
        <div className="p-4 rounded-xl minimal-card border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 fade-in-up delay-150">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold text-base">
              {userRankEntry ? `#${userRankEntry.rank}` : '—'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm sm:text-base">{candidateName}</span>
                <button
                  onClick={() => setIsNameModalOpen(true)}
                  className="text-slate-400 hover:text-amber-300 p-0.5"
                  title="Edit Candidate Name"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-400">
                {userExamScore 
                  ? `Completed Today • Score: ${userExamScore.score}/200 (${userExamScore.accuracy.toFixed(0)}% accuracy)`
                  : 'You have not attempted today\'s mock yet. Take mock to establish your rank!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-white/[0.08] transition-colors active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copiedLink ? 'Link Copied!' : 'Share'}
            </button>
            <button
              onClick={onStartDailyMock}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 text-slate-950 font-bold text-xs transition-all hover:opacity-95 active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {userExamScore ? 'Retake Mock' : 'Take Daily Mock'}
            </button>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 fade-in-up delay-200">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidate name, institute, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/60 border border-white/[0.08] focus:border-amber-400/60 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {(['ALL', 'NEPAL', 'INDIA', 'TOP_20'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedFilter === tab
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900/60 border border-white/[0.06] text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'ALL' && 'All Aspirants'}
              {tab === 'NEPAL' && '🇳🇵 Nepal'}
              {tab === 'INDIA' && '🇮🇳 India (Foreign)'}
              {tab === 'TOP_20' && '⭐ Top 20'}
            </button>
          ))}
        </div>
      </div>

      {/* Minimalist Rank Table */}
      <div className="overflow-hidden rounded-xl minimal-card border border-white/[0.08] fade-in-up delay-250">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-900/80 text-slate-400 text-xs border-b border-white/[0.06] uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Institute / College</th>
                <th className="py-3 px-4 text-center">Score</th>
                <th className="py-3 px-4 text-center">Accuracy</th>
                <th className="py-3 px-4 text-center">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredList.slice(0, 50).map((entry) => (
                <tr
                  key={entry.rank + entry.candidateName}
                  className={`transition-colors hover:bg-white/[0.03] ${
                    entry.isCurrentUser ? 'bg-amber-500/10 border-l-2 border-amber-400' : ''
                  }`}
                >
                  <td className="py-3 px-4 font-mono font-bold">
                    {entry.rank === 1 && <span className="text-amber-300">🥇 #1</span>}
                    {entry.rank === 2 && <span className="text-slate-300">🥈 #2</span>}
                    {entry.rank === 3 && <span className="text-amber-500">🥉 #3</span>}
                    {entry.rank > 3 && <span className="text-slate-400">#{entry.rank}</span>}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <span>{entry.candidateName}</span>
                      {entry.isCurrentUser && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-400 text-slate-950">YOU</span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">{entry.location}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-300 text-xs">
                    {entry.institute}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-amber-300">
                    {entry.score}
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-emerald-400">
                    {entry.accuracy.toFixed(0)}%
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-slate-400 text-xs">
                    {formatTimeTaken(entry.timeSpentSeconds)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CandidateNameModal
        initialName={candidateName}
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        onSubmit={(name) => {
          onUpdateCandidateName(name);
          setIsNameModalOpen(false);
        }}
        dailyMockVersion={dailyMockVersion}
        onUpdateDailyQuestions={onUpdateDailyQuestions}
      />
    </div>
  );
};
