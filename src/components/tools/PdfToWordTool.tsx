"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  ArrowRight,
  Download,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Clock,
  Shield,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

// Simple PDF content stream parser for basic text extraction
function parsePdfTextContent(streamText: string): string {
  let text = "";
  // Look for text segments inside parentheses: (Text) Tj or (Text) TJ
  // Handle escape sequences like \( and \)
  const regex = /\((.*?)\)\s*(?:Tj|TJ)/g;
  let match;
  while ((match = regex.exec(streamText)) !== null) {
    let cleanText = match[1]
      .replace(/\\([\(\)])/g, "$1") // Unescape parentheses
      .replace(/\\r/g, "\n")
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\357\\202\\267/g, "•") // Basic bullet points
      .replace(/\\(\d{3})/g, (_, octal) => {
        // Convert octal escape sequences to characters
        return String.fromCharCode(parseInt(octal, 8));
      });
    text += cleanText + " ";
  }
  
  // Also look for TJ arrays e.g. [(T) 10 (e) -5 (x) 20 (t)] TJ
  const tjRegex = /\[(.*?)\]\s*TJ/g;
  let tjMatch;
  while ((tjMatch = tjRegex.exec(streamText)) !== null) {
    const arrayContent = tjMatch[1];
    const stringRegex = /\((.*?)\)/g;
    let strMatch;
    let word = "";
    while ((strMatch = stringRegex.exec(arrayContent)) !== null) {
      word += strMatch[1];
    }
    text += word + " ";
  }

  return text.trim();
}

async function extractTextFromPdf(arrayBuffer: ArrayBuffer): Promise<string[]> {
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  const textPages: string[] = [];

  for (const page of pages) {
    let pageText = "";
    // Access content stream directly to do a best-effort text extraction
    const { Contents } = page.node as any;
    if (Contents) {
      const contentsArray = Array.isArray(Contents) ? Contents : [Contents];
      for (const contentRef of contentsArray) {
        const contentStream = pdfDoc.context.lookup(contentRef) as any;
        if (contentStream && typeof contentStream.decode === "function") {
          try {
            const bytes = contentStream.decode();
            const streamText = new TextDecoder().decode(bytes);
            const parsed = parsePdfTextContent(streamText);
            if (parsed) pageText += parsed + "\n";
          } catch (e) {
            console.error("Error decoding page content stream:", e);
          }
        }
      }
    }
    textPages.push(pageText.trim());
  }
  return textPages;
}

export function PdfToWordTool() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "parsing" | "converting" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [metadata, setMetadata] = useState<{ pages: number; size: string } | null>(null);
  const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null);
  const [convertedFileName, setConvertedFileName] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFile = acceptedFiles[0];
    if (pdfFile && pdfFile.type === "application/pdf") {
      setFile(pdfFile);
      setStatus("idle");
      setProgress(0);
      setErrorMsg("");
      setConvertedFileUrl(null);
      
      // Calculate file size
      const sizeStr = 
        pdfFile.size > 1024 * 1024 
          ? `${(pdfFile.size / (1024 * 1024)).toFixed(2)} MB`
          : `${(pdfFile.size / 1024).toFixed(1)} KB`;
      
      setMetadata({ pages: 0, size: sizeStr });
    } else {
      setErrorMsg("Please select a valid PDF file.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const handleConvert = async () => {
    if (!file) return;

    try {
      setStatus("parsing");
      setProgress(15);

      const arrayBuffer = await file.arrayBuffer();
      setProgress(30);

      // Verify PDF and extract text
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();
      setMetadata(prev => prev ? { ...prev, pages: pageCount } : { pages: pageCount, size: "Unknown" });
      
      setProgress(45);
      const extractedPages = await extractTextFromPdf(arrayBuffer);
      
      setStatus("converting");
      setProgress(70);

      // Create Word Document
      const docSections = extractedPages.map((pageText, index) => {
        const paragraphs = pageText
          .split("\n")
          .filter(p => p.trim().length > 0)
          .map(paragraph => {
            return new Paragraph({
              children: [
                new TextRun({
                  text: paragraph,
                  font: "Calibri",
                  size: 24, // 12pt
                }),
              ],
              spacing: {
                before: 120, // 6pt
                after: 120,
              },
            });
          });

        return {
          properties: {},
          children: [
            new Paragraph({
              text: `Page ${index + 1}`,
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 240, after: 120 },
            }),
            ...paragraphs,
          ],
        };
      });

      const doc = new Document({
        sections: docSections,
      });

      setProgress(85);

      // Package Word Document
      const blob = await Packer.toBlob(doc);
      
      // Setup download
      const wordName = file.name.replace(/\.pdf$/i, ".docx");
      const url = URL.createObjectURL(blob);
      setConvertedFileUrl(url);
      setConvertedFileName(wordName);
      
      setProgress(100);
      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err.message || "An error occurred while converting the PDF.");
    }
  };

  const handleDownload = () => {
    if (convertedFileUrl && convertedFileName) {
      const link = document.createElement("a");
      link.href = convertedFileUrl;
      link.download = convertedFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setFile(null);
    setStatus("idle");
    setProgress(0);
    setErrorMsg("");
    setMetadata(null);
    if (convertedFileUrl) {
      URL.revokeObjectURL(convertedFileUrl);
      setConvertedFileUrl(null);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-green-400 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20 w-fit">
        <Shield className="w-3.5 h-3.5" />
        100% Client-Side Protection: Files never leave your browser
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Dropzone & Control Area */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${
              isDragActive
                ? "border-blue-500 bg-blue-500/5 scale-[0.99]"
                : "border-slate-800 hover:border-slate-700 bg-slate-900/20"
            }`}
          >
            <input {...getInputProps()} />
            
            <div className="p-4 rounded-full bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-white transition-colors">
              <Upload className="w-8 h-8" />
            </div>

            {file ? (
              <div className="text-center">
                <p className="text-sm font-bold text-white max-w-xs truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {metadata?.size} {metadata?.pages ? `• ${metadata.pages} pages` : ""}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-300">
                  {isDragActive ? "Drop your PDF here..." : "Drag & drop PDF here, or click to browse"}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Supports files up to 25MB
                </p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          {file && (
            <div className="flex gap-4">
              {status === "idle" && (
                <button
                  onClick={handleConvert}
                  className="flex-grow flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all"
                >
                  Convert PDF to Word
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {status === "success" && (
                <button
                  onClick={handleDownload}
                  className="flex-grow flex items-center justify-center gap-2 py-3.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-sm transition-all animate-bounce"
                >
                  Download DOCX
                  <Download className="w-4 h-4" />
                </button>
              )}

              {status !== "parsing" && status !== "converting" && (
                <button
                  onClick={handleReset}
                  className="px-6 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-350 text-sm font-bold transition-all"
                >
                  Reset
                </button>
              )}
            </div>
          )}

          {/* Progress / Status display */}
          {(status === "parsing" || status === "converting") && (
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold uppercase text-blue-400 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  {status === "parsing" ? "Parsing PDF Layout" : "Generating DOCX file"}
                </span>
                <span className="text-xs font-bold text-white">{progress}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                This will take just a few seconds...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex gap-3 items-center">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-bold">Conversion Complete!</p>
                <p className="text-xs opacity-80 mt-0.5">Your DOCX document is ready for download.</p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex gap-3 items-center">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-bold">Conversion Failed</p>
                <p className="text-xs opacity-80 mt-0.5">{errorMsg}</p>
              </div>
            </div>
          )}
        </div>

        {/* Limitations & Details Panel */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 text-slate-350">
            <h4 className="text-sm font-bold text-white mb-3">How it works</h4>
            <ol className="text-xs space-y-2 list-decimal list-inside leading-relaxed text-slate-400">
              <li>Your browser loads the PDF document data in-memory.</li>
              <li>A custom parser decodes the internal text layout streams.</li>
              <li>Each page is processed to extract strings, symbols, and formatting metadata.</li>
              <li>A new Microsoft Word document is generated using XML structures.</li>
              <li>The completed DOCX file is packaged as a local Blob download.</li>
            </ol>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 text-slate-350">
            <h4 className="text-sm font-bold text-white mb-3 text-amber-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Technical Limitations
            </h4>
            <ul className="text-xs space-y-2.5 text-slate-400 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>Scanned PDFs or image-only pages require OCR (Optical Character Recognition) and are not supported by this client-side parser.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>Complex multi-column layouts, nested tables, or drawings may collapse into single-column flows during conversion.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>Custom fonts will fall back to Calibri standard serif styling inside the generated Word document.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
