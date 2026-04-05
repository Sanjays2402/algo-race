import { ALGORITHMS } from '../algorithms/sorting'
import { formatTime } from '../utils/helpers'

export default function StatsPanel({ state, elapsed, algoKey, position }) {
  const algo = ALGORITHMS[algoKey]
  if (!state) return null

  const borderColor = position === 'left' ? 'var(--color-neon-cyan)' : 'var(--color-neon-magenta)'

  return (
    <div
      className="rounded-lg p-4 font-mono text-xs"
      style={{
        background: 'rgba(26, 26, 46, 0.6)',
        border: `1px solid ${borderColor}30`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <StatItem label="Comparisons" value={state.comparisons.toLocaleString()} />
        <StatItem label="Swaps" value={state.swaps.toLocaleString()} />
        <StatItem label="Time" value={formatTime(elapsed)} />
        <StatItem label="Steps" value={(state.comparisons + state.swaps).toLocaleString()} />
        <StatItem label="Avg Time" value={algo.time} highlight />
        <StatItem label="Best" value={algo.best} highlight />
        <StatItem label="Space" value={algo.space} highlight />
      </div>
    </div>
  )
}

function StatItem({ label, value, highlight }) {
  return (
    <div className="flex flex-col">
      <span className="text-text-muted text-[10px] uppercase tracking-wider">{label}</span>
      <span
        className={`text-sm ${highlight ? 'text-neon-yellow' : 'text-text-primary'}`}
        style={highlight ? { textShadow: '0 0 5px rgba(255, 230, 0, 0.3)' } : {}}
      >
        {value}
      </span>
    </div>
  )
}
