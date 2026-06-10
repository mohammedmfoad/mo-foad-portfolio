"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Youtube, Download, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { tools } from "@/data/portfolio";
import { useTheme } from "@/components/providers/ThemeProvider";
import { PdfToWordTool } from "./PdfToWordTool";
import { YTPlaylistTool } from "./YTPlaylistTool";
import { YTDownloaderTool } from "./YTDownloaderTool";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  FileText: FileText,
  Youtube: Youtube,
  Download: Download,
};

export function ToolsGrid() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // Parse hash URL if present to auto-select tool
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const toolId = hash.replace("#", "");
        if (tools.some((t) => t.id === toolId)) {
          setActiveTool(toolId);
        }
      }
    };

    handleHashChange(); // Run on mount
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSelectTool = (toolId: string) => {
    setActiveTool(toolId);
    window.history.pushState(null, "", `#${toolId}`);
  };

  const handleBack = () => {
    setActiveTool(null);
    // Remove hash from URL without reloading
    window.history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
  };

  const activeToolObj = tools.find((t) => t.id === activeTool);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!activeTool ? (
          // Grid view
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
          >
            {tools.map((tool, index) => {
              const IconComponent = iconMap[tool.icon] || FileText;
              
              // Map badge colors
              const badgeColors: { [key: string]: string } = {
                green: isDark 
                  ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                  : "bg-green-50 text-green-700 border border-green-200",
                yellow: isDark 
                  ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" 
                  : "bg-yellow-50 text-yellow-700 border border-yellow-200",
                orange: isDark 
                  ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" 
                  : "bg-orange-50 text-orange-700 border border-orange-200",
              };

              return (
                <div
                  key={tool.id}
                  onClick={() => handleSelectTool(tool.id)}
                  className={`p-8 rounded-2xl border cursor-pointer group flex flex-col justify-between transition-all duration-300 relative overflow-hidden h-[450px] ${
                    isDark
                      ? "bg-slate-900/40 border-white/10 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 hover:bg-slate-900/60"
                      : "bg-white border-slate-200 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/5"
                  }`}
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-violet-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`p-3.5 rounded-xl ${
                          isDark
                            ? "bg-slate-800 text-slate-300 border border-white/5"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${badgeColors[tool.badgeColor] || ""}`}>
                        {tool.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className={`text-lg font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                      {tool.title}
                    </h3>
                    <p className={`text-xs leading-relaxed mb-6 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      {tool.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-450">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-500 group-hover:gap-2.5 transition-all mt-6 pt-4 border-t border-dashed border-white/10 dark:border-white/5">
                    Launch Tool
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          // Active tool detail view
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`p-8 rounded-2xl border ${
              isDark ? "bg-slate-900/25 border-white/10" : "bg-white border-slate-250"
            }`}
          >
            {/* Header / Back action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-dashed border-white/10 dark:border-white/5">
              <button
                onClick={handleBack}
                className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl border transition-all ${
                  isDark
                    ? "border-white/10 hover:bg-white/5 text-slate-300"
                    : "border-slate-200 hover:bg-slate-100 text-slate-600"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Tools
              </button>

              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <h3 className={`text-base font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>
                  {activeToolObj?.title}
                </h3>
              </div>
            </div>

            {/* Render selected component */}
            <div>
              {activeTool === "pdf-to-word" && <PdfToWordTool />}
              {activeTool === "yt-playlist" && <YTPlaylistTool />}
              {activeTool === "yt-downloader" && <YTDownloaderTool />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
