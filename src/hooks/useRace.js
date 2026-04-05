import { useState, useRef, useCallback } from 'react'
import { ALGORITHMS } from '../algorithms/sorting'
import { generateRandomArray } from '../utils/helpers'

const SPEED_MAP = {
  slow: 80,
  medium: 20,
  fast: 4,
  instant: 0,
}

export function useRace() {
  const [arraySize, setArraySize] = useState(50)
  const [speed, setSpeed] = useState('medium')
  const [algo1Key, setAlgo1Key] = useState('bubble')
  const [algo2Key, setAlgo2Key] = useState('merge')
  const [isRacing, setIsRacing] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [winner, setWinner] = useState(null)

  const [state1, setState1] = useState(null)
  const [state2, setState2] = useState(null)

  const [elapsed1, setElapsed1] = useState(0)
  const [elapsed2, setElapsed2] = useState(0)

  const raceRef = useRef({ cancelled: false })
  const pauseRef = useRef(false)
  const speedRef = useRef(speed)

  speedRef.current = speed

  const sleep = (ms) => {
    if (ms === 0) return Promise.resolve()
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const waitWhilePaused = async () => {
    while (pauseRef.current) {
      await sleep(50)
      if (raceRef.current.cancelled) return
    }
  }

  const startRace = useCallback(async () => {
    const baseArray = generateRandomArray(arraySize)

    raceRef.current = { cancelled: false }
    pauseRef.current = false
    setIsRacing(true)
    setIsPaused(false)
    setWinner(null)
    setElapsed1(0)
    setElapsed2(0)

    const gen1 = ALGORITHMS[algo1Key].fn(baseArray)
    const gen2 = ALGORITHMS[algo2Key].fn(baseArray)

    let done1 = false
    let done2 = false
    let startTime = performance.now()
    let last1 = null
    let last2 = null

    // Initial state
    const initState = {
      array: [...baseArray],
      comparing: [],
      swapping: [],
      sorted: [],
      comparisons: 0,
      swaps: 0,
    }
    setState1(initState)
    setState2(initState)

    await sleep(500) // dramatic pause before start

    while ((!done1 || !done2) && !raceRef.current.cancelled) {
      await waitWhilePaused()
      if (raceRef.current.cancelled) break

      if (!done1) {
        const result = gen1.next()
        if (result.done) {
          done1 = true
          if (!done2 && !winner) {
            setWinner(algo1Key)
          }
        } else {
          last1 = result.value
          setState1(result.value)
        }
      }

      if (!done2) {
        const result = gen2.next()
        if (result.done) {
          done2 = true
          if (!done1 && !winner) {
            setWinner(algo2Key)
          }
        } else {
          last2 = result.value
          setState2(result.value)
        }
      }

      const now = performance.now()
      const elapsed = now - startTime
      if (!done1) setElapsed1(elapsed)
      if (!done2) setElapsed2(elapsed)

      // If both just finished on same step
      if (done1 && done2 && !winner) {
        setWinner('tie')
      }

      const delay = SPEED_MAP[speedRef.current]
      if (delay > 0) await sleep(delay)
    }

    setIsRacing(false)
  }, [arraySize, algo1Key, algo2Key])

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
    speed, changeSpeed,
    algo1Key, setAlgo1Key,
    algo2Key, setAlgo2Key,
    isRacing, isPaused,
    winner,
    state1, state2,
    elapsed1, elapsed2,
    startRace, stopRace, togglePause,
  }
}
