"use client";

import { motion } from "framer-motion";
import { MessageSquare, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/portfolio";
import { useTheme } from "@/components/providers/ThemeProvider";
import { SectionHeader } from "@/components/ui/AnimatedSection";

export function Testimonials() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="testimonials"
      className={`py-24 relative overflow-hidden ${
        isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Endorsements"
          title="What Professionals"
          highlight="Say"
          subtitle="Feedback and testimonials from team leads, colleagues, and project stakeholders."
          isDark={isDark}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.map((item, index) => {
            // Generate initials for avatar
            const initials = item.name
              .replace(/\[|\]/g, "")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-8 rounded-2xl border flex flex-col relative ${
                  isDark
                    ? "bg-slate-950/40 border-white/10"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 w-10 h-10 text-blue-500/10 pointer-events-none" />

                {/* Rating stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Testimonial text */}
                <p
                  className={`text-base leading-relaxed italic mb-8 flex-grow ${
                    isDark ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  {item.text}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
                  {/* Initials Avatar */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border uppercase ${
                      isDark
                        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-blue-500/20"
                        : "bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-blue-100"
                    }`}
                  >
                    {initials || "PM"}
                  </div>

                  <div>
                    <h4
                      className={`text-sm font-bold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {item.name}
                    </h4>
                    <p
                      className={`text-xs ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {item.role} @{" "}
                      <span className="font-semibold">{item.company}</span>
                    </p>
                  </div>
                </div>

                {item.placeholder && (
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                      Editable
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Suggestion alert for the owner */}
        <div className="mt-12 text-center">
          <p
            className={`text-xs max-w-md mx-auto ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            * These testimonials are placeholders based on Mohammed&apos;s roles and
            contributions. They can be updated in{" "}
            <code className="text-blue-500">src/data/portfolio.ts</code>.
          </p>
        </div>
      </div>
    </section>
  );
}
