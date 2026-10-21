/**
 * Pomegran Account – Agent Hub
 * Main Application Orchestrator
 *
 * Author: Sandrine Aziz
 * Product Design Document: Oct 15, 2026
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { LobWorkspaceView, ModuleType } from './components/LobWorkspaceView';
import { HotTopicsModule } from './components/HotTopicsModule';
import { ScenariosModule } from './components/ScenariosModule';
import { SoftSkillsModule } from './components/SoftSkillsModule';
import { VideosModule } from './components/VideosModule';
import { AskTrainerModule } from './components/AskTrainerModule';
import {
  LOBS,
  LobConfig,
  HOT_TOPICS,
  SCENARIOS,
  SETTINGS,
  LobId,
} from './data/content';
import { getLastLob, setLastLob } from './utils/storage';
import { SearchResultItem } from './utils/search';

export default function App() {
  const [currentLob, setCurrentLob] = useState<LobConfig | null>(null);
  const [currentModule, setCurrentModule] = useState<ModuleType | null>(null);
  const [targetItemId, setTargetItemId] = useState<string | null>(null);
  const [lastLobId, setLastLobIdState] = useState<LobId | null>(null);

  // Modal state for quick Ask Trainer popup from anywhere
  const [isTrainerModalOpen, setIsTrainerModalOpen] = useState<boolean>(false);

  // Initialize last LOB on mount
  useEffect(() => {
    const savedLobId = getLastLob();
    if (savedLobId) {
      setLastLobIdState(savedLobId);
    }
  }, []);

  const handleSelectLob = (lob: LobConfig) => {
    setCurrentLob(lob);
    setCurrentModule(null);
    setTargetItemId(null);
    setLastLob(lob.id);
    setLastLobIdState(lob.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentLob(null);
    setCurrentModule(null);
    setTargetItemId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectModule = (module: ModuleType) => {
    setTargetItemId(null);
    if (module === 'ask-trainer') {
      setCurrentModule('ask-trainer');
    } else {
      setCurrentModule(module);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLobWorkspace = () => {
    setCurrentModule(null);
    setTargetItemId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Universal Jump Handler for both Home Global Search and Inside-LOB Search
   */
  const handleSelectSearchResult = (item: SearchResultItem) => {
    // 1. If clicking a Line of Business
    if (item.type === 'lob' && item.lobId) {
      const matchLob = LOBS.find((l) => l.id === item.lobId);
      if (matchLob) {
        handleSelectLob(matchLob);
      }
      return;
    }

    // 2. Determine target LOB
    let destinationLob: LobConfig | null = currentLob;
    if (item.lobId && item.lobId !== 'all') {
      destinationLob = LOBS.find((l) => l.id === item.lobId) || currentLob || LOBS[0];
    } else if (!destinationLob) {
      destinationLob = LOBS[0]; // fallback default
    }

    if (destinationLob) {
      setCurrentLob(destinationLob);
      setLastLob(destinationLob.id);
      setLastLobIdState(destinationLob.id);
    }

    // 3. Set module and target item ID
    if (item.moduleId) {
      setCurrentModule(item.moduleId);
      setTargetItemId(item.targetId || null);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getModuleTitle = (m: ModuleType | null): string | undefined => {
    switch (m) {
      case 'hot-topics':
        return 'Hot Topics';
      case 'scenarios':
        return 'Real Customer Scenarios';
      case 'soft-skills':
        return 'Soft Skills Academy';
      case 'videos':
        return 'Microlearning Videos';
      case 'ask-trainer':
        return 'Ask the Trainer';
      default:
        return undefined;
    }
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation Bar with 3-Zone Contract */}
      <Header
        currentLob={currentLob}
        onNavigateHome={handleNavigateHome}
        onOpenTrainer={() => setIsTrainerModalOpen(true)}
        currentModuleTitle={getModuleTitle(currentModule)}
        onNavigateBackToLob={
          currentModule ? handleBackToLobWorkspace : undefined
        }
      />

      {/* Main View Area */}
      <main className="flex-1">
        {/* 1. Home View with Global Search */}
        {!currentLob && (
          <HomeView
            onSelectLob={handleSelectLob}
            lastLobId={lastLobId}
            onOpenTrainer={() => setIsTrainerModalOpen(true)}
            onSelectSearchResult={handleSelectSearchResult}
          />
        )}

        {/* 2. LOB Workspace Hub with Scoped LOB Search */}
        {currentLob && !currentModule && (
          <LobWorkspaceView
            lob={currentLob}
            onNavigateHome={handleNavigateHome}
            onSelectModule={handleSelectModule}
            onSelectSearchResult={handleSelectSearchResult}
          />
        )}

        {/* 3. Module 1: Hot Topics */}
        {currentLob && currentModule === 'hot-topics' && (
          <HotTopicsModule
            lob={currentLob}
            topics={HOT_TOPICS.filter((t) => t.lobId === currentLob.id)}
            onBackToWorkspace={handleBackToLobWorkspace}
            onOpenTrainer={() => setIsTrainerModalOpen(true)}
            initialTopicId={targetItemId || undefined}
            onSelectSearchResult={handleSelectSearchResult}
          />
        )}

        {/* 4. Module 2: Real Customer Scenarios */}
        {currentLob && currentModule === 'scenarios' && (
          <ScenariosModule
            lob={currentLob}
            scenarios={SCENARIOS.filter((s) => s.lobId === currentLob.id)}
            onBackToWorkspace={handleBackToLobWorkspace}
            onOpenTrainer={() => setIsTrainerModalOpen(true)}
            initialScenarioId={targetItemId || undefined}
            onSelectSearchResult={handleSelectSearchResult}
          />
        )}

        {/* 5. Module 3: Soft Skills Academy */}
        {currentLob && currentModule === 'soft-skills' && (
          <SoftSkillsModule
            lob={currentLob}
            onBackToWorkspace={handleBackToLobWorkspace}
            onOpenTrainer={() => setIsTrainerModalOpen(true)}
            initialLessonId={targetItemId || undefined}
          />
        )}

        {/* 6. Module 4: Microlearning Videos */}
        {currentLob && currentModule === 'videos' && (
          <VideosModule
            lob={currentLob}
            onBackToWorkspace={handleBackToLobWorkspace}
            onOpenTrainer={() => setIsTrainerModalOpen(true)}
            initialVideoId={targetItemId || undefined}
          />
        )}

        {/* 7. Module 5: Ask the Trainer (Page View) */}
        {currentLob && currentModule === 'ask-trainer' && (
          <div className="py-8">
            <div className="max-w-3xl mx-auto px-4 mb-4">
              <button
                onClick={handleBackToLobWorkspace}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                ← Back to {currentLob.name} Workspace
              </button>
            </div>
            <AskTrainerModule
              currentLob={currentLob}
              onClose={handleBackToLobWorkspace}
              isModal={false}
            />
          </div>
        )}
      </main>

      {/* Global Quick Action Modal for Ask the Trainer */}
      {isTrainerModalOpen && (
        <AskTrainerModule
          currentLob={currentLob}
          onClose={() => setIsTrainerModalOpen(false)}
          isModal={true}
        />
      )}
    </div>
  );
}
