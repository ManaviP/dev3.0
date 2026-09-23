import React from 'react';
import { motion } from 'framer-motion';

const Winners: React.FC = () => {
  const mainPrizes = [
    { award: "Winner", team: "Hackatoons", logo: "/logos/winners/winner.webp", tier: "winner" },
    { award: "1st Runner Up", team: "Team AURA", logo: "/logos/winners/1strun.webp", tier: "runner" },
    { award: "2nd Runner Up", team: "Innovate365", logo: "/logos/winners/2ndrun.webp", tier: "runner" },
  ];

  const appreciationAwards = [
    { award: "Appreciation Award", amount: "₹10K", team: "Neuro Stack", logo: "/logos/winners/neuro.webp" },
    { award: "Appreciation Award", amount: "₹10K", team: "Spoilers", logo: "/logos/winners/spoilers.webp" },
    { award: "Appreciation Award", amount: "₹5K", team: "Arrakis", logo: "/logos/winners/arrakis.webp" },
  ];

  return (
    <section id="winners" className="py-20 px-4 sm:px-10 bg-[#00040D] relative overflow-hidden flex flex-col justify-center min-h-screen rounded-t-[2.5rem] rounded-b-[2.5rem] md:rounded-t-[4rem] md:rounded-b-[4rem] shadow-[0px_-6px_0px_#f97028,0px_6px_0px_#f97028] sm:shadow-[0px_-10px_0px_#f97028,0px_10px_0px_#f97028] z-20">
      <style>{`
        .isometric-bg {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='103.923' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23FBBF24' stroke-width='1.5' stroke-opacity='0.25' fill='none'%3E%3Cpath d='M 0 0 L 103.923 60 M 0 60 L 103.923 0 M 51.9615 0 L 51.9615 60 M 0 0 L 0 60 M 103.923 0 L 103.923 60' /%3E%3C/g%3E%3C/svg%3E");
          background-size: 103.923px 60px;
          mask-image: linear-gradient(to bottom left, black 5%, transparent 60%), linear-gradient(to top right, black 5%, transparent 60%);
          -webkit-mask-image: linear-gradient(to bottom left, black 5%, transparent 60%), linear-gradient(to top right, black 5%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .winners-container {
          position: relative;
          z-index: 10;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* HEADER SECTION */
        .winners-header {
          text-align: center;
          margin-bottom: 80px;
          width: 100%;
        }

        .winners-header::before {
          content: '';
          display: block;
          height: 3px;
          width: 96px;
          background: white;
          margin: 0 auto 32px;
          opacity: 0.8;
        }

        .winners-title {
          font-family: 'Caprasimo', sans-serif;
          font-size: clamp(2.5rem, 7vw, 4.5rem);
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
          line-height: 1;
          drop-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
        }

        .winners-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.9rem, 2.2vw, 1.1rem);
          color: #fbbf24;
          font-weight: 300;
          letter-spacing: 0.02em;
        }

        /* MAIN PRIZES GRID */
        .main-prizes-grid {
          display: grid;
          grid-template-columns: 1fr;
          width: 100%;
          margin-bottom: 100px;
          gap: 32px;
        }

        @media (min-width: 768px) {
          .main-prizes-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }

        @media (min-width: 1024px) {
          .main-prizes-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 48px;
          }

          .award-card:nth-child(1) {
            order: 2;
          }

          .award-card:nth-child(2) {
            order: 1;
          }

          .award-card:nth-child(3) {
            order: 3;
          }

          .appreciation-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
          }
        }

        /* AWARD CARD BASE */
        .award-card {
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(243, 236, 210, 0.05) 100%);
          border: 2px solid rgba(251, 191, 36, 0.35);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
          width: 100%;
        }

        @media (max-width: 767px) {
          .award-card {
            max-width: 100%;
            margin: 0 auto;
          }
        }

        .award-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(251, 191, 36, 0.15);
        }

        /* PHOTO CONTAINER */
        .award-photo-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .award-card.main-prize .award-photo-wrapper {
          aspect-ratio: 16 / 9;
        }

        .award-card.appreciation .award-photo-wrapper {
          aspect-ratio: 16 / 9;
        }

        .award-photo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: brightness(1.2) contrast(1.15);
        }

        /* TEXT SECTION */
        .award-info {
          padding: 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          background: rgba(0, 4, 13, 0.6);
          flex-grow: 0;
          justify-content: center;
        }

        .award-card.main-prize .award-info {
          padding: 18px 20px;
        }

        .award-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: #fbbf24;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .award-card.main-prize .award-label {
          font-size: 0.85rem;
          letter-spacing: 0.15em;
        }

        .award-title {
          font-family: 'Caprasimo', sans-serif;
          font-size: clamp(1rem, 2.8vw, 1.3rem);
          font-weight: 700;
          color: #f3ecd2;
          line-height: 1.2;
        }

        .award-card.main-prize .award-title {
          font-size: clamp(1.1rem, 3.2vw, 1.6rem);
        }

        .award-card.winner .award-label {
          color: #fbbf24;
          font-size: 0.9rem;
        }

        .award-card.winner .award-title {
          color: #fbbf24;
          font-size: clamp(1.2rem, 3.5vw, 1.8rem);
          text-shadow: 0 2px 6px rgba(251, 191, 36, 0.3);
        }

        .award-amount {
          font-family: 'Caprasimo', sans-serif;
          font-size: 1rem;
          color: #fbbf24;
          font-weight: 700;
        }

        /* WINNER CARD STYLING */
        .award-card.winner {
          border: 3px solid #fbbf24;
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(243, 236, 210, 0.08) 100%);
          box-shadow: 0 0 32px rgba(251, 191, 36, 0.25), 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .award-card.winner:hover {
          box-shadow: 0 0 40px rgba(251, 191, 36, 0.35), 0 12px 32px rgba(0, 0, 0, 0.4);
        }

        .award-card.winner .award-photo-wrapper {
          border-bottom: 2px solid rgba(251, 191, 36, 0.4);
        }

        /* RUNNER UP STYLING */
        .award-card.runner {
          border: 1.5px solid rgba(251, 191, 36, 0.3);
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.1), 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .award-card.runner:hover {
          box-shadow: 0 0 28px rgba(251, 191, 36, 0.2), 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        /* APPRECIATION SECTION */
        .appreciation-section {
          width: 100%;
          margin-top: 20px;
        }

        .appreciation-title {
          font-family: 'Caprasimo', sans-serif;
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          font-weight: 700;
          color: #fbbf24;
          text-align: center;
          margin-bottom: 40px;
          letter-spacing: 0.03em;
        }

        .appreciation-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          width: 100%;
        }

        @media (min-width: 768px) {
          .appreciation-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 36px;
          }
        }

        @media (min-width: 1024px) {
          .appreciation-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
          }
        }

        .award-card.appreciation {
          border: 1px solid rgba(251, 191, 36, 0.25);
          box-shadow: 0 0 16px rgba(251, 191, 36, 0.08), 0 2px 12px rgba(0, 0, 0, 0.15);
        }

        .award-card.appreciation:hover {
          border-color: rgba(251, 191, 36, 0.4);
          box-shadow: 0 0 24px rgba(251, 191, 36, 0.15), 0 4px 16px rgba(0, 0, 0, 0.25);
        }

        .award-card.appreciation .award-info {
          padding: 14px 14px;
        }

        .award-card.appreciation .award-label {
          font-size: 0.7rem;
        }

        .award-card.appreciation .award-title {
          font-size: clamp(0.9rem, 2.2vw, 1.1rem);
        }

        /* RESPONSIVE MOBILE */
        @media (max-width: 767px) {
          .winners-header {
            margin-bottom: 60px;
          }

          .main-prizes-grid {
            gap: 24px;
            margin-bottom: 80px;
          }

          .award-card {
            width: 100%;
          }

          .appreciation-grid {
            gap: 24px;
          }

          .award-info {
            padding: 20px 16px;
          }
        }
      `}</style>

      <div className="isometric-bg"></div>

      <div className="winners-container">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="winners-header"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="winners-title"
          >
            Hackathon WINNERS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="winners-subtitle"
          >
            Celebrating the brilliant minds who shaped DEVHACK 3.0
          </motion.p>
        </motion.div>

        {/* MAIN PRIZES */}
        <div className="main-prizes-grid">
          {mainPrizes.map((prize, index) => (
            <motion.div
              key={`main-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{
                duration: 0.7,
                ease: [0.25, 1, 0.5, 1],
                delay: index * 0.1
              }}
              className={`award-card main-prize ${prize.tier}`}
            >
              <div className="award-photo-wrapper">
                <img
                  src={prize.logo}
                  alt={`${prize.team} - ${prize.award}`}
                  className="award-photo-img"
                  loading="lazy"
                  decoding="async"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="award-info">
                <div className="award-label">{prize.award}</div>
                <div className="award-title">{prize.team}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* APPRECIATION AWARDS SECTION */}
        <div className="appreciation-section">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="appreciation-title"
          >
            APPRECIATION AWARDS
          </motion.h3>

          <div className="appreciation-grid">
            {appreciationAwards.map((award, index) => (
              <motion.div
                key={`appreciation-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 1, 0.5, 1],
                  delay: 0.3 + index * 0.1
                }}
                className="award-card appreciation"
              >
                <div className="award-photo-wrapper">
                  <img
                    src={award.logo}
                    alt={`${award.team} - ${award.award}`}
                    className="award-photo-img"
                    loading="lazy"
                    decoding="async"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="award-info">
                  <div className="award-label">{award.award}</div>
                  <div className="award-amount">{award.amount}</div>
                  <div className="award-title">{award.team}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Winners;
