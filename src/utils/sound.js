// Web Audio API oscillator for sort sonification
// Pitch is mapped to bar height during comparisons

let audioCtx = null
let gainNode = null
let enabled = false

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    gainNode = audioCtx.createGain()
    gainNode.gain.value = 0.06
    gainNode.connect(audioCtx.destination)
  }
  return audioCtx
}

export function setSoundEnabled(val) {
  enabled = val
  if (!val && audioCtx) {
    audioCtx.close()
    audioCtx = null
    gainNode = null
  }
}

export function isSoundEnabled() {
  return enabled
}

export function playTone(value, maxValue) {
  if (!enabled) return
  try {
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') ctx.resume()

    // Map value to frequency: 200Hz (low) to 1200Hz (high)
    const freq = 200 + (value / maxValue) * 1000

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)

    const noteGain = ctx.createGain()
    noteGain.gain.setValueAtTime(0.06, ctx.currentTime)
    noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)

    osc.connect(noteGain)
    noteGain.connect(ctx.destination)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.05)
  } catch {
    // Silently ignore audio errors
  }
}
