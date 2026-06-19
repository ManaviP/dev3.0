import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { label: 'Register Team', isFinal: false },
  { label: 'Team Accepted', isFinal: false },
  { label: 'Receive RSVP Mail', isFinal: false },
  { label: 'Accept RSVP', isFinal: false },
  { label: 'Idea Submission Unlocked', isFinal: true },
];

export default function IdeaSubmissionPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showMiniFab, setShowMiniFab] = useState(false);

  useEffect(() => {
    // Don't show popup if already dismissed this session — go straight to fab
    if (sessionStorage.getItem('ideaPopupDismissed')) {
      setShowMiniFab(true);
      return;
    }

    // Show popup after the loading screen finishes (≈3.5s)
    const timer = setTimeout(() => setIsVisible(true), 3800);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('ideaPopupDismissed', 'true');
    // Show the side toast, then the fab will appear after toast
    setShowToast(true);
  };

  // Auto-hide the toast after 6 seconds, then show the mini fab
  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => {
      setShowToast(false);
      setShowMiniFab(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, [showToast]);

  // If user manually closes toast, show fab immediately
  const handleToastClose = () => {
    setShowToast(false);
    setShowMiniFab(true);
  };

  // Re-open the popup from the mini fab
  const handleReopen = () => {
    setShowMiniFab(false);
    setShowToast(false);
    setIsVisible(true);
  };

  return (
    <>
      {/* ── MAIN POPUP ── */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="idea-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleDismiss}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 150,
              background: 'rgba(26, 26, 26, 0.65)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
          >
            <motion.div
              key="idea-popup-card"
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26, delay: 0.08 }}
              onClick={(e) => e.stopPropagation()}
              className="idea-popup-card"
            >
              <div className="idea-popup-accent-bar" />

              <button
                onClick={handleDismiss}
                className="idea-popup-close"
                aria-label="Close notification"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M4 4L14 14M14 4L4 14"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="idea-popup-badge"
              >
                <span className="idea-popup-badge-dot" />
                Important Notice
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="idea-popup-heading"
              >
                Idea Submission Process
              </motion.h3>

              <div className="idea-popup-steps">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4, ease: 'easeOut' }}
                    className="idea-popup-step-group"
                  >
                    {index > 0 && (
                      <div className="idea-popup-arrow-wrap">
                        <span className="idea-popup-arrow-h">→</span>
                        <span className="idea-popup-arrow-v">↓</span>
                      </div>
                    )}
                    <div
                      className={
                        step.isFinal
                          ? 'idea-popup-step idea-popup-step--final'
                          : 'idea-popup-step'
                      }
                    >
                      <span className="idea-popup-step-num">{index + 1}</span>
                      <span className="idea-popup-step-label">{step.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="idea-popup-subtext"
              >
                Only teams that complete RSVP confirmation will receive access to the
                final Idea Submission portal.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                onClick={handleDismiss}
                className="idea-popup-cta"
              >
                Got it!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SIDE TOAST NOTIFICATION ── */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            key="idea-side-toast"
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="idea-toast"
          >
            <div className="idea-toast-accent" />

            <div className="idea-toast-content">
              <div className="idea-toast-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="#f97028" strokeWidth="2" />
                  <path d="M10 6V11" stroke="#f97028" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="10" cy="14" r="1.2" fill="#f97028" />
                </svg>
              </div>

              <div className="idea-toast-text">
                <span className="idea-toast-title">RSVP Required</span>
                <span className="idea-toast-msg">
                  Only teams that complete RSVP confirmation will receive access to the final Idea Submission portal.
                </span>
              </div>

              <button
                onClick={handleToastClose}
                className="idea-toast-close"
                aria-label="Close toast"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <motion.div
              className="idea-toast-progress"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 6, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MINIMIZED FAB BUTTON ── */}
      <AnimatePresence>
        {showMiniFab && !isVisible && !showToast && (
          <motion.button
            key="idea-mini-fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            onClick={handleReopen}
            className="idea-fab"
            aria-label="View Idea Submission Notice"
            title="Idea Submission Notice"
          >
            {/* Bell / info icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="idea-fab-icon">
              <path
                d="M12 2C10.343 2 9 3.343 9 5V6.083C6.162 7.012 4 9.779 4 13V17L2 19V20H22V19L20 17V13C20 9.779 17.838 7.012 15 6.083V5C15 3.343 13.657 2 12 2Z"
                fill="currentColor"
              />
              <path
                d="M12 24C13.657 24 15 22.657 15 21H9C9 22.657 10.343 24 12 24Z"
                fill="currentColor"
              />
            </svg>

            {/* Pulsing dot */}
            <span className="idea-fab-dot" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
