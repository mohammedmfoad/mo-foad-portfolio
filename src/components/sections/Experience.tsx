"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, Building2, ChevronRight, ExternalLink } from "lucide-react";
import { experiences } from "@/data/portfolio";
import { useTheme } from "@/components/providers/ThemeProvider";
import { SectionHeader, AnimatedSection } from "@/components/ui/AnimatedSection";

export function Experience() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="experience"
      className={`section-padding ${isDark ? "bg-slate-900" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Work Experience"
          title="My Professional"
          highlight="Journey"
          subtitle="5+ years building enterprise solutions across healthcare, humanitarian, and business domains."
          isDark={isDark}
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-px hidden sm:block"
            style={{
              background: isDark
                ? "linear-gradient(to bottom, transparent, #3b82f6, #8b5cf6, transparent)"
                : "linear-gradient(to bottom, transparent, #93c5fd, #c4b5fd, transparent)",
            }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <AnimatedSection key={exp.id} delay={index * 0.15}>
                <div className="relative flex flex-col sm:flex-row gap-6">
                  {/* Timeline dot */}
                  <div className="hidden sm:flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border-2 ${
                        exp.current
                          ? isDark
                            ? "bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/20"
                            : "bg-blue-100 border-blue-400 shadow-lg shadow-blue-200"
                          : isDark
                          ? "bg-slate-800 border-white/20"
                          : "bg-slate-50 border-slate-300"
                      }`}
                    >
                      <Building2
                        className={`w-7 h-7 ${
                          exp.current
                            ? isDark
                              ? "text-blue-400"
                              : "text-blue-600"
                            : isDark
                            ? "text-slate-400"
                            : "text-slate-500"
                        }`}
                      />
                      {exp.current && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-slate-900 animate-pulse" />
                      )}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 p-5 sm:p-8 rounded-2xl border card-hover ${
                      exp.current
                        ? isDark
                          ? "glass-card border-blue-500/30 shadow-lg shadow-blue-500/10"
                          : "bg-white border-blue-300 shadow-lg shadow-blue-100"
                        : isDark
                        ? "glass-card border-white/10"
                        : "bg-white border-slate-200 shadow-sm"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3
                            className={`text-xl font-bold ${
                              isDark ? "text-white" : "text-slate-900"
                            }`}
                          >
                            {exp.role}
                          </h3>
                          {exp.current && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-500/15 text-green-400 border border-green-500/25">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Briefcase
                            className={`w-4 h-4 ${
                              isDark ? "text-blue-400" : "text-blue-600"
                            }`}
                          />
                          <span
                            className={`font-semibold ${
                              isDark ? "text-blue-400" : "text-blue-600"
                            }`}
                          >
                            {exp.company}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Calendar
                          className={`w-4 h-4 ${
                            isDark ? "text-slate-500" : "text-slate-400"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            isDark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    <p
                      className={`text-sm leading-relaxed mb-5 ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <ul className="space-y-2.5 mb-6">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-3"
                        >
                          <ChevronRight
                            className={`w-4 h-4 mt-0.5 shrink-0 ${
                              isDark ? "text-blue-400" : "text-blue-500"
                            }`}
                          />
                          <span
                            className={`text-sm leading-relaxed ${
                              isDark ? "text-slate-300" : "text-slate-700"
                            }`}
                          >
                            {achievement}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="tech-badge text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
