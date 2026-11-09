import React from 'react';
import {
  ArrowLeft,
  Flame,
  Headset,
  Wrench,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { LOBS, LobConfig, LobId } from '../data/content';
import { getQuizResults } from '../utils/storage';

interface HotTopicsQueueSelectViewProps {
  onSelectLob: (lob: LobConfig) => void;
  onNavigateHome: () => void;
}

export const HotTopicsQueueSelectView: React.FC<HotTopicsQueueSelectViewProps> = ({
  onSelectLob,
  onNavigateHome,
}) => {
  const quizResults = getQuizResults();

  const getLobStats = (lobId: LobId) => {
    const passedTopics = Object.values(quizResults).filter(
      (r) => r.lobId === lobId && r.passed
    ).length;
    return { passedTopics };
  };

  const getIcon = (id: LobId) => {
    switch (id) {
      case 'csr':
        return <Headset className="w-5 h-5 text-[#BA1E38]" />;
      case 'tsr':
        return <Wrench className="w-5 h-5 text-blue-700" />;
      case 'sales':
        return <TrendingUp className="w-5 h-5 text-emerald-700" />;
      case 'activation':
        return <Sparkles className="w-5 h-5 text-purple-700" />;
      case 'canquest':
        return <ShieldCheck className="w-5 h-5 text-amber-700" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Back to Home Button */}
      <div className="mb-6">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-950 transition-colors group focus-visible:ring-2 focus-visible:ring-[#BA1E38] rounded-md py-1.5 px-3 bg-white border border-stone-200 shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-stone-500 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Main Page</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="mb-8 border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#BA1E38] text-xs font-bold mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>HOT TOPICS DIRECTORY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-950 tracking-tight">
            Hot Topics by Line of Business
          </h1>
          <p className="mt-1 text-sm sm:text-base text-stone-600 max-w-2xl">
            Select your queue below to view current policy updates, call procedures, and take comprehension quizzes.
          </p>
        </div>

        <div className="text-xs text-stone-500 font-semibold bg-stone-100 px-3.5 py-2 rounded-xl shrink-0">
          5 Queues Available
        </div>
      </div>

      {/* The 5 LOB Boxes: Placed next to each other in 5 columns on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 xl:gap-4 mb-12">
        {LOBS.map((lob) => {
          const stats = getLobStats(lob.id);
          return (
            <button
              key={lob.id}
              onClick={() => onSelectLob(lob)}
              className="group relative flex flex-col justify-between text-left p-4 sm:p-4.5 xl:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 focus-visible:ring-3 focus-visible:ring-[#BA1E38] focus-visible:outline-hidden cursor-pointer overflow-hidden min-h-[270px] min-w-0"
              style={{
                borderTop: `4px solid ${lob.accent.primary}`,
              }}
            >
              {/* Blurred Background Image */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <img
                  src={lob.bgImage}
                  alt={lob.name}
                  aria-hidden="true"
                  className="w-full h-full object-cover scale-105 filter blur-[2.5px] opacity-75 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/65 to-white/85 group-hover:from-white/65 group-hover:via-white/55 group-hover:to-white/75 transition-all duration-300" />
              </div>

              <div className="relative z-10 flex-1 min-w-0">
                {/* Header with Icon and clean Topic Count badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div
                    className="p-2 sm:p-2.5 rounded-xl transition-all duration-200 group-hover:scale-105 shadow-xs border border-white/80 backdrop-blur-md shrink-0"
                    style={{ backgroundColor: lob.accent.light }}
                  >
                    {getIcon(lob.id)}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-stone-700 border border-stone-200/80 backdrop-blur-xs shadow-2xs shrink-0">
                    3 Topics
                  </span>
                </div>

                <h2 className="text-lg xl:text-xl font-extrabold text-[#191824] group-hover:text-[#BA1E38] transition-colors drop-shadow-2xs leading-tight">
                  {lob.name}
                </h2>
                <p className="text-[11px] font-bold text-stone-600 mt-0.5 mb-2 leading-tight">
                  {lob.fullName}
                </p>
                <p className="text-xs font-medium text-stone-800 leading-relaxed mb-4 drop-shadow-2xs">
                  {lob.description}
                </p>
              </div>

              {/* Footer with cue & stats */}
              <div className="relative z-10 pt-2.5 border-t border-stone-200/80 bg-white/75 -mx-4 sm:-mx-4.5 xl:-mx-5 -mb-4 sm:-mb-4.5 xl:-mb-5 px-3.5 sm:px-4 xl:px-4.5 py-2.5 rounded-b-2xl backdrop-blur-xs flex items-center justify-between gap-1.5 min-w-0">
                <div className="text-[11px] text-stone-600 font-semibold flex items-center gap-1 min-w-0">
                  {stats.passedTopics > 0 && (
                    <span className="flex items-center gap-1 text-emerald-700 font-bold truncate">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{stats.passedTopics}/3 Passed</span>
                    </span>
                  )}
                </div>
                <div
                  className="flex items-center gap-1 text-[11px] sm:text-xs font-bold transition-all shrink-0 ml-auto group-hover:translate-x-0.5"
                  style={{ color: lob.accent.primary }}
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
