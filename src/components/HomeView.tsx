import React from 'react';
import {
  Headset,
  Wrench,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Clock,
  Sparkle,
} from 'lucide-react';
import { LOBS, LobConfig, LobId, SETTINGS } from '../data/content';
import { getQuizResults, getScenarioResults } from '../utils/storage';
import { GlobalSearchBar } from './GlobalSearchBar';
import { SearchResultItem } from '../utils/search';
import { PomegranLogo } from './PomegranLogo';

interface HomeViewProps {
  onSelectLob: (lob: LobConfig) => void;
  lastLobId: LobId | null;
  onOpenTrainer: () => void;
  onSelectSearchResult: (item: SearchResultItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectLob,
  lastLobId,
  onOpenTrainer,
  onSelectSearchResult,
}) => {
  const quizResults = getQuizResults();
  const scenarioResults = getScenarioResults();

  const getLobStats = (lobId: LobId) => {
    const passedTopics = Object.values(quizResults).filter(
      (r) => r.lobId === lobId && r.passed
    ).length;
    const completedScenarios = Object.values(scenarioResults).filter(
      (s) => s.lobId === lobId
    ).length;
    return { passedTopics, completedScenarios };
  };

  const getIcon = (id: LobId) => {
    switch (id) {
      case 'csr':
        return <Headset className="w-7 h-7 text-[#BA3142]" />;
      case 'tsr':
        return <Wrench className="w-7 h-7 text-blue-700" />;
      case 'sales':
        return <TrendingUp className="w-7 h-7 text-emerald-700" />;
      case 'activation':
        return <Sparkles className="w-7 h-7 text-purple-700" />;
      case 'canquest':
        return <ShieldCheck className="w-7 h-7 text-amber-700" />;
    }
  };

  const lastLob = LOBS.find((l) => l.id === lastLobId);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Welcome Hero with Official Pomegran Brand */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-3.5 px-5 py-2.5 rounded-2xl bg-white border border-[#F4B8C1] shadow-xs mb-6">
            <PomegranLogo size="md" color="#BA1E38" />
            <span className="text-stone-300">·</span>
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              Agent Portal
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 tracking-tight leading-tight">
            Agent Hub
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-stone-600 font-medium">
            {SETTINGS.welcomeLine}
          </p>

          {/* Global Search Bar */}
          <GlobalSearchBar onSelectResult={onSelectSearchResult} />

          {/* Quick Continue Shortcut if returning user */}
          {lastLob && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => onSelectLob(lastLob)}
                className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-900 border border-stone-200/90 shadow-xs transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#BA1E38] focus-visible:outline-hidden cursor-pointer"
              >
                <div
                  className="w-3 h-3 rounded-full shrink-0 ring-2 ring-stone-200"
                  style={{ backgroundColor: lastLob.accent.primary }}
                />
                <span className="text-sm font-semibold">
                  Continue as <span className="underline decoration-[#BA1E38]/30 underline-offset-4">{lastLob.name} ({lastLob.fullName})</span>
                </span>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          )}
        </div>

        {/* 5 LOB Boxes Grid: 3 on row 1, 2 centered on row 2 (desktop) */}
        <div className="max-w-5xl mx-auto">
          {/* Row 1: 3 boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {LOBS.slice(0, 3).map((lob) => {
              const stats = getLobStats(lob.id);
              return (
                <button
                  key={lob.id}
                  onClick={() => onSelectLob(lob)}
                  className="group relative flex flex-col justify-between text-left p-6 sm:p-7 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 focus-visible:ring-3 focus-visible:ring-[#BA1E38] focus-visible:outline-hidden cursor-pointer overflow-hidden min-h-[270px]"
                  style={{
                    borderTop: `4px solid ${lob.accent.primary}`,
                  }}
                >
                  {/* Blurred Background Image - Clearly visible with soft focus & gentle tint for readability */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <img
                      src={lob.bgImage}
                      alt={lob.name}
                      aria-hidden="true"
                      className="w-full h-full object-cover scale-105 filter blur-[2.5px] opacity-75 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500 ease-out"
                    />
                    {/* Balanced translucent scrim: lets image details and colors shine through while keeping text crisp */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/80 group-hover:from-white/60 group-hover:via-white/50 group-hover:to-white/70 transition-all duration-300" />
                  </div>

                  <div className="relative z-10 flex-1">
                    {/* Header with Icon and LOB name */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="p-3 rounded-xl transition-all duration-200 group-hover:scale-105 shadow-xs border border-white/80 backdrop-blur-md"
                        style={{ backgroundColor: lob.accent.light }}
                      >
                        {getIcon(lob.id)}
                      </div>
                      <span
                        className="text-xs font-bold tracking-wider px-2.5 py-1 rounded-md uppercase backdrop-blur-md border border-white/80 shadow-xs"
                        style={{
                          backgroundColor: lob.accent.tagBg,
                          color: lob.accent.text,
                        }}
                      >
                        {lob.name}
                      </span>
                    </div>

                    <h2 className="text-xl font-extrabold text-[#191824] group-hover:text-[#BA1E38] transition-colors drop-shadow-2xs">
                      {lob.name}
                    </h2>
                    <p className="text-xs font-bold text-stone-600 mb-2">
                      {lob.fullName}
                    </p>
                    <p className="text-sm font-medium text-stone-800 leading-relaxed mb-6 drop-shadow-2xs">
                      {lob.description}
                    </p>
                  </div>

                  {/* Footer with cue & stats */}
                  <div className="relative z-10 pt-3 border-t border-stone-200/80 bg-white/65 -mx-6 sm:-mx-7 -mb-6 sm:-mb-7 px-6 sm:px-7 py-3 rounded-b-2xl backdrop-blur-xs flex items-center justify-between">
                    <div className="text-xs text-stone-600 font-semibold flex items-center gap-2">
                      {stats.passedTopics > 0 && (
                        <span className="flex items-center gap-1 text-emerald-700 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{stats.passedTopics}/3 Topics</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-stone-900 group-hover:text-[#BA1E38] group-hover:translate-x-0.5 transition-all">
                      <span>Open workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Row 2: 2 centered boxes (desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {LOBS.slice(3, 5).map((lob) => {
              const stats = getLobStats(lob.id);
              return (
                <button
                  key={lob.id}
                  onClick={() => onSelectLob(lob)}
                  className="group relative flex flex-col justify-between text-left p-6 sm:p-7 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 focus-visible:ring-3 focus-visible:ring-[#BA1E38] focus-visible:outline-hidden cursor-pointer overflow-hidden min-h-[270px]"
                  style={{
                    borderTop: `4px solid ${lob.accent.primary}`,
                  }}
                >
                  {/* Blurred Background Image - Clearly visible with soft focus & gentle tint for readability */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <img
                      src={lob.bgImage}
                      alt={lob.name}
                      aria-hidden="true"
                      className="w-full h-full object-cover scale-105 filter blur-[2.5px] opacity-75 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500 ease-out"
                    />
                    {/* Balanced translucent scrim: lets image details and colors shine through while keeping text crisp */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/80 group-hover:from-white/60 group-hover:via-white/50 group-hover:to-white/70 transition-all duration-300" />
                  </div>

                  <div className="relative z-10 flex-1">
                    {/* Header with Icon and LOB name */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="p-3 rounded-xl transition-all duration-200 group-hover:scale-105 shadow-xs border border-white/80 backdrop-blur-md"
                        style={{ backgroundColor: lob.accent.light }}
                      >
                        {getIcon(lob.id)}
                      </div>
                      <span
                        className="text-xs font-bold tracking-wider px-2.5 py-1 rounded-md uppercase backdrop-blur-md border border-white/80 shadow-xs"
                        style={{
                          backgroundColor: lob.accent.tagBg,
                          color: lob.accent.text,
                        }}
                      >
                        {lob.name}
                      </span>
                    </div>

                    <h2 className="text-xl font-extrabold text-[#191824] group-hover:text-[#BA1E38] transition-colors drop-shadow-2xs">
                      {lob.name}
                    </h2>
                    <p className="text-xs font-bold text-stone-600 mb-2">
                      {lob.fullName}
                    </p>
                    <p className="text-sm font-medium text-stone-800 leading-relaxed mb-6 drop-shadow-2xs">
                      {lob.description}
                    </p>
                  </div>

                  {/* Footer with cue & stats */}
                  <div className="relative z-10 pt-3 border-t border-stone-200/80 bg-white/65 -mx-6 sm:-mx-7 -mb-6 sm:-mb-7 px-6 sm:px-7 py-3 rounded-b-2xl backdrop-blur-xs flex items-center justify-between">
                    <div className="text-xs text-stone-600 font-semibold flex items-center gap-2">
                      {stats.passedTopics > 0 && (
                        <span className="flex items-center gap-1 text-emerald-700 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{stats.passedTopics}/3 Topics</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-stone-900 group-hover:text-[#BA1E38] group-hover:translate-x-0.5 transition-all">
                      <span>Open workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer link to Ask the Trainer */}
      <footer className="mt-16 border-t border-stone-200/80 bg-stone-50/80 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-900">Pomegran Account</span>
            <span className="text-stone-300">·</span>
            <span>Training & Quality Operations</span>
            <span className="text-stone-300">·</span>
            <span>{SETTINGS.documentDate}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-stone-600">Need immediate help or clarification?</span>
            <button
              onClick={onOpenTrainer}
              className="inline-flex items-center gap-1.5 font-bold text-[#BA1E38] hover:text-[#9B152B] underline decoration-[#F4B8C1] underline-offset-4 focus-visible:ring-2 focus-visible:ring-[#BA1E38] focus-visible:outline-hidden rounded-sm cursor-pointer transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-[#BA1E38]" />
              <span>Ask the Trainer</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
