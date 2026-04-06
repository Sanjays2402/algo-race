import { useState, useRef, useCallback, useEffect } from 'react'
import { ALGORITHMS } from '../algorithms/sorting'
import { generateArray, parseCustomArray } from '../utils/helpers'
import { playTone, isSoundEnabled } from '../utils/sound'

const SPEED_MAP = {
  slow: 80,
  medium: 20,
  fast: 4,
  instant: 0,
}

export function useRace() {
  const [arraySize, setArraySize] = useState(50)
  const [arrayType, setArrayType] = useState('random')
  const [customArrayInput, setCustomArrayInput] = useState('')
  const [speed, setSpeed] = useState('medium')
  const [algo1Key, setAlgo1Key] = useState('bubble')
  const [algo2Key, setAlgo2Key] = useState('merge')
  const [algo3Key, setAlgo3Key] = useState('')
  const [isRacing, setIsRacing] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [winner, setWinner] = useState(null)
  const [raceHistory, setRaceHistory] = useState([])

  const [state1, setState1] = useState(null)
  const [state2, setState2] = useState(null)
  const [state3, setState3] = useState(null)

  const [elapsed1, setElapsed1] = useState(0)
  const [elapsed2, setElapsed2] = useState(0)
  const [elapsed3, setElapsed3] = useState(0)

  const raceRef = useRef({ cancelled: false })
  const pauseRef = useRef(false)
  const speedRef = useRef(speed)

  useEffect(() => {
    speedRef.current = speed
  }, [speed])

  const sleep = useCallback((ms) => {
    if (ms === 0) return Promise.resolve()
    return new Promise(resolve => setTimeout(resolve, ms))
  }, [])

  const waitWhilePaused = useCallback(async () => {
    while (pauseRef.current) {
      await sleep(50)
      if (raceRef.current.cancelled) return
    }
  }, [sleep])

  const startRace = useCallback(async () => {
    // Determine the array to sort
    let baseArray
    if (arrayType === 'custom') {
      const parsed = parseCustomArray(customArrayInput)
      if (!parsed) return // invalid input
      baseArray = parsed
    } else {
      baseArray = generateArray(arrayType, arraySize)
    }

    raceRef.current = { cancelled: false }
    pauseRef.current = false
    setIsRacing(true)
    setIsPaused(false)
    setWinner(null)
    setElapsed1(0)
    setElapsed2(0)
    setElapsed3(0)

    const players = [
      { key: algo1Key, gen: ALGORITHMS[algo1Key].fn(baseArray), setState: setState1, setElapsed: setElapsed1 },
      { key: algo2Key, gen: ALGORITHMS[algo2Key].fn(baseArray), setState: setState2, setElapsed: setElapsed2 },
    ]

    if (algo3Key) {
      players.push({ key: algo3Key, gen: ALGORITHMS[algo3Key].fn(baseArray), setState: setState3, setElapsed: setElapsed3 })
    } else {
      setState3(null)
    }

    const done = players.map(() => false)
    const maxVal = Math.max(...baseArray)

    // Initial state
    const initState = {
      array: [...baseArray],
      comparing: [],
      swapping: [],
      sorted: [],
      comparisons: 0,
      swaps: 0,
    }
    players.forEach(p => p.setState(initState))

    await sleep(500) // dramatic pause

    let winnerKey = null
    const startTime = performance.now()

    while (!done.every(Boolean) && !raceRef.current.cancelled) {
      await waitWhilePaused()
      if (raceRef.current.cancelled) break

      for (let i = 0; i < players.length; i++) {
        if (done[i]) continue

        const result = players[i].gen.next()
        if (result.done) {
          done[i] = true
          if (!winnerKey) {
            // Check if all others are also done on this step
            const allDoneThisStep = done.every(Boolean)
            if (!allDoneThisStep) {
              winnerKey = players[i].key
              setWinner(players[i].key)
            }
          }
        } else {
          players[i].setState(result.value)
          // Sound: play tone for compared elements
          if (isSoundEnabled() && result.value.comparing.length > 0) {
            const idx = result.value.comparing[0]
            playTone(result.value.array[idx], maxVal)
          }
        }
      }

      const now = performance.now()
      const elapsed = now - startTime
      for (let i = 0; i < players.length; i++) {
        if (!done[i]) players[i].setElapsed(elapsed)
      }

      // If all just finished on same step
      if (done.every(Boolean) && !winnerKey) {
        winnerKey = 'tie'
        setWinner('tie')
      }

      const delay = SPEED_MAP[speedRef.current]
      if (delay > 0) await sleep(delay)
    }

    setIsRacing(false)

    // Record to race history
    if (winnerKey && !raceRef.current.cancelled) {
      const entry = {
        id: Date.now(),
        players: players.map(p => p.key),
        winner: winnerKey,
        arraySize: baseArray.length,
        arrayType,
        timestamp: new Date().toLocaleTimeString(),
      }
      setRaceHistory(prev => [entry, ...prev].slice(0, 5))
    }
  }, [arraySize, arrayType, customArrayInput, algo1Key, algo2Key, algo3Key, sleep, waitWhilePaused])

  const stopRace = useCallback(() => {
    raceRef.current.cancelled = true
    pauseRef.current = false
    setIsRacing(false)
    setIsPaused(false)
  }, [])

  const togglePause = useCallback(() => {
    pauseRef.current = !pauseRef.current
    setIsPaused(p => !p)
  }, [])

  const changeSpeed = useCallback((newSpeed) => {
    speedRef.current = newSpeed
    setSpeed(newSpeed)
  }, [])

  return {
    arraySize, setArraySize,
    arrayType, setArrayType,
    customArrayInput, setCustomArrayInput,
    speed, changeSpeed,
    algo1Key, setAlgo1Key,
    algo2Key, setAlgo2Key,
    algo3Key, setAlgo3Key,
    isRacing, isPaused,
    winner,
    state1, state2, state3,
    elapsed1, elapsed2, elapsed3,
    raceHistory,
    startRace, stopRace, togglePause,
  }
}
