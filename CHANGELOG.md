# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Added `.no-scrollbar` utility class in `src/index.css` to enable smooth horizontal scrolling without visible scrollbars for mobile tab navigation.
- Added `Fredoka` font (a modern groovy font) to replace the previous display font on Theme card titles.
- Added a "Team Members" toggle button with a spring-animated chevron that smoothly reveals the "Operating Partners" grid underneath the "Sub Heads" section.

### Changed
- **Themes Section**:
  - Overhauled interaction: Replaced "click-to-view" modal system with an inline smooth dropdown (hover on desktop, tap on mobile/tablet).
  - Cleaned up titles: Removed legacy "2026", "Theme XX" numbering labels.
  - Renamed "IOT & Smart Cities" theme to **"IOT & Sustainability"** and updated tags (added GreenTech).
  - Renamed "Web3 / Sustain" theme to **"Blockchain & Fintech"** with an updated description, updated emoji to `🔗`, and tags to `Smart Contracts`, `DeFi`, `Fintech`, `Crypto`.
  - Updated card titles font-weight to `normal` (400) mapping to the `Fredoka` groovy font design.
- **Team Section Header**: Replaced the slide-in (`x: ±300`) animation with a bulletproof fade-up (`y: 30 → 0`) animation to prevent the "Meet The Team" heading from clipping completely off-screen on constrained mobile displays due to `overflow-hidden`.
- **Team Section Layout**: Integrated proper CSS grid configuration (`grid-cols-2` mobile, `grid-cols-3` tablet, `grid-cols-4` desktop) over the previous fixed-width wrapping implementation.
- **Team Section Responsiveness**:
  - Adjusted container to `w-[92%]` on tablet and correctly incremented padding (`px-5`, `px-6`) so the retro shadow offsets (`10px_10px`, `16px_16px`) no longer clip via the responsive bounds.
  - Sub-headings now safely `clamp` sizing alongside smaller card text metrics to avoid horizontal scrollbar lock.
  - Active Tab Button CSS explicitly utilizes inline style coloring (`#f3ecd2`) overriding systemic tailwind specificity cascading rendering the default black rectangle bug.

### Removed
- Removed the standalone "Operating Partners" tab grouping, integrating it as a sub-collapse element under "Sub Heads".
- Removed hardcoded margins and large scale fonts causing overflow clipping from mobile versions (e.g., swapped `text-6xl` to `clamp(2rem, 7vw, 6rem)`).
