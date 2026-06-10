"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  GitBranch,
  Brain,
} from "lucide-react";
import { skills } from "@/data/portfolio";
import { useTheme } from "@/components/providers/ThemeProvider";
import { SectionHeader, AnimatedSection } from "@/components/ui/AnimatedSection";

const iconMap: Record<string, React.ElementType> = {
  Code: Code2,
  Layout,
  Server,
  Database,
  Cloud,
  GitBranch,
  Brain,
};

const colorDark: Record<string, { badge: string; bar: string; dot: string }> = {
  blue: {
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    bar: "from-blue-500 to-blue-400",
    dot: "bg-blue-500",
  },
  purple: {
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    bar: "from-purple-500 to-purple-400",
    dot: "bg-purple-500",
  },
  green: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    bar: "from-emerald-500 to-emerald-400",
    dot: "bg-emerald-500",
  },
  orange: {
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    bar: "from-orange-500 to-amber-400",
    dot: "bg-orange-500",
  },
  cyan: {
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    bar: "from-cyan-500 to-cyan-400",
    dot: "bg-cyan-500",
  },
  pink: {
    badge: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    bar: "from-pink-500 to-rose-400",
    dot: "bg-pink-500",
  },
  violet: {
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    bar: "from-violet-500 to-violet-400",
    dot: "bg-violet-500",
  },
};

const colorLight: Record<string, { badge: string; bar: string; dot: string }> = {
  blue: {
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    bar: "from-blue-500 to-blue-400",
    dot: "bg-blue-500",
  },
  purple: {
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    bar: "from-purple-500 to-purple-400",
    dot: "bg-purple-500",
  },
  green: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    bar: "from-emerald-500 to-emerald-400",
    dot: "bg-emerald-500",
  },
  orange: {
    badge: "bg-orange-50 text-orange-700 border-orange-200",
    bar: "from-orange-500 to-amber-400",
    dot: "bg-orange-500",
  },
  cyan: {
    badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
    bar: "from-cyan-500 to-cyan-400",
    dot: "bg-cyan-500",
  },
  pink: {
    badge: "bg-pink-50 text-pink-700 border-pink-200",
    bar: "from-pink-500 to-rose-400",
    dot: "bg-pink-500",
  },
  violet: {
    badge: "bg-violet-50 text-violet-700 border-violet-200",
    bar: "from-violet-500 to-violet-400",
    dot: "bg-violet-500",
  },
};

function SkillBar({
  name,
  level,
  category,
  barGradient,
  isDark,
}: {
  name: string;
  level: number;
  category: string;
  barGradient: string;
  isDark: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const categoryLabel: Record<string, string> = {
    expert: "Expert",
    proficient: "Proficient",
    familiar: "Familiar",
  };

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span
          className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-800"}`}
        >
          {name}
        </span>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              isDark ? "bg-white/5 text-slate-500" : "bg-slate-100 text-slate-500"
            }`}
          >
            {categoryLabel[category] || category}
          </span>
          <span
            className={`text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-600"}`}
          >
            {level}%
          </span>
        </div>
      </div>
      <div
        className={`h-1.5 rounded-full ${isDark ? "bg-white/8" : "bg-slate-100"}`}
      >
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${barGradient}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

function SkillGroup({
  groupKey,
  isDark,
}: {
  groupKey: keyof typeof skills;
  isDark: boolean;
}) {
  const group = skills[groupKey];
  const Icon = iconMap[group.icon] || Code2;
  const colors = isDark ? colorDark[group.color] : colorLight[group.color];

  return (
    <AnimatedSection>
      <div
        className={`p-6 rounded-2xl border h-full card-hover ${
          isDark
            ? "glass-card border-white/10"
            : "bg-white border-slate-200 shadow-sm"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className={`p-2.5 rounded-xl border ${colors.badge}`}>
            <Icon className="w-5 h-5" />
          </div>
          <h3
            className={`font-semibold text-sm ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {group.title}
          </h3>
        </div>

        {/* Skill bars */}
        <div className="space-y-4">
          {group.items.map((item) => (
            <SkillBar
              key={item.name}
              name={item.name}
              level={item.level}
              category={item.category}
              barGradient={colors.bar}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// All tech badges in one cloud
const allTechBadges = [
  "C#", ".NET Core", "Angular", "TypeScript", "React", "Node.js",
  "SQL Server", "MongoDB", "Azure", "Docker", "Kubernetes", "RabbitMQ",
  "ElasticSearch", "PostgreSQL", "Firebase", "Git", "OpenAI APIs",
  "Clean Architecture", "SOLID", "REST APIs", "Express.js", "GraphQL",
  "Bootstrap", "Tailwind CSS", "Redux", "JWT", "EF Core", "LINQ",
  "Prompt Engineering", "AI Automation",
];

export function Skills() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="skills"
      className={`section-padding ${isDark ? "bg-slate-950" : "bg-slate-50"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Technical Skills"
          title="My Tech"
          highlight="Arsenal"
          subtitle="A comprehensive overview of my technical expertise across the full stack."
          isDark={isDark}
        />

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
          {(Object.keys(skills) as Array<keyof typeof skills>).map((key) => (
            <SkillGroup key={key} groupKey={key} isDark={isDark} />
          ))}
        </div>

        {/* Tech Badge Cloud */}
        <AnimatedSection>
          <div
            className={`p-8 rounded-2xl border text-center ${
              isDark ? "glass-card border-white/10" : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-6 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Full Technology Stack
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {allTechBadges.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.02 }}
                  viewport={{ once: true }}
                  className="tech-badge cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
