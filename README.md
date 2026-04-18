# 🚀 DEVHACK 3.0

![pipeline](https://gitlab.com/ManaviP/dev3.0/-/badges/main/pipeline.svg)

> **Current Version: `v3.0.4`** — Released 2026-04-05

A high-fidelity, interactive 24hr National Hackathon website for **DevHack 3.0** by Dayananda Sagar University. Features a retro-brutalist aesthetic, cinematic transitions, and smooth scroll-linked interactions.

![DEVHACK 3.0 Banner](/logos/logoo%205.png)

-
## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React + TypeScript | `19.2.4` / `~5.9.3` |
| Build Tool | Vite | `^8.0.1` |
| Animation | Framer Motion | `^12.38.0` |
| Animation | GSAP | `^3.14.2` |
| Styling | Tailwind CSS | `v4.2.2` |
| Smooth Scroll | Lenis | `^1.3.21` |
| 3D Engine | Three.js + R3F | `^0.183.2` / `^9.5.0` |

---

## 🚀 Getting Started


### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ManaviP/dev3.0.git
cd dev3.0

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## 📂 Project Structure

```text
devhack/
├── public/
│   ├── assets/          # Decorative stickers (robot, laptop, lightbulb, logos)
│   └── logos/           # Brand logo variants (logoo 1–9)
├── src/
│   ├── components/      # Hero, Marquee, Themes, Speakers, WhyJoin, BookScrollSection
│   ├── sections/        # About, Navbar (legacy), FAQ, Footer, Timeline
│   ├── assets/
│   │   └── fonts/       # Wonderful Snowflake.otf
│   ├── App.tsx          # Root — Navbar, loading screen, warp transition, Lenis
│   ├── index.css        # Global styles, Tailwind v4 theme, all keyframe animations
│   └── main.tsx         # Entry point
├── package.json
└── vite.config.ts
```

---

## 📜 License

Distributed under the MIT License.

---

Built with ❤️ for **DevHack 3.0** · Dayananda Sagar University, Bangalore
