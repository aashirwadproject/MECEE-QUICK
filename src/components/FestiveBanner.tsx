import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Sun, 
  Award, 
  X, 
  Check, 
  Heart, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  ChevronUp,
  Share2
} from 'lucide-react';

interface FestiveBannerProps {
  onStartExam?: () => void;
  onExploreMocks?: () => void;
}

export const FestiveBanner: React.FC<FestiveBannerProps> = ({ onStartExam, onExploreMocks }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [litDiyas, setLitDiyas] = useState<number[]>([0, 1]); // first two lit by default
  const [activeBlessingModal, setActiveBlessingModal] = useState<boolean>(false);
  const [selectedSubjectDiya, setSelectedSubjectDiya] = useState<string | null>(null);

  const subjects = [
    { id: 0, name: 'Zoology (40)', symbol: '🦁', color: 'from-amber-500 to-red-600', blessing: 'Master Animal Tissues, Human Physiology & Developmental Biology! +40 Marks in your pocket.' },
    { id: 1, name: 'Botany (40)', symbol: '🌿', color: 'from-emerald-500 to-teal-700', blessing: 'Plant Anatomy, Genetics & Ecology clarity will secure your MBBS scholarship seat.' },
    { id: 2, name: 'Chemistry (50)', symbol: '🧪', color: 'from-blue-500 to-indigo-700', blessing: 'Grasp Named Organic Reactions, Equilibrium & Coordination Compounds with 100% accuracy.' },
    { id: 3, name: 'Physics (50)', symbol: '⚡', color: 'from-amber-500 to-orange-700', blessing: 'Mechanics, Modern Physics & Optics formulas will shine brightly in MECEE.' },
    { id: 4, name: 'MAT (20)', symbol: '🧠', color: 'from-purple-500 to-pink-700', blessing: 'Mental Agility Test: 20/20 speed and precision give you the deciding rank edge!' }
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
    setSelectedSubjectDiya('✨ All 5 auspicious entrance diyas illuminated! Full 200/200 blessing activated for MECEE!');
  };

  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border border-amber-500/40 shadow-xl festive-card-glow">
      {/* Background Decorative Motifs */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-red-800 via-amber-600 via-yellow-500 to-red-800 px-4 py-1.5 flex items-center justify-between text-xs font-bold text-slate-950 shadow-sm">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="text-sm">🪔</span>
          <span className="tracking-wide uppercase font-extrabold text-[11px] sm:text-xs">
            बडा दशैं, तिहार (दिपावली) तथा छठ पर्व २०८१/२०८२ विशेष
          </span>
          <span className="hidden md:inline text-amber-950">• शुभ विजयादशमी, शुभ दिपावली तथा छठ पूजाको मङ्गलमय शुभकामना!</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveBlessingModal(true)}
            className="flex items-center gap-1 bg-amber-950/20 hover:bg-amber-950/30 text-amber-950 px-2 py-0.5 rounded text-[10px] font-bold transition-colors"
          >
            <span>🌾 आशिष</span>
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-amber-950 hover:text-black p-0.5 transition-transform"
            title={isExpanded ? 'Collapse banner' : 'Expand banner'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Banner Content */}
      <div className="p-4 sm:p-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold">
                <span className="text-sm">🌾</span> Bada Dashain
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
                <span className="text-sm">🪔</span> Tihar & Deepawali
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold">
                <span className="text-sm">☀️</span> Chhath Parva
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-[11px] font-mono font-semibold">
                ✨ Festival Study Sprint
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              <span className="golden-shimmer-text">विजया दशमी, तिहार तथा छठ पर्वको हार्दिक शुभकामना!</span>
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              May the divine blessings of <strong className="text-amber-300">Goddess Durga</strong> bring courage, 
              <strong className="text-amber-300"> Goddess Laxmi</strong> illuminate your medical knowledge, and 
              <strong className="text-amber-300"> Surya Deva</strong> grant unwavering discipline! Keep your daily mock practice consistent to claim your dream MBBS / BDS seat in Nepal.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 w-full lg:w-auto">
            {onStartExam && (
              <button
                onClick={onStartExam}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-slate-950 font-bold text-sm shadow-lg hover:shadow-amber-500/20 transition-all active:scale-95"
              >
                <span>🪔</span>
                <span>Start Festive Mock</span>
              </button>
            )}

            <button
              onClick={() => setActiveBlessingModal(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-amber-500/30 text-amber-300 font-semibold text-sm transition-all active:scale-95"
            >
              <span>🌾</span>
              <span>Festive Blessings</span>
            </button>
          </div>
        </div>

        {/* Expanded Interactive Diya Lighting Section */}
        {isExpanded && (
          <div className="mt-6 pt-5 border-t border-amber-500/20 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-base">🪔</span>
                <span className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                  Tihar / Deepawali Interactive Diya: Light the 5 Pillars of MECEE ({litDiyas.length}/5 Lit)
                </span>
              </div>
              <button
                onClick={handleLightAllDiyas}
                className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-2 flex items-center gap-1"
              >
                <span>✨ Light All 5 Diyas</span>
              </button>
            </div>

            {/* 5 Subject Diyas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {subjects.map((sub) => {
                const isLit = litDiyas.includes(sub.id);
                return (
                  <button
                    key={sub.id}
                    onClick={() => handleToggleDiya(sub.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-center group ${
                      isLit
                        ? 'bg-gradient-to-b from-amber-500/20 via-red-950/40 to-slate-900 border-amber-400/60 shadow-md shadow-amber-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    {/* Diya SVG Flame */}
                    <div className="relative mb-2">
                      {isLit ? (
                        <div className="flex flex-col items-center">
                          {/* Animated flame */}
                          <div className="w-3.5 h-5 bg-gradient-to-t from-red-600 via-amber-400 to-yellow-100 rounded-t-full animate-diya" />
                          {/* Clay base */}
                          <div className="w-6 h-2.5 bg-gradient-to-b from-amber-700 to-amber-900 rounded-b-full border-t border-amber-500 shadow" />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          {/* Unlit wick */}
                          <div className="w-1 h-2 bg-slate-600 rounded-t-full mb-0.5" />
                          {/* Clay base */}
                          <div className="w-6 h-2.5 bg-slate-800 rounded-b-full border-t border-slate-700" />
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

            {/* Diya Blessing Toast Message */}
            {selectedSubjectDiya && (
              <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2 animate-in fade-in">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{selectedSubjectDiya}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dashain / Tihar / Chhath Blessing Modal */}
      {activeBlessingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative max-w-lg w-full bg-slate-900 border-2 border-amber-500/60 rounded-2xl p-6 shadow-2xl text-slate-100 space-y-4">
            <button
              onClick={() => setActiveBlessingModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Icon */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 via-amber-500 to-yellow-400 text-3xl shadow-lg">
                🌾
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                विजया दशमी तथा तिहार आशिष
              </h3>
              <p className="text-xs text-amber-300 font-serif italic">
                “आयुर्द्रोणसुते श्रियो दशरथे शत्रुक्षयो राघवे...”
              </p>
            </div>

            {/* Traditional & Medical Aspirant Blessing */}
            <div className="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p className="font-semibold text-amber-200">
                🇳🇵 Dear MECEE-BL 2027 Aspirant:
              </p>
              <p>
                May this sacred festival season of <strong>Bada Dashain (विजया दशमी)</strong> bestow you with the victory of intellect over doubt, 
                <strong> Tihar & Deepawali (लक्ष्मी पूजा)</strong> illuminate all 200 questions of the syllabus, and 
                <strong> Chhath Parva (सूर्य उपासना)</strong> bless you with unwavering endurance!
              </p>
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-amber-200 text-xs font-medium space-y-1">
                <div>🎯 <strong>Scholarship Resolution:</strong> Maharajgunj Medical Campus (IOM), BPKIHS Dharan, KU School of Medical Sciences, or PAHS.</div>
                <div>🩺 <strong>Dedication Tip:</strong> Even spending 90 minutes daily during festive holidays for 1 Mock Test keeps you ahead of 15,000+ competitors!</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveBlessingModal(false)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 text-slate-950 font-bold text-sm shadow hover:opacity-95"
              >
                स्वीकार छ • Accept Blessing & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
