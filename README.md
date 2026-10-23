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

## Terms & Disclaimer

By using this project you agree to the following.

- **No warranty.** This software is provided "as is", without warranty of any kind, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.
- **No liability.** To the maximum extent permitted by law, the author and contributors are not liable for any claim, loss, or damage (direct, indirect, incidental, or consequential, including lost data or profits) arising from its use.
- **Your responsibility.** You use it at your own risk and are responsible for complying with the laws that apply to you.
- **Game.** Provided for entertainment. Take breaks; it is not designed for people with photosensitive epilepsy, and flashing effects may occur.
- **Third parties.** Names, logos, APIs, and services of others belong to their owners and are used for identification only; no affiliation or endorsement is implied.
- **Your statutory rights.** Nothing here limits rights that cannot be waived by agreement, including under consumer-protection laws in the USA, Canada (including Quebec), and India (Consumer Protection Act, 2019).
- **License.** Use, copying, and distribution are governed by the [LICENSE](LICENSE) file; if anything here conflicts with it, the license controls.

## Content, Assets & Fair Use

- **Original work.** Unless noted otherwise (including below), the code, text, design, and images in this repository were created by the author.
- **Libraries, fonts, and icons.** Third-party libraries, fonts (for example Google Fonts), and icon sets belong to their creators and are used under their own licenses; see the dependency manifests and each source for terms.
- **Logos, brands, and screenshots.** Third-party names, logos, and screenshots appear only to identify or describe their products (nominative use). They remain the property of their owners and do not imply affiliation or endorsement.
- **Ideas and inspiration.** Where this project is inspired by another product, game, or idea, it is an independent implementation. It borrows only general ideas, mechanics, or styles, which are not anyone's exclusive property, and is meant to contain no third-party code or artwork used without permission.
- **Fair use and fair dealing.** Any third-party material is used in limited ways for purposes such as education, research, review, commentary, or identification, relying on fair use in the USA (17 U.S.C. § 107), fair dealing in Canada (Copyright Act, ss. 29–29.2), and fair dealing in India (Copyright Act, 1957, s. 52), where they apply.
- **Concerns and takedown requests.** If you own rights in something here and believe it is used improperly, [open an issue](https://github.com/Sanjays2402/algo-race/issues) or contact the author through their GitHub profile with a link to the material and your claim. It will be reviewed promptly and credited, changed, or removed as appropriate. You may also use GitHub's DMCA process.
- **Contributions.** By contributing, you confirm you have the right to submit your contribution and agree it is licensed under this repository's license.
- **Website.** The project site has its own [Terms](https://sanjays2402.github.io/algo-race/terms.html) and [Fair Use](https://sanjays2402.github.io/algo-race/fair-use.html) pages.
