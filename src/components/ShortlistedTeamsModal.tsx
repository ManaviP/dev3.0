import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as pdfjsLib from 'pdfjs-dist';
import { shortlistedTeamsDocument } from '../lib/shortlistedTeams';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

interface ShortlistedTeamsModalProps {
  isOpen: boolean;
  onClose: () => void;
  openViewer?: boolean;
}

function CloseButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[#1a1a1a] bg-[#f3ecd2] text-[#1a1a1a] transition-colors hover:bg-[#f97028]"
    >
      <span className="text-2xl leading-none" aria-hidden="true">×</span>
    </button>
  );
}

function ModalShell({ children, onBackdropClick }: { children: React.ReactNode; onBackdropClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onBackdropClick();
      }}
      className="fixed inset-0 z-[180] flex items-center justify-center overflow-hidden bg-[#1a1a1a]/75 p-4 backdrop-blur-sm md:p-8"
    >
      {children}
    </motion.div>
  );
}

function Preview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const renderFirstPage = async () => {
      try {
        const pdf = await pdfjsLib.getDocument({ url: shortlistedTeamsDocument.pdfUrl }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d')!, viewport, canvas }).promise;
      } catch {
        if (!cancelled) setPreviewError(true);
      }
    };
    renderFirstPage();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="flex max-h-[50vh] max-w-full justify-center border-2 border-[#1a1a1a] bg-white shadow-[8px_8px_0_#1a1a1a]">
      {previewError ? (
        <p className="flex aspect-[8.5/11] w-full max-w-[360px] items-center justify-center p-6 text-center text-xs">Unable to load the document preview.</p>
      ) : (
        <canvas ref={canvasRef} aria-label="First page of the shortlisted teams document" className="max-h-[50vh] w-auto max-w-full object-contain" />
      )}
    </div>
  );
}

function Announcement({ onClose, onViewDocument }: { onClose: () => void; onViewDocument: () => void }) {
  return (
    <ModalShell onBackdropClick={onClose}>
      <motion.section
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        className="relative flex w-full max-w-4xl flex-col overflow-hidden border-[3px] border-[#1a1a1a] bg-[#f3ecd2] p-5 text-[#1a1a1a] shadow-[10px_10px_0_#f97028] md:p-7"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortlisted-announcement-title"
      >
        <div className="absolute right-5 top-5 md:right-7 md:top-7">
          <CloseButton onClick={onClose} label="Close announcement" />
        </div>
        <div className="pr-12 text-center">
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#f97028]">Official update</p>
          <h2 id="shortlisted-announcement-title" className="font-display text-3xl uppercase leading-none md:text-5xl">Shortlisted Teams Announced</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-[#1a1a1a]/70 md:text-base">The shortlisted teams for DSU DevHack 3.0 have been announced.</p>
        </div>
        <div className="my-5 flex max-h-[50vh] justify-center">
          <Preview />
        </div>
        <div className="flex flex-col-reverse justify-center gap-3 sm:flex-row">
          <button type="button" onClick={onViewDocument} className="h-12 cursor-pointer border-2 border-[#1a1a1a] bg-[#f97028] px-6 font-bold uppercase tracking-widest shadow-[4px_4px_0_#1a1a1a] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none">View Document</button>
        </div>
      </motion.section>
    </ModalShell>
  );
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
      onSearchStatus(`Searching for “${searchTerm.trim()}”...`);
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
      if (!cancelled) onSearchStatus(`“${searchTerm.trim()}” was not found`);
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

function PdfViewer({ onClose }: { onClose: () => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  return (
    <ModalShell onBackdropClick={onClose}>
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
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
              <svg className="sm:hidden" width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 1.25V8.25M6 8.25L3.25 5.5M6 8.25L8.75 5.5M1.5 10.25H10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline">Download</span>
            </a>
            <CloseButton onClick={onClose} label="Close PDF viewer" />
          </div>
        </header>
        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#d7d0bb]"
          onWheel={(event) => event.stopPropagation()}
        >
          <PdfPages searchTerm={searchTerm} onSearchStatus={setSearchStatus} />
        </div>
        {searchStatus && <p className="border-t border-[#f97028] px-4 py-2 text-center text-xs text-[#f3ecd2]/80">{searchStatus}</p>}
      </motion.section>
    </ModalShell>
  );
}

export default function ShortlistedTeamsModal({ isOpen, onClose, openViewer = false }: ShortlistedTeamsModalProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(openViewer);
  const viewerVisible = openViewer || isViewerOpen;
  const closeFlow = () => {
    setIsViewerOpen(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsViewerOpen(false);
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && !viewerVisible && <Announcement onClose={closeFlow} onViewDocument={() => setIsViewerOpen(true)} />}
      {isOpen && viewerVisible && <PdfViewer onClose={closeFlow} />}
    </AnimatePresence>
  );
}
