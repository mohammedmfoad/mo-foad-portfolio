"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  AlertTriangle,
  Code2,
  FileVideo,
  FileAudio,
  CheckCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Info,
} from "lucide-react";

export function YTDownloaderTool() {
  const [urlInput, setUrlInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoDetails, setVideoDetails] = useState<{
    title: string;
    duration: string;
    author: string;
    thumbnail: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<"architecture" | "nodejs" | "api">("architecture");
  const [showGuide, setShowGuide] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  const handleFetchFormats = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.includes("youtube.com") && !urlInput.includes("youtu.be")) {
      alert("Please enter a valid YouTube video URL.");
      return;
    }

    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setVideoDetails({
        title: "Clean Code - Uncle Bob - Lesson 1 (Principles of Software)",
        duration: "42:15",
        author: "Software Alliance",
        thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop",
      });
      setIsLoading(false);
      setShowGuide(false);
    }, 1000);
  };

  const handleDownloadClick = (formatName: string) => {
    setSelectedFormat(formatName);
    setShowGuide(true);
  };

  const backendCode = `// server.js (Node.js backend with Express)
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Requires 'yt-dlp' installed on the VPS hosting this server
app.post('/api/download', async (req, res) => {
  const { videoUrl, formatQuality } = req.body;
  
  if (!videoUrl) {
    return res.status(400).json({ error: 'Video URL is required' });
  }

  // Sanitize input to prevent command injection
  const urlRegex = /^(https?:\\/\\/)?(www\\.)?(youtube\\.com|youtu\\.be)\\/watch\\?v=[a-zA-Z0-9_-]+$/;
  if (!urlRegex.test(videoUrl)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  const outputFilename = \`download-\${Date.now()}.mp4\`;
  const outputPath = path.join(__dirname, 'downloads', outputFilename);

  // Qualities mapping (separate video & audio streams automatically merged by yt-dlp via ffmpeg)
  const formatMap = {
    '1085p': 'bestvideo[height<=1080]+bestaudio/best[height<=1080]',
    '720p': 'bestvideo[height<=720]+bestaudio/best[height<=720]',
    '480p': 'bestvideo[height<=480]+bestaudio/best[height<=480]',
    'mp3': 'bestaudio/best'
  };

  const selectedFormat = formatMap[formatQuality] || 'best';
  const audioExtractFlags = formatQuality === 'mp3' ? '--extract-audio --audio-format mp3' : '';

  // Execute yt-dlp command line
  const cmd = \`yt-dlp -f "\${selectedFormat}" \${audioExtractFlags} -o "\${outputPath}" "\${videoUrl}"\`;

  console.log(\`Executing command: \${cmd}\`);
  
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(\`yt-dlp error: \${error}\`);
      return res.status(500).json({ error: 'Failed to process video stream' });
    }

    // Verify file exists and stream to client
    if (fs.existsSync(outputPath)) {
      res.download(outputPath, (err) => {
        // Delete temp file after download completes
        fs.unlinkSync(outputPath);
      });
    } else {
      res.status(500).json({ error: 'File generation failed' });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Backend running on port \${PORT}\`));`;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input & Form Area */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <form
            onSubmit={handleFetchFormats}
            className="p-6 rounded-2xl bg-slate-900/20 border border-white/5 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="video-url"
                className="text-xs font-semibold uppercase tracking-wider text-slate-400"
              >
                YouTube Video URL
              </label>
              <input
                type="text"
                id="video-url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                required
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950 text-white placeholder-slate-650 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all cursor-pointer"
            >
              {isLoading ? "Fetching Video streams..." : "Analyze Video Formats"}
            </button>
          </form>

          {/* Formats Output List */}
          <AnimatePresence mode="wait">
            {videoDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 flex flex-col gap-4"
              >
                {/* Thumbnail card */}
                <div className="flex gap-4">
                  <div className="w-24 h-16 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 relative bg-slate-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={videoDetails.thumbnail}
                      alt={videoDetails.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-white line-clamp-2 leading-relaxed">
                      {videoDetails.title}
                    </h5>
                    <p className="text-[10px] text-slate-500 mt-1">
                      {videoDetails.author} • {videoDetails.duration}
                    </p>
                  </div>
                </div>

                {/* Formats Grid */}
                <div className="flex flex-col gap-2.5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Select Download format
                  </p>
                  
                  {[
                    { name: "MP4 Video - 1080p (Full HD)", info: "1080p, 60fps", type: "video" },
                    { name: "MP4 Video - 720p (HD)", info: "720p, 30fps", type: "video" },
                    { name: "MP4 Video - 480p (Standard)", info: "480p", type: "video" },
                    { name: "MP3 Audio - High Quality", info: "320kbps", type: "audio" },
                  ].map((format) => {
                    const FormatIcon = format.type === "video" ? FileVideo : FileAudio;
                    return (
                      <button
                        key={format.name}
                        onClick={() => handleDownloadClick(format.name)}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-white/5 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all text-left text-xs group"
                      >
                        <span className="flex items-center gap-3">
                          <FormatIcon className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                          <div>
                            <p className="font-bold text-white">{format.name}</p>
                            <p className="text-[10px] text-slate-500">{format.info}</p>
                          </div>
                        </span>
                        <Download className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition-colors" />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Architecture & Backend Developer Guide (Right side) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 flex flex-col gap-4 h-full">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 w-fit">
                Backend Requirement Details
              </span>
              <h4 className="text-base font-bold text-white mt-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-500" />
                Why does this require a separate backend?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                YouTube serves video (video-only) and audio streams separately for formats above 480p.
                Client-side JavaScript cannot merge these streams (requires FFmpeg) and runs into strict CORS (Cross-Origin Resource Sharing) restrictions when fetching direct Google Video streams.
              </p>
            </div>

            {/* Code Tabs */}
            <div className="flex border-b border-white/5 mt-2">
              {[
                { id: "architecture", label: "System Design" },
                { id: "nodejs", label: "Node.js Server Code" },
                { id: "api", label: "API Reference" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all -mb-[2px] ${
                    activeTab === tab.id
                      ? "border-purple-500 text-purple-400"
                      : "border-transparent text-slate-450 hover:text-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-grow">
              {activeTab === "architecture" && (
                <div className="text-xs space-y-4 text-slate-400 leading-relaxed">
                  <p className="font-semibold text-white">Full-Scale Video Pipeline Architecture:</p>
                  
                  {/* Step list */}
                  <div className="flex flex-col gap-3.5 bg-slate-950 p-4 rounded-xl border border-white/5">
                    {[
                      { step: 1, title: "Client Stream Request", desc: "User inputs URL in Frontend client, selects quality, and hits download." },
                      { step: 2, title: "Express Route Trigger", desc: "Express API endpoint validates inputs and spawns a yt-dlp child process." },
                      { step: 3, title: "Signature & Stream Fetching", desc: "yt-dlp resolves YouTube signature encryption and fetches video/audio payloads." },
                      { step: 4, title: "FFmpeg Muxing", desc: "Backend merges high-definition video track and stereo audio track into a single container." },
                      { step: 5, title: "Stream & Clean", desc: "Output file is piped back to client as attachments and temporary storage is purged." },
                    ].map((step) => (
                      <div key={step.step} className="flex gap-3 items-start">
                        <span className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                          {step.step}
                        </span>
                        <div>
                          <p className="font-bold text-white text-xs">{step.title}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "nodejs" && (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px] text-slate-500">
                    <span>Ready-to-deploy Express server code</span>
                    <span className="text-green-400 font-mono">Requires: npm install express cors</span>
                  </div>
                  <pre className="p-4 bg-slate-950 border border-white/5 rounded-xl text-[10px] font-mono text-slate-300 overflow-x-auto max-h-[300px] leading-relaxed">
                    {backendCode}
                  </pre>
                </div>
              )}

              {activeTab === "api" && (
                <div className="text-xs space-y-3.5 text-slate-400">
                  <div className="bg-slate-950 p-4 rounded-xl border border-white/5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-mono text-[10px]">
                        POST
                      </span>
                      /api/download
                    </p>
                    <p className="text-slate-500 mt-1.5 text-[11px]">
                      Triggers video parsing and download pipeline. Returns a binary download stream.
                    </p>

                    <p className="font-semibold text-white mt-4 mb-2 text-[11px]">Request Payload:</p>
                    <pre className="p-2 bg-slate-900 rounded text-[10px] font-mono text-slate-350">
{`{
  "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "formatQuality": "1080p" // Choices: "1080p", "720p", "480p", "mp3"
}`}
                    </pre>

                    <p className="font-semibold text-white mt-4 mb-2 text-[11px]">Response Codes:</p>
                    <ul className="space-y-1.5 text-[11px] text-slate-500">
                      <li>• <span className="text-green-450 font-bold">200 OK</span>: Binary file stream attachment (Content-Disposition: attachment)</li>
                      <li>• <span className="text-red-400 font-bold">400 Bad Request</span>: Missing parameters or invalid domain URL filter</li>
                      <li>• <span className="text-red-400 font-bold">500 Server Error</span>: Spawn error, yt-dlp binary failure, or write permissions block</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Action disclaimer helper */}
            {showGuide && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs flex gap-3 items-start"
              >
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-500" />
                <div>
                  <p className="font-bold text-white">Action Required for `{selectedFormat}`</p>
                  <p className="text-slate-350 mt-1">
                    To connect this button to a live stream, host the Node.js Express server code shown on the left on a VPS (like Hostinger VPS) and change the endpoint target in the React code.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
