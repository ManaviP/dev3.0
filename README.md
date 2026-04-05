# 🚀 DEVHACK 3.0

A high-fidelity, interactive 24hr National Hackathon website designed for **DevHack 3.0**. This project features a unique retro-brutalist aesthetic, cinematic transitions, and custom 3D interactions.

![DEVHACK 3.0 Banner](/logos/logoo%205.png)

## ✨ Key Features

- **📺 3D Coverflow About Section**: A persistent, scroll-linked 3D carousel powered by Framer Motion. Cards tilt, recede, and fan out in 3D space as you navigate.
- **🌀 Cinematic "Warping" Transitions**: Custom navigation logic that triggers a high-energy "Warping" loader before smoothly scrolling to the target section.
- **🎨 Retro-Brutalist Aesthetic**: Custom "Wonderful Snowflake" display typography combined with a vibrant, high-contrast color palette (`#1a1a1a`, `#f3ecd2`, `#f97028`).
- **⚡ Performance First**: Built with Vite and React for near-instant load times and optimized HMR.
- **📱 Fully Responsive**: Tailored layouts for everything from mobile devices to large desktop monitors.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **3D Engine**: [Three.js](https://threejs.org/) (Custom 2.5D/3D implementations)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/BeeXD/devhack.git
   cd devhack
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

```text
├── public/                # Static assets (logos, favicon)
│   ├── assets/            # Decorative stickers and badges
│   └── logos/             # Branding assets
├── src/
│   ├── components/        # UI Components (Hero, About, FAQ, etc.)
│   ├── assets/            # Local assets (Fonts)
│   ├── App.tsx            # Main Application logic & Transitions
│   ├── index.css          # Global styles & Tailwind theme
│   └── main.tsx           # Entry point
└── package.json           # Scripts and dependencies
```

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ❤️ for **DevHack 3.0**
