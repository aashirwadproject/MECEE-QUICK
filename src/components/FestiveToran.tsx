import React from 'react';

interface FestiveToranProps {
  onLightDiya?: () => void;
  diyaLitCount?: number;
}

export const FestiveToran: React.FC<FestiveToranProps> = ({ onLightDiya, diyaLitCount = 5 }) => {
  return (
    <div className="relative w-full overflow-hidden select-none pointer-events-none z-30">
      {/* Decorative top garland rope */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-red-600 via-amber-500 via-emerald-600 to-amber-600 shadow-sm" />

      {/* Hanging Toran patterns across the top */}
      <div className="flex justify-between items-start max-w-7xl mx-auto px-2 sm:px-6 relative pointer-events-auto">
        {/* Flower + Leaf hanging clusters */}
        {Array.from({ length: 9 }).map((_, idx) => {
          const isCenter = idx === 4;
          const isDiyaSpot = idx % 2 === 0;

          return (
            <div 
              key={idx} 
              className={`flex flex-col items-center transition-transform hover:scale-110 duration-200 cursor-pointer ${
                idx > 4 && 'hidden sm:flex'
              } ${idx > 6 && 'hidden md:flex'}`}
              onClick={onLightDiya}
              title="Auspicious Festive Toran (सयपत्री फूल, आँपको पात र दीयो)"
            >
              {/* String */}
              <div className="w-0.5 h-2 bg-amber-400/80" />

              {/* Mango Leaf */}
              <div className="w-3.5 h-5 bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-b-full shadow-sm transform -rotate-6" />

              {/* Marigold flower bloom */}
              <div className={`-mt-1 rounded-full flex items-center justify-center shadow-md ${
                idx % 2 === 0 
                  ? 'w-5 h-5 bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-500' 
                  : 'w-4 h-4 bg-gradient-to-tr from-red-600 via-orange-400 to-amber-500'
              }`}>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-900/60" />
              </div>

              {/* Center or Diya spots */}
              {isDiyaSpot && (
                <div className="mt-0.5 flex flex-col items-center">
                  {/* Diya Flame */}
                  <div className="w-2.5 h-3.5 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-t-full animate-diya" />
                  {/* Diya Clay Pot */}
                  <div className="w-4 h-2 bg-gradient-to-b from-amber-700 to-amber-900 rounded-b-full border-t border-amber-600 shadow-sm" />
                </div>
              )}

              {isCenter && (
                <div className="mt-0.5 px-2 py-0.5 bg-red-900/90 border border-amber-500/50 rounded-full shadow-lg text-[9px] font-bold text-amber-200 hidden lg:flex items-center gap-1 whitespace-nowrap">
                  <span>🌾</span>
                  <span>विजयादशमी • तिहार • छठ</span>
                  <span>🪔</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
