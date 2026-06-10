// src/data/portfolio.ts
// Single source of truth for all portfolio content — derived from Mohammed Foad's CV

export const personalInfo = {
  name: "Mohammed Foad",
  title: "Senior Full Stack Engineer",
  subtitle: ".NET | Angular | AI-Driven Systems",
  email: "mohammed.mfoad@gmail.com",
  phone: "+20 11 4246 6223",
  location: "Egypt",
  github: "https://github.com/Mohammed-MFoad",
  linkedin: "https://linkedin.com/in/mohammed-foad",
  linkedinHandle: "mohammed-foad",
  githubHandle: "Mohammed-MFoad",
  yearsOfExperience: 5,
  availableForWork: true,
  cvFile: "/cv/MohammedFoad_Resume.pdf",
  typingRoles: [
    "Senior Full Stack Engineer",
    "AI Systems Architect",
    ".NET & Angular Expert",
    "Cloud & DevOps Enthusiast",
    "Medical Tech Builder",
    "Clean Code Advocate",
  ],
  summary:
    "Senior Full Stack Engineer with 5+ years of experience designing and delivering scalable, secure, and high-performance enterprise web applications. Specialized in .NET Core, Angular, and AI-driven systems within healthcare and enterprise domains. Strong background in Clean Architecture, SOLID principles, distributed systems, and cloud-native development. Proven ability to optimize system performance, lead refactoring initiatives, and deliver intelligent automation solutions that improve operational efficiency. Experienced in collaborating with cross-functional teams to translate complex business and medical requirements into scalable technical solutions.",
};

export const experiences = [
  {
    id: "tachyhealth",
    company: "TachyHealth",
    role: "Senior Full Stack Developer",
    period: "July 2023 – Present",
    startDate: "2023-07",
    endDate: null,
    current: true,
    location: "Remote / Egypt",
    description:
      "Leading full-stack development for AI-powered healthcare solutions, building platforms for oncology pharmacies and medical coding automation.",
    achievements: [
      "Spearheaded the development of AiCode, an AI-powered medical coding platform automating medical record processing into structured coding outputs.",
      "Designed AI-assisted workflows integrating LLM-based text interpretation and validation mechanisms.",
      "Built and delivered Oncology System, a full-scale web-based platform for managing oncology pharmacies and infusion centers.",
      "Designed backend architecture from scratch using Clean Architecture and SOLID principles.",
      "Improved code quality by enforcing peer review standards and refactoring legacy modules, reducing bug rate in production releases.",
      "Collaborated closely with medical domain experts to translate complex clinical workflows into scalable technical implementations.",
      "Re-architected API Gateway layer, optimizing JSON transformation and third-party integrations, reducing response processing time by 40%.",
      "Led large-scale frontend refactoring initiative implementing lazy loading and modular architecture, reducing application load time by 35% and improving maintainability.",
    ],
    technologies: [
      ".NET Core",
      "Angular",
      "TypeScript",
      "Azure",
      "Clean Architecture",
      "OpenAI APIs",
      "LLM Integration",
      "SQL Server",
      "Docker",
      "REST APIs",
    ],
    projects: ["AiCode", "Oncology System"],
  },
  {
    id: "fortteck",
    company: "FortTeck",
    role: "Senior Full Stack Developer",
    period: "January 2021 – July 2023",
    startDate: "2021-01",
    endDate: "2023-07",
    current: false,
    location: "Egypt",
    description:
      "Built diverse enterprise web applications across humanitarian, education, automotive, and HR domains using modern full-stack technologies.",
    achievements: [
      "Developed Homeless, a humanitarian platform facilitating refugee accommodation management across Africa.",
      "Contributed to Counselling, an educational administration system managing school workflows and appointments.",
      "Played a key role in building Bond, an enterprise workflow system handling complex operational processes (car imports, spare parts management).",
      "Built HR management modules including leave workflows and employee lifecycle tracking.",
      "Delivered scalable, business-oriented solutions in collaboration with product and design teams.",
    ],
    technologies: [
      ".NET Core",
      "Angular",
      "React",
      "TypeScript",
      "Node.js",
      "SQL Server",
      "MongoDB",
      "REST APIs",
      "Docker",
    ],
    projects: ["Homeless", "Counselling", "Bond", "HR Module"],
  },
];

export const projects = [
  {
    id: "aicode",
    title: "AiCode — AI Medical Coding Platform",
    shortDescription:
      "AI-powered platform automating medical record processing into structured ICD/CPT coding outputs.",
    description:
      "AiCode is an enterprise-grade AI platform that automates the complex process of medical coding. It integrates LLM-based text interpretation to extract clinical information from medical records and maps them to structured coding standards (ICD-10, CPT). The system reduces manual coding effort, minimizes human error, and significantly accelerates billing workflows for healthcare providers.",
    challenge:
      "Medical coding is highly specialized and manual — error-prone, time-consuming, and bottlenecking revenue cycles for healthcare organizations.",
    solution:
      "Designed an AI pipeline integrating OpenAI APIs for text understanding, custom validation layers for medical accuracy, and a clean Angular frontend for medical coders to review and approve outputs. Implemented structured data extraction with fallback handling for ambiguous records.",
    technologies: [
      ".NET Core",
      "Angular",
      "TypeScript",
      "OpenAI APIs",
      "LLM Integration",
      "Prompt Engineering",
      "Azure",
      "SQL Server",
      "Clean Architecture",
    ],
    category: "AI / Healthcare",
    status: "Production",
    highlights: [
      "Reduced coding time by significant margin",
      "LLM-powered text interpretation",
      "AI output validation layer",
      "Structured data extraction pipeline",
    ],
    github: null,
    demo: null,
    company: "TachyHealth",
    featured: true,
  },
  {
    id: "oncology-system",
    title: "Oncology Management System",
    shortDescription:
      "Full-scale web platform for managing oncology pharmacies and infusion centers.",
    description:
      "A comprehensive web platform tailored for oncology pharmacies and infusion centers, managing the complete workflow from patient intake to treatment planning, drug inventory, infusion scheduling, and outcome tracking. Built with healthcare compliance at its core.",
    challenge:
      "Oncology pharmacies have uniquely complex workflows involving hazardous drug management, precise dosing calculations, patient safety requirements, and regulatory compliance.",
    solution:
      "Designed from scratch using Clean Architecture and SOLID principles, ensuring each domain concern was properly separated. Collaborated with medical experts throughout development to ensure clinical accuracy and safety.",
    technologies: [
      ".NET Core",
      "Angular",
      "TypeScript",
      "SQL Server",
      "Azure",
      "Clean Architecture",
      "SOLID Principles",
      "REST APIs",
    ],
    category: "Healthcare / Enterprise",
    status: "Production",
    highlights: [
      "End-to-end oncology workflow management",
      "Drug inventory & dosing management",
      "Infusion center scheduling",
      "Medical domain expert collaboration",
    ],
    github: null,
    demo: null,
    company: "TachyHealth",
    featured: true,
  },
  {
    id: "api-gateway",
    title: "API Gateway Re-Architecture",
    shortDescription:
      "Complete re-architecture of API Gateway layer achieving 40% reduction in response processing time.",
    description:
      "Led the comprehensive re-architecture of a production API Gateway handling high-volume healthcare data traffic. Optimized JSON transformation pipelines, streamlined third-party integrations, and implemented efficient routing and middleware patterns.",
    challenge:
      "Legacy API gateway had accumulated technical debt with inefficient JSON transformation logic and slow third-party integration patterns causing performance bottlenecks.",
    solution:
      "Re-designed the gateway architecture with optimized serialization, connection pooling, async processing patterns, and intelligent caching strategies.",
    technologies: [
      ".NET Core",
      "REST APIs",
      "Azure",
      "JSON Transformation",
      "Middleware",
      "Performance Optimization",
    ],
    category: "Backend / Architecture",
    status: "Production",
    highlights: [
      "40% reduction in response processing time",
      "Optimized JSON transformation",
      "Improved third-party integration",
      "Scalable gateway architecture",
    ],
    github: null,
    demo: null,
    company: "TachyHealth",
    featured: false,
  },
  {
    id: "homeless-platform",
    title: "Homeless — Refugee Accommodation Platform",
    shortDescription:
      "Humanitarian platform facilitating refugee accommodation management across Africa.",
    description:
      "A humanitarian web platform connecting displaced persons with available accommodation resources across multiple African countries. The platform facilitates registration, matching, resource allocation, and ongoing case management for refugee support organizations.",
    challenge:
      "Managing refugee accommodation at scale across multiple countries requires real-time coordination, multi-language support, and robust data management for sensitive personal information.",
    solution:
      "Built a scalable multi-tenant platform with secure data handling, role-based access for different organizations, and a responsive interface accessible on low-bandwidth connections.",
    technologies: [
      ".NET Core",
      "Angular",
      "TypeScript",
      "SQL Server",
      "REST APIs",
      "Azure",
    ],
    category: "Humanitarian / Social Impact",
    status: "Production",
    highlights: [
      "Multi-country deployment across Africa",
      "Refugee case management",
      "Resource matching system",
      "Secure sensitive data handling",
    ],
    github: null,
    demo: null,
    company: "FortTeck",
    featured: true,
  },
  {
    id: "bond-workflow",
    title: "Bond — Enterprise Workflow System",
    shortDescription:
      "Enterprise workflow system for complex automotive operational processes (car imports, spare parts).",
    description:
      "Bond is an enterprise resource planning and workflow management system for the automotive import industry. It handles the complete lifecycle of car import operations, spare parts inventory, supplier management, and regulatory compliance documentation.",
    challenge:
      "Automotive import operations involve highly complex, multi-party workflows with strict regulatory requirements, inventory management, and financial tracking needs.",
    solution:
      "Architected a flexible workflow engine with configurable process steps, role-based approvals, document management, and real-time inventory tracking.",
    technologies: [
      ".NET Core",
      "Angular",
      "TypeScript",
      "SQL Server",
      "Workflow Engine",
      "REST APIs",
    ],
    category: "Enterprise / Automotive",
    status: "Production",
    highlights: [
      "Complex operational workflow automation",
      "Car import lifecycle management",
      "Spare parts inventory management",
      "Regulatory compliance tracking",
    ],
    github: null,
    demo: null,
    company: "FortTeck",
    featured: false,
  },
  {
    id: "counselling-system",
    title: "Counselling — Educational Administration System",
    shortDescription:
      "Educational administration system managing school workflows and appointments.",
    description:
      "A comprehensive educational administration platform designed for school counselling departments, managing student cases, appointment scheduling, intervention tracking, and administrative workflows for educational institutions.",
    challenge:
      "Educational counselling departments manage sensitive student data across complex scheduling, case tracking, and reporting requirements with strict privacy needs.",
    solution:
      "Built a privacy-first platform with role-based access, encrypted student records, calendar-integrated appointment management, and comprehensive reporting dashboards.",
    technologies: [
      ".NET Core",
      "Angular",
      "TypeScript",
      "SQL Server",
      "REST APIs",
    ],
    category: "Education / EdTech",
    status: "Production",
    highlights: [
      "Student case management",
      "Appointment scheduling system",
      "Privacy-first data handling",
      "Comprehensive reporting",
    ],
    github: null,
    demo: null,
    company: "FortTeck",
    featured: false,
  },
  {
    id: "upwork-clone",
    title: "Upwork Clone",
    shortDescription:
      "Full-stack freelancing platform with JWT auth, real-time messaging, and job posting.",
    description:
      "A full-featured freelancing marketplace built as part of the MEARN Stack Training at ITI. Implements core Upwork functionality including job posting, bidding, user profiles, secure authentication, and email notifications.",
    technologies: [
      "React",
      "Tailwind CSS",
      "Redux",
      "Node.js",
      "JWT",
      "Formik",
      "Nodemailer",
      "REST APIs",
      "MongoDB",
    ],
    category: "Training Project",
    status: "Completed",
    highlights: [
      "JWT authentication",
      "Email notifications with Nodemailer",
      "Job posting & bidding system",
      "Redux state management",
    ],
    github: null,
    demo: null,
    company: "ITI Training",
    featured: false,
  },
  {
    id: "moviex",
    title: "Moviex — Movie Discovery App",
    shortDescription:
      "Angular-based movie discovery app powered by GraphQL and Apollo Client.",
    description:
      "A modern movie and series discovery application built with Angular, GraphQL, and Apollo Client. Features real-time search, genre filtering, watchlist management, and rich media presentations.",
    technologies: [
      "Angular",
      "Bootstrap",
      "Node.js",
      "GraphQL",
      "Apollo",
      "REST APIs",
    ],
    category: "Training Project",
    status: "Completed",
    highlights: [
      "GraphQL data fetching",
      "Apollo Client integration",
      "Real-time search",
      "Genre-based filtering",
    ],
    github: null,
    demo: null,
    company: "ITI Training",
    featured: false,
  },
];

export const skills = {
  programming: {
    title: "Programming Languages",
    icon: "Code",
    color: "blue",
    items: [
      { name: "C#", level: 95, category: "expert" },
      { name: "TypeScript", level: 92, category: "expert" },
      { name: "JavaScript (ES6+)", level: 90, category: "expert" },
      { name: "C++", level: 65, category: "familiar" },
    ],
  },
  frontend: {
    title: "Frontend Development",
    icon: "Layout",
    color: "purple",
    items: [
      { name: "Angular", level: 95, category: "expert" },
      { name: "React", level: 85, category: "proficient" },
      { name: "HTML / CSS", level: 90, category: "expert" },
      { name: "Bootstrap", level: 88, category: "proficient" },
      { name: "jQuery", level: 80, category: "proficient" },
      { name: "Tailwind CSS", level: 82, category: "proficient" },
    ],
  },
  backend: {
    title: "Backend Development",
    icon: "Server",
    color: "green",
    items: [
      { name: ".NET Core", level: 95, category: "expert" },
      { name: "REST APIs", level: 95, category: "expert" },
      { name: "Node.js", level: 80, category: "proficient" },
      { name: "Express.js", level: 75, category: "proficient" },
      { name: "GraphQL", level: 70, category: "familiar" },
    ],
  },
  databases: {
    title: "Databases",
    icon: "Database",
    color: "orange",
    items: [
      { name: "SQL Server", level: 92, category: "expert" },
      { name: "PostgreSQL", level: 80, category: "proficient" },
      { name: "MongoDB", level: 78, category: "proficient" },
      { name: "Firebase", level: 70, category: "familiar" },
      { name: "ElasticSearch", level: 60, category: "familiar" },
    ],
  },
  cloudDevops: {
    title: "Cloud & DevOps",
    icon: "Cloud",
    color: "cyan",
    items: [
      { name: "Azure Platform", level: 80, category: "proficient" },
      { name: "Docker", level: 78, category: "proficient" },
      { name: "Kubernetes", level: 60, category: "familiar" },
      { name: "RabbitMQ", level: 65, category: "familiar" },
      { name: "Git / Version Control", level: 95, category: "expert" },
    ],
  },
  architecture: {
    title: "Architecture & Patterns",
    icon: "GitBranch",
    color: "pink",
    items: [
      { name: "Clean Architecture", level: 95, category: "expert" },
      { name: "SOLID Principles", level: 95, category: "expert" },
      { name: "Design Patterns", level: 90, category: "expert" },
      { name: "Clean Code", level: 92, category: "expert" },
      { name: "MVC", level: 90, category: "expert" },
      { name: "MERN / MEAN Stack", level: 82, category: "proficient" },
    ],
  },
  ai: {
    title: "AI & Intelligent Systems",
    icon: "Brain",
    color: "violet",
    items: [
      { name: "LLM Integration (OpenAI)", level: 85, category: "proficient" },
      { name: "Prompt Engineering", level: 82, category: "proficient" },
      { name: "AI Workflow Automation", level: 80, category: "proficient" },
      { name: "Structured Data Extraction", level: 80, category: "proficient" },
      { name: "AI Output Validation", level: 78, category: "proficient" },
    ],
  },
};

export const education = [
  {
    id: "bsc",
    degree: "Bachelor of Computers and Information",
    field: "Computer Science",
    institution: "Faculty of Computers and Information",
    university: "Minya University (MU)",
    department: "Computer Science Department",
    period: "September 2016 – August 2020",
    startDate: "2016-09",
    endDate: "2020-08",
    grade: "Good",
    description:
      "Studied core computer science fundamentals including data structures, algorithms, software engineering, database systems, and computer architecture.",
  },
];

export const internships = [
  {
    id: "mearn",
    title: "MEARN Stack Training",
    organization: "ITI (Information Technology Institute)",
    location: "Assuit, Egypt",
    period: "January 2021 – April 2021",
    skills: [
      "JavaScript fundamentals",
      "ES6",
      "Node.js",
      "MongoDB",
      "React",
      "Angular",
      "Express",
    ],
    projects: [
      {
        name: "Upwork Clone",
        tech: "React, Tailwind CSS, Redux, Moment, Formik, Nodemailer, Node.js, API, JWT",
      },
      {
        name: "Moviex",
        tech: "Angular, Bootstrap, Node.js, GraphQL, Apollo, API",
      },
      {
        name: "Twitter Clone",
        tech: "Bootstrap, Local Storage, jQuery",
      },
      {
        name: "Portfolio",
        tech: "Bootstrap, jQuery, Canvas, SVG",
      },
    ],
  },
  {
    id: "dotnet",
    title: ".NET MVC Training",
    organization: "ITI (Information Technology Institute)",
    location: "Minya, Egypt",
    period: "July 2019 – August 2019",
    skills: [
      "C# fundamentals",
      "LINQ",
      "MVC",
      "Ajax",
      "SQL",
      "Entity Framework",
    ],
    projects: [
      {
        name: "My Doctor",
        tech: "Entity Framework, LINQ, MVC, Ajax, SQL",
      },
    ],
  },
];

export const achievements = [
  {
    id: "api-perf",
    metric: "40%",
    title: "API Performance Improvement",
    description:
      "Re-architected API Gateway layer, optimizing JSON transformation and third-party integrations, reducing response processing time by 40%.",
    icon: "Zap",
    company: "TachyHealth",
    category: "Performance",
  },
  {
    id: "frontend-perf",
    metric: "35%",
    title: "Frontend Load Time Reduction",
    description:
      "Led large-scale frontend refactoring implementing lazy loading and modular architecture, reducing application load time by 35%.",
    icon: "TrendingUp",
    company: "TachyHealth",
    category: "Performance",
  },
  {
    id: "ai-platform",
    metric: "AI",
    title: "Medical AI Platform Delivered",
    description:
      "Spearheaded AiCode, an AI-powered medical coding platform automating medical record processing with LLM integration.",
    icon: "Brain",
    company: "TachyHealth",
    category: "Innovation",
  },
  {
    id: "5-years",
    metric: "5+",
    title: "Years of Enterprise Experience",
    description:
      "Delivered production-grade enterprise applications across healthcare, humanitarian, automotive, and education sectors.",
    icon: "Award",
    company: "Multiple",
    category: "Experience",
  },
  {
    id: "clean-arch",
    metric: "100%",
    title: "Clean Architecture Adoption",
    description:
      "Designed and enforced Clean Architecture and SOLID principles across all major projects, reducing bug rates and improving maintainability.",
    icon: "Shield",
    company: "TachyHealth",
    category: "Quality",
  },
  {
    id: "cross-domain",
    metric: "5+",
    title: "Enterprise Domains Mastered",
    description:
      "Successfully delivered complex solutions in Healthcare, Humanitarian, Education, Automotive, and HR domains.",
    icon: "Globe",
    company: "Multiple",
    category: "Versatility",
  },
];

export const certifications = [
  {
    id: "iti-mearn",
    title: "MEARN Stack Development",
    issuer: "ITI — Information Technology Institute",
    date: "April 2021",
    description:
      "Comprehensive training in MongoDB, Express, Angular, React, and Node.js stack.",
    verified: true,
    link: null,
  },
  {
    id: "iti-dotnet",
    title: ".NET MVC Development",
    issuer: "ITI — Information Technology Institute",
    date: "August 2019",
    description:
      "Training in C#, ASP.NET MVC, Entity Framework, LINQ, Ajax, and SQL.",
    verified: true,
    link: null,
  },
  {
    id: "azure-placeholder",
    title: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    date: "[PLACEHOLDER — Add if certified]",
    description: "Azure cloud services and fundamentals.",
    verified: false,
    link: null,
    placeholder: true,
  },
];

export const testimonials = [
  {
    id: "t1",
    name: "[Your Colleague Name]",
    role: "Product Manager",
    company: "TachyHealth",
    avatar: null,
    text: "[PLACEHOLDER] Mohammed is an exceptional engineer who consistently delivers beyond expectations. His ability to translate complex medical requirements into elegant technical solutions is remarkable.",
    placeholder: true,
  },
  {
    id: "t2",
    name: "[Your Team Lead Name]",
    role: "CTO",
    company: "FortTeck",
    avatar: null,
    text: "[PLACEHOLDER] Working with Mohammed was a pleasure. His deep understanding of Clean Architecture and passion for code quality elevated our entire team's standards.",
    placeholder: true,
  },
  {
    id: "t3",
    name: "[Your Client Name]",
    role: "Project Stakeholder",
    company: "TachyHealth",
    avatar: null,
    text: "[PLACEHOLDER] The AI medical coding platform Mohammed built transformed our billing workflow. His attention to both technical accuracy and user experience is truly impressive.",
    placeholder: true,
  },
];

export const tools = [
  {
    id: "pdf-to-word",
    title: "PDF to Word Converter",
    description:
      "Convert PDF files to editable Word documents with best-effort formatting preservation. Fully client-side — your files never leave your device.",
    icon: "FileText",
    color: "blue",
    features: [
      "Drag & Drop upload",
      "Client-side processing",
      "Privacy-first (no server upload)",
      "Progress indicator",
      "Instant download",
    ],
    badge: "100% Client-Side",
    badgeColor: "green",
    route: "/tools#pdf-to-word",
  },
  {
    id: "yt-playlist",
    title: "YouTube Playlist Duration",
    description:
      "Calculate the total duration of any YouTube playlist instantly. See duration at different playback speeds.",
    icon: "Youtube",
    color: "red",
    features: [
      "Paste playlist URL",
      "Total video count",
      "Duration at 1x, 1.25x, 1.5x, 2x",
      "Requires YouTube API key",
      "Real-time calculation",
    ],
    badge: "YouTube API",
    badgeColor: "yellow",
    route: "/tools#yt-playlist",
  },
  {
    id: "yt-downloader",
    title: "YouTube Video Downloader",
    description:
      "Download YouTube videos in various quality options. Beautiful UI with quality selection and progress tracking.",
    icon: "Download",
    color: "purple",
    features: [
      "Paste video URL",
      "Quality selection",
      "Progress tracking",
      "Requires backend server",
      "Legal compliance info",
    ],
    badge: "Requires Backend",
    badgeColor: "orange",
    route: "/tools#yt-downloader",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Tools", href: "/tools" },
  { label: "Contact", href: "#contact" },
];
