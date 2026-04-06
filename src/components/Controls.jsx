import { useState } from 'react'
import { ALGORITHMS } from '../algorithms/sorting'
import { isSoundEnabled, setSoundEnabled } from '../utils/sound'

const algoKeys = Object.keys(ALGORITHMS)

export default function Controls({
  algo1Key, setAlgo1Key,
  algo2Key, setAlgo2Key,
  algo3Key, setAlgo3Key,
  arraySize, setArraySize,
  arrayType, setArrayType,
  customArrayInput, setCustomArrayInput,
  speed, changeSpeed,
  isRacing, isPaused,
  startRace, stopRace, togglePause,
}) {
  const speeds = ['slow', 'medium', 'fast', 'instant']
  const arrayTypes = [
    { key: 'random', label: 'Random' },
    { key: 'sorted', label: 'Sorted' },
    { key: 'reversed', label: 'Reversed' },
    { key: 'nearly-sorted', label: 'Nearly Sorted' },
    { key: 'custom', label: 'Custom' },
  ]
  const [soundOn, setSoundOn] = useState(isSoundEnabled())

  const toggleSound = () => {
    const next = !soundOn
    setSoundOn(next)
    setSoundEnabled(next)
  }

  const playerLabels = ['Player 1', 'Player 2', 'Player 3']

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Algorithm selectors */}
      <div className="flex flex-wrap gap-4 justify-center items-end">
        {/* Player 1 */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-widest text-text-muted">{playerLabels[0]}</label>
          <select
            value={algo1Key}
            onChange={e => setAlgo1Key(e.target.value)}
            disabled={isRacing}
            className="bg-bg-card rounded-md px-3 py-2 text-sm font-mono focus:outline-none disabled:opacity-50 cursor-pointer"
            style={{ minWidth: '160px', color: 'var(--color-neon-cyan)', borderColor: 'rgba(0,240,255,0.3)', border: '1px solid rgba(0,240,255,0.3)' }}
          >
            {algoKeys.map(k => (
              <option key={k} value={k}>{ALGORITHMS[k].name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end pb-2 text-2xl font-bold text-text-muted">⚔️</div>

        {/* Player 2 */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-widest text-text-muted">{playerLabels[1]}</label>
          <select
            value={algo2Key}
            onChange={e => setAlgo2Key(e.target.value)}
            disabled={isRacing}
            className="bg-bg-card rounded-md px-3 py-2 text-sm font-mono focus:outline-none disabled:opacity-50 cursor-pointer"
            style={{ minWidth: '160px', color: 'var(--color-neon-magenta)', borderColor: 'rgba(255,0,229,0.3)', border: '1px solid rgba(255,0,229,0.3)' }}
          >
            {algoKeys.map(k => (
              <option key={k} value={k}>{ALGORITHMS[k].name}</option>
            ))}
          </select>
        </div>

        {/* Player 3 toggle */}
        {algo3Key ? (
          <>
            <div className="flex items-end pb-2 text-2xl font-bold text-text-muted">⚔️</div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <label className="text-[10px] uppercase tracking-widest text-text-muted">{playerLabels[2]}</label>
                <button
                  onClick={() => setAlgo3Key('')}
                  disabled={isRacing}
                  className="text-[10px] text-neon-red/70 hover:text-neon-red cursor-pointer disabled:opacity-50"
                  title="Remove Player 3"
                >
                  ✕
                </button>
              </div>
              <select
                value={algo3Key}
                onChange={e => setAlgo3Key(e.target.value)}
                disabled={isRacing}
                className="bg-bg-card rounded-md px-3 py-2 text-sm font-mono focus:outline-none disabled:opacity-50 cursor-pointer"
                style={{ minWidth: '160px', color: 'var(--color-neon-green)', borderColor: 'rgba(57,255,20,0.3)', border: '1px solid rgba(57,255,20,0.3)' }}
              >
                {algoKeys.map(k => (
                  <option key={k} value={k}>{ALGORITHMS[k].name}</option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <button
            onClick={() => setAlgo3Key('quick')}
            disabled={isRacing}
            className="px-3 py-2 rounded-md text-xs font-mono uppercase tracking-wider
              bg-bg-card text-neon-green/70 border border-neon-green/20
              hover:border-neon-green/50 hover:text-neon-green
              transition-all duration-200 disabled:opacity-50 cursor-pointer mb-0"
          >
            + Player 3
          </button>
        )}
      </div>

      {/* Array type selector */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="text-[10px] uppercase tracking-widest text-text-muted mr-2">Array</span>
        {arrayTypes.map(t => (
          <button
            key={t.key}
            onClick={() => setArrayType(t.key)}
            disabled={isRacing}
            className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer
              ${arrayType === t.key
                ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50'
                : 'bg-bg-card text-text-secondary border border-border hover:border-text-muted'
              } disabled:opacity-50`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Custom array input */}
      {arrayType === 'custom' && (
        <div className="flex flex-col items-center gap-1">
          <label className="text-[10px] uppercase tracking-widest text-text-muted">
            Values (comma or space separated, min 4)
          </label>
          <input
            type="text"
            value={customArrayInput}
            onChange={e => setCustomArrayInput(e.target.value)}
            disabled={isRacing}
            placeholder="e.g. 50, 20, 80, 10, 60, 30"
            className="w-80 max-w-full bg-bg-card border border-border rounded-md px-3 py-2 text-sm font-mono text-text-primary
              focus:outline-none focus:border-neon-cyan placeholder:text-text-muted/50 disabled:opacity-50"
          />
        </div>
      )}

      {/* Array size slider (not shown for custom) */}
      {arrayType !== 'custom' && (
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
      )}

      {/* Speed controls + Sound toggle */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="text-[10px] uppercase tracking-widest text-text-muted mr-2">Speed</span>
        {speeds.map(s => (
          <button
            key={s}
            onClick={() => changeSpeed(s)}
            className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer
              ${speed === s
                ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/50'
                : 'bg-bg-card text-text-secondary border border-border hover:border-text-muted'
              }`}
          >
            {s}
          </button>
        ))}

        <div className="w-px h-6 bg-border mx-2" />

        <button
          onClick={toggleSound}
          className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer
            ${soundOn
              ? 'bg-neon-yellow/20 text-neon-yellow border border-neon-yellow/50'
              : 'bg-bg-card text-text-muted border border-border hover:border-text-muted'
            }`}
          title={soundOn ? 'Sound On' : 'Sound Off'}
        >
          {soundOn ? '🔊 Sound' : '🔇 Sound'}
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3">
        {!isRacing ? (
          <button
            onClick={startRace}
            className="group relative px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-widest cursor-pointer
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
              className={`px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all duration-200 cursor-pointer
                border ${isPaused
                  ? 'bg-neon-yellow/20 border-neon-yellow/50 text-neon-yellow hover:bg-neon-yellow/30'
                  : 'bg-bg-card border-border text-text-secondary hover:border-text-muted'
                }`}
            >
              {isPaused ? '▶ Resume' : '⏸ Pause'}
            </button>
            <button
              onClick={stopRace}
              className="px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest cursor-pointer
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
