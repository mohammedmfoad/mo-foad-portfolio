"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowRight,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { useTheme } from "@/components/providers/ThemeProvider";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#6366f1"];

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push(createParticle());
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      // Draw connections
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      id="particle-canvas"
    />
  );
}

function TypewriterText({ texts }: { texts: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const target = texts[currentIndex];
    let timeout: NodeJS.Timeout;

    if (isPaused) {
      timeout = setTimeout(() => setIsPaused(false), 1500);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting) {
      if (currentText.length < target.length) {
        timeout = setTimeout(() => {
          setCurrentText(target.slice(0, currentText.length + 1));
        }, 60);
      } else {
        setIsPaused(true);
        setTimeout(() => setIsDeleting(true), 1500);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, 35);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts, isPaused]);

  return (
    <span className="gradient-text">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-0.5 h-8 sm:h-10 bg-blue-400 ml-1 align-middle"
      />
    </span>
  );
}

export function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        isDark ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
      {/* Particle background */}
      <ParticleCanvas />

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 border ${
              isDark
                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                : "bg-blue-50 text-blue-700 border-blue-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <Sparkles className="w-4 h-4" />
            Available for new opportunities
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-none mb-6 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {personalInfo.name
              .split(" ")
              .map((word, i) => (
                <span key={i}>
                  {i > 0 && " "}
                  {i === 1 ? (
                    <span className="gradient-text">{word}</span>
                  ) : (
                    word
                  )}
                </span>
              ))}
          </motion.h1>

          {/* Typing subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 h-12 sm:h-14 flex items-center"
          >
            <TypewriterText texts={personalInfo.typingRoles} />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`text-xl font-medium mb-6 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            {personalInfo.subtitle}
          </motion.p>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-base sm:text-lg max-w-2xl leading-relaxed mb-10 ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Building scalable, AI-driven enterprise systems with{" "}
            <span className={isDark ? "text-white font-medium" : "text-slate-900 font-medium"}>
              5+ years of expertise
            </span>{" "}
            in healthcare, humanitarian, and enterprise domains. Clean
            Architecture advocate. Performance optimizer. AI integrator.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-12"
          >
            <button
              onClick={() => {
                const el = document.getElementById("projects");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={personalInfo.cvFile}
              download
              className={`group flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base border-2 transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? "border-white/20 text-white hover:border-blue-400 hover:bg-white/5"
                  : "border-slate-300 text-slate-700 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Download CV
            </a>

            <button
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={`group flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base border-2 transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? "border-white/20 text-white hover:border-blue-400 hover:bg-white/5"
                  : "border-slate-300 text-slate-700 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              <Mail className="w-5 h-5" />
              Contact Me
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-4 mb-16"
          >
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={`p-3 rounded-xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                isDark
                  ? "border-white/15 text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/5 hover:shadow-black/20"
                  : "border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:shadow-slate-200"
              }`}
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`p-3 rounded-xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                isDark
                  ? "border-white/15 text-slate-400 hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/5 hover:shadow-blue-500/10"
                  : "border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-blue-100"
              }`}
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              className={`p-3 rounded-xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                isDark
                  ? "border-white/15 text-slate-400 hover:text-green-400 hover:border-green-500/40 hover:bg-green-500/5 hover:shadow-green-500/10"
                  : "border-slate-200 text-slate-600 hover:text-green-600 hover:border-green-300 hover:shadow-green-100"
              }`}
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className={`flex flex-wrap justify-center gap-8 sm:gap-16 pb-16 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {[
              { value: "5+", label: "Years Experience" },
              { value: "10+", label: "Projects Delivered" },
              { value: "40%", label: "Performance Gains" },
              { value: "2", label: "Companies" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text-blue">
                  {stat.value}
                </div>
                <div
                  className={`text-sm mt-1 ${
                    isDark ? "text-slate-500" : "text-slate-500"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span
          className={`text-xs font-medium tracking-widest uppercase ${
            isDark ? "text-slate-500" : "text-slate-400"
          }`}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown
            className={`w-5 h-5 ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          />
        </motion.div>
      </motion.button>
    </section>
  );
}
