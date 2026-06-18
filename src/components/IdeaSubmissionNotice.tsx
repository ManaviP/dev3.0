import { motion } from 'framer-motion';

const steps = [
  { label: 'Register Team', isFinal: false },
  { label: 'Team Accepted', isFinal: false },
  { label: 'Receive RSVP Mail', isFinal: false },
  { label: 'Accept RSVP', isFinal: false },
  { label: 'Idea Submission Unlocked', isFinal: true },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.25,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const arrowVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      type: 'spring' as const,
      stiffness: 300,
      damping: 15,
    },
  },
};

export default function IdeaSubmissionNotice() {
  return (
    <div
      style={{
        width: '100%',
        background: '#F3ECD2',
        paddingTop: 40,
        paddingBottom: 60,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={containerVariants}
        className="idea-notice-outer"
      >
        {/* Heading */}
        <motion.h3
          variants={cardVariants}
          style={{
            fontFamily: 'var(--font-display)',
            textAlign: 'center',
            textTransform: 'uppercase',
            fontWeight: 900,
            letterSpacing: '0.08em',
            color: '#111',
            fontSize: 'clamp(20px, 4vw, 32px)',
            lineHeight: 1.2,
            margin: '0 0 32px 0',
          }}
        >
          Important Notice for Idea Submission
        </motion.h3>

        {/* Workflow Row */}
        <motion.div
          variants={containerVariants}
          className="idea-workflow-row"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.label}
              variants={cardVariants}
              className={step.isFinal ? 'idea-box idea-box--final' : 'idea-box'}
            >
              {step.label}
            </motion.div>
          )).reduce<React.ReactNode[]>((acc, card, index) => {
            if (index > 0) {
              acc.push(
                <motion.span
                  key={`arrow-${index}`}
                  variants={arrowVariants}
                  className="idea-arrow"
                >
                  <span className="idea-arrow-h">→</span>
                  <span className="idea-arrow-v">↓</span>
                </motion.span>
              );
            }
            acc.push(card);
            return acc;
          }, [])}
        </motion.div>

        {/* Subtext */}
        <motion.p
          variants={cardVariants}
          style={{
            textAlign: 'center',
            marginTop: 28,
            fontSize: 'clamp(12px, 2.5vw, 15px)',
            color: '#444',
            fontWeight: 500,
            maxWidth: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.6,
          }}
        >
          Only teams that complete RSVP confirmation will receive access to the
          final Idea Submission portal.
        </motion.p>
      </motion.div>
    </div>
  );
}
