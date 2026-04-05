// Each algorithm is a generator function that yields snapshots of the array state.
// Snapshot: { array: [...], comparing: [i, j], swapping: [i, j], sorted: [...indices], comparisons, swaps }

export function* bubbleSort(arr) {
  const a = [...arr]
  const n = a.length
  let comparisons = 0
  let swaps = 0
  const sorted = []

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++
      yield { array: [...a], comparing: [j, j + 1], swapping: [], sorted: [...sorted], comparisons, swaps }

      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        swaps++
        yield { array: [...a], comparing: [], swapping: [j, j + 1], sorted: [...sorted], comparisons, swaps }
      }
    }
    sorted.push(n - 1 - i)
  }
  sorted.push(0)
  yield { array: [...a], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i), comparisons, swaps }
}

export function* selectionSort(arr) {
  const a = [...arr]
  const n = a.length
  let comparisons = 0
  let swaps = 0
  const sorted = []

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < n; j++) {
      comparisons++
      yield { array: [...a], comparing: [minIdx, j], swapping: [], sorted: [...sorted], comparisons, swaps }
      if (a[j] < a[minIdx]) {
        minIdx = j
      }
    }
    if (minIdx !== i) {
      ;[a[i], a[minIdx]] = [a[minIdx], a[i]]
      swaps++
      yield { array: [...a], comparing: [], swapping: [i, minIdx], sorted: [...sorted], comparisons, swaps }
    }
    sorted.push(i)
  }
  sorted.push(n - 1)
  yield { array: [...a], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i), comparisons, swaps }
}

export function* insertionSort(arr) {
  const a = [...arr]
  const n = a.length
  let comparisons = 0
  let swaps = 0
  const sorted = [0]

  for (let i = 1; i < n; i++) {
    let j = i
    while (j > 0) {
      comparisons++
      yield { array: [...a], comparing: [j - 1, j], swapping: [], sorted: [...sorted], comparisons, swaps }
      if (a[j - 1] > a[j]) {
        ;[a[j - 1], a[j]] = [a[j], a[j - 1]]
        swaps++
        yield { array: [...a], comparing: [], swapping: [j - 1, j], sorted: [...sorted], comparisons, swaps }
        j--
      } else {
        break
      }
    }
    sorted.push(i)
  }
  yield { array: [...a], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i), comparisons, swaps }
}

export function* mergeSort(arr) {
  const a = [...arr]
  const n = a.length
  let comparisons = 0
  let swaps = 0
  const sortedIndices = new Set()

  function* mergeSortHelper(start, end) {
    if (end - start <= 1) return

    const mid = Math.floor((start + end) / 2)
    yield* mergeSortHelper(start, mid)
    yield* mergeSortHelper(mid, end)

    const left = a.slice(start, mid)
    const right = a.slice(mid, end)
    let i = 0, j = 0, k = start

    while (i < left.length && j < right.length) {
      comparisons++
      yield { array: [...a], comparing: [start + i, mid + j], swapping: [], sorted: [...sortedIndices], comparisons, swaps }

      if (left[i] <= right[j]) {
        a[k] = left[i]
        i++
      } else {
        a[k] = right[j]
        j++
      }
      swaps++
      yield { array: [...a], comparing: [], swapping: [k], sorted: [...sortedIndices], comparisons, swaps }
      k++
    }

    while (i < left.length) {
      a[k] = left[i]
      swaps++
      yield { array: [...a], comparing: [], swapping: [k], sorted: [...sortedIndices], comparisons, swaps }
      i++
      k++
    }

    while (j < right.length) {
      a[k] = right[j]
      swaps++
      yield { array: [...a], comparing: [], swapping: [k], sorted: [...sortedIndices], comparisons, swaps }
      j++
      k++
    }
  }

  yield* mergeSortHelper(0, n)
  yield { array: [...a], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i), comparisons, swaps }
}

export function* quickSort(arr) {
  const a = [...arr]
  const n = a.length
  let comparisons = 0
  let swaps = 0
  const sortedIndices = new Set()

  function* quickSortHelper(low, high) {
    if (low >= high) {
      if (low === high) sortedIndices.add(low)
      return
    }

    const pivot = a[high]
    let i = low
    for (let j = low; j < high; j++) {
      comparisons++
      yield { array: [...a], comparing: [j, high], swapping: [], sorted: [...sortedIndices], comparisons, swaps }

      if (a[j] < pivot) {
        if (i !== j) {
          ;[a[i], a[j]] = [a[j], a[i]]
          swaps++
          yield { array: [...a], comparing: [], swapping: [i, j], sorted: [...sortedIndices], comparisons, swaps }
        }
        i++
      }
    }

    ;[a[i], a[high]] = [a[high], a[i]]
    swaps++
    sortedIndices.add(i)
    yield { array: [...a], comparing: [], swapping: [i, high], sorted: [...sortedIndices], comparisons, swaps }

    yield* quickSortHelper(low, i - 1)
    yield* quickSortHelper(i + 1, high)
  }

  yield* quickSortHelper(0, n - 1)
  yield { array: [...a], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i), comparisons, swaps }
}

export function* heapSort(arr) {
  const a = [...arr]
  const n = a.length
  let comparisons = 0
  let swaps = 0
  const sorted = []

  function* heapify(size, root) {
    let largest = root
    const left = 2 * root + 1
    const right = 2 * root + 2

    if (left < size) {
      comparisons++
      yield { array: [...a], comparing: [largest, left], swapping: [], sorted: [...sorted], comparisons, swaps }
      if (a[left] > a[largest]) largest = left
    }

    if (right < size) {
      comparisons++
      yield { array: [...a], comparing: [largest, right], swapping: [], sorted: [...sorted], comparisons, swaps }
      if (a[right] > a[largest]) largest = right
    }

    if (largest !== root) {
      ;[a[root], a[largest]] = [a[largest], a[root]]
      swaps++
      yield { array: [...a], comparing: [], swapping: [root, largest], sorted: [...sorted], comparisons, swaps }
      yield* heapify(size, largest)
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(n, i)
  }

  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    ;[a[0], a[i]] = [a[i], a[0]]
    swaps++
    sorted.push(i)
    yield { array: [...a], comparing: [], swapping: [0, i], sorted: [...sorted], comparisons, swaps }
    yield* heapify(i, 0)
  }
  sorted.push(0)
  yield { array: [...a], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i), comparisons, swaps }
}

export const ALGORITHMS = {
  bubble: { name: 'Bubble Sort', fn: bubbleSort, time: 'O(n²)', space: 'O(1)', best: 'O(n)', color: '#00f0ff' },
  selection: { name: 'Selection Sort', fn: selectionSort, time: 'O(n²)', space: 'O(1)', best: 'O(n²)', color: '#ff00e5' },
  insertion: { name: 'Insertion Sort', fn: insertionSort, time: 'O(n²)', space: 'O(1)', best: 'O(n)', color: '#39ff14' },
  merge: { name: 'Merge Sort', fn: mergeSort, time: 'O(n log n)', space: 'O(n)', best: 'O(n log n)', color: '#ffe600' },
  quick: { name: 'Quick Sort', fn: quickSort, time: 'O(n log n)', space: 'O(log n)', best: 'O(n log n)', color: '#b14aed' },
  heap: { name: 'Heap Sort', fn: heapSort, time: 'O(n log n)', space: 'O(1)', best: 'O(n log n)', color: '#ff3131' },
}
