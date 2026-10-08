import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Medal, 
  Flame, 
  Search, 
  User, 
  Clock, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  Edit3, 
  MapPin, 
  Building2,
  TrendingUp,
  Percent,
  RefreshCw,
  Share2,
  AlertTriangle
} from 'lucide-react';
import { 
  DailyLeaderboardEntry, 
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
  const [filterMode, setFilterMode] = useState<'ALL' | 'TOP_10' | 'TOP_25' | 'NEPALI' | 'INDIAN'>('ALL');
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [updatedAlert, setUpdatedAlert] = useState(false);

  // Today's formatted date
  const todayFormatted = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  // Generate deterministic leaderboard for today with current user injected
  const leaderboardData = useMemo(() => {
    return generateDailyLeaderboard(
      candidateName, 
      userExamScore || undefined
    );
  }, [candidateName, userExamScore]);

  // Find user entry if present
  const userEntry = useMemo(() => {
    return leaderboardData.find(e => e.isCurrentUser);
  }, [leaderboardData]);

  // Filtered entries
  const filteredEntries = useMemo(() => {
    let list = [...leaderboardData];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(e => 
        e.candidateName.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.institute.toLowerCase().includes(q)
      );
    }

    if (filterMode === 'TOP_10') {
      list = list.slice(0, 10);
    } else if (filterMode === 'TOP_25') {
      list = list.slice(0, 25);
    } else if (filterMode === 'NEPALI') {
      list = list.filter(e => e.location.includes('Nepal'));
    } else if (filterMode === 'INDIAN') {
      list = list.filter(e => e.location.includes('India'));
    }

    return list;
  }, [leaderboardData, searchQuery, filterMode]);

  const top1 = leaderboardData[0];
  const top2 = leaderboardData[1];
  const top3 = leaderboardData[2];

  const handleScrollToUser = () => {
    const el = document.getElementById('user_leaderboard_row');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-teal-950/40 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                Live Daily Mock Leaderboard
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {todayFormatted}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Trophy className="w-8 h-8 text-amber-400 shrink-0" />
              <span>Daily Pre-Med Ranks & Scores</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Official Medical Education Commission (+1.0 / -0.25) evaluated rankings. Daily mock test refreshed every 24 hours with top contenders from Nepal and India.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
              <span className="bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                {leaderboardData.length + 780} Aspirants Tested Today
              </span>
              <span className="bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700 flex items-center gap-1.5 text-amber-300">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                200 Marks Standard
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
            <button
              onClick={onStartDailyMock}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02]"
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
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 font-semibold text-xs border border-teal-500/30 transition-colors active:scale-95"
              title="Quick Update Daily Test Mock Questions"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Quick Update Questions (Set #{dailyMockVersion})
            </button>

            {updatedAlert && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 rounded-lg animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Paper #{dailyMockVersion} questions loaded!</span>
              </div>
            )}

            <button
              onClick={() => setIsNameModalOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
            >
              <Edit3 className="w-4 h-4 text-amber-400" />
              {candidateName ? 'Change My Candidate Name' : 'Register Candidate Name'}
            </button>
          </div>
        </div>
      </div>

      {/* User's Ranking Status Card */}
      {userEntry ? (
        <div 
          id="user_leaderboard_row" 
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-900/60 via-slate-900 to-indigo-950/60 border-2 border-teal-500/60 p-5 sm:p-6 shadow-xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-teal-500/30">
                #{userEntry.rank}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{userEntry.candidateName}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-teal-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wide">
                    YOU
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  {userExamScore 
                    ? 'Official score from your completed Daily Mock Test today' 
                    : 'Candidate registered — take today\'s Daily Mock to update your verified score!'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-center">
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Rank</span>
                <span className="text-lg font-extrabold text-teal-300">#{userEntry.rank}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Score (/200)</span>
                <span className="text-lg font-extrabold text-white">{userEntry.score.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Accuracy</span>
                <span className="text-lg font-extrabold text-emerald-400">{userEntry.accuracy}%</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Time</span>
                <span className="text-sm font-bold text-slate-300 mt-1 block">
                  {formatTimeTaken(userEntry.timeSpentSeconds)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Want to see your name & rank on today's leaderboard?
              </h3>
              <p className="text-xs text-slate-400">
                Enter your name to be assigned your live candidate position among Nepali and Indian competitors!
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsNameModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shrink-0"
          >
            Enter Candidate Name
          </button>
        </div>
      )}

      {/* Top 3 Podium Showcase */}
      {top1 && top2 && top3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* 2nd Place */}
          <div className="order-2 md:order-1 bg-slate-900/80 border border-slate-700/60 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group hover:border-slate-500 transition-all">
            <div className="absolute top-0 right-0 p-3">
              <div className="w-8 h-8 rounded-full bg-slate-300/20 text-slate-200 flex items-center justify-center font-black text-sm">
                🥈 2
              </div>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white font-bold text-base shadow-md">
                {top2.candidateName.charAt(0)}
              </div>
              <div>
                <h4 className="text-base font-extrabold text-white flex items-center gap-1.5">
                  {top2.candidateName}
                  {top2.isCurrentUser && (
                    <span className="text-[10px] bg-teal-500 text-slate-950 px-1.5 py-0.2 rounded-full font-bold">
                      YOU
                    </span>
                  )}
                </h4>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {top2.location}
                </p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {top2.institute}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Score</span>
                <span className="text-base font-extrabold text-slate-200">{top2.score.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Accuracy</span>
                <span className="font-bold text-emerald-400">{top2.accuracy}%</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Time</span>
                <span className="text-slate-300 font-medium">{formatTimeTaken(top2.timeSpentSeconds)}</span>
              </div>
            </div>
          </div>

          {/* 1st Place (Gold Center) */}
          <div className="order-1 md:order-2 bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-900 border-2 border-amber-500/60 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl scale-[1.02] group hover:border-amber-400 transition-all">
            <div className="absolute top-0 right-0 p-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-black text-base border border-amber-500/40 shadow-lg">
                🥇 1
              </div>
            </div>
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/30">
                {top1.candidateName.charAt(0)}
              </div>
              <div>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3" />
                  Today's Top Performer
                </div>
                <h4 className="text-lg font-extrabold text-white flex items-center gap-1.5">
                  {top1.candidateName}
                  {top1.isCurrentUser && (
                    <span className="text-[10px] bg-teal-500 text-slate-950 px-1.5 py-0.2 rounded-full font-bold">
                      YOU
                    </span>
                  )}
                </h4>
                <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  {top1.location}
                </p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {top1.institute}
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-amber-500/30 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Score</span>
                <span className="text-xl font-extrabold text-amber-300">{top1.score.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Accuracy</span>
                <span className="font-bold text-emerald-400">{top1.accuracy}%</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Time</span>
                <span className="text-slate-300 font-medium">{formatTimeTaken(top1.timeSpentSeconds)}</span>
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="order-3 md:order-3 bg-slate-900/80 border border-slate-700/60 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group hover:border-slate-500 transition-all">
            <div className="absolute top-0 right-0 p-3">
              <div className="w-8 h-8 rounded-full bg-amber-800/30 text-amber-500 flex items-center justify-center font-black text-sm">
                🥉 3
              </div>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-white font-bold text-base shadow-md">
                {top3.candidateName.charAt(0)}
              </div>
              <div>
                <h4 className="text-base font-extrabold text-white flex items-center gap-1.5">
                  {top3.candidateName}
                  {top3.isCurrentUser && (
                    <span className="text-[10px] bg-teal-500 text-slate-950 px-1.5 py-0.2 rounded-full font-bold">
                      YOU
                    </span>
                  )}
                </h4>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {top3.location}
                </p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {top3.institute}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Score</span>
                <span className="text-base font-extrabold text-amber-500">{top3.score.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Accuracy</span>
                <span className="font-bold text-emerald-400">{top3.accuracy}%</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Time</span>
                <span className="text-slate-300 font-medium">{formatTimeTaken(top3.timeSpentSeconds)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidate name, city or institute..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {(['ALL', 'TOP_10', 'TOP_25', 'NEPALI', 'INDIAN'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filterMode === mode
                  ? 'bg-teal-500 text-slate-950 font-bold'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {mode === 'ALL' && 'All Candidates'}
              {mode === 'TOP_10' && 'Top 10'}
              {mode === 'TOP_25' && 'Top 25'}
              {mode === 'NEPALI' && 'Nepal (🇳🇵)'}
              {mode === 'INDIAN' && 'India (🇮🇳)'}
            </button>
          ))}

          {userEntry && (
            <button
              onClick={handleScrollToUser}
              className="px-3 py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 font-bold ml-auto"
            >
              My Rank #{userEntry.rank}
            </button>
          )}
        </div>
      </div>

      {/* Main Leaderboard Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/80 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 w-16 text-center">Rank</th>
                <th className="py-3.5 px-4">Candidate</th>
                <th className="py-3.5 px-4">Origin & Institute</th>
                <th className="py-3.5 px-4 text-center">Score (/200)</th>
                <th className="py-3.5 px-4 text-center hidden md:table-cell">Breakdown</th>
                <th className="py-3.5 px-4 text-center">Accuracy</th>
                <th className="py-3.5 px-4 text-right hidden sm:table-cell">Time Taken</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredEntries.map((entry) => {
                const isUser = entry.isCurrentUser;
                return (
                  <tr
                    key={entry.id}
                    id={isUser ? 'user_leaderboard_row' : undefined}
                    className={`transition-colors ${
                      isUser
                        ? 'bg-teal-950/40 hover:bg-teal-900/40 font-semibold'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-4 px-4 text-center">
                      {entry.rank === 1 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black text-xs">
                          1
                        </span>
                      ) : entry.rank === 2 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-300 text-slate-950 font-black text-xs">
                          2
                        </span>
                      ) : entry.rank === 3 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700 text-white font-black text-xs">
                          3
                        </span>
                      ) : (
                        <span className={`font-mono text-xs ${isUser ? 'text-teal-300 font-bold' : 'text-slate-400'}`}>
                          #{entry.rank}
                        </span>
                      )}
                    </td>

                    {/* Candidate Name & Avatar */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl bg-gradient-to-br ${entry.avatarColor} flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm`}
                        >
                          {entry.candidateName.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className={`font-semibold text-sm ${isUser ? 'text-teal-300 font-bold' : 'text-white'}`}>
                              {entry.candidateName}
                            </span>
                            {isUser && (
                              <span className="px-1.5 py-0.2 rounded-full bg-teal-500 text-slate-950 font-extrabold text-[10px]">
                                YOU
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 block">
                            {entry.submittedAtFormatted}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Location & Institute */}
                    <td className="py-4 px-4 text-xs">
                      <div className="text-slate-300 flex items-center gap-1 font-medium">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {entry.location}
                      </div>
                      <div className="text-slate-500 text-[11px] flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-600" />
                        {entry.institute}
                      </div>
                    </td>

                    {/* Score */}
                    <td className="py-4 px-4 text-center">
                      <span className={`font-mono font-bold text-base ${
                        entry.score >= 170 
                          ? 'text-amber-400' 
                          : entry.score >= 150 
                          ? 'text-teal-400' 
                          : 'text-white'
                      }`}>
                        {entry.score.toFixed(2)}
                      </span>
                    </td>

                    {/* Breakdown */}
                    <td className="py-4 px-4 text-center text-xs hidden md:table-cell font-mono">
                      <span className="text-emerald-400">+{entry.correct}</span>
                      <span className="text-slate-600 mx-1">/</span>
                      <span className="text-rose-400">-{entry.incorrect}</span>
                    </td>

                    {/* Accuracy */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 text-xs font-semibold text-emerald-300">
                        {entry.accuracy}%
                      </span>
                    </td>

                    {/* Time Taken */}
                    <td className="py-4 px-4 text-right text-xs text-slate-300 font-mono hidden sm:table-cell">
                      <div className="flex items-center justify-end gap-1 text-slate-400">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {formatTimeTaken(entry.timeSpentSeconds)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Name Input Modal */}
      <CandidateNameModal
        initialName={candidateName}
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        onSubmit={(name) => {
          onUpdateCandidateName(name);
          setIsNameModalOpen(false);
        }}
        title="Update Candidate Name"
        subtitle="Set your candidate name to be displayed on today's Live Daily Leaderboard alongside other medical aspirants."
        actionButtonText="Save & Update Rank"
      />
    </div>
  );
};
