import { ALGORITHMS } from './algorithms/sorting'
import { useRace } from './hooks/useRace'
import Header from './components/Header'
import Controls from './components/Controls'
import Visualizer from './components/Visualizer'
import StatsPanel from './components/StatsPanel'
import WinnerBanner from './components/WinnerBanner'
import Legend from './components/Legend'

export default function App() {
  const race = useRace()

  return (
    <div className="min-h-screen grid-bg scanlines relative">
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <Header />

        <Controls
          algo1Key={race.algo1Key}
          setAlgo1Key={race.setAlgo1Key}
          algo2Key={race.algo2Key}
          setAlgo2Key={race.setAlgo2Key}
          arraySize={race.arraySize}
          setArraySize={race.setArraySize}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {/* Player 1 */}
          <div className="flex flex-col gap-3">
            <div
              className="rounded-xl p-4"
              style={{
                background: 'linear-gradient(135deg, rgba(0,240,255,0.03), rgba(10,10,15,0.5))',
                border: '1px solid rgba(0,240,255,0.15)',
              }}
            >
              <Visualizer
                state={race.state1}
                accentColor={ALGORITHMS[race.algo1Key].color}
                label={ALGORITHMS[race.algo1Key].name}
                arraySize={race.arraySize}
              />
            </div>
            {race.state1 && (
              <StatsPanel
                state={race.state1}
                elapsed={race.elapsed1}
                algoKey={race.algo1Key}
                position="left"
              />
            )}
          </div>

          {/* Player 2 */}
          <div className="flex flex-col gap-3">
            <div
              className="rounded-xl p-4"
              style={{
                background: 'linear-gradient(135deg, rgba(255,0,229,0.03), rgba(10,10,15,0.5))',
                border: '1px solid rgba(255,0,229,0.15)',
              }}
            >
              <Visualizer
                state={race.state2}
                accentColor={ALGORITHMS[race.algo2Key].color}
                label={ALGORITHMS[race.algo2Key].name}
                arraySize={race.arraySize}
              />
            </div>
            {race.state2 && (
              <StatsPanel
                state={race.state2}
                elapsed={race.elapsed2}
                algoKey={race.algo2Key}
                position="right"
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-10 pb-4 text-text-muted text-[10px] tracking-widest uppercase">
          Built with React + Vite + Tailwind + Framer Motion
        </footer>
      </div>
    </div>
  )
}
