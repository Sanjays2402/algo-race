import { useMemo } from 'react'
import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars

const BAR_COLORS = {
  default: ['#1a1a3e', '#2a2a5e'],
  comparing: ['#ff8800', '#ffe600'],
  swapping: ['#ff0000', '#ff5544'],
  sorted: ['#00cc44', '#39ff14'],
}

const EMPTY = []

export default function Visualizer({ state, accentColor, label, onLabelClick }) {
  const array = state ? state.array : EMPTY
  const comparing = state ? state.comparing : EMPTY
  const swapping = state ? state.swapping : EMPTY
  const sorted = state ? state.sorted : EMPTY

  const maxVal = useMemo(() => (array.length > 0 ? Math.max(...array) : 1), [array])
  const comparingSet = useMemo(() => new Set(comparing), [comparing])
  const swappingSet = useMemo(() => new Set(swapping), [swapping])
  const sortedSet = useMemo(() => new Set(sorted), [sorted])

  if (!state) return null

  const barWidth = Math.max(1, Math.floor(100 / array.length * 10) / 10)
  const gap = array.length > 100 ? 0.5 : array.length > 50 ? 1 : 2

  return (
    <div className="flex flex-col items-center w-full">
      <button
        onClick={onLabelClick}
        className="text-sm font-bold tracking-widest uppercase mb-2 cursor-pointer
          hover:underline underline-offset-4 decoration-dotted transition-all duration-200 bg-transparent border-none"
        style={{ color: accentColor, textShadow: `0 0 10px ${accentColor}50` }}
        title="Click for algorithm info"
      >
        {label} ℹ
      </button>
      <div
        className="flex items-end justify-center w-full rounded-lg overflow-hidden"
        style={{
          height: '280px',
          background: 'linear-gradient(180deg, rgba(10,10,15,0.8) 0%, rgba(26,26,46,0.4) 100%)',
          padding: '8px 4px 4px 4px',
          border: `1px solid ${accentColor}20`,
        }}
      >
        {array.map((value, index) => {
          let gradient = BAR_COLORS.default
          let glow = 'none'

          if (sortedSet.has(index)) {
            gradient = BAR_COLORS.sorted
            glow = `0 0 6px ${BAR_COLORS.sorted[1]}80`
          }
          if (comparingSet.has(index)) {
            gradient = BAR_COLORS.comparing
            glow = `0 0 8px ${BAR_COLORS.comparing[1]}90`
          }
          if (swappingSet.has(index)) {
            gradient = BAR_COLORS.swapping
            glow = `0 0 10px ${BAR_COLORS.swapping[1]}90`
          }

          // Default bars get accent-colored gradient based on height
          if (!sortedSet.has(index) && !comparingSet.has(index) && !swappingSet.has(index)) {
            const intensity = value / maxVal
            gradient = [`${accentColor}33`, `${accentColor}${Math.floor(40 + intensity * 60).toString(16)}`]
          }

          const heightPercent = (value / maxVal) * 100

          return (
            <motion.div
              key={index}
              layout
              transition={{ duration: 0.05 }}
              style={{
                width: `${barWidth}%`,
                height: `${heightPercent}%`,
                background: `linear-gradient(to top, ${gradient[0]}, ${gradient[1]})`,
                boxShadow: glow,
                marginLeft: `${gap * 0.5}px`,
                marginRight: `${gap * 0.5}px`,
                borderRadius: '2px 2px 0 0',
                minWidth: '2px',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
