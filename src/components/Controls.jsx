import { ALGORITHMS } from '../algorithms/sorting'

const algoKeys = Object.keys(ALGORITHMS)

export default function Controls({
  algo1Key, setAlgo1Key,
  algo2Key, setAlgo2Key,
  arraySize, setArraySize,
  speed, changeSpeed,
  isRacing, isPaused,
  startRace, stopRace, togglePause,
}) {
  const speeds = ['slow', 'medium', 'fast', 'instant']

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Algorithm selectors */}
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-widest text-text-muted">Player 1</label>
          <select
            value={algo1Key}
            onChange={e => setAlgo1Key(e.target.value)}
            disabled={isRacing}
            className="bg-bg-card border border-neon-cyan/30 text-neon-cyan rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:border-neon-cyan disabled:opacity-50 cursor-pointer"
            style={{ minWidth: '180px' }}
          >
            {algoKeys.map(k => (
              <option key={k} value={k}>{ALGORITHMS[k].name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end pb-2 text-2xl font-bold text-text-muted">
          ⚔️
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-widest text-text-muted">Player 2</label>
          <select
            value={algo2Key}
            onChange={e => setAlgo2Key(e.target.value)}
            disabled={isRacing}
            className="bg-bg-card border border-neon-magenta/30 text-neon-magenta rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:border-neon-magenta disabled:opacity-50 cursor-pointer"
            style={{ minWidth: '180px' }}
          >
            {algoKeys.map(k => (
              <option key={k} value={k}>{ALGORITHMS[k].name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Array size slider */}
      <div className="flex flex-col items-center gap-1">
        <label className="text-[10px] uppercase tracking-widest text-text-muted">
          Array Size: <span className="text-text-primary">{arraySize}</span>
        </label>
        <input
          type="range"
          min={10}
          max={200}
          value={arraySize}
          onChange={e => setArraySize(Number(e.target.value))}
          disabled={isRacing}
          className="w-64 accent-neon-cyan"
        />
      </div>

      {/* Speed controls */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-[10px] uppercase tracking-widest text-text-muted mr-2">Speed</span>
        {speeds.map(s => (
          <button
            key={s}
            onClick={() => changeSpeed(s)}
            className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all duration-200
              ${speed === s
                ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/50'
                : 'bg-bg-card text-text-secondary border border-border hover:border-text-muted'
              }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3">
        {!isRacing ? (
          <button
            onClick={startRace}
            className="group relative px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-widest
              bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20
              border border-neon-cyan/50
              text-neon-cyan
              hover:from-neon-cyan/30 hover:to-neon-magenta/30
              hover:border-neon-cyan
              transition-all duration-300
              hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
            <span className="relative z-10">🏁 Start Race</span>
          </button>
        ) : (
          <>
            <button
              onClick={togglePause}
              className={`px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all duration-200
                border ${isPaused
                  ? 'bg-neon-yellow/20 border-neon-yellow/50 text-neon-yellow hover:bg-neon-yellow/30'
                  : 'bg-bg-card border-border text-text-secondary hover:border-text-muted'
                }`}
            >
              {isPaused ? '▶ Resume' : '⏸ Pause'}
            </button>
            <button
              onClick={stopRace}
              className="px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest
                bg-neon-red/20 border border-neon-red/50 text-neon-red
                hover:bg-neon-red/30 transition-all duration-200"
            >
              ⏹ Stop
            </button>
          </>
        )}
      </div>
    </div>
  )
}
