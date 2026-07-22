# Horizon Design System & Landing Page Template Guide

Welcome to the **Horizon Design System**. This guide provides an in-depth, vivid breakdown of the design philosophy, user interface layers, component architecture, and the complete landing page structure powering the `horizon-page` project.

---

## 📐 Design Philosophy

Horizon combines **Controlled Tension**, **Editorial Minimalism**, and **High-Contrast Dark Aesthetics** to deliver a premium, experimental web experience.

Key design principles include:
1. **Monochrome + Electric Accent Palette**: A deep, neutral background paired with crisp high-contrast text and a striking electric orange highlight (`oklch(0.7 0.2 45)`).
2. **Brutalist Typography Hierarchy**: The bold, condensed sans-serif [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) dominates display headings, paired with technical and precise IBM Plex Mono/Sans sub-elements.
3. **Controlled Noise & Texture**: Real-time canvas-rendered animations and SVG overlays add organic grain, softening the digital screen space.
4. **Haptic & Sound Design**: Tactile engagement through synthesized Web Audio click events and native vibration triggers.

---

## 🎨 Theme & Styling System

The project uses Tailwind CSS v4 variables defined in [globals.css](file:///c:/Projects-School/horizon-page/src/app/globals.css) inside `src/app/globals.css`.

### Core Color Variables (OKLCH Color Space)
*   **Background**: `oklch(0.08 0 0)` (Near-black)
*   **Foreground**: `oklch(0.95 0 0)` (Near-white)
*   **Accent Color**: `oklch(0.7 0.2 45)` (Electric orange highlight)
*   **Card Background**: `oklch(0.12 0 0)` (Slightly lighter black for card elements)
*   **Border Color**: `oklch(0.25 0 0)` (Subtle grey borders)
*   **Grid Background Pattern (`.grid-bg`)**: A fixed grid background measuring `60px` by `60px` with lines shaded at `oklch(0.2 0 0)` to enforce alignment structure.

### Typography Tokens
*   **Font Display / Headers**: Bebas Neue (`--font-display`)
*   **Font Sans**: IBM Plex Sans (`--font-sans`)
*   **Font Mono**: IBM Plex Mono (`--font-mono`)

---

## 🧭 Page Architecture (`src/app/page.tsx`)

The landing page template is implemented in [page.tsx](file:///c:/Projects-School/horizon-page/src/app/page.tsx) and features a single-page scrolling structure wrapped in a layout overlay.

```
┌─────────────────────────────────────────────────────────────┐
│                       [ SideNav ]                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [ HeroSection ]                                            │
│    - Split-Flap "INTERFACE" text + sound toggle             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [ SignalsSection ]                                         │
│    - Horizontal paper-texture issue scroll cards             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [ WorkSection ]                                            │
│    - Asymmetric portfolio work grid with hover reveals      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [ PrinciplesSection ]                                      │
│    - Vertical scrolling highlights with parallax reveal     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [ ColophonSection ]                                        │
│    - Structured credits and footer information             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

1.  **Global Layering**: A fixed `.grid-bg` overlay is positioned in the background (`z-0`) with `30%` opacity. The main content sections scroll above this layout inside a relative `z-10` container.
2.  **Navigation System**: The vertical floating navigation [side-nav.tsx](file:///c:/Projects-School/horizon-page/src/components/side-nav.tsx) monitors scroll progression, automatically highlighting the current active section.

---

## 📦 Component Library Breakdown

Here is a detail of each custom component:

### 1. Hero & Header Components

#### 🎰 Split-Flap Text (`split-flap-text.tsx`)
*   **Location**: [split-flap-text.tsx](file:///c:/Projects-School/horizon-page/src/components/split-flap-text.tsx)
*   **Function**: Animates characters like a classic mechanical split-flap train board on load or hover.
*   **Interaction Design**:
    *   Uses **Web Audio API** oscillators (`ctx.createOscillator()`) to synthesize dynamic mechanical click sounds synchronized with flips.
    *   Triggers device-native haptic feedback (`navigator.vibrate(10)`).
    *   Features a persistent context audio provider and custom toggle icon component (`SplitFlapMuteToggle`).

#### 🏷️ Scramble Text (`scramble-text.tsx`)
*   **Location**: [scramble-text.tsx](file:///c:/Projects-School/horizon-page/src/components/scramble-text.tsx)
*   **Function**: Cycles characters through a randomized glyph set (`!@#$%^&*()_+-=<>?/\[]{}Xx`) before locking onto the final text.
*   **Variants**:
    *   `ScrambleText`: Auto-fires once when the component mounts.
    *   `ScrambleTextOnHover`: Triggers dynamically when the user hovers over the element.

---

### 2. Canvas & Visual Texture Components

#### 📺 Animated Noise (`animated-noise.tsx`)
*   **Location**: [animated-noise.tsx](file:///c:/Projects-School/horizon-page/src/components/animated-noise.tsx)
*   **Function**: A canvas overlay that generates randomized noise patterns in real-time.
*   **Implementation**: Updates every two animation frames using requestAnimationFrame for smooth styling without degrading GPU performance.

#### 📐 Bitmap Chevron (`bitmap-chevron.tsx`)
*   **Location**: [bitmap-chevron.tsx](file:///c:/Projects-School/horizon-page/src/components/bitmap-chevron.tsx)
*   **Function**: SVG icon that displays a sharp, retro bitmap-style arrow chevron. Used to direct user focus to interactive calls to action.

---

### 3. Layout & Section Components

#### 🗞️ Signals Section (`signals-section.tsx`)
*   **Location**: [signals-section.tsx](file:///c:/Projects-School/horizon-page/src/components/signals-section.tsx)
*   **Function**: Horizontal horizontal scroll layout displaying news issues/cards.
*   **Design Details**:
    *   **Editorial Styles**: Paper texture borders, issue numbering (`No. 01`), and torn top-edges.
    *   **Interactive Folds**: A bottom-right corner fold simulation implemented using CSS clip/translate parameters.
    *   **Custom cursor**: GSAP-animated floating orange tracker that follows mouse movement across the section boundary.

#### 🖼️ Work Section (`work-section.tsx`)
*   **Location**: [work-section.tsx](file:///c:/Projects-School/horizon-page/src/components/work-section.tsx)
*   **Function**: Displays experimental works in an asymmetric grid template layout.
*   **Design Details**:
    *   Uses irregular grid spans (`col-span-2 row-span-2`, `col-span-1 row-span-2`, etc.) to create asymmetrical balance.
    *   Includes micro-interactive details: hover reveals text descriptions, shifts background layers from transparent to `accent/5`, and triggers border outline transitions.

#### 📜 Principles Section (`principles-section.tsx`)
*   **Location**: [principles-section.tsx](file:///c:/Projects-School/horizon-page/src/components/principles-section.tsx)
*   **Function**: Highlights core design principles with dynamic staggered slide animations.
*   **Highlight Mechanism**: Uses [highlight-text.tsx](file:///c:/Projects-School/horizon-page/src/components/highlight-text.tsx) which scrolls a colored accent background behind words while swapping text foreground to contrast color black.
