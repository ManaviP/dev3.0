import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as pdfjsLib from 'pdfjs-dist';
import { shortlistedTeamsDocument } from '../lib/shortlistedTeams';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

interface ShortlistedTeamsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function PdfPage({ pdf, pageNumber }: { pdf: pdfjsLib.PDFDocumentProxy; pageNumber: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    const renderPage = async () => {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.35 });
      const canvas = canvasRef.current;
      if (!canvas || cancelled) return;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: canvas.getContext('2d')!, viewport, canvas }).promise;
    };
    renderPage();
    return () => { cancelled = true; };
  }, [pdf, pageNumber]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={`Page ${pageNumber}`}
      className="h-auto w-full border-2 border-[#1a1a1a] bg-white shadow-[6px_6px_0_#f97028]"
    />
  );
}

function PdfPages({ searchTerm, onSearchStatus }: { searchTerm: string; onSearchStatus: (status: string) => void }) {
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [loadError, setLoadError] = useState(false);
  const pagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    pdfjsLib.getDocument({ url: shortlistedTeamsDocument.pdfUrl }).promise
      .then((document) => { if (!cancelled) setPdf(document); })
      .catch(() => { if (!cancelled) setLoadError(true); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();
    if (!pdf || !normalizedTerm) {
      onSearchStatus('');
      return;
    }

    let cancelled = false;
    const findTerm = async () => {
      onSearchStatus(`Searching for "${searchTerm.trim()}"...`);
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => ('str' in item ? item.str : '')).join(' ').toLowerCase();
        if (pageText.includes(normalizedTerm)) {
          if (!cancelled) {
            pagesContainerRef.current?.querySelector(`[data-page-number="${pageNumber}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            onSearchStatus(`Found on page ${pageNumber}`);
          }
          return;
        }
      }
      if (!cancelled) onSearchStatus(`"${searchTerm.trim()}" was not found`);
    };
    findTerm().catch(() => { if (!cancelled) onSearchStatus('Search is unavailable while the document loads'); });
    return () => { cancelled = true; };
  }, [pdf, searchTerm, onSearchStatus]);

  if (loadError) return <p className="p-8 text-center text-sm text-[#1a1a1a]">Unable to load the shortlisted teams document.</p>;
  if (!pdf) return <p className="p-8 text-center text-sm text-[#1a1a1a]">Loading document...</p>;

  return (
    <div ref={pagesContainerRef} className="flex min-h-full w-full flex-col items-center gap-6 bg-[#d7d0bb] p-2 md:p-4">
      {Array.from({ length: pdf.numPages }, (_, index) => (
        <div key={index + 1} data-page-number={index + 1} className="w-full scroll-mt-4">
          <PdfPage pdf={pdf} pageNumber={index + 1} />
        </div>
      ))}
    </div>
  );
}

export default function ShortlistedTeamsModal({ isOpen, onClose }: ShortlistedTeamsModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[180] flex items-center justify-center overflow-hidden bg-[#1a1a1a]/75 p-4 backdrop-blur-sm md:p-8"
        >
          <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
            className="flex h-[calc(100vh-2rem)] w-full max-w-6xl flex-col overflow-hidden border-[3px] border-[#f97028] bg-[#1a1a1a] shadow-[10px_10px_0_#f97028]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="shortlisted-pdf-title"
          >
            <header className="flex min-h-16 flex-col items-stretch gap-3 border-b-2 border-[#f97028] px-4 py-3 text-[#f3ecd2] sm:flex-row sm:items-center sm:justify-between md:px-6">
              <h2 id="shortlisted-pdf-title" className="shrink-0 font-display text-2xl uppercase md:text-4xl">Shortlisted Teams</h2>
              <div className="flex min-w-0 items-center justify-end gap-2">
                <label htmlFor="shortlisted-team-search" className="relative h-10 min-w-0 flex-1 sm:w-36 sm:flex-none md:w-52">
                  <span className="sr-only">Search shortlisted teams</span>
                  <input
                    id="shortlisted-team-search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search team"
                    className="h-full w-full border-2 border-[#f3ecd2] bg-transparent px-2 pr-8 text-xs text-[#f3ecd2] outline-none placeholder:text-[#f3ecd2]/60 focus:border-[#f97028]"
                  />
                  <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#f3ecd2]" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
                    <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </label>
                <a
                  href={shortlistedTeamsDocument.pdfUrl}
                  download={shortlistedTeamsDocument.downloadName}
                  title="Download"
                  aria-label="Download"
                  className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center border-2 border-[#f3ecd2] text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors hover:bg-[#f97028] hover:text-[#1a1a1a] sm:w-auto sm:px-3 sm:text-xs"
                >
                  ↓
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center border-2 border-[#f3ecd2] text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors hover:bg-[#f97028] hover:text-[#1a1a1a] sm:w-auto sm:px-3 sm:text-xs"
                >
                  ✕
                </button>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto">
              <PdfPages searchTerm={searchTerm} onSearchStatus={setSearchStatus} />
              {searchStatus && <p className="border-t border-[#f97028] px-4 py-2 text-center text-xs text-[#f3ecd2]/80">{searchStatus}</p>}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
