import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  X,
  Flame,
  Users2,
  GraduationCap,
  Video,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { LobConfig } from '../data/content';
import { searchLob, SearchResultItem } from '../utils/search';

interface LobSearchBarProps {
  lob: LobConfig;
  onSelectResult: (item: SearchResultItem) => void;
  placeholder?: string;
}

export const LobSearchBar: React.FC<LobSearchBarProps> = ({
  lob,
  onSelectResult,
  placeholder,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = searchLob(lob.id, query);

  // Close dropdown on click outside
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
      default:
        return <Search className="w-4 h-4 text-stone-500" />;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      {/* Search Bar Input */}
      <div
        className={`relative flex items-center bg-white rounded-xl border transition-all duration-150 shadow-2xs ${
          isOpen
            ? 'ring-3 shadow-md'
            : 'border-stone-300 hover:border-stone-400'
        }`}
        style={{
          borderColor: isOpen ? lob.accent.primary : undefined,
          boxShadow: isOpen ? `0 0 0 3px ${lob.accent.light}` : undefined,
        }}
      >
        <div className="pl-3.5 pr-2 text-stone-400 flex items-center pointer-events-none">
          <Search
            className="w-4 h-4"
            style={{ color: lob.accent.primary }}
          />
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
          placeholder={
            placeholder ||
            `Search inside ${lob.name} topics & workspace (rules, dos/donts, scenarios)...`
          }
          className="w-full py-2.5 pr-8 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-hidden"
          aria-label={`Search inside ${lob.name} workspace`}
        />

        {query && (
          <button
            onClick={handleClear}
            className="pr-3 text-stone-400 hover:text-stone-700 transition-colors"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl border border-stone-200 shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-2 bg-stone-50 border-b border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-semibold">
            <span>
              Searching {lob.name} workspace only ({results.length} found)
            </span>
            <span className="uppercase tracking-wider text-[10px]">
              {lob.name} Scope
            </span>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
            {results.length > 0 ? (
              results.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="w-full text-left p-3.5 hover:bg-stone-50 transition-colors flex items-start gap-2.5 group cursor-pointer"
                >
                  <div className="p-1.5 rounded-md bg-stone-100 group-hover:bg-white group-hover:shadow-2xs transition-all shrink-0 mt-0.5">
                    {getItemIcon(item.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                        {item.typeLabel}
                      </span>
                      <span className="text-stone-300">·</span>
                      <span className="text-[11px] text-stone-500 truncate">
                        {item.subtitle}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-stone-950 group-hover:text-rose-900 transition-colors leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-stone-600 line-clamp-1 mt-0.5 leading-relaxed">
                      {item.snippet}
                    </p>
                  </div>

                  <div className="shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-3.5 h-3.5 text-stone-700" />
                  </div>
                </button>
              ))
            ) : (
              <div className="p-6 text-center text-stone-500">
                <p className="text-xs font-bold text-stone-800">
                  No matches in {lob.name} workspace for "{query}"
                </p>
                <p className="text-[11px] text-stone-400 mt-1">
                  Try searching for terms covered in this team’s topics or scenarios.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
