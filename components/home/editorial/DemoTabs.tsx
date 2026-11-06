"use client"

import { useRef, type KeyboardEvent } from "react"

export default function DemoTabs({
  id,
  label,
  items,
  selected,
  onSelect,
  showNumbers = true,
}: {
  id: string
  label: string
  items: readonly string[]
  selected: number
  onSelect: (index: number) => void
  showNumbers?: boolean
}) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  function navigate(event: KeyboardEvent, index: number) {
    let next = index
    if (event.key === "ArrowRight") next = (index + 1) % items.length
    else if (event.key === "ArrowLeft")
      next = (index + items.length - 1) % items.length
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = items.length - 1
    else return
    event.preventDefault()
    onSelect(next)
    tabs.current[next]?.focus()
  }
  return (
    <div className="le-demo-tabs" role="tablist" aria-label={label}>
      {items.map((item, index) => (
        <button
          key={item}
          ref={(node) => {
            tabs.current[index] = node
          }}
          type="button"
          role="tab"
          id={`${id}-tab-${index}`}
          aria-controls={`${id}-panel`}
          aria-selected={selected === index}
          tabIndex={selected === index ? 0 : -1}
          onClick={() => onSelect(index)}
          onKeyDown={(event) => navigate(event, index)}
        >
          {showNumbers ? (
            <span className="le-tab-number" aria-hidden="true">
              0{index + 1}
            </span>
          ) : null}
          {item}
        </button>
      ))}
    </div>
  )
}
