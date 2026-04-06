import { motion, AnimatePresence } from 'framer-motion' // eslint-disable-line no-unused-vars

export default function AlgoInfoCard({ algo, onClose }) {
  if (!algo) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          onClick={e => e.stopPropagation()}
          className="rounded-xl p-6 max-w-md w-full font-mono"
          style={{
            background: 'linear-gradient(135deg, rgba(26,26,46,0.98), rgba(10,10,15,0.98))',
            border: `1px solid ${algo.color}40`,
            boxShadow: `0 0 40px ${algo.color}15, 0 0 80px ${algo.color}05`,
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <h3
              className="text-lg font-black tracking-wider uppercase"
              style={{ color: algo.color, textShadow: `0 0 12px ${algo.color}60` }}
            >
              {algo.name}
            </h3>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary text-lg cursor-pointer ml-4"
            >
              ✕
            </button>
          </div>

          <p className="text-text-secondary text-xs leading-relaxed mb-5">
            {algo.description}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <InfoRow label="Average" value={algo.time} color={algo.color} />
            <InfoRow label="Best Case" value={algo.best} color="#39ff14" />
            <InfoRow label="Worst Case" value={algo.worst} color="#ff3131" />
            <InfoRow label="Space" value={algo.space} color="#ffe600" />
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <span
              className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold ${
                algo.stable
                  ? 'bg-neon-green/15 text-neon-green'
                  : 'bg-neon-red/15 text-neon-red'
              }`}
            >
              {algo.stable ? '✓ Stable' : '✗ Unstable'}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function InfoRow({ label, value, color }) {
  return (
    <div className="flex flex-col">
      <span className="text-text-muted text-[10px] uppercase tracking-wider">{label}</span>
      <span
        className="text-sm font-bold"
        style={{ color, textShadow: `0 0 6px ${color}40` }}
      >
        {value}
      </span>
    </div>
  )
}
