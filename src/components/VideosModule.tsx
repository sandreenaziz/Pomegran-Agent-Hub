import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Video,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Filter,
  User,
  Volume2,
  Maximize2,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { LobConfig, VideoItem, VIDEOS } from '../data/content';
import { getWatchedVideos, toggleWatchedVideo } from '../utils/storage';

interface VideosModuleProps {
  lob: LobConfig;
  onBackToWorkspace: () => void;
  onOpenTrainer: () => void;
  initialVideoId?: string;
}

export const VideosModule: React.FC<VideosModuleProps> = ({
  lob,
  onBackToWorkspace,
  onOpenTrainer,
  initialVideoId,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(() => {
    if (initialVideoId) {
      return VIDEOS.find((v) => v.id === initialVideoId) || null;
    }
    return null;
  });

  useEffect(() => {
    if (initialVideoId) {
      const match = VIDEOS.find((v) => v.id === initialVideoId);
      if (match) {
        setSelectedVideo(match);
        setIsPlaying(false);
        setPlaybackSeconds(0);
      }
    }
  }, [initialVideoId]);

  const [activeTag, setActiveTag] = useState<string>('All');
  const [watchedVideoIds, setWatchedVideoIds] = useState<string[]>(() =>
    getWatchedVideos()
  );

  // Simulated player state for placeholder video links
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSeconds, setPlaybackSeconds] = useState<number>(0);

  // Relevant videos for this LOB + All
  const availableVideos = VIDEOS.filter(
    (v) => v.lobId === lob.id || v.lobId === 'all'
  );

  // Collect all unique tags
  const allTags = ['All', ...Array.from(new Set(availableVideos.flatMap((v) => v.tags)))];

  const filteredVideos =
    activeTag === 'All'
      ? availableVideos
      : availableVideos.filter((v) => v.tags.includes(activeTag));

  const handleOpenVideo = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsPlaying(false);
    setPlaybackSeconds(0);
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
    return url;
  };

  // If viewing single video
  if (selectedVideo) {
    const isWatched = watchedVideoIds.includes(selectedVideo.id);
    const hasEmbed = isEmbeddable(selectedVideo.url);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setSelectedVideo(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors py-1.5 px-2.5 rounded-lg bg-white border border-stone-200 shadow-2xs group focus-visible:ring-2 focus-visible:ring-rose-800"
          >
            <ArrowLeft className="w-4 h-4 text-stone-500 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Video Library</span>
          </button>

          <button
            onClick={() => handleToggleWatched(selectedVideo.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs border ${
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
              /* Simulated Media Player for prototype */
              <div className="w-full h-full relative flex flex-col justify-between p-6 bg-gradient-to-br from-stone-900 via-stone-950 to-rose-950">
                {/* Top Overlay */}
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                    <span>Pomegran Microlearning Studio</span>
                  </div>
                  <span className="font-mono">{selectedVideo.duration} HD</span>
                </div>

                {/* Center Play Button & Title */}
                <div className="text-center my-auto">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-rose-700/90 hover:bg-rose-600 text-white flex items-center justify-center mx-auto mb-4 shadow-xl hover:scale-105 transition-all focus-visible:ring-4 focus-visible:ring-rose-400 focus-visible:outline-hidden cursor-pointer"
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7" />
                    ) : (
                      <Play className="w-7 h-7 ml-1" />
                    )}
                  </button>
                  <p className="text-base sm:text-lg font-bold text-white max-w-lg mx-auto">
                    {selectedVideo.title}
                  </p>
                  <p className="text-xs text-stone-300 mt-1">
                    Instructor: {selectedVideo.speaker}
                  </p>
                </div>

                {/* Player Bottom Bar */}
                <div className="bg-stone-900/80 backdrop-blur-md rounded-xl p-3 flex items-center justify-between gap-4 text-xs text-stone-300">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:text-white transition-colors"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <span className="font-mono text-[11px] tabular-nums">
                      {isPlaying ? '01:14' : '00:00'} / {selectedVideo.duration}
                    </span>
                  </div>

                  <div className="flex-1 max-w-md bg-stone-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-rose-500 ${isPlaying ? 'w-1/3 transition-all' : 'w-0'}`}
                    />
                  </div>

                  <div className="flex items-center gap-3 text-stone-400">
                    <Volume2 className="w-4 h-4 hover:text-white cursor-pointer" />
                    <Maximize2 className="w-4 h-4 hover:text-white cursor-pointer" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* External URL Fallback Notice if link cannot be embedded or user wants new tab */}
          {selectedVideo.url !== 'PASTE_LINK_HERE' && (
            <div className="p-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs text-stone-600">
              <span>External video link provided</span>
              <a
                href={selectedVideo.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-bold text-rose-800 hover:text-rose-950 underline"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Video Information Body */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-3">
              <span className="flex items-center gap-1 font-semibold text-stone-800">
                <User className="w-3.5 h-3.5 text-stone-500" />
                <span>{selectedVideo.speaker}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{selectedVideo.duration}</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-950 mb-3 leading-snug">
              {selectedVideo.title}
            </h1>

            <p className="text-sm text-stone-700 leading-relaxed mb-6">
              {selectedVideo.description}
            </p>

            {/* Key Takeaways */}
            <div className="mb-6 p-5 rounded-xl bg-stone-50 border border-stone-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
                Key Learning Takeaways
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                {selectedVideo.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-800 font-bold">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {selectedVideo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleToggleWatched(selectedVideo.id)}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm shadow-xs transition-all ${
                  isWatched
                    ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                    : 'bg-rose-800 text-white hover:bg-rose-900'
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

  // Library View
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
              <span>Module 04</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
              Microlearning Videos
            </h1>
            <p className="mt-1 text-sm text-stone-600 max-w-2xl">
              High-impact 2 to 5-minute video lessons demonstrating real call handling, system navigation, and customer de-escalation.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-stone-500">
              Watched Videos
            </span>
            <div className="text-sm font-bold text-emerald-700 font-mono">
              {availableVideos.filter((v) => watchedVideoIds.includes(v.id)).length} of{' '}
              {availableVideos.length} Watched
            </div>
          </div>
        </div>

        {/* Tag Filters */}
        <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-xs font-semibold text-stone-500 shrink-0 mr-1">
            Filter:
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTag === tag
                  ? 'bg-rose-800 text-white shadow-2xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => {
          const isWatched = watchedVideoIds.includes(video.id);

          return (
            <button
              key={video.id}
              onClick={() => handleOpenVideo(video)}
              className="group flex flex-col justify-between text-left rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden focus-visible:ring-3 focus-visible:ring-rose-800 focus-visible:outline-hidden cursor-pointer"
            >
              <div>
                {/* Video Card Thumbnail Simulator */}
                <div className="relative aspect-video bg-gradient-to-br from-stone-900 to-rose-950 flex items-center justify-center text-white overflow-hidden">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center group-hover:scale-110 group-hover:bg-rose-700 transition-all duration-200 shadow-lg">
                    <Play className="w-5 h-5 ml-0.5 text-white" />
                  </div>

                  <span className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
                    {video.duration}
                  </span>

                  {isWatched && (
                    <span className="absolute top-2.5 left-2.5 bg-emerald-700/90 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
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
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-base font-bold text-stone-950 group-hover:text-rose-900 transition-colors mb-1.5 leading-snug">
                    {video.title}
                  </h2>

                  <p className="text-xs text-stone-500 mb-2 font-medium">
                    Speaker: {video.speaker}
                  </p>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>

              <div className="px-5 py-3.5 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-rose-900 bg-stone-50/50">
                <span>Watch Video</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
