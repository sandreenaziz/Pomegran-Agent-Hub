import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Users2,
  Phone,
  MessageSquare,
  Award,
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Sparkles,
  Lightbulb,
} from 'lucide-react';
import { LobConfig, Scenario, ScenarioOption } from '../data/content';
import { getScenarioResults, saveScenarioResult, ScenarioResult } from '../utils/storage';
import { LobSearchBar } from './LobSearchBar';
import { SearchResultItem } from '../utils/search';

interface ScenariosModuleProps {
  lob: LobConfig;
  scenarios: Scenario[];
  onBackToWorkspace: () => void;
  onOpenTrainer: () => void;
  initialScenarioId?: string;
  onSelectSearchResult?: (item: SearchResultItem) => void;
}

export const ScenariosModule: React.FC<ScenariosModuleProps> = ({
  lob,
  scenarios,
  onBackToWorkspace,
  onOpenTrainer,
  initialScenarioId,
  onSelectSearchResult,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(() => {
    if (initialScenarioId) {
      return scenarios.find((s) => s.id === initialScenarioId) || null;
    }
    return null;
  });

  useEffect(() => {
    if (initialScenarioId) {
      const match = scenarios.find((s) => s.id === initialScenarioId);
      if (match) {
        setSelectedScenario(match);
        setCurrentStepIndex(1);
        setStep1Option(null);
        setStep2Option(null);
        setIsCompleted(false);
      }
    }
  }, [initialScenarioId, scenarios]);

  // Scenario Player State
  const [currentStepIndex, setCurrentStepIndex] = useState<1 | 2>(1);
  const [step1Option, setStep1Option] = useState<ScenarioOption | null>(null);
  const [step2Option, setStep2Option] = useState<ScenarioOption | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Persistent results
  const [scenarioResults, setScenarioResults] = useState<Record<string, ScenarioResult>>(() =>
    getScenarioResults()
  );

  const handleStartScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setCurrentStepIndex(1);
    setStep1Option(null);
    setStep2Option(null);
    setIsCompleted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStep1 = (option: ScenarioOption) => {
    if (step1Option) return; // Already picked
    setStep1Option(option);
  };

  const handleProceedToStep2 = () => {
    if (!selectedScenario || !step1Option) return;

    // Check if there is a second step for this option
    const nextStepKey = step1Option.nextStepId;
    const hasNext = nextStepKey && selectedScenario.secondSteps[nextStepKey];

    if (hasNext) {
      setCurrentStepIndex(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Single step scenario, complete immediately
      finishScenario(step1Option.points);
    }
  };

  const handleSelectStep2 = (option: ScenarioOption) => {
    if (step2Option) return;
    setStep2Option(option);
  };

  const handleFinishScenario = () => {
    if (!step1Option || !step2Option) return;
    const avgScore = Math.round((step1Option.points + step2Option.points) / 2);
    finishScenario(avgScore);
  };

  const finishScenario = (finalScore: number) => {
    if (!selectedScenario) return;

    const result: ScenarioResult = {
      scenarioId: selectedScenario.id,
      lobId: lob.id,
      score: finalScore,
      completedAt: new Date().toISOString(),
    };

    saveScenarioResult(result);
    setScenarioResults(getScenarioResults());
    setIsCompleted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetryScenario = () => {
    setCurrentStepIndex(1);
    setStep1Option(null);
    setStep2Option(null);
    setIsCompleted(false);
  };

  const handleBackToList = () => {
    setSelectedScenario(null);
    setCurrentStepIndex(1);
    setStep1Option(null);
    setStep2Option(null);
    setIsCompleted(false);
  };

  const getRatingBadge = (rating: 'best' | 'acceptable' | 'poor') => {
    switch (rating) {
      case 'best':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Best Response (+100 pts)</span>
          </span>
        );
      case 'acceptable':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
            <span>Acceptable (+50 pts)</span>
          </span>
        );
      case 'poor':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300">
            <XCircle className="w-3.5 h-3.5 text-rose-700" />
            <span>Poor Response (0 pts)</span>
          </span>
        );
    }
  };

  // If playing a scenario
  if (selectedScenario) {
    const existingResult = scenarioResults[selectedScenario.id];
    const finalScore = step2Option
      ? Math.round(((step1Option?.points || 0) + step2Option.points) / 2)
      : step1Option?.points || 0;

    const nextStepKey = step1Option?.nextStepId;
    const step2Data = nextStepKey ? selectedScenario.secondSteps[nextStepKey] : null;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={handleBackToList}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors py-1.5 px-2.5 rounded-lg bg-white border border-stone-200 shadow-2xs group focus-visible:ring-2 focus-visible:ring-rose-800"
          >
            <ArrowLeft className="w-4 h-4 text-stone-500 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Scenarios</span>
          </button>

          {existingResult && !isCompleted && (
            <div className="text-xs font-bold text-stone-600 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
              Previous Score: {existingResult.score}/100
            </div>
          )}
        </div>

        {/* Customer Setup Card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-stone-700 text-sm">
                {selectedScenario.customerName.charAt(0)}
              </div>
              <div>
                <h2 className="text-base font-bold text-stone-950">
                  {selectedScenario.customerName}
                </h2>
                <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    {selectedScenario.channel === 'Phone Call' ? (
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                    ) : (
                      <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                    )}
                    <span>{selectedScenario.channel}</span>
                  </span>
                  <span>·</span>
                  <span className="text-rose-800 font-semibold">
                    Mood: {selectedScenario.customerMood}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-md font-semibold bg-stone-100 text-stone-700">
                {selectedScenario.difficulty}
              </span>
              <span
                className="px-2.5 py-0.5 rounded-md font-bold text-xs uppercase"
                style={{
                  backgroundColor: lob.accent.tagBg,
                  color: lob.accent.text,
                }}
              >
                {lob.name}
              </span>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-stone-950 mb-3">
            {selectedScenario.title}
          </h1>

          {/* Customer Quote Box */}
          <div className="p-4 sm:p-5 rounded-xl bg-stone-50/80 border border-stone-200/90 text-stone-800 italic text-sm sm:text-base leading-relaxed relative">
            <span className="text-3xl text-rose-300 font-serif absolute top-1 left-2 select-none">
              “
            </span>
            <div className="pl-4">{selectedScenario.setup}</div>
          </div>
        </div>

        {/* Interactive Step 1 */}
        {!isCompleted && currentStepIndex === 1 && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8 mb-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-800 text-white flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span className="text-sm font-bold text-stone-900">
                  Decision 1 of 2
                </span>
              </div>
              <span className="text-xs text-stone-500">Pick the best response</span>
            </div>

            <p className="text-sm sm:text-base font-bold text-stone-900 mb-4">
              {selectedScenario.firstStep.prompt}
            </p>

            <div className="space-y-3 mb-6">
              {selectedScenario.firstStep.options.map((opt, idx) => {
                const isSelected = step1Option?.id === opt.id;
                const hasSelected = step1Option !== null;

                let optStyle =
                  'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-900';
                if (hasSelected) {
                  if (isSelected) {
                    optStyle =
                      opt.rating === 'best'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500'
                        : opt.rating === 'acceptable'
                        ? 'bg-amber-50 border-amber-500 text-amber-950 ring-1 ring-amber-500'
                        : 'bg-rose-50 border-rose-500 text-rose-950 ring-1 ring-rose-500';
                  } else {
                    optStyle = 'opacity-50 border-stone-200 text-stone-500';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={hasSelected}
                    onClick={() => handleSelectStep1(opt)}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 focus-visible:ring-2 focus-visible:ring-rose-800 ${optStyle} ${
                      !hasSelected ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-md bg-white border border-stone-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 text-stone-700">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Step 1 Feedback Panel */}
            {step1Option && (
              <div className="rounded-xl border border-stone-200 p-5 bg-stone-50 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Response Evaluation
                  </span>
                  {getRatingBadge(step1Option.rating)}
                </div>

                <div className="mb-3">
                  <span className="text-xs font-bold text-stone-700 block mb-1">
                    Customer Reaction:
                  </span>
                  <p className="text-sm text-stone-800 italic bg-white p-3 rounded-lg border border-stone-200">
                    {step1Option.customerReaction}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold text-stone-700 block mb-1">
                    Coaching Rationale:
                  </span>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {step1Option.reason}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-200 flex justify-end">
                  <button
                    onClick={handleProceedToStep2}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-xs hover:shadow-md transition-all focus-visible:ring-2 focus-visible:ring-rose-800"
                    style={{ backgroundColor: lob.accent.primary }}
                  >
                    <span>
                      {step2Data ? 'Continue to Follow-Up Decision' : 'View Scenario Summary'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Interactive Step 2 (Branching follow-up) */}
        {!isCompleted && currentStepIndex === 2 && step2Data && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8 mb-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-800 text-white flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span className="text-sm font-bold text-stone-900">
                  Decision 2 of 2 (Follow-up)
                </span>
              </div>
              <span className="text-xs text-stone-500">Based on previous response</span>
            </div>

            <p className="text-sm sm:text-base font-bold text-stone-900 mb-4">
              {step2Data.prompt}
            </p>

            <div className="space-y-3 mb-6">
              {step2Data.options.map((opt, idx) => {
                const isSelected = step2Option?.id === opt.id;
                const hasSelected = step2Option !== null;

                let optStyle =
                  'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-900';
                if (hasSelected) {
                  if (isSelected) {
                    optStyle =
                      opt.rating === 'best'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500'
                        : opt.rating === 'acceptable'
                        ? 'bg-amber-50 border-amber-500 text-amber-950 ring-1 ring-amber-500'
                        : 'bg-rose-50 border-rose-500 text-rose-950 ring-1 ring-rose-500';
                  } else {
                    optStyle = 'opacity-50 border-stone-200 text-stone-500';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={hasSelected}
                    onClick={() => handleSelectStep2(opt)}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 focus-visible:ring-2 focus-visible:ring-rose-800 ${optStyle} ${
                      !hasSelected ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-md bg-white border border-stone-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 text-stone-700">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Step 2 Feedback Panel */}
            {step2Option && (
              <div className="rounded-xl border border-stone-200 p-5 bg-stone-50 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Follow-up Evaluation
                  </span>
                  {getRatingBadge(step2Option.rating)}
                </div>

                <div className="mb-3">
                  <span className="text-xs font-bold text-stone-700 block mb-1">
                    Customer Reaction:
                  </span>
                  <p className="text-sm text-stone-800 italic bg-white p-3 rounded-lg border border-stone-200">
                    {step2Option.customerReaction}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold text-stone-700 block mb-1">
                    Coaching Rationale:
                  </span>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {step2Option.reason}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-200 flex justify-end">
                  <button
                    onClick={handleFinishScenario}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white shadow-xs hover:shadow-md transition-all focus-visible:ring-2 focus-visible:ring-rose-800"
                    style={{ backgroundColor: lob.accent.primary }}
                  >
                    <span>View Performance Summary</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Scenario Completed Summary Screen */}
        {isCompleted && (
          <div className="bg-white rounded-2xl border-2 border-stone-300 shadow-md p-6 sm:p-8">
            <div className="text-center pb-6 border-b border-stone-100">
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                  finalScore >= 75
                    ? 'bg-emerald-100 text-emerald-700'
                    : finalScore >= 50
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-rose-100 text-rose-700'
                }`}
              >
                <Award className="w-8 h-8" />
              </div>

              <h2 className="text-2xl font-extrabold text-stone-950 mb-1">
                Scenario Performance Summary
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                {finalScore >= 75
                  ? 'Outstanding customer handling! You prioritized resolution and trust.'
                  : finalScore >= 50
                  ? 'Good handling, with opportunity to apply more proactive ownership.'
                  : 'Needs review. Consider reviewing the ideal path below and retrying.'}
              </p>

              {/* Score Display */}
              <div className="mt-4 inline-flex items-baseline gap-1 font-mono">
                <span className="text-4xl font-extrabold text-stone-950 tabular-nums">
                  {finalScore}
                </span>
                <span className="text-sm font-bold text-stone-500">/ 100</span>
              </div>
            </div>

            {/* Ideal Path Showcase */}
            <div className="mt-6 p-5 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm mb-2">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>The Ideal Path</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-3">
                {selectedScenario.idealPath}
              </p>

              <div className="pt-3 border-t border-stone-200">
                <span className="text-xs font-bold text-stone-700 block mb-1">
                  Core Coaching Takeaway:
                </span>
                <p className="text-xs sm:text-sm text-stone-600">
                  {selectedScenario.takeaway}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleRetryScenario}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Scenario</span>
              </button>

              <button
                onClick={handleBackToList}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white shadow-xs hover:shadow-md transition-all"
                style={{ backgroundColor: lob.accent.primary }}
              >
                <span>Try Another Scenario</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Scenarios List Screen
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Bar */}
      <div className="mb-8">
        <button
          onClick={onBackToWorkspace}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 mb-4 transition-colors group focus-visible:ring-2 focus-visible:ring-rose-800 rounded-md py-1 px-2"
        >
          <ArrowLeft className="w-4 h-4 text-stone-500 group-hover:-translate-x-1 transition-transform" />
          <span>Back to {lob.name} Workspace</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-semibold mb-1">
              <span>{lob.name} Workspace</span>
              <span>·</span>
              <span>Module 02</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
              Real Customer Scenarios
            </h1>
            <p className="mt-1 text-sm text-stone-600 max-w-2xl">
              Step into real-world customer calls and chat interactions safely before facing them live. Choose the best response and see realistic reactions and feedback.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-stone-500">
              Scoring System
            </span>
            <div className="text-xs font-bold text-stone-700">
              Best (100) · Acceptable (50) · Poor (0)
            </div>
          </div>
        </div>

        {/* LOB Scoped Search Bar inside Scenarios */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <LobSearchBar
            lob={lob}
            onSelectResult={(item) => {
              if (item.type === 'scenario' && item.targetId) {
                const match = scenarios.find((s) => s.id === item.targetId);
                if (match) {
                  handleStartScenario(match);
                  return;
                }
              }
              onSelectSearchResult?.(item);
            }}
            placeholder={`Search ${lob.name} scenarios (customer quotes, anger, lockouts)...`}
          />
          <span className="text-xs text-stone-500 font-medium">
            {scenarios.length} simulations available
          </span>
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios.map((s) => {
          const res = scenarioResults[s.id];

          return (
            <button
              key={s.id}
              onClick={() => handleStartScenario(s)}
              className="group flex flex-col justify-between text-left p-6 sm:p-7 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 focus-visible:ring-3 focus-visible:ring-rose-800 focus-visible:outline-hidden cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-600 bg-stone-100 px-2.5 py-1 rounded-md">
                      {s.channel === 'Phone Call' ? (
                        <Phone className="w-3.5 h-3.5 text-stone-500" />
                      ) : (
                        <MessageSquare className="w-3.5 h-3.5 text-stone-500" />
                      )}
                      <span>{s.channel}</span>
                    </span>
                    <span className="text-xs font-semibold text-stone-500">
                      Mood: <strong className="text-stone-800">{s.customerMood}</strong>
                    </span>
                  </div>

                  {res ? (
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-md font-mono ${
                        res.score >= 75
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      Score: {res.score}/100
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
                      Ready to Practice
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-bold text-stone-950 group-hover:text-rose-900 transition-colors mb-2 leading-snug">
                  {s.title}
                </h2>

                <p className="text-xs font-semibold text-stone-500 mb-2">
                  Customer: {s.customerName}
                </p>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4 italic bg-stone-50 p-3 rounded-lg border border-stone-100">
                  "{s.setup}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-rose-900">
                <span>{res ? 'Practice Again' : 'Start Simulation'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
