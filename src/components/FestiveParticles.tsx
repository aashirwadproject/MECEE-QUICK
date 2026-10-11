import React, { useMemo } from 'react';

interface FestiveParticlesProps {
  enabled?: boolean;
}

export const FestiveParticles: React.FC<FestiveParticlesProps> = ({ enabled = true }) => {
  if (!enabled) return null;

  // Generate 14 floating petals and 2 gentle kites
  const petals = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${(i * 7.1) + Math.random() * 3}%`,
      delay: `${(i * 1.4) % 12}s`,
      duration: `${14 + (i % 8) * 2}s`,
      size: 10 + (i % 4) * 3,
      isMarigold: i % 2 === 0,
      opacity: 0.25 + (i % 3) * 0.15
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gentle Floating Kites (चङ्गा) */}
      <div 
        className="absolute top-12 right-12 opacity-30 sm:opacity-50 animate-kite hidden md:block"
        style={{ animationDuration: '8s' }}
      >
        <div className="relative">
          {/* Diamond kite */}
          <div className="w-10 h-10 bg-gradient-to-tr from-red-600 via-amber-500 to-yellow-400 rotate-45 border border-amber-300/40 shadow-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-teal-600/80 rounded-full" />
          </div>
          {/* Kite tail */}
          <div className="absolute -bottom-6 left-5 w-0.5 h-7 bg-amber-400/60 rotate-12 flex flex-col items-center justify-between">
            <div className="w-1.5 h-1 bg-red-500 rounded-full" />
            <div className="w-1.5 h-1 bg-amber-400 rounded-full" />
          </div>
        </div>
      </div>

      <div 
        className="absolute top-36 left-8 opacity-25 sm:opacity-40 animate-kite hidden lg:block"
        style={{ animationDuration: '10s', animationDelay: '-3s' }}
      >
        <div className="relative">
          {/* Diamond kite */}
          <div className="w-8 h-8 bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 rotate-45 border border-emerald-300/40 shadow-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-red-600/80 rounded-full" />
          </div>
          {/* Kite tail */}
          <div className="absolute -bottom-5 left-4 w-0.5 h-6 bg-red-400/60 rotate-6 flex flex-col items-center justify-between">
            <div className="w-1.5 h-1 bg-yellow-400 rounded-full" />
            <div className="w-1.5 h-1 bg-emerald-400 rounded-full" />
          </div>
        </div>
      </div>

      {/* Floating Marigold Petals (सयपत्रीको पात) */}
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
            // Golden Marigold Petal
            <div 
              style={{ width: `${petal.size}px`, height: `${petal.size * 0.7}px` }}
              className="bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-500 rounded-full transform rotate-45 shadow-sm"
            />
          ) : (
            // Auspicious Crimson Red / Jamara green Petal
            <div 
              style={{ width: `${petal.size * 0.8}px`, height: `${petal.size * 0.9}px` }}
              className="bg-gradient-to-tr from-red-600 via-rose-500 to-amber-400 rounded-full transform -rotate-30 shadow-sm"
            />
          )}
        </div>
      ))}
    </div>
  );
};
