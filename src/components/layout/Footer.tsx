"use client";

import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Heart,
  Code2,
  ArrowUp,
} from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { useTheme } from "@/components/providers/ThemeProvider";

export function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`border-t ${
        isDark
          ? "bg-slate-950 border-white/10"
          : "bg-slate-50 border-slate-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span
                className={`font-bold text-xl ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Mohammed Foad<span className="text-blue-500">.</span>
              </span>
            </div>
            <p
              className={`text-sm leading-relaxed max-w-xs ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Senior Full Stack Engineer specializing in .NET Core, Angular, and
              AI-driven systems. Building the future, one line at a time.
            </p>
            <div className="flex items-center gap-1 mt-3">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span
                className={`text-sm ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {personalInfo.location}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className={`font-semibold mb-4 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                "About",
                "Skills",
                "Experience",
                "Projects",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      const el = document.getElementById(item.toLowerCase());
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`text-sm transition-colors animated-underline ${
                      isDark
                        ? "text-slate-400 hover:text-blue-400"
                        : "text-slate-600 hover:text-blue-600"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  href="/tools"
                  className={`text-sm transition-colors animated-underline ${
                    isDark
                      ? "text-slate-400 hover:text-blue-400"
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                >
                  Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className={`font-semibold mb-4 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Get In Touch
            </h3>
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  isDark
                    ? "text-slate-400 hover:text-blue-400"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                <Mail className="w-4 h-4" />
                {personalInfo.email}
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-sm transition-colors ${
                  isDark
                    ? "text-slate-400 hover:text-blue-400"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                <Github className="w-4 h-4" />
                {personalInfo.githubHandle}
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-sm transition-colors ${
                  isDark
                    ? "text-slate-400 hover:text-blue-400"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                <Linkedin className="w-4 h-4" />
                {personalInfo.linkedinHandle}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <p
            className={`text-sm flex items-center gap-1 ${
              isDark ? "text-slate-500" : "text-slate-500"
            }`}
          >
            © {new Date().getFullYear()} Mohammed Foad. Built with{" "}
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> &
            Next.js
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-all duration-200 ${
              isDark
                ? "text-slate-400 hover:text-white hover:bg-white/10"
                : "text-slate-600 hover:text-slate-900 hover:bg-black/10"
            }`}
          >
            <ArrowUp className="w-4 h-4" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
