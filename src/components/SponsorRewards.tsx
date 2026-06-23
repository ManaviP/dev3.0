import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SponsorReward {
  name: string;
  logo: string;
  rewardValue: string;
  description: React.ReactNode;
}

const SponsorRewards: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleFlip = (key: string) => {
    setFlippedCards(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sponsorRewards: SponsorReward[] = [
    {
      name: "n8n",
      logo: "/logos/n8n.png",
      rewardValue: "$12,000",
      description: "n8n Cloud Pro Licence"
    },
    {
      name: ".xyz",
      logo: "/logos/xyz.png",
      rewardValue: "$5,250",
      description: ".xyz Domains"
    },
    {
      name: "Codecrafters",
      logo: "/logos/codecraft.svg",
      rewardValue: "$3,780",
      description: "VIP Membership for Codecrafters"
    },
    {
      name: "Render",
      logo: "/logos/render.png",
      rewardValue: "$950",
      description: (
        <ul className="flex flex-col gap-1 text-left list-disc pl-5 pr-2 w-fit mx-auto text-[0.85rem] leading-tight">
          <li><strong>$50</strong> credits for all attendees</li>
          <li>
            Best Use of Render:
            <ul className="flex flex-col mt-0.5 gap-0.5 list-disc pl-4 text-[0.8rem] opacity-90">
              <li>1st: <strong>$500</strong> credits</li>
              <li>2nd: <strong>$300</strong> credits</li>
              <li>3rd: <strong>$100</strong> credits</li>
            </ul>
          </li>
          <li>Valid for 1 year</li>
        </ul>
      )
    }
  ];

  return (
    <div className="relative w-full mt-20 md:mt-24">
      <style>{`
        /* ── 3D Flip Container ── */
        .flip-perspective {
          perspective: 1200px;
        }

        .flip-card {
          position: relative;
          width: 100%;
          max-width: 320px;
          margin: 0 auto;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
        }

        .flip-card.flipped {
          transform: rotateY(180deg);
        }

        /* ── Desktop hover flip ── */
        @media (hover: hover) {
          .flip-card:hover {
            transform: rotateY(180deg);
          }
          .flip-card.flipped:hover {
            transform: rotateY(180deg);
          }
        }

        /* ── Face common styles ── */
        .flip-face {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 6px;
          overflow: hidden;
          transform-style: preserve-3d;
        }

        .flip-front {
          position: relative;
          z-index: 2;
          transform: rotateY(0deg);
        }

        .flip-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform: rotateY(180deg);
          z-index: 1;
        }

        /* ── Polaroid frame (front) ── */
        .frame-container {
          position: relative;
          width: 100%;
          background: #f0ede6;
          border-radius: 6px;
          box-shadow:
            0 2px 12px rgba(0, 0, 0, 0.15),
            0 8px 30px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* ── Photo area (dark zone) ── */
        .frame-photo-area {
          position: relative;
          width: calc(100% - 28px);
          aspect-ratio: 1 / 1;
          margin: 14px auto 0;
          background: #0a0a0a;
          border-radius: 2px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }

        /* ── Logo + amount wrapper ── */
        .frame-logo-amount {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 0 20px;
        }

        /* ── Sponsor logo ── */
        .sponsor-logo {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 70px;
          height: 56px;
          object-fit: contain;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
        }

        .sponsor-logo.logo-xyz {
          top: 12px;
        }

        /* ── Reward amount ── */
        .sponsor-reward-value {
          background: linear-gradient(135deg, #FFE55C 0%, #FFD700 30%, #FFF8DC 60%, #FFD700 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          font-size: clamp(2.15rem, 5vw, 3.15rem);
          text-align: center;
          font-family: 'Caprasimo', sans-serif;
          letter-spacing: 0.02em;
          filter: drop-shadow(0 2px 8px rgba(255, 215, 0, 0.3));
          line-height: 1.1;
          margin-top: 20px;
          padding: 4px 0;
        }

        /* ── Front caption area (sponsor name) ── */
        .frame-caption-area {
          width: 100%;
          min-height: 60px;
          padding: 12px 16px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .sponsor-name-label {
          color: #1a1a1a;
          font-size: 1.05rem;
          text-align: center;
          font-weight: 700;
          font-family: 'Caprasimo', sans-serif;
          letter-spacing: 0.01em;
        }

        .flip-hint {
          color: #1a1a1a;
          font-size: 0.65rem;
          text-align: center;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.45;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .flip-hint-icon {
          display: inline-block;
          animation: flipHintPulse 2s ease-in-out infinite;
        }

        @keyframes flipHintPulse {
          0%, 100% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .flip-card {
            transition: none;
          }
          .flip-hint-icon {
            animation: none;
          }
        }

        /* ── Back face ── */
        .back-container {
          width: 100%;
          height: 100%;
          background: #f0ede6;
          border-radius: 6px;
          box-shadow:
            0 2px 12px rgba(0, 0, 0, 0.15),
            0 8px 30px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 20px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        .back-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #FFD700, #f97028, #FFD700);
        }

        .back-container::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #FFD700, #f97028, #FFD700);
        }

        .back-logo {
          width: 60px;
          height: 48px;
          object-fit: contain;
          margin-bottom: 12px;
          background: #1a1a1a;
          border-radius: 10px;
          padding: 8px 12px;
        }

        .back-title {
          font-family: 'Caprasimo', sans-serif;
          font-size: 0.75rem;
          color: #f97028;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 14px;
        }

        .back-description {
          color: #1a1a1a;
          font-size: 0.95rem;
          line-height: 1.6;
          text-align: center;
          font-weight: 500;
          font-family: 'Inter', 'Caprasimo', sans-serif;
          letter-spacing: 0.005em;
          width: 100%;
        }

        .back-value-badge {
          margin-top: 16px;
          padding: 8px 22px;
          background: #1a1a1a;
          border-radius: 20px;
          font-family: 'Caprasimo', sans-serif;
          font-size: 1.15rem;
          color: #FFD700;
          font-weight: 700;
          letter-spacing: 0.02em;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        /* ── Divider line ── */
        .divider-line {
          height: 2px;
          width: 100%;
          background: linear-gradient(90deg, transparent 0%, #FFD700 20%, #FFD700 80%, transparent 100%);
          opacity: 0.7;
        }

        /* ── Responsive adjustments ── */
        @media (max-width: 1024px) {
          .flip-card {
            max-width: 280px;
          }

          .frame-photo-area {
            width: calc(100% - 24px);
            margin-top: 12px;
          }

          .frame-logo-amount {
            padding: 0 18px;
          }

          .sponsor-logo {
            width: 60px;
            height: 50px;
            top: 0;
          }

          .sponsor-logo.logo-xyz {
            top: 10px;
          }

          .frame-caption-area {
            min-height: 56px;
            padding: 10px 18px 12px;
          }

          .back-container {
            padding: 20px 18px;
          }

          .back-description {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 768px) {
          .flip-card {
            max-width: 260px;
          }

          .frame-photo-area {
            width: calc(100% - 22px);
            margin-top: 11px;
          }

          .frame-logo-amount {
            padding: 0 16px;
          }

          .sponsor-logo {
            width: 52px;
            height: 42px;
            top: 0;
          }

          .sponsor-logo.logo-xyz {
            top: 10px;
          }

          .frame-caption-area {
            min-height: 50px;
            padding: 8px 16px 10px;
          }

          .back-container {
            padding: 18px 16px;
          }

          .back-description {
            font-size: 0.85rem;
          }

          .sponsor-name-label {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 640px) {
          .flip-card {
            max-width: 240px;
          }

          .frame-photo-area {
            width: calc(100% - 20px);
            margin-top: 10px;
          }

          .frame-logo-amount {
            padding: 0 14px;
          }

          .sponsor-logo {
            width: 45px;
            height: 38px;
            top: 0;
          }

          .sponsor-logo.logo-xyz {
            top: 8px;
          }

          .frame-caption-area {
            min-height: 46px;
            padding: 8px 14px 10px;
          }

          .back-container {
            padding: 16px 14px;
          }

          .back-description {
            font-size: 0.8rem;
            line-height: 1.5;
          }

          .sponsor-name-label {
            font-size: 0.88rem;
          }
        }
      `}</style>

      {/* Divider Line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="divider-line mb-16 md:mb-20 mx-auto max-w-4xl"
      />

      {/* Sponsor Rewards Title */}
      <div className="text-center mb-12">
        {/* Decorative top line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="mx-auto mb-5 h-[3px] w-24 md:w-32 bg-[#1a1a1a]"
        />

        <motion.h2
          initial={{ opacity: 0, y: 40, letterSpacing: "0.4em" }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: "0.05em" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-display text-white uppercase mb-3 drop-shadow-lg"
          style={{
            fontSize: 'clamp(2.3rem, 6vw, 4rem)',
            lineHeight: 1,
          }}
        >
          SPONSOR REWARD
        </motion.h2>
      </div>

      {/* Grid Layout */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto px-4 sm:px-6 md:px-8"
      >
        {sponsorRewards.map((sponsor, index) => {
          const entranceVariants = [
            {
              initial: { opacity: 0, x: -60, scale: 0.95 },
              mobileInitial: { opacity: 0, x: -35, scale: 0.95 },
              delay: 0,
            },
            {
              initial: { opacity: 0, y: 40, scale: 0.95 },
              mobileInitial: { opacity: 0, y: 30, scale: 0.95 },
              delay: 0.25,
            },
            {
              initial: { opacity: 0, x: 60, scale: 0.95 },
              mobileInitial: { opacity: 0, x: 35, scale: 0.95 },
              delay: 0.5,
            },
            {
              initial: { opacity: 0, x: 80, scale: 0.95 },
              mobileInitial: { opacity: 0, x: 40, scale: 0.95 },
              delay: 0.65,
            },
          ];

          const variant = entranceVariants[index] || entranceVariants[1];
          const initialState = isMobileView ? variant.mobileInitial : variant.initial;
          const isFlipped = flippedCards[sponsor.name] || false;

          return (
            <motion.div
              key={sponsor.name}
              initial={initialState}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: variant.delay,
              }}
              className="flex justify-center flip-perspective"
            >
              <div
                className={`flip-card ${isFlipped ? 'flipped' : ''}`}
                role="button"
                tabIndex={0}
                aria-pressed={isFlipped}
                aria-label={`Flip ${sponsor.name} reward details`}
                onClick={() => toggleFlip(sponsor.name)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFlip(sponsor.name);
                  }
                }}
              >
                {/* ═══════ FRONT FACE ═══════ */}
                <div className="flip-face flip-front">
                  <div className="frame-container">
                    <div className="frame-photo-area">
                      <div className="frame-logo-amount">
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className={`sponsor-logo ${sponsor.name === ".xyz" ? "logo-xyz" : ""}`}
                          loading="lazy"
                          style={{
                            width:
                              sponsor.name === "n8n"
                                ? "110px"
                                : sponsor.name === "Codecrafters"
                                  ? "135px"
                                  : sponsor.name === "Render"
                                    ? "110px"
                                    : undefined,
                            height:
                              sponsor.name === "n8n"
                                ? "88px"
                                : sponsor.name === "Codecrafters"
                                  ? "108px"
                                  : sponsor.name === "Render"
                                    ? "88px"
                                    : undefined,
                          }}
                        />
                        <div className="sponsor-reward-value">
                          {sponsor.rewardValue}
                        </div>
                      </div>
                    </div>

                    {/* Caption: sponsor name + flip hint */}
                    <div className="frame-caption-area">
                      <span className="sponsor-name-label">{sponsor.name}</span>
                      <span className="flip-hint">
                        <span className="flip-hint-icon">↻</span> Flip for details
                      </span>
                    </div>
                  </div>
                </div>

                {/* ═══════ BACK FACE ═══════ */}
                <div className="flip-face flip-back">
                  <div className="back-container">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="back-logo"
                      loading="lazy"
                    />
                    <span className="back-title">Reward Details</span>
                    <div className="back-description">
                      {sponsor.description}
                    </div>
                    <div className="back-value-badge">
                      {sponsor.rewardValue}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SponsorRewards;
