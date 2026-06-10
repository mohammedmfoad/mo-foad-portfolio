# Mohammed Foad — Premium Developer Portfolio & Utilities Hub

A high-performance, responsive, and premium personal portfolio website and developer tools hub designed for **Mohammed Foad** (Senior Full Stack Engineer specializing in .NET, Angular, and AI-Driven Systems).

Built using **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, optimized for fully static export, low maintenance, and fast loading speeds.

## 🚀 Key Features

- **CV-Driven Sections**: Complete showcase of professional experience, projects, skills, education, certifications, and achievements.
- **Interactive Developer Tools**:
  1. **PDF to Word Converter**: A 100% client-side utility using `pdf-lib` and `docx` that converts PDF files to DOCX without uploading files to a server.
  2. **YouTube Playlist Duration Calculator**: Fetches and sums playlist lengths dynamically across different speeds (1.25x, 1.5x, 2x) using the YouTube Data API.
  3. **YouTube Video Downloader (Dev Guide)**: A simulated quality selector and format fetcher coupled with an educational backend system architecture guide, API specifications, and Node.js server source code.
- **Harmony Design**: Premium aesthetics, smooth transitions, typewriter titles, canvas particle backgrounds, and dark/light mode toggling.
- **Hostinger Friendly**: Fully prepared for Apache/cPanel static hosting deployments with custom URL rewrite rules.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Libraries**: `pdf-lib` (PDF parsing), `docx` (Word formatting), `react-dropzone` (file uploading)

---

## 💻 Local Development

### 1. Prerequisites
Ensure you have **Node.js (v18+)** installed.

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add your YouTube Data API Key if you want to use the live Playlist Duration Calculator:
```env
NEXT_PUBLIC_YT_API_KEY=your_youtube_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Updating Content & Data

All personal details, experience bullet points, project lists, and skills are centralized in:
📂 `src/data/portfolio.ts`

To change or update your resume details, simply open `portfolio.ts` and modify the objects. The UI components will update dynamically.

---

## 📦 Static Export & Hostinger Deployment

Hostinger shared hosting does not run active Node.js servers for standard accounts. This site is configured for a **Static HTML Export**, which compiles the application into lightweight, pre-rendered static files.

### Step 1: Run Build and Export
Compile the project to a static folder:
```bash
npm run build
```
This command generates an `out` folder in the project root containing all compiled HTML, CSS, JavaScript, and asset files.

### Step 2: Configure Rewrite Rules (Apache)
To resolve clean URLs (e.g. `/tools` instead of `/tools.html`), we have pre-configured a `.htaccess` file inside the `public/` directory:
- Enforces HTTPS redirection automatically.
- Handles clean URL rewrites so that `/tools` maps to `/tools.html` behind the scenes.
- Handles 404 pages using the custom `404.html`.

This file is automatically compiled into the `out` directory during build.

### Step 3: Upload to Hostinger
1. Log in to your **Hostinger hPanel**.
2. Open the **File Manager** for your domain.
3. Navigate to the `public_html` directory.
4. Upload all the contents inside the local `portfolio-build/out/` folder directly into `public_html`.
5. Ensure that the `.htaccess` file is uploaded in the root of `public_html`.

Your website is now live, fast, and secure!
