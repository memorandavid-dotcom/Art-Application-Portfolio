# Mapúan Academic Art Curator & Exhibition Portfolio

A high-fidelity full-stack curatorial portfolio and interactive museum exhibition platform. This workspace acts as an academic gallery showcasing the developmental progress, masterwork studies, and critical self-evaluations submitted by **David Memorandum** under the guidance of professional studio art critique.

## 🏛️ Platforms & Sectors

The application is structured around 5 interactive thematic sectors:
1. **01 / The Acropolis Museum**: Neoclassical art historical essays, gilded frame portfolios, and visual analysis.
2. **02 / The Expedition**: A chronological developmental timeline documenting raw media notes, physical draft layouts, and material composition strategies.
3. **03 / Academic Reflections**: Curatorial presentations, critical PowerPoint review slides, and self-evaluations of creative impact.
4. **04 / The Chandelier Stage**: An immersive theater stage celebrating the choreography of *Paquita* with real-time curtain toggles, spotlights, and celebration triggers.
5. **05 / Expressive Lab**: An active experimental sandbox enabling students to generate customized medium, application, and palette recipes for complex internal emotional states.

---

## 🛠️ Tech Stack & Architecture

### Backend (`/server.ts`)
The server-side layer is built with **Node.js**, **TypeScript**, and **Express**, serving as a proxy to safeguard API credentials and execute heavy structural tasks:
* **Gemini API Integration (`@google/genai` SDK)**: Drives dual AI capabilities:
  * `/api/critique`: Evaluates custom student submissions against technical art movements, returning structured JSON feedback (grades, suggestions, resonance).
  * `/api/emotion-palette`: Formulates creative therapist color recipes, conceptual painting triggers, and recommended medium guidelines.
* **Vite Development Middleware**: Integrates directly in non-production environments to enable zero-lag client-side live reloading and asset pipelines.
* **esbuild Compilations**: Bundles backend TypeScript files down to highly efficient, standalone CommonJS files inside `/dist` for rapid production launches.

### Client (`/src/`)
* **React 19 & TypeScript**: Provides a robust, type-safe client-side application layer with rigorous component modularity.
* **Tailwind CSS**: Utility-first CSS classes driving distinct aesthetic themes per sector (Slate Dark, Neoclassical Cream, Journey Gold, Minimal Charcoal).
* **Framer Motion**: Smooth entry wipes, card expansions, and structural transitions.
* **Physics Confetti**: A highly optimized, non-blocking GPU-accelerated keyframe animation loop mimicking parabolic air drag on colorful particles.
* **Web Audio Cheering Synthesizer**: A detailed Web Audio API node network recreating realistic crowd whistles and high-Q resonant handclaps as a fallback for browser-blocked `.mp3` files.

---

## 🚀 Commands & Development Guide

Ensure all credentials are standard in your environment variables before running:

### Setup and Dependencies
```bash
# Install package dependencies
npm install
```

### Run Local Development Server
```bash
# Starts Node.js dev server with tsx on http://localhost:3000
npm run dev
```

### Production Build & Deployment
```bash
# Builds the production React SPA and compiles the Express backend via esbuild
npm run build

# Runs compiled standalone Express build
npm start
```

## 📬 API Specifications

### `POST /api/critique`
Critiques a student's custom work submission and grades their reflection under academic art theory.
* **Body**: `{ artTitle, style, material, emotion, notes }`
* **Response**: `{ grade, formalCritique, emotionalResonance, creativeSuggestion, materialsInsight }`

### `POST /api/emotion-palette`
Generates an expressive recipe and conceptual painting prompt corresponding to a user-provided emotion.
* **Body**: `{ emotion }`
* **Response**: `{ recommendedStyle, styleDescription, materials, brushwork, colors: [{ hex, name, meaning }], conceptualPrompt }`
