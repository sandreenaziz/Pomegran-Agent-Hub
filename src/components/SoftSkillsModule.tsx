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

  useEffect(() => {
    if (initialLessonId) {
      const match = SOFT_SKILLS_LESSONS.find((l) => l.id === initialLessonId);
      if (match) {
        setSelectedLesson(match);
        setSelectedQuickAnswers({});
      }
    }
  }, [initialLessonId]);

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() =>
    getCompletedLessons()
  );

  // Quick check state for current lesson
  const [selectedQuickAnswers, setSelectedQuickAnswers] = useState<Record<number, number>>({});

  const handleOpenLesson = (lesson: SoftSkillLesson) => {
    setSelectedLesson(lesson);
    setSelectedQuickAnswers({});
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

  if (selectedLesson) {
    const isCompleted = completedLessonIds.includes(selectedLesson.id);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setSelectedLesson(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors py-1.5 px-2.5 rounded-lg bg-white border border-stone-200 shadow-2xs group focus-visible:ring-2 focus-visible:ring-rose-800"
          >
            <ArrowLeft className="w-4 h-4 text-stone-500 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Soft Skills Academy</span>
          </button>

          <button
            onClick={() => handleToggleComplete(selectedLesson.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs border ${
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

        {/* Lesson Reader Card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
            <span className="font-bold text-rose-800 uppercase tracking-wider">
              Core People Skill
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{selectedLesson.readTime}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight mb-2">
            {selectedLesson.title}
          </h1>

          <p className="text-base font-semibold text-stone-700 italic border-b border-stone-100 pb-5 mb-6">
            "{selectedLesson.coreIdea}"
          </p>

          {/* Section 1: Why it matters */}
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              01. Why It Matters
            </h2>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-700 leading-relaxed">
              {selectedLesson.whyItMatters}
            </div>
          </div>

          {/* Section 2: The Technique */}
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              02. The Technique
            </h2>
            <div className="space-y-3">
              {selectedLesson.techniqueSteps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="flex items-start gap-3 p-4 rounded-xl border border-stone-200/80 bg-white shadow-2xs"
                >
                  <div className="w-6 h-6 rounded-full bg-rose-800 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 mb-0.5">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Say This, Not That */}
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              03. Say This, Not That
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Say This */}
              <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs uppercase tracking-wider mb-2">
                  <Check className="w-4 h-4 text-emerald-700 stroke-[3]" />
                  <span>Say This (Empowering)</span>
                </div>
                <p className="text-sm text-stone-800 font-medium italic leading-relaxed">
                  "{selectedLesson.sayThis}"
                </p>
              </div>

              {/* Not That */}
              <div className="p-5 rounded-xl bg-rose-50/70 border border-rose-200">
                <div className="flex items-center gap-1.5 text-rose-900 font-bold text-xs uppercase tracking-wider mb-2">
                  <X className="w-4 h-4 text-rose-700 stroke-[3]" />
                  <span>Not That (Defensive/Robotic)</span>
                </div>
                <p className="text-sm text-stone-800 italic leading-relaxed">
                  "{selectedLesson.notThis}"
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Quick Check (2 MCQs) */}
          <div className="mb-8 pt-6 border-t border-stone-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-stone-600" />
              <span>04. Quick Check (2 Questions)</span>
            </h2>

            <div className="space-y-6">
              {selectedLesson.quizQuestions.map((q, qIdx) => {
                const userChoice = selectedQuickAnswers[qIdx];
                const isAnswered = userChoice !== undefined;
                const isCorrect = isAnswered && userChoice === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl bg-stone-50 border border-stone-200"
                  >
                    <p className="text-sm font-bold text-stone-900 mb-3">
                      {qIdx + 1}. {q.question}
                    </p>

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
          </div>

          {/* Section 5: Mark as complete action */}
          <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-500 font-medium">
              Finished reading and testing? Update your progress.
            </span>

            <button
              onClick={() => handleToggleComplete(selectedLesson.id)}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-xs transition-all ${
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
              <span>Module 03</span>
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

      {/* 5 Lesson Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SOFT_SKILLS_LESSONS.map((l, idx) => {
          const isDone = completedLessonIds.includes(l.id);

          return (
            <button
              key={l.id}
              onClick={() => handleOpenLesson(l)}
              className="group flex flex-col justify-between text-left p-6 sm:p-7 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 focus-visible:ring-3 focus-visible:ring-rose-800 focus-visible:outline-hidden cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-stone-400">
                    Lesson 0{idx + 1}
                  </span>
                  {isDone ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Complete</span>
                    </span>
                  ) : (
                    <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-400" />
                      <span>{l.readTime}</span>
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-bold text-stone-950 group-hover:text-rose-900 transition-colors mb-2 leading-snug">
                  {l.title}
                </h2>

                <p className="text-xs font-semibold text-rose-900 mb-2 italic">
                  "{l.coreIdea}"
                </p>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                  {l.whyItMatters}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-rose-900">
                <span>{isDone ? 'Review Lesson' : 'Start Lesson'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
