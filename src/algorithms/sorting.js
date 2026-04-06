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

export function* radixSort(arr) {
  const a = [...arr]
  const n = a.length
  let comparisons = 0
  let swaps = 0

  const max = Math.max(...a)

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const output = new Array(n)
    const count = new Array(10).fill(0)

    // Count occurrences of each digit
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(a[i] / exp) % 10
      count[digit]++
      comparisons++
      yield { array: [...a], comparing: [i], swapping: [], sorted: [], comparisons, swaps }
    }

    // Cumulative count
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1]
    }

    // Build output array (traverse from right for stability)
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(a[i] / exp) % 10
      output[count[digit] - 1] = a[i]
      count[digit]--
      swaps++
    }

    // Copy output back
    for (let i = 0; i < n; i++) {
      a[i] = output[i]
      swaps++
      yield { array: [...a], comparing: [], swapping: [i], sorted: [], comparisons, swaps }
    }
  }

  yield { array: [...a], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i), comparisons, swaps }
}

export function* shellSort(arr) {
  const a = [...arr]
  const n = a.length
  let comparisons = 0
  let swaps = 0

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = a[i]
      let j = i

      while (j >= gap) {
        comparisons++
        yield { array: [...a], comparing: [j - gap, j], swapping: [], sorted: [], comparisons, swaps }

        if (a[j - gap] > temp) {
          a[j] = a[j - gap]
          swaps++
          yield { array: [...a], comparing: [], swapping: [j - gap, j], sorted: [], comparisons, swaps }
          j -= gap
        } else {
          break
        }
      }

      if (j !== i) {
        a[j] = temp
      }
    }
  }

  yield { array: [...a], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i), comparisons, swaps }
}

export function* cocktailSort(arr) {
  const a = [...arr]
  const n = a.length
  let comparisons = 0
  let swaps = 0
  const sorted = []
  let start = 0
  let end = n - 1
  let swapped = true

  while (swapped) {
    swapped = false

    // Forward pass (left to right)
    for (let i = start; i < end; i++) {
      comparisons++
      yield { array: [...a], comparing: [i, i + 1], swapping: [], sorted: [...sorted], comparisons, swaps }

      if (a[i] > a[i + 1]) {
        ;[a[i], a[i + 1]] = [a[i + 1], a[i]]
        swaps++
        swapped = true
        yield { array: [...a], comparing: [], swapping: [i, i + 1], sorted: [...sorted], comparisons, swaps }
      }
    }
    sorted.push(end)
    end--

    if (!swapped) break
    swapped = false

    // Backward pass (right to left)
    for (let i = end; i > start; i--) {
      comparisons++
      yield { array: [...a], comparing: [i - 1, i], swapping: [], sorted: [...sorted], comparisons, swaps }

      if (a[i - 1] > a[i]) {
        ;[a[i - 1], a[i]] = [a[i], a[i - 1]]
        swaps++
        swapped = true
        yield { array: [...a], comparing: [], swapping: [i - 1, i], sorted: [...sorted], comparisons, swaps }
      }
    }
    sorted.push(start)
    start++
  }

  yield { array: [...a], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i), comparisons, swaps }
}

export const ALGORITHMS = {
  bubble: {
    name: 'Bubble Sort',
    fn: bubbleSort,
    time: 'O(n²)',
    space: 'O(1)',
    best: 'O(n)',
    worst: 'O(n²)',
    color: '#00f0ff',
    stable: true,
    description: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if they\'re in the wrong order. Simple but inefficient for large datasets. The name comes from how smaller elements "bubble" to the top.',
  },
  selection: {
    name: 'Selection Sort',
    fn: selectionSort,
    time: 'O(n²)',
    space: 'O(1)',
    best: 'O(n²)',
    worst: 'O(n²)',
    color: '#ff00e5',
    stable: false,
    description: 'Divides the array into sorted and unsorted regions. Repeatedly finds the minimum element from the unsorted region and places it at the end of the sorted region. Always performs O(n²) comparisons regardless of input.',
  },
  insertion: {
    name: 'Insertion Sort',
    fn: insertionSort,
    time: 'O(n²)',
    space: 'O(1)',
    best: 'O(n)',
    worst: 'O(n²)',
    color: '#39ff14',
    stable: true,
    description: 'Builds the sorted array one element at a time by inserting each new element into its correct position among the already-sorted elements. Very efficient for small or nearly-sorted arrays.',
  },
  merge: {
    name: 'Merge Sort',
    fn: mergeSort,
    time: 'O(n log n)',
    space: 'O(n)',
    best: 'O(n log n)',
    worst: 'O(n log n)',
    color: '#ffe600',
    stable: true,
    description: 'A divide-and-conquer algorithm that splits the array in half, recursively sorts each half, then merges them back together. Guaranteed O(n log n) performance but requires extra space.',
  },
  quick: {
    name: 'Quick Sort',
    fn: quickSort,
    time: 'O(n log n)',
    space: 'O(log n)',
    best: 'O(n log n)',
    worst: 'O(n²)',
    color: '#b14aed',
    stable: false,
    description: 'Picks a pivot element, partitions the array around it (smaller left, larger right), then recursively sorts each partition. Very fast in practice despite O(n²) worst case.',
  },
  heap: {
    name: 'Heap Sort',
    fn: heapSort,
    time: 'O(n log n)',
    space: 'O(1)',
    best: 'O(n log n)',
    worst: 'O(n log n)',
    color: '#ff3131',
    stable: false,
    description: 'Builds a max-heap from the array, then repeatedly extracts the maximum element to build the sorted result. In-place with guaranteed O(n log n) but poor cache locality.',
  },
  radix: {
    name: 'Radix Sort',
    fn: radixSort,
    time: 'O(nk)',
    space: 'O(n + k)',
    best: 'O(nk)',
    worst: 'O(nk)',
    color: '#ff8c00',
    stable: true,
    description: 'A non-comparative integer sort that distributes elements into buckets by individual digits, processing from least to most significant digit. Complexity depends on the number of digits (k).',
  },
  shell: {
    name: 'Shell Sort',
    fn: shellSort,
    time: 'O(n log² n)',
    space: 'O(1)',
    best: 'O(n log n)',
    worst: 'O(n²)',
    color: '#00ff88',
    stable: false,
    description: 'A generalization of insertion sort that allows exchange of far-apart elements using a decreasing gap sequence. Bridges the gap between simple O(n²) and complex O(n log n) sorts.',
  },
  cocktail: {
    name: 'Cocktail Sort',
    fn: cocktailSort,
    time: 'O(n²)',
    space: 'O(1)',
    best: 'O(n)',
    worst: 'O(n²)',
    color: '#e040fb',
    stable: true,
    description: 'A bidirectional variant of bubble sort. Alternates between forward and backward passes through the list, which helps move elements in both directions and can be faster than standard bubble sort.',
  },
}
