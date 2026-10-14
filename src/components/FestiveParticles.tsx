import React, { useMemo } from 'react';

interface FestiveParticlesProps {
  enabled?: boolean;
}

export const FestiveParticles: React.FC<FestiveParticlesProps> = ({ enabled = true }) => {
  if (!enabled) return null;

  // Generate 12 gentle floating petals
  const petals = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${(i * 8.3) + (i % 3) * 1.5}%`,
      delay: `${(i * 1.6) % 12}s`,
      duration: `${14 + (i % 6) * 2}s`,
      size: 8 + (i % 3) * 2.5,
      isMarigold: i % 2 === 0,
      opacity: 0.18 + (i % 3) * 0.1
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Drifting Autumn Kite (चङ्गा) in distant sky */}
      <div 
        className="absolute top-16 right-12 opacity-25 hover:opacity-50 transition-opacity animate-kite hidden md:block"
        style={{ animationDuration: '9s' }}
      >
        <div className="relative">
          <div className="w-7 h-7 bg-gradient-to-tr from-rose-500 via-amber-500 to-yellow-300 rotate-45 border border-amber-300/30 shadow-md flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-emerald-600/80 rounded-full" />
          </div>
          <div className="absolute -bottom-4 left-3.5 w-[1px] h-5 bg-amber-400/50 rotate-12" />
        </div>
      </div>

      <div 
        className="absolute top-44 left-10 opacity-20 hover:opacity-45 transition-opacity animate-kite hidden lg:block"
        style={{ animationDuration: '11s', animationDelay: '-4s' }}
      >
        <div className="relative">
          <div className="w-6 h-6 bg-gradient-to-tr from-emerald-500 to-amber-400 rotate-45 border border-emerald-300/30 shadow-md flex items-center justify-center">
            <div className="w-2 h-2 bg-rose-500/80 rounded-full" />
          </div>
          <div className="absolute -bottom-3 left-3 w-[1px] h-4 bg-rose-400/50" />
        </div>
      </div>

      {/* Floating Marigold (सयपत्री) Petals */}
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute pointer-events-none"
          style={{
            left: petal.left,
            top: '-20px',
            animation: `petalFall ${petal.duration} linear infinite`,
            animationDelay: petal.delay,
            opacity: petal.opacity
          }}
        >
          {petal.isMarigold ? (
            <div 
              style={{ width: `${petal.size}px`, height: `${petal.size * 0.7}px` }}
              className="bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 rounded-full transform rotate-45 shadow-sm"
            />
          ) : (
            <div 
              style={{ width: `${petal.size * 0.8}px`, height: `${petal.size * 0.85}px` }}
              className="bg-gradient-to-tr from-red-500 via-rose-500 to-amber-400 rounded-full transform -rotate-30 shadow-sm"
            />
          )}
        </div>
      ))}
    </div>
  );
};
