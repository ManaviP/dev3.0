# 🚀 DEVHACK 3.0

> **Current Version: `v3.0.4`** — Released 2026-04-05

A high-fidelity, interactive 24hr National Hackathon website for **DevHack 3.0** by Dayananda Sagar University. Features a retro-brutalist aesthetic, cinematic transitions, and smooth scroll-linked interactions.

![DEVHACK 3.0 Banner](/logos/logoo%205.png)

---

## 🏷️ Version History

| Version | Date | Description |
|---------|------|-------------|
| **v3.0.4** | 2026-04-05 | Integrated new brutalist Navbar with Marquee embedded inside; added nav-click warp transition overlay; reordered sections (About → Themes); fixed `logoo 5.png` logo in navbar; Lenis smoothTouch deprecation fix |
| **v3.0.3** | 2026-04-05 | Fixed marquee hidden-behind-navbar bug — Marquee is now part of the fixed Navbar; Hero top padding updated to clear combined header height |
| **v3.0.2** | 2026-04-05 | Replaced plain-text DEVHACK brand in navbar with `logoo 5.png` image logo |
| **v3.0.1** | 2026-04-05 | Resolved Timeline / WhyJoin section overlap; fixed Framer Motion build errors; stabilized parallax wrapper |
| **v3.0.0** | 2026-04-03 | Initial release — Hero sunburst, About 3D coverflow, Themes, Speakers, FAQ, Footer wave canvas, loading screen animation |

---

## ✨ Key Features (v3.0.4)

- **🟠 Persistent Marquee Bar**: Orange "EARLY BIRD TICKETS ON SALE NOW!" ticker pinned at the very top, part of the fixed header stack.
- **🖼️ Image Logo in Navbar**: Brand logo (`logoo 5.png`) replaces plain text for a polished, on-brand header.
- **🌀 Nav-Click Warp Transition**: Clicking any nav link triggers a full-screen orange overlay with bouncing logo before smooth-scrolling to the target section.
- **📺 3D Coverflow About Section**: Scroll-linked 3D carousel powered by Framer Motion — cards tilt, recede and fan in 3D space.
- **🎨 Retro-Brutalist Aesthetic**: Custom "Wonderful Snowflake" display font, high-contrast palette (`#1a1a1a`, `#f3ecd2`, `#f97028`), thick borders and drop-shadows.
- **⚡ Performance First**: Vite 8 + React 19 — near-instant HMR and optimised production bundle.
- **🔄 Lenis Smooth Scroll**: Physics-based smooth scrolling across all sections.
- **📱 Fully Responsive**: Fluid `clamp()`-based typography and layouts from mobile to 4K.

---

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

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9+

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
