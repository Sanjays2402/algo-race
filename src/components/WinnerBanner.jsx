import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { ALGORITHMS } from '../algorithms/sorting'

export default function WinnerBanner({ winner }) {
  const firedRef = useRef(false)

  useEffect(() => {
    if (winner && winner !== 'tie' && !firedRef.current) {
      firedRef.current = true
      const duration = 2000
      const end = Date.now() + duration

      const colors = [ALGORITHMS[winner].color, '#ffffff', '#ffe600']

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors,
        })
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors,
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }
      frame()
    }

    if (!winner) {
      firedRef.current = false
    }
  }, [winner])

  const getWinnerText = () => {
    if (winner === 'tie') return "IT'S A TIE!"
    return `${ALGORITHMS[winner].name} WINS!`
  }

  const getWinnerColor = () => {
    if (winner === 'tie') return '#ffe600'
    return ALGORITHMS[winner].color
  }

  return (
    <AnimatePresence>
      {winner && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="winner-flash rounded-xl py-4 px-8 text-center"
          style={{
            background: `linear-gradient(135deg, ${getWinnerColor()}15, ${getWinnerColor()}05)`,
            border: `2px solid ${getWinnerColor()}60`,
            boxShadow: `0 0 30px ${getWinnerColor()}30, 0 0 60px ${getWinnerColor()}10`,
          }}
        >
          <div className="text-3xl mb-1">🏆</div>
          <div
            className="text-2xl font-black tracking-widest uppercase"
            style={{
              color: getWinnerColor(),
              textShadow: `0 0 20px ${getWinnerColor()}80, 0 0 40px ${getWinnerColor()}40`,
            }}
          >
            {getWinnerText()}
          </div>
          {winner !== 'tie' && (
            <div className="text-text-muted text-xs mt-1 uppercase tracking-wider">
              Fewer operations to complete
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
