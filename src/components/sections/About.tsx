"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Download,
  Code2,
  Cpu,
  Cloud,
  Brain,
  Star,
  Calendar,
} from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { useTheme } from "@/components/providers/ThemeProvider";
import { SectionHeader, AnimatedSection } from "@/components/ui/AnimatedSection";

const highlights = [
  {
    icon: Code2,
    label: "Clean Architecture",
    desc: "SOLID principles advocate",
    color: "blue",
  },
  {
    icon: Cpu,
    label: ".NET & Angular Expert",
    desc: "5+ years enterprise dev",
    color: "purple",
  },
  {
    icon: Brain,
    label: "AI Systems Builder",
    desc: "LLM integration & automation",
    color: "violet",
  },
  {
    icon: Cloud,
    label: "Cloud-Native",
    desc: "Azure, Docker, Kubernetes",
    color: "cyan",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

const colorMapLight: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  violet: "bg-violet-50 text-violet-700 border-violet-200",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-200",
};

export function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="about"
      className={`section-padding ${
        isDark ? "bg-slate-900" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="About Me"
          title="Turning Complex Problems into"
          highlight="Elegant Solutions"
          subtitle="Driven by a passion for clean code, scalable architecture, and real-world impact."
          isDark={isDark}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Avatar + Info Card */}
          <AnimatedSection direction="left">
            <div className="flex flex-col items-center lg:items-start gap-6">
              {/* Avatar placeholder */}
              <div className="relative">
                <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-blue-500 via-violet-500 to-blue-700 flex items-center justify-center shadow-2xl shadow-blue-500/30 float-animation">
                  <span className="text-6xl font-bold text-white">MF</span>
                </div>
                {/* Status badge */}
                <div className="absolute -bottom-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500 shadow-lg shadow-green-500/30">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-xs font-semibold text-white">
                    Available
                  </span>
                </div>
              </div>

              {/* Contact info card */}
              <div
                className={`w-full rounded-2xl p-6 border glass-card ${
                  isDark ? "border-white/10" : "border-slate-200"
                }`}
              >
                <h3
                  className={`font-semibold mb-4 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Contact Information
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      icon: Mail,
                      label: personalInfo.email,
                      href: `mailto:${personalInfo.email}`,
                    },
                    {
                      icon: Phone,
                      label: personalInfo.phone,
                      href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
                    },
                    {
                      icon: MapPin,
                      label: personalInfo.location,
                      href: null,
                    },
                    {
                      icon: Github,
                      label: personalInfo.githubHandle,
                      href: personalInfo.github,
                    },
                    {
                      icon: Linkedin,
                      label: personalInfo.linkedinHandle,
                      href: personalInfo.linkedin,
                    },
                  ].map(({ icon: Icon, label, href }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div
                        className={`p-1.5 rounded-lg ${
                          isDark ? "bg-blue-500/15" : "bg-blue-50"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 ${
                            isDark ? "text-blue-400" : "text-blue-600"
                          }`}
                        />
                      </div>
                      {href ? (
                        <a
                          href={href}
                          target={
                            href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className={`text-sm transition-colors ${
                            isDark
                              ? "text-slate-400 hover:text-blue-400"
                              : "text-slate-600 hover:text-blue-600"
                          }`}
                        >
                          {label}
                        </a>
                      ) : (
                        <span
                          className={`text-sm ${
                            isDark ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          {label}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <a
                  href={personalInfo.cvFile}
                  download
                  className="flex items-center justify-center gap-2 w-full mt-5 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Right — Summary + Highlights */}
          <AnimatedSection direction="right">
            <div className="space-y-6">
              {/* Summary */}
              <div>
                <h3
                  className={`text-xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Who I Am
                </h3>
                <p
                  className={`text-base leading-relaxed mb-4 ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {personalInfo.summary}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: Calendar,
                    label: "Experience",
                    value: "5+ Years",
                  },
                  {
                    icon: Star,
                    label: "Projects",
                    value: "10+ Delivered",
                  },
                  {
                    icon: Code2,
                    label: "Architecture",
                    value: "Clean / SOLID",
                  },
                  {
                    icon: Cloud,
                    label: "Platform",
                    value: "Azure / Docker",
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className={`p-4 rounded-xl border glass-card card-hover ${
                      isDark ? "border-white/10" : "border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon
                        className={`w-4 h-4 ${
                          isDark ? "text-blue-400" : "text-blue-600"
                        }`}
                      />
                      <span
                        className={`text-xs ${
                          isDark ? "text-slate-500" : "text-slate-500"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Highlight cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map(({ icon: Icon, label, desc, color }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className={`p-4 rounded-xl border card-hover ${
                      isDark
                        ? `glass-card border-white/10`
                        : `bg-white border-slate-200 shadow-sm`
                    }`}
                  >
                    <div
                      className={`inline-flex p-2 rounded-lg border mb-3 ${
                        isDark ? colorMap[color] : colorMapLight[color]
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <p
                      className={`font-medium text-sm ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {label}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? "text-slate-500" : "text-slate-500"
                      }`}
                    >
                      {desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
