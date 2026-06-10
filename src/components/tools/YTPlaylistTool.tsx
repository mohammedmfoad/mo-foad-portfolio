"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Youtube,
  Search,
  Clock,
  PlayCircle,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";

// Helper to parse YouTube Playlist ID
function extractPlaylistId(url: string): string | null {
  if (!url) return null;
  const reg = /[&?]list=([^#\&\?]+)/;
  const match = url.match(reg);
  if (match) return match[1];
  
  // Also check if they just pasted the ID
  if (url.startsWith("PL") && url.length >= 18) {
    return url;
  }
  return null;
}

// Helper to parse ISO 8601 duration (e.g. PT1H2M30S) to seconds
function parseISO8601Duration(duration: string): number {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = duration.match(regex);
  if (!matches) return 0;
  
  const hours = parseInt(matches[1] || "0", 10);
  const minutes = parseInt(matches[2] || "0", 10);
  const seconds = parseInt(matches[3] || "0", 10);
  
  return hours * 3600 + minutes * 60 + seconds;
}

// Helper to format seconds to human-readable time
function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  
  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0 || hours > 0) parts.push(`${minutes}m`);
  parts.push(`${seconds}s`);
  
  return parts.join(" ");
}

interface PlaylistStats {
  title: string;
  channel: string;
  totalVideos: number;
  totalDurationSeconds: number;
  averageDurationSeconds: number;
}

export function YTPlaylistTool() {
  const [playlistInput, setPlaylistInput] = useState("");
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [stats, setStats] = useState<PlaylistStats | null>(null);

  const fetchPlaylistDetails = async (playlistId: string, apiKey: string) => {
    setIsLoading(true);
    setErrorMsg("");
    setStats(null);

    try {
      let videosList: Array<{ id: string }> = [];
      let nextPageToken = "";
      let hasMore = true;
      let limit = 0; // Guard against infinite loops

      // 1. Fetch all items in the playlist (pagination, max 50 per request)
      while (hasMore && limit < 10) {
        limit++;
        const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}${nextPageToken ? `&pageToken=${nextPageToken}` : ""}`;
        
        const res = await fetch(playlistUrl);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData?.error?.message || "Failed to fetch playlist items.");
        }
        
        const data = await res.json();
        const items = data.items || [];
        
        // Save snippet titles or channel title if we haven't yet
        const firstItem = items[0];
        const playlistTitle = firstItem?.snippet?.title || "Custom Playlist";
        const channelName = firstItem?.snippet?.channelTitle || "YouTube Creator";

        videosList = videosList.concat(
          items.map((item: any) => ({
            id: item.contentDetails?.videoId,
          }))
        );

        nextPageToken = data.nextPageToken;
        hasMore = !!nextPageToken;
      }

      if (videosList.length === 0) {
        throw new Error("No videos found in this playlist.");
      }

      // 2. Fetch durations for all video IDs in chunks of 50
      let totalDurationSeconds = 0;
      const videoIds = videosList.map((v) => v.id);
      
      for (let i = 0; i < videoIds.length; i += 50) {
        const chunk = videoIds.slice(i, i + 50);
        const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${chunk.join(",")}&key=${apiKey}`;
        
        const res = await fetch(videosUrl);
        if (!res.ok) {
          throw new Error("Failed to fetch video durations.");
        }
        
        const data = await res.json();
        const items = data.items || [];
        
        items.forEach((item: any) => {
          const durationStr = item.contentDetails?.duration;
          if (durationStr) {
            totalDurationSeconds += parseISO8601Duration(durationStr);
          }
        });
      }

      setStats({
        title: "Fetched Playlist",
        channel: "YouTube",
        totalVideos: videoIds.length,
        totalDurationSeconds,
        averageDurationSeconds: Math.round(totalDurationSeconds / videoIds.length),
      });

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred while fetching playlist details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractPlaylistId(playlistInput);
    if (!id) {
      setErrorMsg("Invalid YouTube Playlist URL or ID.");
      return;
    }

    const key = apiKeyInput || process.env.NEXT_PUBLIC_YT_API_KEY;
    if (!key) {
      setErrorMsg("Please provide a YouTube API Key, or use Demo Mode.");
      return;
    }

    fetchPlaylistDetails(id, key);
  };

  // Demo Mode Handler
  const handleLoadDemo = () => {
    setIsLoading(true);
    setErrorMsg("");
    setStats(null);
    
    // Simulate API fetch delay
    setTimeout(() => {
      setStats({
        title: "Complete Advanced Web Development course",
        channel: "TechAcademy Pro",
        totalVideos: 32,
        totalDurationSeconds: 43520, // ~12 hours and 5 minutes
        averageDurationSeconds: 1360,
      });
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form and Input Details */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-2xl bg-slate-900/20 border border-white/5 flex flex-col gap-5"
          >
            {/* Playlist URL Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="playlist-url"
                className="text-xs font-semibold uppercase tracking-wider text-slate-400"
              >
                Playlist URL or ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="playlist-url"
                  value={playlistInput}
                  onChange={(e) => setPlaylistInput(e.target.value)}
                  placeholder="https://www.youtube.com/playlist?list=PL..."
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-slate-950 text-white placeholder-slate-650 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
                <Youtube className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Optional API Key Input */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="api-key"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-400"
                >
                  YouTube API Key (v3)
                </label>
                <a
                  href="https://console.cloud.google.com/apis/library/youtube.googleapis.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-400 hover:underline flex items-center gap-1"
                >
                  Get a Key <PlayCircle className="w-2.5 h-2.5" />
                </a>
              </div>
              <input
                type="password"
                id="api-key"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Paste your API Key here (or leave blank if pre-configured)"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950 text-white placeholder-slate-650 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
              <p className="text-[10px] text-slate-500">
                Note: If you do not have an API key, you can click &quot;Try Demo Mode&quot; below to see how the results render.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-grow flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/15 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                Calculate Duration
              </button>
              
              <button
                type="button"
                onClick={handleLoadDemo}
                disabled={isLoading}
                className="px-6 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-350 text-sm font-bold transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                Demo Mode
              </button>
            </div>
          </form>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex gap-3 items-center">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Output Statistics */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {isLoading ? (
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-white/5 flex flex-col items-center justify-center gap-4 h-full min-h-[300px]">
              <div className="w-8 h-8 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
              <p className="text-sm text-slate-400 font-semibold">
                Fetching playlist items...
              </p>
            </div>
          ) : stats ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 flex flex-col gap-5"
            >
              {/* Header */}
              <div>
                <span className="text-[10px] uppercase font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20 w-fit">
                  Playlist Stats
                </span>
                <h4 className="text-base font-bold text-white mt-2 truncate">
                  {stats.title}
                </h4>
                <p className="text-xs text-slate-500">{stats.channel}</p>
              </div>

              {/* Grid of basic stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-white/5">
                  <p className="text-xs text-slate-500">Total Videos</p>
                  <p className="text-2xl font-extrabold text-white mt-1">
                    {stats.totalVideos}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-white/5">
                  <p className="text-xs text-slate-500">Average Video</p>
                  <p className="text-2xl font-extrabold text-white mt-1">
                    {formatDuration(stats.averageDurationSeconds)}
                  </p>
                </div>
              </div>

              {/* Speeds list */}
              <div>
                <p className="text-xs font-bold text-slate-450 uppercase mb-3 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  Playlist Length at Different Speeds
                </p>
                <div className="flex flex-col gap-2 bg-slate-950 border border-white/5 p-4 rounded-xl">
                  {[
                    { label: "1.00x Speed", multiplier: 1, color: "text-white" },
                    { label: "1.25x Speed", multiplier: 1.25, color: "text-slate-300" },
                    { label: "1.50x Speed", multiplier: 1.5, color: "text-blue-400" },
                    { label: "1.75x Speed", multiplier: 1.75, color: "text-violet-400" },
                    { label: "2.00x Speed", multiplier: 2, color: "text-green-400 font-bold" },
                  ].map((speed) => {
                    const speedDuration = stats.totalDurationSeconds / speed.multiplier;
                    return (
                      <div
                        key={speed.label}
                        className="flex justify-between items-center text-xs py-1.5 border-b border-white/5 last:border-0"
                      >
                        <span className="text-slate-450">{speed.label}</span>
                        <span className={speed.color}>
                          {formatDuration(speedDuration)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-900/20 border border-white/5 border-dashed flex flex-col items-center justify-center text-center gap-3 h-full min-h-[300px]">
              <HelpCircle className="w-8 h-8 text-slate-600" />
              <p className="text-sm text-slate-500 font-semibold max-w-xs">
                Enter a YouTube playlist link and click calculate to view duration analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
