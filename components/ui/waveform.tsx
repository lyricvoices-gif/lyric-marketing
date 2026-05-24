"use client"

/* ElevenLabs UI Waveform component, installed from
   https://ui.elevenlabs.io/r/waveform.json.

   Two small adaptations for this project:
   1. The original component uses Tailwind utility classes ("relative",
      "block h-full w-full") that don't apply in this codebase (Lyric's
      marketing site uses inline styles + globals.css, no Tailwind).
      Those two classNames have been replaced with explicit inline
      styles so the component works without Tailwind.
   2. Only the `Waveform` export is kept. The package also ships
      ScrollingWaveform / AudioScrubber / MicrophoneWaveform /
      StaticWaveform / LiveMicrophoneWaveform / RecordingWaveform — none
      of which are needed for the Score pillar visualization. Drop them
      to keep this file minimal.

   Canvas rendering logic is byte-for-byte identical to the ElevenLabs
   source. Color/bar/edge-fade behavior, the alpha ramp (0.3 + value *
   0.7), DPR scaling, ResizeObserver-driven redraw — all unchanged. */

import {
  useEffect,
  useRef,
  type HTMLAttributes,
} from "react"

import { cn } from "@/lib/utils"

export type WaveformProps = HTMLAttributes<HTMLDivElement> & {
  data?: number[]
  barWidth?: number
  barHeight?: number
  barGap?: number
  barRadius?: number
  barColor?: string
  fadeEdges?: boolean
  fadeWidth?: number
  height?: string | number
  active?: boolean
  onBarClick?: (index: number, value: number) => void
}

export const Waveform = ({
  data = [],
  barWidth = 4,
  barHeight: baseBarHeight = 4,
  barGap = 2,
  barRadius = 2,
  barColor,
  fadeEdges = true,
  fadeWidth = 24,
  height = 128,
  onBarClick,
  className,
  ...props
}: WaveformProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const heightStyle = typeof height === "number" ? `${height}px` : height

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const resizeObserver = new ResizeObserver(() => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.scale(dpr, dpr)
        renderWaveform()
      }
    })

    const renderWaveform = () => {
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const computedBarColor =
        barColor ||
        getComputedStyle(canvas).getPropertyValue("--foreground") ||
        "#000"

      const barCount = Math.floor(rect.width / (barWidth + barGap))
      const centerY = rect.height / 2

      for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor((i / barCount) * data.length)
        const value = data[dataIndex] || 0
        const barHeight = Math.max(baseBarHeight, value * rect.height * 0.8)
        const x = i * (barWidth + barGap)
        const y = centerY - barHeight / 2

        ctx.fillStyle = computedBarColor
        ctx.globalAlpha = 0.3 + value * 0.7

        if (barRadius > 0) {
          ctx.beginPath()
          ctx.roundRect(x, y, barWidth, barHeight, barRadius)
          ctx.fill()
        } else {
          ctx.fillRect(x, y, barWidth, barHeight)
        }
      }

      if (fadeEdges && fadeWidth > 0 && rect.width > 0) {
        const gradient = ctx.createLinearGradient(0, 0, rect.width, 0)
        const fadePercent = Math.min(0.2, fadeWidth / rect.width)

        gradient.addColorStop(0, "rgba(255,255,255,1)")
        gradient.addColorStop(fadePercent, "rgba(255,255,255,0)")
        gradient.addColorStop(1 - fadePercent, "rgba(255,255,255,0)")
        gradient.addColorStop(1, "rgba(255,255,255,1)")

        ctx.globalCompositeOperation = "destination-out"
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, rect.width, rect.height)
        ctx.globalCompositeOperation = "source-over"
      }

      ctx.globalAlpha = 1
    }

    resizeObserver.observe(container)
    renderWaveform()

    return () => resizeObserver.disconnect()
  }, [
    data,
    barWidth,
    baseBarHeight,
    barGap,
    barRadius,
    barColor,
    fadeEdges,
    fadeWidth,
  ])

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onBarClick) return

    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const barIndex = Math.floor(x / (barWidth + barGap))
    const dataIndex = Math.floor(
      (barIndex * data.length) / Math.floor(rect.width / (barWidth + barGap))
    )

    if (dataIndex >= 0 && dataIndex < data.length) {
      onBarClick(dataIndex, data[dataIndex])
    }
  }

  return (
    <div
      className={cn(className)}
      ref={containerRef}
      // The original ElevenLabs source applies a "relative" Tailwind
      // utility here. Inlined so the component works without Tailwind.
      style={{ position: "relative", height: heightStyle }}
      {...props}
    >
      <canvas
        // The original applies "block h-full w-full" Tailwind utilities
        // here. Inlined for the same reason.
        style={{ display: "block", height: "100%", width: "100%" }}
        onClick={handleClick}
        ref={canvasRef}
      />
    </div>
  )
}
