export default function Legend() {
  const items = [
    { color: '#2a2a4e', label: 'Unsorted' },
    { color: '#ffe600', label: 'Comparing' },
    { color: '#ff3131', label: 'Swapping' },
    { color: '#39ff14', label: 'Sorted' },
  ]

  return (
    <div className="flex items-center justify-center gap-5 py-2">
      {items.map(({ color, label }) => (
        <div key={label} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-sm"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 6px ${color}60`,
            }}
          />
          <span className="text-[10px] uppercase tracking-wider text-text-secondary">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
