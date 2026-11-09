import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Video,
  Play,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Folder,
  FolderOpen,
  ArrowRight,
} from 'lucide-react';
import { LobConfig, VideoItem, VIDEOS, VIDEO_CATEGORIES } from '../data/content';
import { getWatchedVideos, toggleWatchedVideo } from '../utils/storage';
import { VideoCategoryBoxes } from './VideoCategoryBoxes';

interface VideosModuleProps {
  lob: LobConfig;
  onBackToWorkspace: () => void;
  onOpenTrainer: () => void;
  initialVideoId?: string;
  initialCategory?: string | null;
  onClearInitialCategory?: () => void;
}

export const VideosModule: React.FC<VideosModuleProps> = ({
  lob,
  onBackToWorkspace,
  onOpenTrainer,
  initialVideoId,
  initialCategory,
  onClearInitialCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
    return initialCategory || null;
  });

  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(() => {
    if (initialVideoId) {
      return VIDEOS.find((v) => v.id === initialVideoId) || null;
    }
    return null;
  });

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialVideoId) {
      const match = VIDEOS.find((v) => v.id === initialVideoId);
      if (match) {
        setSelectedVideo(match);
        if (match.folder) {
          setSelectedCategory(match.folder);
        }
      }
    }
  }, [initialVideoId]);

  const [watchedVideoIds, setWatchedVideoIds] = useState<string[]>(() =>
    getWatchedVideos()
  );

  const handleOpenVideo = (video: VideoItem) => {
    setSelectedVideo(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleWatched = (videoId: string) => {
    toggleWatchedVideo(videoId);
    setWatchedVideoIds(getWatchedVideos());
  };

  const isEmbeddable = (url: string) => {
    if (!url || url === 'PASTE_LINK_HERE') return false;
    return (
      url.includes('youtube.com') ||
      url.includes('youtu.be') ||
      url.includes('vimeo.com') ||
      url.includes('drive.google.com')
    );
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes('vimeo.com/')) {
      const id = url.split('vimeo.com/')[1];
      return `https://player.vimeo.com/video/${id}`;
    }
    if (url.includes('drive.google.com/file/d/')) {
      if (url.includes('/preview')) return url;
      return url.replace(/\/view.*$/, '/preview');
    }
    return url;
  };

  // VIEW 1: Single Video Player
  if (selectedVideo) {
    const isWatched = watchedVideoIds.includes(selectedVideo.id);
    const hasEmbed = isEmbeddable(selectedVideo.url);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fadeIn">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setSelectedVideo(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors py-1.5 px-3 rounded-lg bg-white border border-stone-200 shadow-2xs group focus-visible:ring-2 focus-visible:ring-[#BA1E38] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-stone-500 group-hover:-translate-x-1 transition-transform" />
            <span>Back to {selectedCategory || 'Videos'}</span>
          </button>

          <button
            onClick={() => handleToggleWatched(selectedVideo.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs border cursor-pointer ${
              isWatched
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
            }`}
          >
            <CheckCircle2
              className={`w-4 h-4 ${
                isWatched ? 'text-emerald-600' : 'text-stone-400'
              }`}
            />
            <span>{isWatched ? 'Watched' : 'Mark as Watched'}</span>
          </button>
        </div>

        {/* Video Player Card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden mb-8">
          {/* Video Player Container */}
          <div className="relative aspect-video bg-stone-950 flex items-center justify-center text-white overflow-hidden">
            {hasEmbed ? (
              <iframe
                src={getEmbedUrl(selectedVideo.url)}
                title={selectedVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Play className="w-12 h-12 text-stone-600 mb-3" />
                <p className="text-sm font-semibold text-stone-400">
                  Video player ready for playback
                </p>
              </div>
            )}
          </div>

          {/* Video Header & Meta */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 mb-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 font-mono font-semibold">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>{selectedVideo.duration}</span>
                </span>
                {selectedVideo.folder && (
                  <>
                    <span>·</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#BA1E38] font-bold border border-rose-200">
                      {selectedVideo.folder}
                    </span>
                  </>
                )}
              </div>

              {selectedVideo.url.includes('drive.google.com') && (
                <a
                  href={selectedVideo.url.replace('/preview', '/view')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#BA1E38] hover:text-[#9B152B] bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Google Drive</span>
                </a>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-950 mb-3">
              {selectedVideo.title}
            </h1>

            <p className="text-sm text-stone-700 leading-relaxed mb-6 border-b border-stone-100 pb-5">
              {selectedVideo.description}
            </p>

            {/* Key Takeaways */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#BA1E38]" />
                <span>Key Learning Takeaways</span>
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                {selectedVideo.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-rose-100 text-[#BA1E38] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags and Completion Action */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {selectedVideo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleToggleWatched(selectedVideo.id)}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm shadow-xs transition-all cursor-pointer ${
                  isWatched
                    ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                    : 'bg-[#BA1E38] text-white hover:bg-[#9B152B]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isWatched ? 'Completed (Watched)' : 'Mark as Watched'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // VIEW 2: Inside a Specific Video Category
  if (selectedCategory) {
    const categoryConfig = VIDEO_CATEGORIES.find(
      (c) => c.name === selectedCategory
    );
    const categoryVideos = VIDEOS.filter((v) => v.folder === selectedCategory);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        {/* Top Navigation */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setSelectedCategory(null);
              onClearInitialCategory?.();
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors py-1.5 px-3 rounded-lg bg-white border border-stone-200 shadow-2xs group focus-visible:ring-2 focus-visible:ring-[#BA1E38] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-stone-500 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Video Categories</span>
          </button>

          <button
            onClick={onBackToWorkspace}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors py-1.5 px-3 rounded-lg bg-white border border-stone-200 shadow-2xs group cursor-pointer"
          >
            <span>Back to Main Page</span>
          </button>
        </div>

        {/* Category Hero Banner */}
        {categoryConfig && (
          <div
            className="p-6 sm:p-8 rounded-2xl bg-white border shadow-sm relative overflow-hidden mb-8"
            style={{
              borderColor: categoryConfig.accent.border,
              borderLeftWidth: '6px',
              borderLeftColor: categoryConfig.accent.primary,
            }}
          >
            {/* Blurred Thematic Image in Banner */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <img
                src={categoryConfig.bgImage}
                alt={categoryConfig.name}
                aria-hidden="true"
                className="w-full h-full object-cover scale-105 filter blur-[3px] opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/75 to-white/65" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md"
                    style={{
                      backgroundColor: categoryConfig.accent.tagBg,
                      color: categoryConfig.accent.text,
                    }}
                  >
                    {categoryConfig.name}
                  </span>
                  <span className="text-stone-300">·</span>
                  <span className="text-xs text-stone-600 font-semibold">
                    {categoryConfig.subtitle}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
                  {categoryConfig.name} Videos
                </h1>
                <p className="mt-2 text-sm text-stone-700 max-w-2xl leading-relaxed">
                  {categoryConfig.description}
                </p>
              </div>

              <div className="bg-white/90 border border-stone-200 rounded-xl p-4 shrink-0 sm:min-w-[180px] shadow-2xs backdrop-blur-xs">
                <span className="text-xs font-semibold text-stone-500 block">
                  Category Library
                </span>
                <span className="text-lg font-mono font-extrabold text-stone-900">
                  {categoryVideos.length} {categoryVideos.length === 1 ? 'Video' : 'Videos'}
                </span>
                <p className="text-[11px] text-stone-500 mt-1">
                  Google Drive Embedded Player
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Category Switcher Tabs */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-100">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0 mr-1">
            Jump to Category:
          </span>
          {VIDEO_CATEGORIES.map((cat) => {
            const isCurrent = cat.name === selectedCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                  isCurrent
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: cat.accent.primary }}
                />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Videos Grid for Selected Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categoryVideos.map((video) => {
            const isWatched = watchedVideoIds.includes(video.id);

            return (
              <div
                key={video.id}
                onClick={() => handleOpenVideo(video)}
                className="group flex flex-col justify-between text-left rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden cursor-pointer"
              >
                <div>
                  {/* Video Thumbnail with Real Preview Image */}
                  <div className="relative aspect-video bg-stone-900 flex items-center justify-center text-white overflow-hidden">
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 to-rose-950" />
                    )}

                    {/* Subtle contrast gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30 group-hover:via-black/10 transition-all duration-200" />

                    {/* Central Play Button */}
                    <div className="relative z-10 w-12 h-12 rounded-full bg-[#BA1E38]/90 group-hover:bg-[#BA1E38] text-white flex items-center justify-center group-hover:scale-110 transition-all duration-200 shadow-lg border border-white/20 backdrop-blur-xs">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>

                    {/* Duration Badge */}
                    <span className="absolute bottom-2.5 right-2.5 z-10 bg-black/80 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border border-white/10">
                      {video.duration}
                    </span>

                    {isWatched && (
                      <span className="absolute top-2.5 left-2.5 z-10 bg-emerald-700/95 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-500/30 shadow-xs">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Watched</span>
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {video.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-base font-bold text-stone-950 group-hover:text-[#BA1E38] transition-colors mb-1.5 leading-snug">
                      {video.title}
                    </h2>

                    <p className="text-xs text-stone-500 mb-2 font-medium">
                      Instructor: {video.speaker}
                    </p>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3.5 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-[#BA1E38] bg-stone-50/50">
                  <span>Watch Video</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // VIEW 3: Video Categories Landing Page (Home of Microlearning Videos)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Top Bar with Back to Main Page */}
      <div className="mb-6">
        <button
          onClick={onBackToWorkspace}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors py-1.5 px-3 rounded-lg bg-white border border-stone-200 shadow-2xs group focus-visible:ring-2 focus-visible:ring-[#BA1E38] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-stone-500 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Main Page</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#BA1E38] text-xs font-bold mb-2">
            <Video className="w-3.5 h-3.5" />
            <span>MICROLEARNING VIDEO LIBRARY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-950 tracking-tight">
            Microlearning Video Categories
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-stone-600 max-w-2xl">
            Select a category box below to explore high-impact video lessons with embedded Google Drive playback and key learning takeaways.
          </p>
        </div>

        <div className="text-xs text-stone-500 font-semibold bg-stone-100 px-3.5 py-2 rounded-xl shrink-0">
          {VIDEO_CATEGORIES.length} Categories · {VIDEOS.length} Lessons
        </div>
      </div>

      {/* The 6 Category Boxes with Thematic Blurred Images */}
      <VideoCategoryBoxes
        onSelectCategory={(catName) => {
          setSelectedCategory(catName);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};
