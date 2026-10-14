import React from 'react';

interface FestiveToranProps {
  onLightDiya?: () => void;
}

export const FestiveToran: React.FC<FestiveToranProps> = ({ onLightDiya }) => {
  return (
    <div className="relative w-full overflow-hidden select-none pointer-events-none z-30">
      {/* Sleek golden-crimson garland string */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500/60 to-transparent shadow-sm" />

      {/* Hanging minimal Toran items */}
      <div className="flex justify-between items-start max-w-7xl mx-auto px-4 sm:px-8 relative pointer-events-auto">
        {/* Traditional Dashain Ping (लिङ्गे पिङ) motif on top-left (hidden on very small screens) */}
        <div 
          className="hidden md:flex flex-col items-center cursor-pointer group pt-0.5 opacity-75 hover:opacity-100 transition-opacity"
          title="दशैंको लिङ्गे पिङ (Traditional Bamboo Swing)"
        >
          {/* Bamboo frame top */}
          <div className="w-10 h-0.5 bg-amber-700/80 rounded" />
          {/* Ropes and swing seat swaying gently */}
          <div className="animate-ping-sway flex flex-col items-center">
            <div className="flex justify-between w-5 h-7 border-x border-amber-600/70" />
            <div className="w-6 h-1 bg-amber-800 rounded-sm shadow-sm" />
            <span className="text-[9px] text-amber-400 font-bold mt-0.5">पिङ 🌾</span>
          </div>
        </div>

        {/* Alternating Marigold & Diya clusters */}
        <div className="flex items-start justify-center gap-4 sm:gap-8 flex-1 py-0.5">
          {Array.from({ length: 9 }).map((_, idx) => {
            const isCenter = idx === 4;
            const isDiyaSpot = idx % 2 === 0;

            return (
              <div 
                key={idx} 
                className={`flex flex-col items-center transition-all duration-300 hover:scale-110 cursor-pointer ${
                  idx > 4 && 'hidden sm:flex'
                } ${idx > 6 && 'hidden md:flex'}`}
                onClick={onLightDiya}
                title="शुभ दशैं-तिहार तोरण"
              >
                {/* Thin thread */}
                <div className="w-[1px] h-2 bg-amber-400/50" />

                {/* Stylized Mango Leaf */}
                <div className="w-2.5 h-3.5 bg-gradient-to-b from-emerald-500/90 to-emerald-700/90 rounded-b-full shadow-sm transform -rotate-6" />

                {/* Marigold Bloom */}
                <div className={`-mt-1 rounded-full flex items-center justify-center shadow-sm transition-transform ${
                  idx % 2 === 0 
                    ? 'w-3.5 h-3.5 bg-gradient-to-tr from-amber-500 to-yellow-300 ring-1 ring-amber-400/40' 
                    : 'w-3 h-3 bg-gradient-to-tr from-rose-500 to-amber-400'
                }`}>
                  <div className="w-1 h-1 rounded-full bg-amber-950/60" />
                </div>

                {/* Hanging glowing Diya */}
                {isDiyaSpot && (
                  <div className="mt-0.5 flex flex-col items-center">
                    <div className="w-2 h-3 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-t-full animate-diya" />
                    <div className="w-3.5 h-1.5 bg-amber-800 rounded-b-full border-t border-amber-600 shadow-sm" />
                  </div>
                )}

                {isCenter && (
                  <div className="mt-1 px-2.5 py-0.5 bg-red-950/80 border border-amber-500/40 rounded-full shadow-lg text-[9px] font-semibold text-amber-200 hidden lg:flex items-center gap-1 backdrop-blur-md">
                    <span>🌾</span>
                    <span className="tracking-wide">दशैं • तिहार • छठ</span>
                    <span>🪔</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Traditional Changa (चङ्गा - Kite) motif on top-right */}
        <div 
          className="hidden md:flex flex-col items-center cursor-pointer group pt-0.5 opacity-80 hover:opacity-100 transition-opacity"
          title="दशैंको चङ्गा (Autumn Kite)"
        >
          <div className="animate-kite flex flex-col items-center">
            <div className="w-5 h-5 bg-gradient-to-tr from-rose-500 to-amber-400 rotate-45 border border-amber-300/40 shadow-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
            </div>
            <div className="w-0.5 h-3 bg-amber-400/60 mt-2" />
            <span className="text-[9px] text-amber-400 font-bold">चङ्गा 🪁</span>
          </div>
        </div>
      </div>
    </div>
  );
};
