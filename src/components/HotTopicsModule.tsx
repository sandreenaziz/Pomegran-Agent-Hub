import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  ChevronRight,
  Award,
  Check,
  X,
  AlertCircle,
} from 'lucide-react';
import { HotTopic, LobConfig, SETTINGS } from '../data/content';
import { getQuizResults, saveQuizResult, QuizResult } from '../utils/storage';
import { LobSearchBar } from './LobSearchBar';
import { SearchResultItem } from '../utils/search';

interface HotTopicsModuleProps {
  lob: LobConfig;
  topics: HotTopic[];
  onBackToWorkspace: () => void;
  onOpenTrainer: () => void;
  initialTopicId?: string;
  onSelectSearchResult?: (item: SearchResultItem) => void;
}

export const HotTopicsModule: React.FC<HotTopicsModuleProps> = ({
  lob,
  topics,
  onBackToWorkspace,
  onOpenTrainer,
  initialTopicId,
  onSelectSearchResult,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<HotTopic | null>(() => {
    if (initialTopicId) {
      return topics.find((t) => t.id === initialTopicId) || null;
    }
    return null;
  });
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // If initialTopicId changes externally
  useEffect(() => {
    if (initialTopicId) {
      const found = topics.find((t) => t.id === initialTopicId);
      if (found) {
        setSelectedTopic(found);
        setIsQuizActive(false);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setQuizSubmitted(false);
      }
    }
  }, [initialTopicId, topics]);

  // Local storage state
  const [quizResults, setQuizResults] = useState<Record<string, QuizResult>>(() =>
    getQuizResults()
  );

  const handleOpenTopic = (topic: HotTopic) => {
    setSelectedTopic(topic);
    setIsQuizActive(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuiz = () => {
    setIsQuizActive(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    // Scroll down to quiz area
    const quizElem = document.getElementById('topic-quiz-section');
    if (quizElem) {
      quizElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    // Only allow selection if not already chosen for this question
    if (selectedAnswers[currentQuestionIndex] !== undefined) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handleNextQuestion = () => {
    if (!selectedTopic) return;
    if (currentQuestionIndex < selectedTopic.quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Calculate score & finish
      let score = 0;
      selectedTopic.quizQuestions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) {
          score += 1;
        }
      });
      const total = selectedTopic.quizQuestions.length;
      const percentage = Math.round((score / total) * 100);
      const passed = percentage >= SETTINGS.passMarkPercentage;

      const result: QuizResult = {
        topicId: selectedTopic.id,
        lobId: lob.id,
        score,
        percentage,
        passed,
        completedAt: new Date().toISOString(),
      };

      saveQuizResult(result);
      setQuizResults(getQuizResults());
      setQuizSubmitted(true);
    }
  };

  const handleRetryQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setIsQuizActive(true);
  };

  const handleBackToTopicList = () => {
    setSelectedTopic(null);
    setIsQuizActive(false);
    setQuizSubmitted(false);
  };

  // If viewing a single topic
  if (selectedTopic) {
    const existingResult = quizResults[selectedTopic.id];
    const questions = selectedTopic.quizQuestions;
    const currentQuestion = questions[currentQuestionIndex];
    const currentSelectedOption = selectedAnswers[currentQuestionIndex];
    const isAnswered = currentSelectedOption !== undefined;
    const isCorrect = isAnswered && currentSelectedOption === currentQuestion.correctIndex;

    // Calculate live score for summary
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Navigation Breadcrumb & Back */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={handleBackToTopicList}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors py-1.5 px-2.5 rounded-lg bg-white border border-stone-200 shadow-2xs group focus-visible:ring-2 focus-visible:ring-rose-800"
          >
            <ArrowLeft className="w-4 h-4 text-stone-500 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Hot Topics</span>
          </button>

          {existingResult?.passed && (
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>Passed ({existingResult.percentage}%)</span>
            </div>
          )}
        </div>

        {/* Topic Header Card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-3">
            <span
              className="px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider"
              style={{
                backgroundColor: lob.accent.tagBg,
                color: lob.accent.text,
              }}
            >
              {lob.name} Policy
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>Updated {selectedTopic.updatedDate}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{selectedTopic.readTime}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight leading-tight mb-4">
            {selectedTopic.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-normal border-b border-stone-100 pb-6 mb-6">
            {selectedTopic.summary}
          </p>

          {/* Key Points */}
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-stone-700" />
              <span>Key Operating Rules & Standards</span>
            </h2>
            <ul className="space-y-2.5 text-sm text-stone-700">
              {selectedTopic.keyPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 text-white"
                    style={{ backgroundColor: lob.accent.primary }}
                  >
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Do and Don't Panel */}
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3">
              Standard Operating Guidance: Do & Don’t
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* DO Panel */}
              <div className="rounded-xl bg-emerald-50/60 border border-emerald-200/90 p-5">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-3">
                  <Check className="w-4 h-4 text-emerald-700 stroke-[3]" />
                  <span>DO (Best Practice)</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                  {selectedTopic.doAndDont.dos.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* DON'T Panel */}
              <div className="rounded-xl bg-rose-50/60 border border-rose-200/90 p-5">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-sm mb-3">
                  <X className="w-4 h-4 text-rose-700 stroke-[3]" />
                  <span>DON’T (Policy Violations)</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                  {selectedTopic.doAndDont.donts.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-700 font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action to take quiz */}
          {!isQuizActive && (
            <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Knowledge Check
                </p>
                <p className="text-sm font-bold text-stone-900">
                  5 multiple-choice questions · 80% pass mark (4/5)
                </p>
              </div>

              <button
                onClick={handleStartQuiz}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-sm hover:shadow-md transition-all focus-visible:ring-3 focus-visible:ring-rose-800 focus-visible:outline-hidden"
                style={{ backgroundColor: lob.accent.primary }}
              >
                <span>{existingResult ? 'Retake Knowledge Quiz' : 'Take the Quiz'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Quiz Section (Appears below topic content on the same page) */}
        {isQuizActive && (
          <div
            id="topic-quiz-section"
            className="bg-white rounded-2xl border-2 border-stone-300 shadow-md p-6 sm:p-8 transition-all duration-300"
          >
            {!quizSubmitted ? (
              <div>
                {/* Quiz Header & Progress */}
                <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
                  <div>
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      Hot Topic Quiz
                    </span>
                    <h3 className="text-lg font-extrabold text-stone-950">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </h3>
                  </div>

                  {/* Progress Indicator */}
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-stone-700 tabular-nums">
                      {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                    </span>
                    <div className="w-24 bg-stone-100 rounded-full h-2 mt-1 overflow-hidden">
                      <div
                        className="h-full bg-rose-700 rounded-full transition-all duration-300"
                        style={{
                          width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Current Question Text */}
                <p className="text-base sm:text-lg font-bold text-stone-900 mb-6 leading-snug">
                  {currentQuestion.question}
                </p>

                {/* 4 Multiple Choice Options */}
                <div className="space-y-3 mb-6">
                  {currentQuestion.options.map((opt, optIdx) => {
                    const isSelected = currentSelectedOption === optIdx;
                    const isOptionCorrect = optIdx === currentQuestion.correctIndex;

                    let optionStyle =
                      'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-900';

                    if (isAnswered) {
                      if (isOptionCorrect) {
                        optionStyle =
                          'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500 font-semibold';
                      } else if (isSelected) {
                        optionStyle =
                          'bg-rose-50 border-rose-500 text-rose-950 ring-1 ring-rose-500';
                      } else {
                        optionStyle = 'opacity-50 border-stone-200 text-stone-500';
                      }
                    }

                    const letters = ['A', 'B', 'C', 'D'];

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-start gap-3 text-sm focus-visible:ring-2 focus-visible:ring-rose-800 focus-visible:outline-hidden ${optionStyle} ${
                          !isAnswered ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                            isSelected && isAnswered
                              ? isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-rose-600 text-white'
                              : isOptionCorrect && isAnswered
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white border border-stone-300 text-stone-700'
                          }`}
                        >
                          {letters[optIdx]}
                        </span>
                        <span className="flex-1 leading-relaxed">{opt}</span>

                        {isAnswered && isOptionCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Feedback & One-line Explanation */}
                {isAnswered && (
                  <div
                    className={`p-4 rounded-xl mb-6 text-xs sm:text-sm border ${
                      isCorrect
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                        : 'bg-rose-50/80 border-rose-300 text-rose-950'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold mb-1">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          <span>Correct!</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-rose-700" />
                          <span>Incorrect</span>
                        </>
                      )}
                    </div>
                    <p className="leading-relaxed">{currentQuestion.explanation}</p>
                  </div>
                )}

                {/* Next Question / Finish Button */}
                {isAnswered && (
                  <div className="flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white shadow-sm hover:shadow-md transition-all focus-visible:ring-2 focus-visible:ring-rose-800"
                      style={{ backgroundColor: lob.accent.primary }}
                    >
                      <span>
                        {currentQuestionIndex < questions.length - 1
                          ? 'Next Question'
                          : 'View Final Score'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Final Score Screen */
              <div className="text-center py-6">
                <div
                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                    correctCount >= 4
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {correctCount >= 4 ? (
                    <Award className="w-9 h-9" />
                  ) : (
                    <RotateCcw className="w-8 h-8" />
                  )}
                </div>

                <h3 className="text-2xl font-extrabold text-stone-950 mb-1">
                  {correctCount >= 4 ? 'Quiz Passed!' : 'Review Recommended'}
                </h3>
                <p className="text-sm text-stone-600 mb-6">
                  {correctCount >= 4
                    ? 'Great work! You demonstrated solid mastery of this hot topic.'
                    : 'The pass threshold is 80% (4 of 5). Review the key points above and try again.'}
                </p>

                {/* Score Summary Card */}
                <div className="max-w-xs mx-auto bg-stone-50 border border-stone-200 rounded-xl p-4 mb-8">
                  <div className="text-3xl font-extrabold font-mono text-stone-950 tabular-nums">
                    {correctCount} / {questions.length}
                  </div>
                  <div className="text-xs font-semibold text-stone-500 mt-1">
                    Score: {Math.round((correctCount / questions.length) * 100)}% (Pass mark: 80%)
                  </div>
                  <div className="mt-3 w-full bg-stone-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        correctCount >= 4 ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}
                      style={{
                        width: `${(correctCount / questions.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleRetryQuiz}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retry Quiz</span>
                  </button>

                  <button
                    onClick={handleBackToTopicList}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all shadow-xs"
                    style={{ backgroundColor: lob.accent.primary }}
                  >
                    <span>Back to Topics</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Topic List Screen
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb & Top Bar */}
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
              <span>Module 01</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
              Hot Topics
            </h1>
            <p className="mt-1 text-sm text-stone-600 max-w-2xl">
              Current policy updates and critical procedures every agent must know. Read each topic and check your understanding with a 5-question quiz.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-stone-500">
              Pass mark threshold
            </span>
            <div className="text-sm font-bold text-stone-900 font-mono">
              80% (4 of 5 questions)
            </div>
          </div>
        </div>

        {/* LOB Scoped Search Bar inside Hot Topics */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <LobSearchBar
            lob={lob}
            onSelectResult={(item) => {
              if (item.type === 'topic' && item.targetId) {
                const topicMatch = topics.find((t) => t.id === item.targetId);
                if (topicMatch) {
                  handleOpenTopic(topicMatch);
                  return;
                }
              }
              onSelectSearchResult?.(item);
            }}
            placeholder={`Search ${lob.name} topics for rules, refund limits, do/don'ts, or checklists...`}
          />
          <span className="text-xs text-stone-500 font-medium">
            {topics.length} must-know topics
          </span>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((t) => {
          const res = quizResults[t.id];
          const isPassed = res?.passed;

          return (
            <button
              key={t.id}
              onClick={() => handleOpenTopic(t)}
              className="group flex flex-col justify-between text-left p-6 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 focus-visible:ring-3 focus-visible:ring-rose-800 focus-visible:outline-hidden cursor-pointer"
            >
              <div>
                {/* Meta Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    {t.isNew && (
                      <span className="text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 border border-rose-200">
                        New
                      </span>
                    )}
                    <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-400" />
                      <span>{t.readTime}</span>
                    </span>
                  </div>

                  {/* Completion Tick */}
                  {isPassed ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Passed ({res.percentage}%)</span>
                    </span>
                  ) : res ? (
                    <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                      {res.percentage}% · Retry
                    </span>
                  ) : null}
                </div>

                <h2 className="text-lg font-bold text-stone-950 group-hover:text-rose-900 transition-colors mb-2 leading-snug">
                  {t.title}
                </h2>
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                  {t.teaser}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Updated {t.updatedDate}</span>
                <span className="font-bold text-stone-900 group-hover:text-rose-900 flex items-center gap-1">
                  <span>Open Topic</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
