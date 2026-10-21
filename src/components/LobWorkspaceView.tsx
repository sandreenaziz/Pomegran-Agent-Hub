import React from 'react';
import {
  ArrowLeft,
  Flame,
  Users2,
  GraduationCap,
  Video,
  MessageSquareQuote,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Award,
  Sparkles,
  Layers,
} from 'lucide-react';
import { LobConfig, HOT_TOPICS, SCENARIOS, SOFT_SKILLS_LESSONS, VIDEOS } from '../data/content';
import {
  getQuizResults,
  getScenarioResults,
  getCompletedLessons,
  getWatchedVideos,
} from '../utils/storage';
import { LobSearchBar } from './LobSearchBar';
import { SearchResultItem } from '../utils/search';

export type ModuleType =
  | 'hot-topics'
  | 'scenarios'
  | 'soft-skills'
  | 'videos'
  | 'ask-trainer';

interface LobWorkspaceViewProps {
  lob: LobConfig;
  onNavigateHome: () => void;
  onSelectModule: (module: ModuleType) => void;
  onSelectSearchResult: (item: SearchResultItem) => void;
}

export const LobWorkspaceView: React.FC<LobWorkspaceViewProps> = ({
  lob,
  onNavigateHome,
  onSelectModule,
  onSelectSearchResult,
}) => {
  const quizResults = getQuizResults();
  const scenarioResults = getScenarioResults();
  const completedLessons = getCompletedLessons();
  const watchedVideos = getWatchedVideos();

  // Calculate LOB-specific counts
  const lobTopics = HOT_TOPICS.filter((t) => t.lobId === lob.id);
  const passedTopicsCount = lobTopics.filter(
    (t) => quizResults[t.id]?.passed
  ).length;

  const lobScenarios = SCENARIOS.filter((s) => s.lobId === lob.id);
  const completedScenariosCount = lobScenarios.filter(
    (s) => scenarioResults[s.id]
  ).length;

  const softSkillsCount = SOFT_SKILLS_LESSONS.length;
  const completedSoftSkillsCount = completedLessons.length;

  const lobVideos = VIDEOS.filter((v) => v.lobId === lob.id || v.lobId === 'all');
  const watchedVideosCount = lobVideos.filter((v) =>
    watchedVideos.includes(v.id)
  ).length;

  // Aggregate completion
  const totalItems = lobTopics.length + lobScenarios.length + softSkillsCount + lobVideos.length;
  const completedItems =
    passedTopicsCount +
    completedScenariosCount +
    completedSoftSkillsCount +
    watchedVideosCount;
  const progressPercent = Math.round((completedItems / totalItems) * 100);

  const modules = [
    {
      id: 'hot-topics' as ModuleType,
      title: 'Hot Topics',
      description: 'Current topics every agent must know',
      actionPrompt: 'Read the topic, then take its quiz',
      icon: <Flame className="w-6 h-6 text-rose-700" />,
      badge: `${passedTopicsCount}/${lobTopics.length} Passed`,
      completed: passedTopicsCount === lobTopics.length && lobTopics.length > 0,
      bgColor: 'bg-rose-50/60',
      borderColor: 'border-rose-200/80',
    },
    {
      id: 'scenarios' as ModuleType,
      title: 'Real Customer Scenarios',
      description: 'Interactive customer situations',
      actionPrompt: 'Choose the best response and see feedback',
      icon: <Users2 className="w-6 h-6 text-blue-700" />,
      badge: `${completedScenariosCount}/${lobScenarios.length} Practiced`,
      completed:
        completedScenariosCount === lobScenarios.length && lobScenarios.length > 0,
      bgColor: 'bg-blue-50/60',
      borderColor: 'border-blue-200/80',
    },
    {
      id: 'soft-skills' as ModuleType,
      title: 'Soft Skills Academy',
      description: 'Short lessons on core people skills',
      actionPrompt: 'Read a lesson and check understanding',
      icon: <GraduationCap className="w-6 h-6 text-emerald-700" />,
      badge: `${completedSoftSkillsCount}/${softSkillsCount} Done`,
      completed: completedSoftSkillsCount === softSkillsCount,
      bgColor: 'bg-emerald-50/60',
      borderColor: 'border-emerald-200/80',
    },
    {
      id: 'videos' as ModuleType,
      title: 'Microlearning Videos',
      description: 'Short training videos',
      actionPrompt: 'Watch videos from a library',
      icon: <Video className="w-6 h-6 text-purple-700" />,
      badge: `${watchedVideosCount}/${lobVideos.length} Watched`,
      completed: watchedVideosCount === lobVideos.length && lobVideos.length > 0,
      bgColor: 'bg-purple-50/60',
      borderColor: 'border-purple-200/80',
    },
    {
      id: 'ask-trainer' as ModuleType,
      title: 'Ask the Trainer',
      description: 'Questions and suggestions',
      actionPrompt: 'Send a message to the trainer',
      icon: <MessageSquareQuote className="w-6 h-6 text-amber-700" />,
      badge: 'Direct Line',
      completed: false,
      bgColor: 'bg-amber-50/60',
      borderColor: 'border-amber-200/80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Bar with Back-to-Home and LOB Title Banner */}
      <div className="mb-8">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 mb-4 transition-colors group focus-visible:ring-2 focus-visible:ring-rose-800 rounded-md py-1 px-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-stone-500 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div
          className="p-6 sm:p-8 rounded-2xl bg-white border shadow-xs relative overflow-hidden"
          style={{
            borderColor: lob.accent.border,
            borderLeftWidth: '6px',
            borderLeftColor: lob.accent.primary,
          }}
        >
          {/* Subtle blurred background header image matching LOB */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <img
              src={lob.bgImage}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover scale-105 filter blur-[3px] opacity-65"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/60" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: lob.accent.tagBg,
                    color: lob.accent.text,
                  }}
                >
                  {lob.name} Workspace
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-xs text-stone-500 font-medium">
                  {lob.fullName}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
                {lob.name} Training & Practice Hub
              </h1>
              <p className="mt-2 text-sm text-stone-600 max-w-2xl leading-relaxed">
                Focus Area: {lob.focusArea}
              </p>
            </div>

            {/* Quick Progress Badge */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 shrink-0 sm:min-w-[200px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-stone-600">
                  Overall Completion
                </span>
                <span className="text-xs font-mono font-bold text-stone-900 tabular-nums">
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progressPercent}%`,
                    backgroundColor: lob.accent.primary,
                  }}
                />
              </div>
              <p className="text-[11px] text-stone-500 mt-2 font-medium">
                {completedItems} of {totalItems} items completed
              </p>
            </div>
          </div>

          {/* LOB Scoped Search Bar */}
          <div className="mt-6 pt-5 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="w-full max-w-xl">
              <LobSearchBar
                lob={lob}
                onSelectResult={onSelectSearchResult}
                placeholder={`Search inside ${lob.name} topics & workspace (rules, checklists, scenarios)...`}
              />
            </div>
            <div className="text-xs text-stone-500 font-medium hidden sm:block">
              Searches only within {lob.name} content
            </div>
          </div>
        </div>
      </div>

      {/* Module Tiles in Clean White Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">
            Learning Modules
          </h2>
          <span className="text-xs text-stone-500">
            Select a module to begin
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => onSelectModule(m.id)}
              className={`group flex flex-col justify-between text-left p-6 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 focus-visible:ring-3 focus-visible:ring-rose-800 focus-visible:outline-hidden cursor-pointer ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${m.bgColor}`}>
                    {m.icon}
                  </div>
                  {m.completed ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md font-mono tabular-nums">
                      {m.badge}
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold text-stone-400 mb-1">
                  Module 0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-stone-950 group-hover:text-rose-900 transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs font-semibold text-stone-600 mt-1 mb-2">
                  {m.description}
                </p>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {m.actionPrompt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-rose-900">
                <span>Start Module</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
