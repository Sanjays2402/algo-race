# ⚡ Algo Race

> *Sorting algorithms. Head to head. No mercy.*

Watch sorting algorithms compete in real-time with animated bar chart visualizations. Pick two, hit start, and see which one finishes first.

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## 🏁 Features

- **6 Sorting Algorithms** — Bubble, Selection, Insertion, Merge, Quick, and Heap sort
- **Head-to-Head Racing** — Pick any two algorithms and watch them compete on the same dataset
- **Animated Visualization** — Step-by-step bar chart with color-coded operations
  - 🟡 Yellow = comparing
  - 🔴 Red = swapping
  - 🟢 Green = sorted
- **Speed Control** — Slow, Medium, Fast, or Instant
- **Array Size Slider** — 10 to 200 elements
- **Live Stats** — Comparisons, swaps, step count, and elapsed time
- **Complexity Info** — Time and space complexity displayed per algorithm
- **Winner Announcement** — Confetti explosion + glowing banner for the winner
- **Pause/Resume** — Freeze the race mid-sort to inspect state

## 🎨 Design

Dark cyberpunk theme with neon glowing accents, monospace typography, scanline overlays, and a grid background. Competitive gaming aesthetic — not your boring academic visualizer.

## 🛠 Tech Stack

| Tech | Version |
|------|---------|
| React | 19 |
| Vite | 8 |
| Tailwind CSS | 4 |
| Framer Motion | 12 |
| canvas-confetti | 1.9 |

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/Sanjays2402/algo-race.git
cd algo-race

# Install
npm install

# Dev server
npm run dev

# Build
npm run build
```

## 📂 Project Structure

```
src/
├── algorithms/
│   └── sorting.js        # Generator-based sorting implementations
├── components/
│   ├── Controls.jsx       # Algorithm pickers, speed, array size
│   ├── Header.jsx         # Title with neon glow
│   ├── Legend.jsx          # Color coding legend
│   ├── StatsPanel.jsx     # Live comparison/swap/time stats
│   ├── Visualizer.jsx     # Animated bar chart
│   └── WinnerBanner.jsx   # Confetti + winner announcement
├── hooks/
│   └── useRace.js         # Core race engine hook
├── utils/
│   └── helpers.js         # Array generation, formatting
├── App.jsx
├── index.css              # Tailwind + custom neon styles
└── main.jsx
```

## 📜 License

MIT
