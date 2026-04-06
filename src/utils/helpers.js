export function generateRandomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 5)
}

export function generateSortedArray(size) {
  return Array.from({ length: size }, (_, i) => Math.floor((i / size) * 95) + 5)
}

export function generateReversedArray(size) {
  return Array.from({ length: size }, (_, i) => Math.floor(((size - 1 - i) / size) * 95) + 5)
}

export function generateNearlySortedArray(size) {
  const arr = generateSortedArray(size)
  // Swap ~10% of elements randomly
  const numSwaps = Math.max(1, Math.floor(size * 0.1))
  for (let s = 0; s < numSwaps; s++) {
    const i = Math.floor(Math.random() * size)
    const j = Math.floor(Math.random() * size)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function parseCustomArray(input) {
  const nums = input
    .split(/[,\s]+/)
    .map(s => s.trim())
    .filter(s => s !== '')
    .map(Number)
    .filter(n => !isNaN(n) && n > 0)

  if (nums.length < 4) return null
  // Clamp values between 5 and 105 for visualization
  return nums.map(n => Math.max(5, Math.min(105, n)))
}

export function generateArray(type, size) {
  switch (type) {
    case 'sorted': return generateSortedArray(size)
    case 'reversed': return generateReversedArray(size)
    case 'nearly-sorted': return generateNearlySortedArray(size)
    case 'random':
    default:
      return generateRandomArray(size)
  }
}

export function formatTime(ms) {
  if (ms < 1000) return `${ms.toFixed(0)}ms`
  return `${(ms / 1000).toFixed(2)}s`
}
