import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  ChevronDown, 
  ChevronUp,
  Heart,
  Play
} from 'lucide-react';

interface FestiveBannerProps {
  onStartExam?: () => void;
  onExploreMocks?: () => void;
}

export const FestiveBanner: React.FC<FestiveBannerProps> = ({ onStartExam, onExploreMocks }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [litDiyas, setLitDiyas] = useState<number[]>([0, 1, 2]); // 3 lit by default
  const [activeBlessingModal, setActiveBlessingModal] = useState<boolean>(false);
  const [selectedSubjectDiya, setSelectedSubjectDiya] = useState<string | null>(null);

  const subjects = [
    { id: 0, name: 'Zoology (40)', symbol: '🦁', blessing: 'Master Animal Tissues, Human Physiology & Developmental Biology! +40 Marks in your pocket.' },
    { id: 1, name: 'Botany (40)', symbol: '🌿', blessing: 'Plant Anatomy, Genetics & Ecology clarity will secure your MBBS scholarship seat.' },
    { id: 2, name: 'Chemistry (50)', symbol: '🧪', blessing: 'Grasp Named Organic Reactions, Equilibrium & Coordination Compounds with 100% accuracy.' },
    { id: 3, name: 'Physics (50)', symbol: '⚡', blessing: 'Mechanics, Modern Physics & Optics formulas will shine brightly in MECEE.' },
    { id: 4, name: 'MAT (20)', symbol: '🧠', blessing: 'Mental Agility Test: 20/20 speed and precision give you the deciding rank edge!' }
  ];

  const handleToggleDiya = (id: number) => {
    if (litDiyas.includes(id)) {
      setLitDiyas(prev => prev.filter(x => x !== id));
      setSelectedSubjectDiya(null);
    } else {
      setLitDiyas(prev => [...prev, id]);
      setSelectedSubjectDiya(subjects[id].blessing);
    }
  };

  const handleLightAllDiyas = () => {
    setLitDiyas([0, 1, 2, 3, 4]);
    setSelectedSubjectDiya('✨ All 5 entrance diyas illuminated! Goddess Durga & Laxmi bless your full 200/200 journey!');
  };

  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl minimal-card border border-amber-500/30 shadow-xl fade-in-up">
      {/* Subtle warm backlight */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-56 h-56 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-red-950/80 via-slate-900 to-amber-950/80 px-4 py-2 border-b border-amber-500/20 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="text-base animate-pulse-subtle">🪔</span>
          <span className="font-bold text-amber-200 tracking-wide text-[11px] sm:text-xs">
            बडा दशैं, तिहार (दिपावली) तथा छठ पर्व २०८१/२०८२ विशेष
          </span>
          <span className="hidden md:inline text-slate-400 text-xs">
            • शुभ विजयादशमी तथा दिपावलीको हार्दिक मङ्गलमय शुभकामना!
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveBlessingModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-red-600/20 to-amber-500/20 hover:from-red-600/30 hover:to-amber-500/30 text-amber-300 border border-amber-500/30 text-[11px] font-semibold transition-all hover:scale-105 active:scale-95"
          >
            <span>🌾</span>
            <span>दशैं आशिष</span>
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-amber-300 p-1 transition-transform"
            title={isExpanded ? 'Collapse banner' : 'Expand banner'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Banner Body */}
      <div className="p-4 sm:p-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold">
                🌾 Bada Dashain
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                🪔 Tihar & Deepawali
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-semibold">
                ☀️ Chhath Parva
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono">
                ✨ Festival Study Sprint
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              <span className="golden-shimmer-text">विजया दशमी, तिहार तथा छठ पर्वको हार्दिक शुभकामना!</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              May the divine blessings of <strong className="text-amber-300 font-semibold">Goddess Durga</strong> bring courage, 
              <strong className="text-amber-300 font-semibold"> Goddess Laxmi</strong> illuminate your medical knowledge, and 
              <strong className="text-amber-300 font-semibold"> Surya Deva</strong> grant unwavering discipline! Maintain daily mock consistency to claim your dream MBBS / BDS scholarship seat in Nepal.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 w-full lg:w-auto">
            {onStartExam && (
              <button
                onClick={onStartExam}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 hover:opacity-95 text-slate-950 font-bold text-xs sm:text-sm shadow-md hover:shadow-amber-500/20 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                <span>🪔</span>
                <span>Take Festive Daily Mock</span>
              </button>
            )}

            {onExploreMocks && (
              <button
                onClick={onExploreMocks}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-amber-500/30 text-amber-300 font-semibold text-xs sm:text-sm transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <span>🌾</span>
                <span>50 Mocks Series</span>
              </button>
            )}
          </div>
        </div>

        {/* Collapsible 5-Pillar Diya Section */}
        {isExpanded && (
          <div className="mt-5 pt-4 border-t border-white/[0.06] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-200">
                <span className="text-sm">🪔</span>
                <span>Light the 5 Pillars of MECEE Entrance ({litDiyas.length}/5 Illuminated)</span>
              </div>
              <button
                onClick={handleLightAllDiyas}
                className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-2 flex items-center gap-1 self-start sm:self-auto"
              >
                <span>✨ Light All 5 Diyas</span>
              </button>
            </div>

            {/* 5 Minimal Subject Diyas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {subjects.map((sub) => {
                const isLit = litDiyas.includes(sub.id);
                return (
                  <button
                    key={sub.id}
                    onClick={() => handleToggleDiya(sub.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-center group ${
                      isLit
                        ? 'bg-amber-500/10 border-amber-400/50 shadow-sm shadow-amber-500/10'
                        : 'bg-slate-900/40 border-white/[0.05] hover:border-slate-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="relative mb-1.5">
                      {isLit ? (
                        <div className="flex flex-col items-center">
                          <div className="w-2.5 h-4 bg-gradient-to-t from-red-600 via-amber-400 to-yellow-100 rounded-t-full animate-diya" />
                          <div className="w-5 h-2 bg-gradient-to-b from-amber-700 to-amber-900 rounded-b-full border-t border-amber-500 shadow-sm" />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <div className="w-0.5 h-1.5 bg-slate-600 rounded-t-full mb-0.5" />
                          <div className="w-5 h-2 bg-slate-800 rounded-b-full border-t border-slate-700" />
                        </div>
                      )}
                    </div>

                    <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      {sub.name}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      {isLit ? '🔥 Active' : 'Tap to Light'}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedSubjectDiya && (
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2 animate-in fade-in duration-200">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{selectedSubjectDiya}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dashain / Tihar Blessing Modal */}
      {activeBlessingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-lg w-full minimal-card bg-slate-900/95 border border-amber-500/60 rounded-2xl p-6 shadow-2xl text-slate-100 space-y-4 fade-in-scale">
            <button
              onClick={() => setActiveBlessingModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-red-600 via-amber-500 to-yellow-300 text-2xl shadow-lg">
                🌾
              </div>
              <h3 className="text-xl font-extrabold text-white">
                विजया दशमी तथा तिहार आशिष
              </h3>
              <p className="text-xs text-amber-300 font-serif italic">
                “आयुर्द्रोणसुते श्रियो दशरथे शत्रुक्षयो राघवे...”
              </p>
            </div>

            <div className="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-white/[0.08] text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p className="font-semibold text-amber-200">
                🇳🇵 Dear MECEE-BL Aspirant:
              </p>
              <p>
                May this sacred festival season of <strong>Bada Dashain (विजया दशमी)</strong> bestow you with victory over doubt, 
                <strong> Tihar & Deepawali (लक्ष्मी पूजा)</strong> illuminate all 200 questions of the syllabus, and 
                <strong> Chhath Parva (सूर्य उपासना)</strong> bless you with unwavering endurance!
              </p>
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-amber-200 text-xs font-medium space-y-1">
                <div>🎯 <strong>Target:</strong> Full Scholarship in IOM Maharajgunj, BPKIHS Dharan, KU School of Medical Sciences, or PAHS.</div>
                <div>🩺 <strong>Dedication Tip:</strong> Solving just 1 full mock paper every day during festival holidays keeps you ahead of 15,000+ competitors!</div>
              </div>
            </div>

            <button
              onClick={() => setActiveBlessingModal(false)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 text-slate-950 font-bold text-sm shadow hover:opacity-95 transition-opacity"
            >
              स्वीकार छ • Accept Blessing & Study
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
