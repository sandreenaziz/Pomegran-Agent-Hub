import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  X,
  Flame,
  Users2,
  GraduationCap,
  Video,
  Layers,
  ArrowRight,
  Sparkles,
  Command,
} from 'lucide-react';
import { searchGlobal, SearchResultItem } from '../utils/search';
import { LobConfig, LOBS, LobId } from '../data/content';
import { ModuleType } from './LobWorkspaceView';

interface GlobalSearchBarProps {
  onSelectResult: (item: SearchResultItem) => void;
}

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const rawResults = searchGlobal(query);

  const results =
    selectedCategory === 'all'
      ? rawResults
      : rawResults.filter((r) => r.type === selectedCategory);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut '/' or 'Ctrl+K' / 'Cmd+K' to focus search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        (e.key === '/' && document.activeElement !== inputRef.current) ||
        ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleItemClick = (item: SearchResultItem) => {
    setIsOpen(false);
    onSelectResult(item);
  };

  const getItemIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'topic':
        return <Flame className="w-4 h-4 text-rose-700" />;
      case 'scenario':
        return <Users2 className="w-4 h-4 text-blue-600" />;
      case 'soft-skill':
        return <GraduationCap className="w-4 h-4 text-emerald-600" />;
      case 'video':
        return <Video className="w-4 h-4 text-purple-600" />;
      case 'lob':
        return <Layers className="w-4 h-4 text-amber-600" />;
    }
  };

  const suggestions = [
    'Refund policy',
    'Caller verification',
    'Password reset',
    'Objection handling',
    'eSIM activation',
    'Retention offers',
    'Active listening',
  ];

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto my-6">
      {/* Search Input Box */}
      <div
        className={`relative flex items-center bg-white rounded-2xl border transition-all duration-200 shadow-sm ${
          isOpen
            ? 'border-[#BA3142] ring-4 ring-[#BA3142]/15 shadow-md'
            : 'border-stone-300 hover:border-stone-400'
        }`}
      >
        <div className="pl-4 pr-2 text-stone-400 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-[#BA3142]" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search anything: topics, scenarios, soft skills, videos, policies..."
          className="w-full py-3.5 pr-20 text-sm sm:text-base text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-hidden"
          aria-label="Global search across all LOBs and topics"
        />

        {/* Right side buttons: Clear & Keyboard shortcut cue */}
        <div className="pr-3 flex items-center gap-2">
          {query ? (
            <button
              onClick={handleClear}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[11px] font-mono text-stone-400 bg-stone-100 border border-stone-200">
              <span>/</span>
            </kbd>
          )}
        </div>
      </div>

      {/* Live Results Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-stone-200 shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* Quick Categories Filter */}
          {query.trim().length > 0 && rawResults.length > 0 && (
            <div className="px-4 py-2.5 bg-stone-50 border-b border-stone-100 flex items-center gap-1.5 overflow-x-auto text-xs">
              <span className="text-stone-400 font-medium mr-1 shrink-0">Filter:</span>
              {[
                { id: 'all', label: `All (${rawResults.length})` },
                {
                  id: 'topic',
                  label: `Topics (${rawResults.filter((r) => r.type === 'topic').length})`,
                },
                {
                  id: 'scenario',
                  label: `Scenarios (${rawResults.filter((r) => r.type === 'scenario').length})`,
                },
                {
                  id: 'soft-skill',
                  label: `Soft Skills (${rawResults.filter((r) => r.type === 'soft-skill').length})`,
                },
                {
                  id: 'video',
                  label: `Videos (${rawResults.filter((r) => r.type === 'video').length})`,
                },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#BA3142] text-white shadow-2xs'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto divide-y divide-stone-100">
            {query.trim().length === 0 ? (
              /* Helpful prompt & suggestions */
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-wider mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-700" />
                  <span>Popular Quick Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((sug) => (
                    <button
                      key={sug}
                      onClick={() => {
                        setQuery(sug);
                        inputRef.current?.focus();
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-stone-700 bg-stone-100 hover:bg-rose-50 hover:text-rose-900 hover:border-rose-200 border border-transparent transition-colors"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length > 0 ? (
              results.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="w-full text-left p-4 hover:bg-rose-50/50 transition-colors flex items-start gap-3 group cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-stone-100 group-hover:bg-white group-hover:shadow-2xs transition-all shrink-0 mt-0.5">
                    {getItemIcon(item.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                        {item.typeLabel}
                      </span>
                      {item.lobName && (
                        <>
                          <span className="text-stone-300">·</span>
                          <span className="text-xs font-bold text-rose-800">
                            {item.lobName}
                          </span>
                        </>
                      )}
                      <span className="text-stone-300">·</span>
                      <span className="text-xs text-stone-500 truncate">
                        {item.subtitle}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-stone-950 group-hover:text-rose-900 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-1 mt-1 leading-relaxed">
                      {item.snippet}
                    </p>
                  </div>

                  <div className="shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-rose-800" />
                  </div>
                </button>
              ))
            ) : (
              /* Empty Results */
              <div className="p-8 text-center text-stone-500">
                <Search className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-stone-800">
                  No matches found for "{query}"
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Try searching for keywords like "refund", "verification", "wifi", "pricing", or "cancellation".
                </p>
              </div>
            )}
          </div>

          {/* Footer note */}
          {results.length > 0 && (
            <div className="px-4 py-2 bg-stone-50 border-t border-stone-100 text-[11px] text-stone-500 flex items-center justify-between">
              <span>Showing {results.length} results</span>
              <span>Click any result to jump directly to it</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
