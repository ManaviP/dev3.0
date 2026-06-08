import React from 'react';
import { motion } from 'framer-motion';

interface SponsorReward {
  name: string;
  logo: string;
  rewardValue: string;
  description: string;
}

const SponsorRewards: React.FC = () => {
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
    }
  ];

  return (
    <div className="relative w-full mt-20 md:mt-24">
      <style>{`
        /* ── Card shell ── */
        .sponsor-card {
          position: relative;
          width: 100%;
          max-width: 320px;
          margin: 0 auto;
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
        }

        .sponsor-card:hover {
          transform: translateY(-5px);
        }

        /* ── Polaroid frame built with CSS (no background-image) ── */
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
          width: calc(100% - 28px);   /* 14px padding each side */
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

        /* ── Logo + amount wrapper (fills black area) ── */
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

        /* ── Sponsor logo (pinned to top) ── */
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

        /* ── Reward amount (centered focal point) ── */
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
          transition: filter 0.3s ease;
          line-height: 1.1;
          margin-top: 20px;
          padding: 4px 0;
        }

        .sponsor-card:hover .sponsor-reward-value {
          filter: drop-shadow(0 0 12px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 24px rgba(255, 215, 0, 0.3));
        }

        /* ── Caption area (white zone at bottom) ── */
        .frame-caption-area {
          width: 100%;
          min-height: 80px;
          padding: 14px 16px 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        /* ── Description text ── */
        .sponsor-description {
          color: #1a1a1a;
          font-size: 1.0rem;
          line-height: 1.35;
          text-align: center;
          font-weight: 600;
          font-family: 'Caprasimo', sans-serif;
          letter-spacing: 0.005em;
          width: 100%;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
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
          .sponsor-card {
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
            min-height: 72px;
            padding: 12px 18px 16px;
          }

          .sponsor-description {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 768px) {
          .sponsor-card {
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
            min-height: 66px;
            padding: 10px 16px 14px;
          }

          .sponsor-description {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 640px) {
          .sponsor-card {
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
            min-height: 60px;
            padding: 8px 14px 12px;
          }

          .sponsor-description {
            font-size: 0.85rem;
            line-height: 1.3;
            -webkit-line-clamp: 3;
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mb-12 md:mb-16"
      >
        <h3
          className="font-display text-white uppercase drop-shadow-lg"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1, letterSpacing: '0.05em' }}
        >
          SPONSOR REWARDS
        </h3>
      </motion.div>

      {/* Grid Layout */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto px-4 sm:px-6 md:px-8"
      >
        {sponsorRewards.map((sponsor, index) => {
          // Directional entrance per card position
          const entranceVariants = [
            // Left card: slides in from left
            {
              initial: { opacity: 0, x: -60, scale: 0.95 },
              mobileInitial: { opacity: 0, x: -35, scale: 0.95 },
              delay: 0,
            },
            // Center card: rises from below
            {
              initial: { opacity: 0, y: 40, scale: 0.95 },
              mobileInitial: { opacity: 0, y: 30, scale: 0.95 },
              delay: 0.25,
            },
            // Right card: slides in from right
            {
              initial: { opacity: 0, x: 60, scale: 0.95 },
              mobileInitial: { opacity: 0, x: 35, scale: 0.95 },
              delay: 0.5,
            },
          ];

          const variant = entranceVariants[index] || entranceVariants[1];
          const isMobileView = typeof window !== 'undefined' && window.innerWidth < 768;
          const initialState = isMobileView ? variant.mobileInitial : variant.initial;

          return (
            <motion.div
              key={index}
              initial={initialState}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: variant.delay,
              }}
              className="flex justify-center"
            >
              <div className="sponsor-card">
                <div className="frame-container">
                  {/* ── Photo Area: logo + reward amount, vertically centered ── */}
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
                                : undefined,
                          height:
                            sponsor.name === "n8n"
                              ? "88px"
                              : sponsor.name === "Codecrafters"
                                ? "108px"
                                : undefined,
                        }}
                      />
                      <div className="sponsor-reward-value">
                        {sponsor.rewardValue}
                      </div>
                    </div>
                  </div>

                  {/* ── Caption Area: description text ── */}
                  <div className="frame-caption-area">
                    <p className="sponsor-description">
                      {sponsor.description}
                    </p>
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
