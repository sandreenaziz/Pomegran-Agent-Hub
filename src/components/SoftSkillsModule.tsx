import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  GraduationCap,
  CheckCircle2,
  Clock,
  ChevronRight,
  BookOpen,
  Check,
  X,
  HelpCircle,
  Lightbulb,
  Sparkles,
  AlertCircle,
  Copy,
  RotateCcw,
  Trophy,
  PhoneCall,
  Volume2,
  ShieldAlert,
  Target,
} from 'lucide-react';
import { LobConfig, SoftSkillLesson, SOFT_SKILLS_LESSONS } from '../data/content';
import { getCompletedLessons, toggleLessonComplete } from '../utils/storage';

interface SoftSkillsModuleProps {
  lob: LobConfig;
  onBackToWorkspace: () => void;
  onOpenTrainer: () => void;
  initialLessonId?: string;
}

export const SoftSkillsModule: React.FC<SoftSkillsModuleProps> = ({
  lob,
  onBackToWorkspace,
  onOpenTrainer,
  initialLessonId,
}) => {
  const [selectedLesson, setSelectedLesson] = useState<SoftSkillLesson | null>(() => {
    if (initialLessonId) {
      return SOFT_SKILLS_LESSONS.find((l) => l.id === initialLessonId) || null;
    }
    return null;
  });

  // Interactive states for active lesson
  const [selectedQuickAnswers, setSelectedQuickAnswers] = useState<Record<number, number>>({});
  const [selectedRoleplayId, setSelectedRoleplayId] = useState<string | null>(null);
  const [practicedStepNumbers, setPracticedStepNumbers] = useState<number[]>([]);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  useEffect(() => {
    if (initialLessonId) {
      const match = SOFT_SKILLS_LESSONS.find((l) => l.id === initialLessonId);
      if (match) {
        setSelectedLesson(match);
        setSelectedQuickAnswers({});
        setSelectedRoleplayId(null);
        setPracticedStepNumbers([]);
        setCopiedScript(false);
      }
    }
  }, [initialLessonId]);

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() =>
    getCompletedLessons()
  );

  const handleOpenLesson = (lesson: SoftSkillLesson) => {
    setSelectedLesson(lesson);
    setSelectedQuickAnswers({});
    setSelectedRoleplayId(null);
    setPracticedStepNumbers([]);
    setCopiedScript(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleComplete = (lessonId: string) => {
    toggleLessonComplete(lessonId);
    setCompletedLessonIds(getCompletedLessons());
  };

  const handleQuickAnswer = (qIdx: number, optIdx: number) => {
    if (selectedQuickAnswers[qIdx] !== undefined) return;
    setSelectedQuickAnswers((prev) => ({
      ...prev,
      [qIdx]: optIdx,
    }));
  };

  const handleResetQuiz = () => {
    setSelectedQuickAnswers({});
  };

  const handleTogglePracticedStep = (stepNumber: number) => {
    setPracticedStepNumbers((prev) =>
      prev.includes(stepNumber) ? prev.filter((s) => s !== stepNumber) : [...prev, stepNumber]
    );
  };

  const handleCopyScript = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2200);
  };

  if (selectedLesson) {
    const isCompleted = completedLessonIds.includes(selectedLesson.id);
    const quizTotal = selectedLesson.quizQuestions.length;
    const answeredCount = Object.keys(selectedQuickAnswers).length;
    const correctCount = selectedLesson.quizQuestions.reduce((acc, q, idx) => {
      return selectedQuickAnswers[idx] === q.correctIndex ? acc + 1 : acc;
    }, 0);
    const allQuizAnswered = answeredCount === quizTotal;

    const roleplay = selectedLesson.roleplay;
    const chosenOption = roleplay?.options.find((opt) => opt.id === selectedRoleplayId);

    const totalSteps = selectedLesson.techniqueSteps.length;
    const stepsPracticedCount = practicedStepNumbers.length;
    const stepsProgressPercent = Math.round((stepsPracticedCount / (totalSteps || 1)) * 100);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            onClick={() => setSelectedLesson(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors py-1.5 px-3 rounded-lg bg-white border border-stone-200 shadow-2xs group focus-visible:ring-2 focus-visible:ring-rose-800 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-stone-500 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Soft Skills Academy</span>
          </button>

          <button
            onClick={() => handleToggleComplete(selectedLesson.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs border cursor-pointer ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
            }`}
          >
            <CheckCircle2
              className={`w-4 h-4 ${
                isCompleted ? 'text-emerald-600' : 'text-stone-400'
              }`}
            />
            <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
          </button>
        </div>

        {/* Hero Topic Card with Image & Core Concept */}
        <div className="relative rounded-2xl overflow-hidden mb-8 border border-stone-200/90 shadow-md min-h-[240px] sm:min-h-[280px] flex flex-col justify-end p-6 sm:p-8 text-white">
          {/* Background Image */}
          {selectedLesson.bgImage && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                src={selectedLesson.bgImage}
                alt={selectedLesson.title}
                className="w-full h-full object-cover scale-105 filter blur-[1.5px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-900/40" />
            </div>
          )}

          {/* Top Brand Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#BA1E38] z-20" />

          {/* Content Over Hero */}
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#BA1E38] text-white shadow-2xs">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Soft Skills Masterclass</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white/90 border border-white/20">
                <Clock className="w-3 h-3" />
                <span>{selectedLesson.readTime}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-500/30 backdrop-blur-md px-2.5 py-1 rounded-full text-emerald-200 border border-emerald-400/30">
                <Sparkles className="w-3 h-3" />
                <span>Interactive Practice & 5 Questions</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight drop-shadow-md mb-2">
              {selectedLesson.title}
            </h1>

            <p className="text-sm sm:text-base text-rose-200 font-semibold italic drop-shadow-xs max-w-3xl">
              "{selectedLesson.coreIdea}"
            </p>
          </div>
        </div>

        {/* Lesson Reader Card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8 mb-8 space-y-8">
          {/* Section 1: Why it matters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-[#BA1E38]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                01. Why It Matters
              </h2>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-stone-50/80 border border-stone-200 text-sm text-stone-700 leading-relaxed font-medium">
              {selectedLesson.whyItMatters}
            </div>
          </div>

          {/* Section 2: The Technique & Interactive Practice Checklist */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#BA1E38]" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  02. Technique Steps & Practice Checklist
                </h2>
              </div>
              <div className="text-xs font-bold text-stone-600 flex items-center gap-2">
                <span>Practiced {stepsPracticedCount} of {totalSteps} steps</span>
                <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {stepsProgressPercent}%
                </span>
              </div>
            </div>

            {/* Checklist progress bar */}
            <div className="w-full bg-stone-100 rounded-full h-1.5 mb-4 overflow-hidden">
              <div
                className="bg-emerald-600 h-1.5 transition-all duration-300 rounded-full"
                style={{ width: `${stepsProgressPercent}%` }}
              />
            </div>

            <div className="space-y-3">
              {selectedLesson.techniqueSteps.map((step) => {
                const isPracticed = practicedStepNumbers.includes(step.stepNumber);

                return (
                  <div
                    key={step.stepNumber}
                    onClick={() => handleTogglePracticedStep(step.stepNumber)}
                    className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                      isPracticed
                        ? 'bg-emerald-50/60 border-emerald-300 shadow-2xs'
                        : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/60 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isPracticed
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-900 text-white'
                        }`}
                      >
                        {isPracticed ? <Check className="w-4 h-4 stroke-[3]" /> : step.stepNumber}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-stone-900 mb-0.5 flex items-center gap-2">
                          <span>{step.title}</span>
                          {isPracticed && (
                            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                              Practiced
                            </span>
                          )}
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-md border transition-colors ${
                        isPracticed
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {isPracticed ? 'Done' : 'Mark Done'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Interactive Roleplay Challenge (Call Simulator) */}
          {roleplay && (
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-rose-50/60 via-stone-50 to-amber-50/40 border border-rose-200/80 shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#BA1E38] text-white flex items-center justify-center">
                    <PhoneCall className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#BA1E38]">
                      03. Live Call Challenge (Interactive Simulator)
                    </span>
                    <h3 className="text-sm font-extrabold text-stone-900">
                      {roleplay.callerScenario}
                    </h3>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                  <AlertCircle className="w-3 h-3" />
                  <span>{roleplay.callerEmotion}</span>
                </span>
              </div>

              {/* Caller Audio/Speech Bubble */}
              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs mb-5">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-500 mb-2">
                  <Volume2 className="w-4 h-4 text-rose-800 animate-pulse" />
                  <span>Customer Audio Quote:</span>
                </div>
                <blockquote className="text-sm sm:text-base font-semibold text-stone-900 italic border-l-3 border-[#BA1E38] pl-3 py-0.5">
                  "{roleplay.callerQuote}"
                </blockquote>
                <p className="text-xs text-stone-500 mt-2">
                  <strong>Context:</strong> {roleplay.context}
                </p>
              </div>

              {/* Response Options */}
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2.5">
                  Your Turn: Choose the most effective agent response
                </p>

                <div className="space-y-3">
                  {roleplay.options.map((opt) => {
                    const isSelected = selectedRoleplayId === opt.id;
                    const isMaster = opt.type === 'master';
                    const isPoor = opt.type === 'poor';

                    let cardBorder = 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/80';
                    if (isSelected) {
                      if (isMaster) {
                        cardBorder = 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-300';
                      } else if (isPoor) {
                        cardBorder = 'border-rose-500 bg-rose-50/80 ring-2 ring-rose-300';
                      } else {
                        cardBorder = 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-300';
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedRoleplayId(opt.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${cardBorder}`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-stone-700">
                            {opt.label}
                          </span>
                          {isSelected && (
                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                isMaster
                                  ? 'bg-emerald-600 text-white'
                                  : isPoor
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-amber-600 text-white'
                              }`}
                            >
                              {isMaster
                                ? 'Master Practice (Optimal)'
                                : isPoor
                                ? 'High Risk Response'
                                : 'Mediocre / Minimal'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                          "{opt.response}"
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Revealed Feedback & Customer Reaction */}
              {chosenOption && (
                <div
                  className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all ${
                    chosenOption.type === 'master'
                      ? 'bg-emerald-100/80 border-emerald-300 text-emerald-950'
                      : chosenOption.type === 'poor'
                      ? 'bg-rose-100/80 border-rose-300 text-rose-950'
                      : 'bg-amber-100/80 border-amber-300 text-amber-950'
                  }`}
                >
                  <div className="mb-2">
                    <strong className="font-bold flex items-center gap-1.5 mb-1">
                      {chosenOption.type === 'master' ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          <span>Customer Reaction & Outcome:</span>
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="w-4 h-4 text-rose-700" />
                          <span>Customer Reaction & Escalation Risk:</span>
                        </>
                      )}
                    </strong>
                    <p className="italic bg-white/60 p-2.5 rounded-lg border border-black/5">
                      "{chosenOption.customerReaction}"
                    </p>
                  </div>

                  <div>
                    <strong className="font-bold">Coaching Tip:</strong> {chosenOption.feedback}
                  </div>

                  <div className="mt-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedRoleplayId(null)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-stone-700 hover:text-stone-950 underline cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Try another response</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Section 4: Say This, Not That (+ Copy to Clipboard) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#BA1E38]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                04. Say This, Not That (Verbal Blueprint)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Say This */}
              <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                      <Check className="w-4 h-4 text-emerald-700 stroke-[3]" />
                      <span>Say This (Empowering)</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyScript(selectedLesson.sayThis)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100 hover:bg-emerald-200/80 px-2 py-0.5 rounded-md border border-emerald-300 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedScript ? 'Copied!' : 'Copy Script'}</span>
                    </button>
                  </div>

                  <p className="text-sm text-stone-800 font-medium italic leading-relaxed">
                    "{selectedLesson.sayThis}"
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-emerald-200/60 text-[11px] text-emerald-800 font-medium">
                  ✓ Validates emotional needs and sets immediate collaborative momentum.
                </div>
              </div>

              {/* Not That */}
              <div className="p-5 rounded-xl bg-rose-50/70 border border-rose-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-rose-900 font-bold text-xs uppercase tracking-wider mb-2">
                    <X className="w-4 h-4 text-rose-700 stroke-[3]" />
                    <span>Not That (Defensive / Robotic)</span>
                  </div>

                  <p className="text-sm text-stone-800 italic leading-relaxed">
                    "{selectedLesson.notThis}"
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-rose-200/60 text-[11px] text-rose-800 font-medium">
                  ✗ Triggers immediate customer defensiveness and creates adversarial tone.
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Knowledge Mastery Quiz (5 Questions) */}
          <div className="pt-6 border-t border-stone-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#BA1E38]" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  05. Knowledge Mastery Quiz ({quizTotal} Questions)
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-stone-700">
                  Score: <span className="font-mono text-emerald-700 font-bold">{correctCount}</span> / {quizTotal}
                </span>
                <span className="text-xs text-stone-500">
                  ({answeredCount} of {quizTotal} answered)
                </span>
                {answeredCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-600 hover:text-stone-900 underline cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Quiz</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quiz Progress Bar */}
            <div className="w-full bg-stone-100 rounded-full h-1.5 mb-6 overflow-hidden">
              <div
                className="bg-[#BA1E38] h-1.5 transition-all duration-300 rounded-full"
                style={{ width: `${Math.round((answeredCount / quizTotal) * 100)}%` }}
              />
            </div>

            {/* 5 Questions List */}
            <div className="space-y-6">
              {selectedLesson.quizQuestions.map((q, qIdx) => {
                const userChoice = selectedQuickAnswers[qIdx];
                const isAnswered = userChoice !== undefined;
                const isCorrect = isAnswered && userChoice === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className="p-5 sm:p-6 rounded-xl bg-stone-50 border border-stone-200 shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <p className="text-sm font-bold text-stone-900 leading-snug">
                        <span className="text-[#BA1E38] font-extrabold mr-1.5">Q{qIdx + 1}.</span>
                        {q.question}
                      </p>
                      {isAnswered && (
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 mb-3">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userChoice === optIdx;
                        const isActualCorrect = optIdx === q.correctIndex;

                        let optClass =
                          'bg-white hover:bg-stone-100 border-stone-200 text-stone-800';
                        if (isAnswered) {
                          if (isActualCorrect) {
                            optClass =
                              'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                          } else if (isChosen) {
                            optClass = 'bg-rose-50 border-rose-500 text-rose-950';
                          } else {
                            optClass = 'opacity-50 border-stone-200 text-stone-500';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() => handleQuickAnswer(qIdx, optIdx)}
                            className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-2.5 ${optClass} ${
                              !isAnswered ? 'cursor-pointer active:scale-[0.99]' : ''
                            }`}
                          >
                            <span className="w-5 h-5 rounded-md bg-stone-100 text-stone-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="flex-1 leading-relaxed">{opt}</span>
                            {isAnswered && isActualCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            )}
                            {isAnswered && isChosen && !isActualCorrect && (
                              <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div
                        className={`p-3 rounded-lg text-xs leading-relaxed ${
                          isCorrect
                            ? 'bg-emerald-100/70 text-emerald-900 font-medium'
                            : 'bg-rose-100/70 text-rose-900'
                        }`}
                      >
                        <strong>{isCorrect ? 'Correct!' : 'Incorrect:'}</strong>{' '}
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Completion Banner */}
            {allQuizAnswered && (
              <div
                className={`mt-6 p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  correctCount === quizTotal
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      correctCount === quizTotal
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-600 text-white'
                    }`}
                  >
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base">
                      {correctCount === quizTotal
                        ? 'Perfect Score! 5 of 5 Questions Correct 🎉'
                        : `Quiz Finished: ${correctCount} of ${quizTotal} Correct`}
                    </h4>
                    <p className="text-xs opacity-90 mt-0.5">
                      {correctCount === quizTotal
                        ? 'You demonstrated comprehensive mastery of this soft skills discipline.'
                        : 'Review the explanations above to strengthen your communication technique.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 shadow-2xs cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>

                  {!isCompleted && (
                    <button
                      type="button"
                      onClick={() => handleToggleComplete(selectedLesson.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 shadow-2xs cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Complete</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Section 6: Mark as complete action */}
          <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-500 font-medium">
              Finished reading, practicing the simulator, and testing?
            </span>

            <button
              onClick={() => handleToggleComplete(selectedLesson.id)}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-xs transition-all cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                  : 'bg-rose-800 text-white hover:bg-rose-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Marked Complete (Click to Undo)' : 'Mark Lesson as Complete'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Lessons Grid Screen
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Bar */}
      <div className="mb-8">
        <button
          onClick={onBackToWorkspace}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 mb-4 transition-colors group focus-visible:ring-2 focus-visible:ring-rose-800 rounded-md py-1.5 px-3 bg-white border border-stone-200 shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-stone-500 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Main Page</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-semibold mb-1">
              <span>Agent Hub</span>
              <span>·</span>
              <span>Soft Skills Academy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
              Soft Skills Academy
            </h1>
            <p className="mt-1 text-sm text-stone-600 max-w-2xl">
              Short, high-impact lessons on core people skills you can finish in three minutes between customer calls.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-stone-500">
              Completed Lessons
            </span>
            <div className="text-sm font-bold text-emerald-700 font-mono">
              {completedLessonIds.length} of {SOFT_SKILLS_LESSONS.length} Finished
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SOFT_SKILLS_LESSONS.map((l, idx) => {
          const isDone = completedLessonIds.includes(l.id);

          return (
            <button
              key={l.id}
              onClick={() => handleOpenLesson(l)}
              className="group relative overflow-hidden flex flex-col justify-between text-left p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus-visible:ring-3 focus-visible:ring-rose-800 focus-visible:outline-hidden cursor-pointer min-h-[310px]"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#BA1E38] z-20" />

              {/* Blurred Thematic Background Image */}
              {l.bgImage && (
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  <img
                    src={l.bgImage}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover scale-105 filter blur-[3px] opacity-75 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/75 to-white/90 group-hover:from-white/75 group-hover:via-white/65 group-hover:to-white/85 transition-all duration-300" />
                </div>
              )}

              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-stone-500 drop-shadow-2xs">
                      Lesson 0{idx + 1}
                    </span>
                    {isDone ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-emerald-300 shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Complete</span>
                      </span>
                    ) : (
                      <span className="text-xs text-stone-600 font-semibold flex items-center gap-1 bg-white/75 backdrop-blur-xs px-2 py-0.5 rounded-md border border-stone-200/70 shadow-2xs">
                        <Clock className="w-3 h-3 text-stone-500" />
                        <span>{l.readTime}</span>
                      </span>
                    )}
                  </div>

                  <h2 className="text-lg font-extrabold text-stone-950 group-hover:text-rose-900 transition-colors mb-2 leading-snug drop-shadow-2xs">
                    {l.title}
                  </h2>

                  <p className="text-xs font-bold text-rose-900 mb-2 italic drop-shadow-2xs">
                    "{l.coreIdea}"
                  </p>

                  <p className="text-xs text-stone-700 font-medium line-clamp-3 leading-relaxed mb-4 drop-shadow-2xs">
                    {l.whyItMatters}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-rose-900">
                  <span>{isDone ? 'Review Lesson' : 'Start Lesson'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
