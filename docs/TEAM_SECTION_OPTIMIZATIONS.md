# Team Section Performance Optimizations

## Overview
This document outlines the performance optimizations applied to the `Team.tsx` section to improve the frame rate (FPS), eliminate "choppiness," and enhance the overall mobile experience.

## Key Changes Made

### 1. Replaced Framer Motion with CSS Transitions
- **Previous Approach:** Cards used `framer-motion` (`motion.div`) with `whileHover` (for scale and `y` translation) and `whileInView` animations. This meant React state and Framer Motion's animation engine tracked the position and hover state of 40+ cards simultaneously.
- **Optimized Approach:** Replaced `motion.div` with a standard `div` and replaced JS-driven animations with lightweight, GPU-accelerated Tailwind CSS classes (`hover:-translate-y-1.5`, `transition-all`, `duration-300`).
- **Impact:** Eliminates JavaScript overhead and layout thrashing, relying completely on the browser's native compositing engine.

### 2. Removed `AnimatePresence` for Tab Switching
- **Previous Approach:** Wrapping the tab sections in `<AnimatePresence mode="wait">` caused heavy React re-mounting, which blocked the main thread as dozens of images and nodes entered or left the DOM.
- **Optimized Approach:** Removed the `AnimatePresence` wrapper for both the main tab selector and the sub-team buttons.
- **Impact:** Switching tabs is now instantaneous.

### 3. Eliminated React State for Hover Effects
- **Previous Approach:** A `useState` hook (`isHovered`) triggered a full card re-render just to change text color from `#1a1a1a` to `#f97028` on hover.
- **Optimized Approach:** Removed the `useState` hook and applied the Tailwind `group-hover:text-[#f97028]` class directly.
- **Impact:** Removes unnecessary React reconciliation cycles when hovering across cards rapidly.

### 4. Removed Expensive Mobile Visuals
- **Previous Approach:** The scanline overlay (`linear-gradient`) and the spinning coin divider (`animate-spin-y`) rendered on all devices, taxing the mobile GPU.
- **Optimized Approach:** Added `hidden md:block` to the scanline overlays to disable them on mobile devices, preventing heavy repaint operations while scrolling.

### 5. Improved Text Rendering for Small Screens
- **Previous Approach:** Names were breaking awkwardly in the middle of words (e.g., "HEMACHANDR A") because of long strings and font sizes on mobile.
- **Optimized Approach:** Fine-tuned `text-[11px]`, `tracking-tighter`, and reduced padding in the Team Card on mobile to comfortably fit longer names within the 2-column layout.

### 6. Image Loading Enhancements
- **Change:** Appended `loading="lazy"` and `decoding="async"` to the `<img>` tags.
- **Impact:** Prevents the browser from blocking the main thread while decoding images not currently in the viewport.

## Next Steps: Image Asset Compression (CRITICAL)
While the React code is now optimized for 60fps performance, **several image assets in `/public/logos/` are between 1MB and 2MB** (e.g., `raksha.webp`, `supraj.png`, `moulika.webp`). 

**To fully resolve all remaining scrolling lag:**
1. Compress these images using [Squoosh](https://squoosh.app/) or [TinyPNG](https://tinypng.com/).
2. Keep individual team headshots ideally under **100 KB**.
3. Overwrite the existing files in `/public/logos/`.
