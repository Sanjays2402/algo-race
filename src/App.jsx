import { useState } from 'react'
import { ALGORITHMS } from './algorithms/sorting'
import { useRace } from './hooks/useRace'
import Header from './components/Header'
import Controls from './components/Controls'
import Visualizer from './components/Visualizer'
import StatsPanel from './components/StatsPanel'
import WinnerBanner from './components/WinnerBanner'
import Legend from './components/Legend'
import AlgoInfoCard from './components/AlgoInfoCard'
import RaceHistory from './components/RaceHistory'

const PLAYER_ACCENTS = [
  { bg: 'rgba(0,240,255,0.03)', border: 'rgba(0,240,255,0.15)' },
  { bg: 'rgba(255,0,229,0.03)', border: 'rgba(255,0,229,0.15)' },
  { bg: 'rgba(57,255,20,0.03)', border: 'rgba(57,255,20,0.15)' },
]

const POSITIONS = ['left', 'right', 'center']

export default function App() {
  const race = useRace()
  const [infoAlgo, setInfoAlgo] = useState(null)

  const has3 = !!race.algo3Key

  const players = [
    { key: race.algo1Key, state: race.state1, elapsed: race.elapsed1 },
    { key: race.algo2Key, state: race.state2, elapsed: race.elapsed2 },
  ]
  if (has3) {
    players.push({ key: race.algo3Key, state: race.state3, elapsed: race.elapsed3 })
  }

  // Grid: 2 cols for 2 players, 3 cols for 3 on desktop. Always stack on mobile.
  const gridClass = has3
    ? 'grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4'
    : 'grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4'

  return (
    <div className="min-h-screen grid-bg scanlines relative">
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <Header />

        <Controls
          algo1Key={race.algo1Key}
          setAlgo1Key={race.setAlgo1Key}
          algo2Key={race.algo2Key}
          setAlgo2Key={race.setAlgo2Key}
          algo3Key={race.algo3Key}
          setAlgo3Key={race.setAlgo3Key}
          arraySize={race.arraySize}
          setArraySize={race.setArraySize}
          arrayType={race.arrayType}
          setArrayType={race.setArrayType}
          customArrayInput={race.customArrayInput}
          setCustomArrayInput={race.setCustomArrayInput}
          speed={race.speed}
          changeSpeed={race.changeSpeed}
          isRacing={race.isRacing}
          isPaused={race.isPaused}
          startRace={race.startRace}
          stopRace={race.stopRace}
          togglePause={race.togglePause}
        />

        <Legend />

        {/* Winner Banner */}
        <div className="flex justify-center my-4">
          <WinnerBanner winner={race.winner} />
        </div>

        {/* Race Visualizers */}
        <div className={gridClass}>
          {players.map((p, i) => (
            <div key={p.key + i} className="flex flex-col gap-3">
              <div
                className="rounded-xl p-4"
                style={{
                  background: `linear-gradient(135deg, ${PLAYER_ACCENTS[i].bg}, rgba(10,10,15,0.5))`,
                  border: `1px solid ${PLAYER_ACCENTS[i].border}`,
                }}
              >
                <Visualizer
                  state={p.state}
                  accentColor={ALGORITHMS[p.key].color}
                  label={ALGORITHMS[p.key].name}
                  onLabelClick={() => setInfoAlgo(ALGORITHMS[p.key])}
                />
              </div>
              {p.state && (
                <StatsPanel
                  state={p.state}
                  elapsed={p.elapsed}
                  algoKey={p.key}
                  position={POSITIONS[i]}
                />
              )}
            </div>
          ))}
        </div>

        {/* Race History */}
        <RaceHistory history={race.raceHistory} />

        {/* Footer */}
        <footer className="text-center mt-10 pb-4 text-text-muted text-[10px] tracking-widest uppercase">
          Built with React + Vite + Tailwind + Framer Motion
        </footer>
      </div>

      {/* Algorithm Info Card Modal */}
      {infoAlgo && (
        <AlgoInfoCard algo={infoAlgo} onClose={() => setInfoAlgo(null)} />
      )}
    </div>
  )
}
