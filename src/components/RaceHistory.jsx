import { motion, AnimatePresence } from 'framer-motion' // eslint-disable-line no-unused-vars
import { ALGORITHMS } from '../algorithms/sorting'

export default function RaceHistory({ history }) {
  if (!history || history.length === 0) return null

  return (
    <div className="mt-6">
      <h3 className="text-[10px] uppercase tracking-widest text-text-muted text-center mb-3">
        Race History
      </h3>
      <div className="flex flex-col gap-2 max-w-2xl mx-auto">
        <AnimatePresence>
          {history.map((entry, idx) => {
            const winnerAlgo = entry.winner === 'tie' ? null : ALGORITHMS[entry.winner]
            const isLatest = idx === 0

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: isLatest ? 1 : 0.6, x: 0, height: 'auto' }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 rounded-lg px-4 py-2 font-mono text-xs"
                style={{
                  background: isLatest
                    ? `linear-gradient(90deg, ${winnerAlgo ? winnerAlgo.color + '10' : 'rgba(255,230,0,0.06)'}, transparent)`
                    : 'rgba(26,26,46,0.4)',
                  border: `1px solid ${isLatest ? (winnerAlgo ? winnerAlgo.color + '30' : 'rgba(255,230,0,0.2)') : 'rgba(42,42,62,0.5)'}`,
                }}
              >
                <span className="text-text-muted text-[10px] w-12 shrink-0">
                  {entry.timestamp}
                </span>

                <div className="flex items-center gap-1.5 flex-1 min-w-0 flex-wrap">
                  {entry.players.map((p, i) => (
                    <span key={i} className="flex items-center gap-1">
                      {i > 0 && <span className="text-text-muted mx-1">vs</span>}
                      <span
                        className="font-bold truncate"
                        style={{ color: ALGORITHMS[p].color }}
                      >
                        {ALGORITHMS[p].name}
                      </span>
                    </span>
                  ))}
                </div>

                <span className="shrink-0 flex items-center gap-1">
                  {entry.winner === 'tie' ? (
                    <span className="text-neon-yellow">🤝 Tie</span>
                  ) : (
                    <>
                      <span className="text-text-muted">🏆</span>
                      <span style={{ color: winnerAlgo.color }} className="font-bold">
                        {winnerAlgo.name}
                      </span>
                    </>
                  )}
                </span>

                <span className="text-text-muted shrink-0">
                  n={entry.arraySize}
                </span>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
