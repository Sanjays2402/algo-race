export function generateRandomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 5)
}

export function formatTime(ms) {
  if (ms < 1000) return `${ms.toFixed(0)}ms`
  return `${(ms / 1000).toFixed(2)}s`
}
