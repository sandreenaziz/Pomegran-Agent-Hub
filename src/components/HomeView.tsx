import React, { useState, useEffect } from 'react';
import {
  Flame,
  Users2,
  GraduationCap,
  Video,
  ArrowRight,
  HelpCircle,
  Sparkles,
  AlertOctagon,
  X,
  Bell,
  Wrench,
  ChevronRight,
} from 'lucide-react';
import { LOBS, LobConfig, LobId, SETTINGS, VIDEO_CATEGORIES } from '../data/content';
import { GlobalSearchBar } from './GlobalSearchBar';
import { SearchResultItem } from '../utils/search';
import { PomegranLogo } from './PomegranLogo';

import hotTopicsBg from '../assets/images/box_hottopics_bg_1793033569356.jpg';
import scenariosBg from '../assets/images/box_scenarios_bg_1793033569484.jpg';
import softSkillsBg from '../assets/images/box_softskills_bg_1793033571209.jpg';
import videosBg from '../assets/images/box_videos_bg_1793033571091.jpg';

export type ModuleType =
  | 'hot-topics'
  | 'scenarios'
  | 'soft-skills'
  | 'videos'
  | 'ask-trainer';

export interface UrgentAnnouncement {
  id: string;
  type: 'urgent-policy' | 'maintenance' | 'info';
  title: string;
  message: string;
  effectiveDate?: string;
  actionLabel?: string;
  actionModule?: ModuleType;
}

const ACTIVE_ANNOUNCEMENT: UrgentAnnouncement = {
  id: 'announcement_policy_oct_2026',
  type: 'urgent-policy',
  title: 'Urgent Policy Update · All Queues',
  message: 'Fiber optic escalation criteria and cancellation retention guidelines have been updated for Q4 2026. Please review hot topics before your shift.',
  effectiveDate: 'Effective immediately',
  actionLabel: 'Review Hot Topics',
  actionModule: 'hot-topics',
};

const DISMISSED_BANNER_KEY = 'pomegran_dismissed_banner_id';

interface HomeViewProps {
  onSelectLob: (lob: LobConfig, targetModule?: ModuleType) => void;
  onOpenModule?: (module: ModuleType, preferredLobId?: LobId) => void;
  onSelectHotTopics: () => void;
  onOpenVideoCategory?: (categoryName: string) => void;
  lastLobId: LobId | null;
  onOpenTrainer: () => void;
  onSelectSearchResult: (item: SearchResultItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectLob,
  onOpenModule,
  onSelectHotTopics,
  onOpenVideoCategory,
  lastLobId,
  onOpenTrainer,
  onSelectSearchResult,
}) => {
  const [isBannerDismissed, setIsBannerDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(DISMISSED_BANNER_KEY) === ACTIVE_ANNOUNCEMENT.id;
    } catch {
      return false;
    }
  });

  const handleDismissBanner = () => {
    setIsBannerDismissed(true);
    try {
      localStorage.setItem(DISMISSED_BANNER_KEY, ACTIVE_ANNOUNCEMENT.id);
    } catch (e) {
      console.error('Failed to save dismissed banner', e);
    }
  };

  const handleBannerAction = () => {
    if (ACTIVE_ANNOUNCEMENT.actionModule === 'hot-topics') {
      onSelectHotTopics();
    } else if (ACTIVE_ANNOUNCEMENT.actionModule) {
      onOpenModule?.(ACTIVE_ANNOUNCEMENT.actionModule, lastLobId || 'csr');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      {/* Top Urgent Policy & Maintenance Announcement Banner */}
      {!isBannerDismissed && (
        <aside
          aria-label="Urgent Announcement"
          className="bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600 text-white shadow-md border-b border-amber-600/40 sticky top-16 z-30 animate-fadeIn"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black/15 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 ring-1 ring-white/20">
                  <AlertOctagon className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs sm:text-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold tracking-wide uppercase text-[11px] px-2 py-0.5 rounded-md bg-black/25 text-amber-100">
                      {ACTIVE_ANNOUNCEMENT.title}
                    </span>
                    {ACTIVE_ANNOUNCEMENT.effectiveDate && (
                      <span className="text-[11px] font-medium text-amber-100/90 hidden sm:inline">
                        · {ACTIVE_ANNOUNCEMENT.effectiveDate}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-white/95 leading-snug">
                    {ACTIVE_ANNOUNCEMENT.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center pl-11 sm:pl-0">
                {ACTIVE_ANNOUNCEMENT.actionLabel && (
                  <button
                    type="button"
                    onClick={handleBannerAction}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-stone-900 hover:bg-stone-100 font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <span>{ACTIVE_ANNOUNCEMENT.actionLabel}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleDismissBanner}
                  aria-label="Dismiss announcement"
                  title="Dismiss announcement"
                  className="p-1.5 rounded-lg bg-black/15 hover:bg-black/30 text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Welcome Hero with Official Pomegran Brand */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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
        </div>

        {/* 4 CORE LEARNING PILLARS (Hot Topics, Real Customer Scenarios, Soft Skills Academy, Microlearning Videos) */}
        <section className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-3 border-b border-stone-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#BA1E38] text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CORE TRAINING PILLARS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
                Learning & Practice Academy
              </h2>
              <p className="text-sm text-stone-600 mt-1">
                Select a learning module below to explore queue hot topics, interactive customer scenarios, soft skills lessons, and training videos.
              </p>
            </div>
            <div className="text-xs text-stone-500 font-semibold bg-stone-100 px-3 py-1.5 rounded-lg shrink-0">
              4 Core Pillars
            </div>
          </div>

          {/* 4 Core Pillars Grid with Blurred Image Backgrounds */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* BOX 1: Hot Topics */}
            <div
              onClick={onSelectHotTopics}
              className="flex flex-col justify-between bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 relative overflow-hidden group cursor-pointer min-h-[290px]"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#BA1E38] z-20" />

              {/* Blurred Thematic Background Image */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <img
                  src={hotTopicsBg}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover scale-105 filter blur-[2.5px] opacity-75 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/85 group-hover:from-white/70 group-hover:via-white/60 group-hover:to-white/80 transition-all duration-300" />
              </div>

              <div className="relative z-10 flex-1 flex flex-col justify-between mb-5">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-50/90 text-[#BA1E38] flex items-center justify-center border border-rose-100 shadow-2xs backdrop-blur-xs group-hover:scale-105 transition-transform">
                      <Flame className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-50/90 text-[#BA1E38] border border-rose-200 backdrop-blur-xs shadow-2xs">
                      5 Queues
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-stone-950 group-hover:text-[#BA1E38] transition-colors mb-1.5 drop-shadow-2xs">
                    Hot Topics
                  </h3>
                  <p className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                    Current Policies & Knowledge Quizzes
                  </p>
                  <p className="text-sm text-stone-800 font-medium leading-relaxed drop-shadow-2xs">
                    Queue policies, updates, and 5-question quizzes.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectHotTopics();
                }}
                className="relative z-10 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-[#BA1E38] hover:bg-[#9B152B] transition-colors shadow-xs cursor-pointer group-hover:shadow-md"
              >
                <span>Select Queue (CSR, TSR...)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* BOX 2: Real Customer Scenarios */}
            <div
              onClick={() => onOpenModule?.('scenarios', lastLobId || 'csr')}
              className="flex flex-col justify-between bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 relative overflow-hidden group cursor-pointer min-h-[290px]"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600 z-20" />

              {/* Blurred Thematic Background Image */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <img
                  src={scenariosBg}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover scale-105 filter blur-[2.5px] opacity-75 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/85 group-hover:from-white/70 group-hover:via-white/60 group-hover:to-white/80 transition-all duration-300" />
              </div>

              <div className="relative z-10 flex-1 flex flex-col justify-between mb-5">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50/90 text-blue-700 flex items-center justify-center border border-blue-100 shadow-2xs backdrop-blur-xs group-hover:scale-105 transition-transform">
                      <Users2 className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50/90 text-blue-700 border border-blue-200 backdrop-blur-xs shadow-2xs">
                      6 Core Scenarios
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-stone-950 group-hover:text-blue-700 transition-colors mb-1.5 drop-shadow-2xs">
                    Real Customer Scenarios
                  </h3>
                  <p className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                    Branching Call Dialogue & Escalations
                  </p>
                  <p className="text-sm text-stone-800 font-medium leading-relaxed drop-shadow-2xs">
                    Real call simulations and escalations with instant feedback.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModule?.('scenarios', lastLobId || 'csr');
                }}
                className="relative z-10 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs cursor-pointer group-hover:shadow-md"
              >
                <span>Practice Scenarios</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* BOX 3: Soft Skills Academy */}
            <div
              onClick={() => onOpenModule?.('soft-skills', lastLobId || 'csr')}
              className="flex flex-col justify-between bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 relative overflow-hidden group cursor-pointer min-h-[290px]"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-600 z-20" />

              {/* Blurred Thematic Background Image */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <img
                  src={softSkillsBg}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover scale-105 filter blur-[2.5px] opacity-75 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/85 group-hover:from-white/70 group-hover:via-white/60 group-hover:to-white/80 transition-all duration-300" />
              </div>

              <div className="relative z-10 flex-1 flex flex-col justify-between mb-5">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50/90 text-emerald-700 flex items-center justify-center border border-emerald-100 shadow-2xs backdrop-blur-xs group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50/90 text-emerald-700 border border-emerald-200 backdrop-blur-xs shadow-2xs">
                      8 Master Lessons
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-stone-950 group-hover:text-emerald-700 transition-colors mb-1.5 drop-shadow-2xs">
                    Soft Skills Academy
                  </h3>
                  <p className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                    Human Connection & De-escalation
                  </p>
                  <p className="text-sm text-stone-800 font-medium leading-relaxed drop-shadow-2xs">
                    Core people skills: de-escalation, empathy, and call control.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModule?.('soft-skills', lastLobId || 'csr');
                }}
                className="relative z-10 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer group-hover:shadow-md"
              >
                <span>Open Soft Skills</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* BOX 4: Microlearning Videos */}
            <div
              onClick={() => onOpenModule?.('videos', lastLobId || 'csr')}
              className="flex flex-col justify-between bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 relative overflow-hidden group cursor-pointer min-h-[290px]"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-purple-600 z-20" />

              {/* Blurred Thematic Background Image */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <img
                  src={videosBg}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover scale-105 filter blur-[2.5px] opacity-75 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/85 group-hover:from-white/70 group-hover:via-white/60 group-hover:to-white/80 transition-all duration-300" />
              </div>

              <div className="relative z-10 flex-1 flex flex-col justify-between mb-5">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50/90 text-purple-700 flex items-center justify-center border border-purple-100 shadow-2xs backdrop-blur-xs group-hover:scale-105 transition-transform">
                      <Video className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-50/90 text-purple-700 border border-purple-200 backdrop-blur-xs shadow-2xs">
                      {VIDEO_CATEGORIES.length} Categories
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-stone-950 group-hover:text-purple-700 transition-colors mb-1.5 drop-shadow-2xs">
                    Microlearning Videos
                  </h3>
                  <p className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                    {VIDEO_CATEGORIES.length} Subject Libraries
                  </p>
                  <p className="text-sm text-stone-800 font-medium leading-relaxed drop-shadow-2xs">
                    Customer Service Soft Skills, Fiber Optics, Culture, Rally TV, Retention, Sales, and Tickets.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModule?.('videos', lastLobId || 'csr');
                }}
                className="relative z-10 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-xs cursor-pointer group-hover:shadow-md"
              >
                <span>Explore Video Categories</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>
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
