"use client"

import { useRef, useState, type KeyboardEvent } from "react"

const channels = [
  {
    label: "Phone",
    number: "01",
    text: "Your payment is due on the fifteenth. I’m here if you need help with anything else.",
    note: "Spoken naturally. The date is written out; the offer of help stays human.",
  },
  {
    label: "Web chat",
    number: "02",
    text: "Your payment is due on the fifteenth. I’m here to help with anything else you need.",
    note: "Written clearly. The same facts and helpful tone carry into the conversation.",
  },
  {
    label: "SMS",
    number: "03",
    text: "Your payment is due on the 15th. I’m here if you need anything else.",
    note: "Kept concise. The format changes for the channel. The standard stays intact.",
  },
] as const

export default function ChannelProof() {
  const [selected, setSelected] = useState(0)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const channel = channels[selected]
  function navigate(event: KeyboardEvent, index: number) {
    let next = index
    if (event.key === "ArrowRight") next = (index + 1) % channels.length
    else if (event.key === "ArrowLeft")
      next = (index + channels.length - 1) % channels.length
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = channels.length - 1
    else return
    event.preventDefault()
    setSelected(next)
    buttons.current[next]?.focus()
  }
  return (
    <div className="le-channel-proof">
      <div className="le-proof-topline">
        <span className="le-label">One question. Three channels.</span>
        <span className="le-caption">Illustrative exchange</span>
      </div>
      <div className="le-proof-question">
        <span className="le-label">Customer</span>
        <p>“When is my payment due?”</p>
      </div>
      <div
        className="le-channel-tabs"
        role="tablist"
        aria-label="Compare governed channels"
      >
        {channels.map((item, index) => (
          <button
            key={item.label}
            type="button"
            role="tab"
            id={`channel-${index}`}
            aria-controls="channel-response"
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            ref={(el) => {
              buttons.current[index] = el
            }}
            onKeyDown={(event) => navigate(event, index)}
            onClick={() => setSelected(index)}
          >
            <span>{item.number}</span>
            {item.label}
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div
        id="channel-response"
        role="tabpanel"
        aria-labelledby={`channel-${selected}`}
        tabIndex={0}
        className="le-proof-response"
      >
        <p key={channel.label} className="le-response-text">
          {channel.text}
        </p>
        <div className="le-proof-annotation">
          <span className="le-state">
            <span aria-hidden="true">✓</span> Same facts. One voice.
          </span>
          <p>{channel.note}</p>
        </div>
      </div>
    </div>
  )
}
