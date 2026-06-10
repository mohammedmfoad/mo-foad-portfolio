"use client";

import { motion } from "framer-motion";
import { Zap, TrendingUp, Brain, Award, Shield, Globe } from "lucide-react";
import { achievements } from "@/data/portfolio";
import { useTheme } from "@/components/providers/ThemeProvider";
import { SectionHeader } from "@/components/ui/AnimatedSection";

const iconMap: { [key: string]: any } = {
  Zap: Zap,
  TrendingUp: TrendingUp,
  Brain: Brain,
  Award: Award,
  Shield: Shield,
  Globe: Globe,
};

export function Achievements() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="achievements"
      className={`py-24 relative overflow-hidden ${
        isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="High Impact Outcomes"
          title="Key Metrics &"
          highlight="Achievements"
          subtitle="Measurable performance gains and strategic outcomes delivered across enterprise platforms."
          isDark={isDark}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {achievements.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Award;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                  isDark
                    ? "bg-slate-900/50 border-white/10 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5"
                    : "bg-white border-slate-200 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/5"
                }`}
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-violet-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="flex items-start justify-between mb-6">
                  {/* Icon */}
                  <div
                    className={`p-3.5 rounded-xl ${
                      isDark
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : "bg-blue-50 text-blue-600 border border-blue-100"
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Large Value */}
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight gradient-text bg-gradient-to-r from-blue-500 to-indigo-500">
                    {item.metric}
                  </span>
                </div>

                {/* Content */}
                <h3
                  className={`text-lg font-bold mb-2 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed mb-4 ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {item.description}
                </p>

                {/* Footer tags */}
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-dashed border-white/10 dark:border-white/5">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                      isDark
                        ? "bg-slate-800 text-slate-300"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.company}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                      isDark
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
