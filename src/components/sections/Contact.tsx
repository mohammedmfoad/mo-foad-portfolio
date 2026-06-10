"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  Copy,
  ExternalLink,
} from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { useTheme } from "@/components/providers/ThemeProvider";
import { SectionHeader } from "@/components/ui/AnimatedSection";

export function Contact() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const body = `Name: ${formState.name}%0D%0AEmail: ${formState.email}%0D%0A%0D%0A${formState.message}`;
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      formState.subject || "Portfolio Contact"
    )}&body=${encodeURIComponent(formState.message + "\n\n---\nSent from Portfolio by " + formState.name + " (" + formState.email + ")")}`;

    // Trigger local email client
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setIsSubmitting(false);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  const contactDetails = [
    {
      id: "email",
      label: "Email",
      value: personalInfo.email,
      icon: Mail,
      link: `mailto:${personalInfo.email}`,
      copyable: true,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "phone",
      label: "Phone",
      value: personalInfo.phone,
      icon: Phone,
      link: `tel:${personalInfo.phone.replace(/\s+/g, "")}`,
      copyable: true,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "location",
      label: "Location",
      value: personalInfo.location,
      icon: MapPin,
      link: null,
      copyable: false,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section
      id="contact"
      className={`py-24 relative overflow-hidden ${
        isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Background radial effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Get in Touch"
          title="Let's Build Something"
          highlight="Together"
          subtitle="Have a project in mind, an opportunity to discuss, or just want to say hello? I'd love to hear from you."
          isDark={isDark}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          {/* Info cards (left side) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            <div className="flex flex-col gap-6">
              {contactDetails.map((detail, index) => {
                const Icon = detail.icon;
                return (
                  <motion.div
                    key={detail.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`p-6 rounded-2xl border flex gap-5 items-center relative group ${
                      isDark
                        ? "bg-slate-900/40 border-white/10"
                        : "bg-white border-slate-200"
                    }`}
                  >
                    {/* Color side accent */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${detail.color} rounded-l-2xl`}
                    />

                    {/* Icon container */}
                    <div
                      className={`p-3.5 rounded-xl ${
                        isDark
                          ? "bg-slate-800 text-slate-300 border border-white/5"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-grow min-w-0">
                      <p
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          isDark ? "text-slate-500" : "text-slate-400"
                        }`}
                      >
                        {detail.label}
                      </p>
                      {detail.link ? (
                        <a
                          href={detail.link}
                          className={`text-base font-bold truncate block hover:underline hover:text-blue-500 transition-colors ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p
                          className={`text-base font-bold truncate block ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {detail.value}
                        </p>
                      )}
                    </div>

                    {/* Actions (Copy / Link) */}
                    <div className="flex items-center gap-2">
                      {detail.copyable && (
                        <button
                          onClick={() => handleCopy(detail.value, detail.id)}
                          title={`Copy ${detail.label}`}
                          className={`p-2 rounded-lg border transition-colors ${
                            isDark
                              ? "border-white/5 hover:bg-slate-850 hover:text-white text-slate-400"
                              : "border-slate-150 hover:bg-slate-100 hover:text-slate-900 text-slate-500"
                          }`}
                        >
                          {copiedText === detail.id ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      )}
                      {detail.link && (
                        <a
                          href={detail.link}
                          target={detail.id === "email" ? "_self" : "_blank"}
                          rel="noopener noreferrer"
                          title={`Open ${detail.label}`}
                          className={`p-2 rounded-lg border transition-colors ${
                            isDark
                              ? "border-white/5 hover:bg-slate-850 hover:text-white text-slate-400"
                              : "border-slate-150 hover:bg-slate-100 hover:text-slate-900 text-slate-500"
                          }`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Social media connections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`p-6 rounded-2xl border ${
                isDark ? "bg-slate-900/20 border-white/5" : "bg-white border-slate-200"
              }`}
            >
              <h4 className="text-sm font-bold mb-3">Quick Connect</h4>
              <p
                className={`text-xs leading-relaxed mb-4 ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Find me on professional platforms. I am active on LinkedIn and
                commit regularly to GitHub.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border border-blue-500/20 bg-blue-500/5 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 transition-colors"
                >
                  LinkedIn
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border transition-colors ${
                    isDark
                      ? "border-white/10 hover:bg-white/5 text-slate-300"
                      : "border-slate-200 hover:bg-slate-100 text-slate-600"
                  }`}
                >
                  GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Form (right side) */}
          <div className="lg:col-span-7">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`p-8 rounded-2xl border flex flex-col gap-6 ${
                isDark ? "bg-slate-900/30 border-white/10" : "bg-white border-slate-200"
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      isDark ? "text-slate-450" : "text-slate-500"
                    }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                      isDark
                        ? "bg-slate-950 border-white/10 text-white placeholder-slate-600 focus:border-blue-500"
                        : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500"
                    }`}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      isDark ? "text-slate-450" : "text-slate-500"
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                      isDark
                        ? "bg-slate-950 border-white/10 text-white placeholder-slate-600 focus:border-blue-500"
                        : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500"
                    }`}
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="subject"
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    isDark ? "text-slate-450" : "text-slate-500"
                  }`}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  placeholder="Collaboration Request"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                    isDark
                      ? "bg-slate-950 border-white/10 text-white placeholder-slate-600 focus:border-blue-500"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500"
                  }`}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    isDark ? "text-slate-450" : "text-slate-500"
                  }`}
                >
                  Message
                  <span className="text-[10px] text-slate-500 ml-1 font-normal uppercase">
                    (Opens Email Client)
                  </span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project, timeline, or requirements..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none ${
                    isDark
                      ? "bg-slate-950 border-white/10 text-white placeholder-slate-600 focus:border-blue-500"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500"
                  }`}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/15 hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {isSubmitting ? (
                  <>Preparing Email...</>
                ) : (
                  <>
                    Send Message via Email
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
