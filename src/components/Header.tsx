import React from 'react';
import { ArrowLeft, MessageSquareQuote } from 'lucide-react';
import { LobConfig } from '../data/content';
import { PomegranLogo } from './PomegranLogo';

interface HeaderProps {
  currentLob?: LobConfig | null;
  onNavigateHome: () => void;
  onOpenTrainer: () => void;
  currentModuleTitle?: string;
  onNavigateBackToLob?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLob,
  onNavigateHome,
  onOpenTrainer,
  currentModuleTitle,
  onNavigateBackToLob,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Navigation Zone */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 text-stone-900 hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-[#BA1E38] focus-visible:outline-hidden rounded-md p-1 group cursor-pointer"
            title="Return to Home"
          >
            {/* Official Pomegran Logo Lockup with Red Wordmark & Red Emblem */}
            <PomegranLogo
              size="sm"
              color="#BA1E38"
              className="group-hover:opacity-95 transition-opacity"
            />
            <span className="hidden sm:inline-block ml-1 pl-2.5 border-l border-stone-200 text-[10px] font-bold text-stone-500 tracking-wider uppercase">
              Agent Hub
            </span>
          </button>

          {/* Contextual LOB Badge and Breadcrumbs if in workspace */}
          {currentLob && (
            <div className="flex items-center gap-2 pl-3 border-l border-stone-200">
              {onNavigateBackToLob && currentModuleTitle ? (
                <button
                  onClick={onNavigateBackToLob}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 py-1 px-2.5 rounded-md transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{currentLob.name} Workspace</span>
                </button>
              ) : (
                <div
                  className="px-2.5 py-1 rounded-md text-xs font-bold tracking-wide"
                  style={{
                    backgroundColor: currentLob.accent.tagBg,
                    color: currentLob.accent.text,
                  }}
                >
                  {currentLob.name} Team
                </div>
              )}
            </div>
          )}
        </div>

        {/* Center Breadcrumb on larger screens */}
        <div className="hidden md:flex items-center text-xs text-stone-500 font-medium truncate max-w-md">
          <button
            onClick={onNavigateHome}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Home
          </button>
          {currentLob && (
            <>
              <span className="mx-2 text-stone-300">/</span>
              <button
                onClick={onNavigateBackToLob || undefined}
                className={`hover:text-stone-900 transition-colors cursor-pointer ${
                  !currentModuleTitle ? 'text-stone-900 font-semibold' : ''
                }`}
              >
                {currentLob.fullName}
              </button>
            </>
          )}
          {currentModuleTitle && (
            <>
              <span className="mx-2 text-stone-300">/</span>
              <span className="text-stone-900 font-semibold truncate">
                {currentModuleTitle}
              </span>
            </>
          )}
        </div>

        {/* Persistent Ask the Trainer Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTrainer}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-rose-950 bg-rose-50 hover:bg-rose-100 border border-rose-200 shadow-2xs transition-colors focus-visible:ring-2 focus-visible:ring-[#BA1E38] focus-visible:outline-hidden whitespace-nowrap cursor-pointer"
            title="Ask the Trainer questions or suggest topics"
          >
            <MessageSquareQuote className="w-4 h-4 text-[#BA1E38]" />
            <span>Ask the Trainer</span>
          </button>
        </div>
      </div>
    </header>
  );
};
