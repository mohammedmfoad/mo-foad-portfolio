import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToolsGrid } from "@/components/tools/ToolsGrid";
import { SectionHeader } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "Developer Tools Hub | Mohammed Foad",
  description:
    "Free, client-side utility tools built by Mohammed Foad. Features a privacy-focused PDF to Word converter, a YouTube playlist duration calculator, and system setups.",
  keywords: [
    "PDF to Word",
    "YouTube Playlist Duration",
    "Playlist Calculator",
    "YouTube Downloader Server",
    "Client-Side Conversion",
    "Developer Utilities",
  ],
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 bg-slate-950 text-white">
      <Navbar />
      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Interactive Hub
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white">
              Developer Utilities & <span className="gradient-text bg-gradient-to-r from-blue-500 to-indigo-500">Intelligent Tools</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
              A collection of useful client-side utilities and developer tools. Fast, lightweight, and 100% secure. Everything runs locally inside your browser context.
            </p>
            <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
          </div>

          {/* Tools Dashboard Grid */}
          <ToolsGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}
