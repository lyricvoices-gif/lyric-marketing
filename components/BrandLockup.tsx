// Lyric brand lockup: isotype + wordmark side by side
// Similar to the ChatGPT logo pattern (icon | text)
import Wordmark from "@/components/Wordmark"

export default function BrandLockup({
  height = 20,
  color = "currentColor",
  style = {},
}: {
  height?: number
  color?: string
  style?: React.CSSProperties
}) {
  // Isotype is square (32x32 viewBox), scale to match wordmark cap-height
  const isoSize = height * 0.88
  const gap = height * 0.45

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: `${gap}px`,
        ...style,
      }}
    >
      {/* Isotype */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width={isoSize}
        height={isoSize}
        fill={color}
        style={{ display: "block", flexShrink: 0 }}
        aria-hidden="true"
      >
        <path d="m8,16c0,4.42,3.58,8,8,8h8v-4h-8c-2.21,0-4-1.79-4-4v-4h-4v4Z" />
        <polygon points="24 16 24 8 12 8 12 12 20 12 20 16 24 16" />
      </svg>

      {/* Wordmark */}
      <Wordmark height={height} color={color} />
    </div>
  )
}
