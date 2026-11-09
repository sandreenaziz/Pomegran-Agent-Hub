import React from 'react';
import {
  Cable,
  Sparkles,
  Tv,
  HeartHandshake,
  TrendingUp,
  Ticket,
  ArrowRight,
  Play,
  CheckCircle2,
} from 'lucide-react';
import { VIDEO_CATEGORIES, VideoCategoryConfig, VIDEOS } from '../data/content';
import { getWatchedVideos } from '../utils/storage';

interface VideoCategoryBoxesProps {
  onSelectCategory: (categoryName: string) => void;
}

export const VideoCategoryBoxes: React.FC<VideoCategoryBoxesProps> = ({
  onSelectCategory,
}) => {
  const watchedVideoIds = getWatchedVideos();

  const getCategoryIcon = (iconName: VideoCategoryConfig['iconName'], color: string) => {
    switch (iconName) {
      case 'Cable':
        return <Cable className="w-5 h-5" style={{ color }} />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" style={{ color }} />;
      case 'Tv':
        return <Tv className="w-5 h-5" style={{ color }} />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5" style={{ color }} />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" style={{ color }} />;
      case 'Ticket':
        return <Ticket className="w-5 h-5" style={{ color }} />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {VIDEO_CATEGORIES.map((cat) => {
        const catVideos = VIDEOS.filter((v) => v.folder === cat.name);
        const watchedInCat = catVideos.filter((v) =>
          watchedVideoIds.includes(v.id)
        ).length;

        return (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.name)}
            className="group relative flex flex-col justify-between text-left p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 focus-visible:ring-3 focus-visible:ring-[#BA1E38] focus-visible:outline-hidden cursor-pointer overflow-hidden min-h-[300px]"
            style={{
              borderTop: `4px solid ${cat.accent.primary}`,
            }}
          >
            {/* Blurred Thematic Category Image Background */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <img
                src={cat.bgImage}
                alt={cat.name}
                aria-hidden="true"
                className="w-full h-full object-cover scale-105 filter blur-[2.5px] opacity-75 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/85 group-hover:from-white/70 group-hover:via-white/60 group-hover:to-white/80 transition-all duration-300" />
            </div>

            <div className="relative z-10 flex-1 min-w-0 flex flex-col justify-between mb-5">
              <div>
                {/* Header: Icon + Category Video Count Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div
                    className="p-3 rounded-xl transition-all duration-200 group-hover:scale-105 shadow-xs border border-white/80 backdrop-blur-md shrink-0"
                    style={{ backgroundColor: cat.accent.light }}
                  >
                    {getCategoryIcon(cat.iconName, cat.accent.primary)}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-stone-700 border border-stone-200/80 backdrop-blur-xs shadow-2xs shrink-0">
                    {catVideos.length} {catVideos.length === 1 ? 'Video' : 'Videos'}
                  </span>
                </div>

                {/* Category Title & Subtitle */}
                <h3 className="text-xl font-extrabold text-stone-950 group-hover:text-[#BA1E38] transition-colors drop-shadow-2xs leading-tight mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-2.5">
                  {cat.subtitle}
                </p>

                {/* Category Description */}
                <p className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed drop-shadow-2xs">
                  {cat.description}
                </p>
              </div>

              {/* Progress Indicator if any videos watched */}
              {watchedInCat > 0 && (
                <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50/90 px-2.5 py-1 rounded-lg border border-emerald-200 backdrop-blur-xs w-fit">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {watchedInCat}/{catVideos.length} Completed
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Action Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectCategory(cat.name);
              }}
              className="relative z-10 w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white transition-all shadow-xs cursor-pointer group-hover:shadow-md"
              style={{ backgroundColor: cat.accent.primary }}
            >
              <div className="flex items-center gap-2">
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>View {cat.name} Videos</span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
