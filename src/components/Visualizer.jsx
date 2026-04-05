import { useMemo } from 'react'
import { motion } from 'framer-motion'

const BAR_COLORS = {
  default: '#2a2a4e',
  comparing: '#ffe600',
  swapping: '#ff3131',
  sorted: '#39ff14',
}

export default function Visualizer({ state, accentColor, label, arraySize }) {
  if (!state) return null

  const { array, comparing, swapping, sorted } = state
  const maxVal = useMemo(() => Math.max(...array), [array])

  const comparingSet = useMemo(() => new Set(comparing), [comparing])
  const swappingSet = useMemo(() => new Set(swapping), [swapping])
  const sortedSet = useMemo(() => new Set(sorted), [sorted])

  const barWidth = Math.max(1, Math.floor(100 / array.length * 10) / 10)
  const gap = array.length > 100 ? 0.5 : array.length > 50 ? 1 : 2

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className="text-sm font-bold tracking-widest uppercase mb-2"
        style={{ color: accentColor, textShadow: `0 0 10px ${accentColor}50` }}
      >
        {label}
      </div>
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
          let color = BAR_COLORS.default
          let glow = 'none'

          if (sortedSet.has(index)) {
            color = BAR_COLORS.sorted
            glow = `0 0 6px ${BAR_COLORS.sorted}80`
          }
          if (comparingSet.has(index)) {
            color = BAR_COLORS.comparing
            glow = `0 0 8px ${BAR_COLORS.comparing}90`
          }
          if (swappingSet.has(index)) {
            color = BAR_COLORS.swapping
            glow = `0 0 10px ${BAR_COLORS.swapping}90`
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
                backgroundColor: color,
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
