"use client";

import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { useTheme } from "@/components/providers/ThemeProvider";
import { SectionHeader, AnimatedSection } from "@/components/ui/AnimatedSection";

export function Certifications() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="certifications"
      className={`section-padding ${isDark ? "bg-slate-900" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Certifications"
          title="Training &"
          highlight="Credentials"
          subtitle="Formal training and certifications that shaped my technical foundation."
          isDark={isDark}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, i) => (
            <AnimatedSection key={cert.id} delay={i * 0.1}>
              <div
                className={`relative p-5 sm:p-6 rounded-2xl border h-full card-hover ${
                  cert.placeholder
                    ? isDark
                      ? "glass-card border-dashed border-white/15 opacity-60"
                      : "bg-white border-dashed border-slate-300 opacity-60"
                    : isDark
                    ? "glass-card border-white/10"
                    : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                {cert.placeholder && (
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      isDark ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-amber-50 text-amber-600 border-amber-200"
                    }`}>
                      Placeholder
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl shrink-0 ${
                      cert.verified && !cert.placeholder
                        ? isDark
                          ? "bg-blue-500/15 border border-blue-500/25"
                          : "bg-blue-50 border border-blue-200"
                        : isDark
                        ? "bg-white/5 border border-white/10"
                        : "bg-slate-50 border border-slate-200"
                    }`}
                  >
                    <Award
                      className={`w-6 h-6 ${
                        cert.verified && !cert.placeholder
                          ? isDark ? "text-blue-400" : "text-blue-600"
                          : isDark ? "text-slate-500" : "text-slate-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-semibold text-sm leading-snug mb-1 ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {cert.title}
                    </h3>
                    <p
                      className={`text-xs font-medium mb-2 ${
                        isDark ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                <p
                  className={`text-xs leading-relaxed mt-3 mb-3 ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {cert.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Calendar className={`w-3.5 h-3.5 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
                    <span className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                      {cert.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {cert.verified && !cert.placeholder ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-xs text-green-400">Verified</span>
                      </>
                    ) : cert.placeholder ? (
                      <>
                        <AlertCircle className={`w-3.5 h-3.5 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
                        <span className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>Add yours</span>
                      </>
                    ) : null}
                  </div>
                </div>

                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 mt-3 text-xs transition-colors ${
                      isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"
                    }`}
                  >
                    <ExternalLink className="w-3 h-3" />
                    View Certificate
                  </a>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
