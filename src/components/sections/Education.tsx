"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, BookOpen, Code2 } from "lucide-react";
import { education, internships } from "@/data/portfolio";
import { useTheme } from "@/components/providers/ThemeProvider";
import { SectionHeader, AnimatedSection } from "@/components/ui/AnimatedSection";

export function Education() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="education"
      className={`section-padding ${isDark ? "bg-slate-950" : "bg-slate-50"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Education"
          title="Academic"
          highlight="Background"
          subtitle="Building a solid computer science foundation that drives real-world engineering excellence."
          isDark={isDark}
        />

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Degree */}
          {education.map((edu, i) => (
            <AnimatedSection key={edu.id} delay={i * 0.1}>
              <div
                className={`p-8 rounded-2xl border card-hover ${
                  isDark
                    ? "glass-card border-blue-500/20 shadow-lg shadow-blue-500/5"
                    : "bg-white border-blue-200 shadow-lg shadow-blue-100/50"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  <div
                    className={`p-4 rounded-2xl shrink-0 ${
                      isDark
                        ? "bg-blue-500/15 border border-blue-500/20"
                        : "bg-blue-50 border border-blue-200"
                    }`}
                  >
                    <GraduationCap
                      className={`w-10 h-10 ${isDark ? "text-blue-400" : "text-blue-600"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-bold mb-1 ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {edu.degree}
                    </h3>
                    <p
                      className={`font-semibold mb-1 ${
                        isDark ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {edu.institution}
                    </p>
                    <p className={`text-sm mb-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      {edu.university} — {edu.department}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar className={`w-4 h-4 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
                        <span className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                          {edu.period}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award className={`w-4 h-4 ${isDark ? "text-amber-400" : "text-amber-600"}`} />
                        <span className={`text-sm font-medium ${isDark ? "text-amber-400" : "text-amber-600"}`}>
                          Grade: {edu.grade}
                        </span>
                      </div>
                    </div>

                    <p className={`text-sm leading-relaxed mt-4 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      {edu.description}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}

          {/* Internships */}
          <div>
            <h3
              className={`text-xl font-bold mb-6 flex items-center gap-2 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              <BookOpen className={`w-5 h-5 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
              Internships & Training
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {internships.map((intern, i) => (
                <AnimatedSection key={intern.id} delay={i * 0.1}>
                  <div
                    className={`p-6 rounded-2xl border card-hover h-full ${
                      isDark
                        ? "glass-card border-white/10"
                        : "bg-white border-slate-200 shadow-sm"
                    }`}
                  >
                    <h4
                      className={`font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}
                    >
                      {intern.title}
                    </h4>
                    <p className={`text-sm font-medium mb-1 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                      {intern.organization}
                    </p>
                    <div className="flex items-center gap-3 mb-4 text-xs">
                      <span className={isDark ? "text-slate-500" : "text-slate-400"}>
                        {intern.location}
                      </span>
                      <span className={isDark ? "text-slate-600" : "text-slate-300"}>•</span>
                      <span className={isDark ? "text-slate-500" : "text-slate-400"}>
                        {intern.period}
                      </span>
                    </div>

                    {/* Skills learned */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {intern.skills.map((s) => (
                        <span key={s} className="tech-badge text-[10px] px-2 py-0.5">{s}</span>
                      ))}
                    </div>

                    {/* Projects */}
                    <div className={`border-t pt-4 ${isDark ? "border-white/10" : "border-slate-100"}`}>
                      <p className={`text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        <Code2 className="w-3 h-3" /> Training Projects
                      </p>
                      <ul className="space-y-2">
                        {intern.projects.map((proj) => (
                          <li key={proj.name}>
                            <span className={`text-xs font-medium ${isDark ? "text-slate-300" : "text-slate-800"}`}>
                              {proj.name}
                            </span>
                            <span className={`text-xs ml-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                              — {proj.tech}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
