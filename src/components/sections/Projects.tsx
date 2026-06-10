"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  Lightbulb,
  Wrench,
  Star,
  Building2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { projects } from "@/data/portfolio";
import { useTheme } from "@/components/providers/ThemeProvider";
import { SectionHeader, AnimatedSection } from "@/components/ui/AnimatedSection";

const categories = ["All", "AI / Healthcare", "Healthcare / Enterprise", "Backend / Architecture", "Humanitarian / Social Impact", "Enterprise / Automotive", "Education / EdTech", "Training Project"];

const statusColors: Record<string, string> = {
  Production: "bg-green-500/15 text-green-400 border-green-500/25",
  Completed: "bg-blue-500/15 text-blue-400 border-blue-500/25",
};

const statusColorsLight: Record<string, string> = {
  Production: "bg-green-50 text-green-700 border-green-200",
  Completed: "bg-blue-50 text-blue-700 border-blue-200",
};

function ProjectCard({
  project,
  isDark,
}: {
  project: (typeof projects)[0];
  isDark: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className={`relative p-6 rounded-2xl border h-fit card-hover transition-all duration-300 ${
        project.featured
          ? isDark
            ? "glass-card border-blue-500/25 shadow-lg shadow-blue-500/5"
            : "bg-white border-blue-200 shadow-lg shadow-blue-100/50"
          : isDark
          ? "glass-card border-white/10"
          : "bg-white border-slate-200 shadow-sm"
      }`}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute -top-3 left-5 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-semibold shadow-lg">
          <Star className="w-3 h-3 fill-white" />
          Featured
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h3
            className={`text-lg font-bold leading-snug mb-1 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {project.title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                isDark
                  ? statusColors[project.status] || "bg-slate-500/15 text-slate-400 border-slate-500/25"
                  : statusColorsLight[project.status] || "bg-slate-50 text-slate-600 border-slate-200"
              }`}
            >
              {project.status}
            </span>
            <div className="flex items-center gap-1">
              <Building2 className={`w-3.5 h-3.5 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
              <span className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                {project.company}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category */}
      <span
        className={`inline-block text-xs px-2.5 py-1 rounded-full mb-3 ${
          isDark
            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
            : "bg-blue-50 text-blue-600 border border-blue-200"
        }`}
      >
        {project.category}
      </span>

      {/* Short description */}
      <p
        className={`text-sm leading-relaxed mb-4 ${
          isDark ? "text-slate-400" : "text-slate-600"
        }`}
      >
        {project.shortDescription}
      </p>

      {/* Highlights */}
      {project.highlights && (
        <ul className="space-y-1.5 mb-4">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 bg-blue-400`} />
              <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Expandable details */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`border-t pt-4 mt-4 space-y-4 ${isDark ? "border-white/10" : "border-slate-200"}`}>
              {/* Full description */}
              <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                {project.description}
              </p>

              {/* Challenge */}
              {project.challenge && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className={`w-4 h-4 ${isDark ? "text-amber-400" : "text-amber-600"}`} />
                    <span className={`text-xs font-semibold uppercase tracking-wide ${isDark ? "text-amber-400" : "text-amber-600"}`}>
                      Challenge
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {project.challenge}
                  </p>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className={`w-4 h-4 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
                    <span className={`text-xs font-semibold uppercase tracking-wide ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
                      Solution
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        {project.technologies.slice(0, expanded ? undefined : 4).map((tech) => (
          <span key={tech} className="tech-badge text-[10px] px-2 py-0.5">
            {tech}
          </span>
        ))}
        {!expanded && project.technologies.length > 4 && (
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${isDark ? "text-slate-500" : "text-slate-400"}`}>
            +{project.technologies.length - 4} more
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t gap-3 flex-wrap">
        <div className="flex gap-2">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                isDark
                  ? "border-white/15 text-slate-400 hover:text-white hover:border-white/30"
                  : "border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-400"
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
          ) : (
            <span
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border opacity-40 cursor-not-allowed ${
                isDark ? "border-white/10 text-slate-500" : "border-slate-200 text-slate-400"
              }`}
              title="Private repository"
            >
              <Github className="w-3.5 h-3.5" />
              Private
            </span>
          )}

          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          ) : (
            <span
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border opacity-40 cursor-not-allowed ${
                isDark ? "border-white/10 text-slate-500" : "border-slate-200 text-slate-400"
              }`}
              title="No public demo"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Demo N/A
            </span>
          )}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className={`flex items-center gap-1 text-xs font-medium transition-colors ${
            isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"
          }`}
        >
          {expanded ? (
            <>Less <ChevronUp className="w-3.5 h-3.5" /></>
          ) : (
            <>Details <ChevronDown className="w-3.5 h-3.5" /></>
          )}
        </button>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  // Deduplicate categories based on actual projects
  const usedCategories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  return (
    <section
      id="projects"
      className={`section-padding ${isDark ? "bg-slate-950" : "bg-slate-50"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Projects"
          title="What I've"
          highlight="Built"
          subtitle="A selection of enterprise projects, AI systems, and tools I've designed and delivered."
          isDark={isDark}
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {usedCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : isDark
                  ? "text-slate-400 hover:text-white hover:bg-white/8 border border-white/10"
                  : "text-slate-600 hover:text-slate-900 hover:bg-black/5 border border-slate-200"
              }`}
            >
              {cat === "All" ? `All (${projects.length})` : cat.split(" / ")[0]}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <ProjectCard project={project} isDark={isDark} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
