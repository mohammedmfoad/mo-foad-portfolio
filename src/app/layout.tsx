import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohammedfoad.dev"),
  title: {
    default: "Mohammed Foad | Senior Full Stack Engineer",
    template: "%s | Mohammed Foad",
  },
  description:
    "Senior Full Stack Engineer with 5+ years building AI-driven, scalable enterprise applications. Expert in .NET Core, Angular, TypeScript, and Cloud Architecture. Based in Egypt.",
  keywords: [
    "Mohammed Foad",
    "Full Stack Engineer",
    "Senior Developer",
    ".NET Core",
    "Angular",
    "TypeScript",
    "React",
    "AI Systems",
    "LLM Integration",
    "Clean Architecture",
    "Azure",
    "Healthcare Technology",
    "Software Engineer Egypt",
    "Backend Developer",
    "Frontend Developer",
  ],
  authors: [{ name: "Mohammed Foad", url: "https://mohammedfoad.dev" }],
  creator: "Mohammed Foad",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohammedfoad.dev",
    siteName: "Mohammed Foad Portfolio",
    title: "Mohammed Foad | Senior Full Stack Engineer",
    description:
      "Senior Full Stack Engineer with 5+ years building AI-driven, scalable enterprise applications. Expert in .NET Core, Angular, and AI-Driven Systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohammed Foad — Senior Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Foad | Senior Full Stack Engineer",
    description:
      "Senior Full Stack Engineer with 5+ years building AI-driven, scalable enterprise applications.",
    images: ["/og-image.png"],
    creator: "@MohammedFoad",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohammed Foad",
  jobTitle: "Senior Full Stack Engineer",
  description:
    "Senior Full Stack Engineer with 5+ years of experience in .NET Core, Angular, and AI-driven systems.",
  url: "https://mohammedfoad.dev",
  email: "mohammed.mfoad@gmail.com",
  telephone: "+20 11 4246 6223",
  address: {
    "@type": "PostalAddress",
    addressCountry: "EG",
    addressRegion: "Egypt",
  },
  sameAs: [
    "https://github.com/Mohammed-MFoad",
    "https://linkedin.com/in/mohammed-foad",
  ],
  knowsAbout: [
    ".NET Core",
    "Angular",
    "TypeScript",
    "React",
    "AI Systems",
    "Clean Architecture",
    "Azure",
    "Docker",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
