"use client"

/* Adapted from LiveKit Agents UI (@agents-ui/agent-audio-visualizer-wave,
   livekit/components-js packages/shadcn). The oscilloscope shader and the
   wave's behavior are LiveKit's, unchanged. Adaptations for this site:
   no tailwind (size comes from the container; the edge fade mask is an
   inline style), no livekit-client track plumbing (pass `volume` 0-1), and
   the local useAgentAudioVisualizerWave hook replaces the registry one. */

import { useMemo, type ComponentProps } from "react"

import { ReactShaderToy } from "@/components/agents-ui/react-shader-toy"
import {
  useAgentAudioVisualizerWave,
  type AgentState,
} from "@/components/agents-ui/use-agent-audio-visualizer-wave"

const DEFAULT_COLOR = "#1FD5F9"

function hexToRgb(hexColor: string): number[] {
  const rgbColor = hexColor.match(/^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/)
  if (rgbColor) {
    const [, r, g, b] = rgbColor
    return [r, g, b].map((c = "00") => parseInt(c, 16) / 255)
  }
  return hexToRgb(DEFAULT_COLOR)
}

/* LiveKit's oscilloscope shader, verbatim. */
const shaderSource = `
const float TAU = 6.28318530718;

// Luma for alpha
float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

// RGB to HSV
vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

// HSV to RGB
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// Bell curve function for attenuation from center with rounded top
float bellCurve(float distanceFromCenter, float maxDistance) {
  float normalizedDistance = distanceFromCenter / maxDistance;
  // Use cosine with high power for smooth rounded top
  return pow(cos(normalizedDistance * (3.14159265359 / 4.0)), 16.0);
}

// Calculate the sine wave
float oscilloscopeWave(float x, float centerX, float time) {
  float relativeX = x - centerX;
  float maxDistance = centerX;
  float distanceFromCenter = abs(relativeX);

  // Apply bell curve for amplitude attenuation
  float bell = bellCurve(distanceFromCenter, maxDistance);

  // Calculate wave with uniforms and bell curve attenuation
  float wave = sin(relativeX * uFrequency + time * uSpeed) * uAmplitude * bell;

  return wave;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;

  // Calculate center and positions
  float centerX = 0.5;
  float centerY = 0.5;
  float x = uv.x;
  float y = uv.y;

  // Convert line width from pixels to UV space
  // Use the average of width and height to handle aspect ratio
  float pixelSize = 2.0 / (iResolution.x + iResolution.y);
  float lineWidthUV = uLineWidth * pixelSize;
  float smoothingUV = uSmoothing * pixelSize;

  // Find minimum distance to the wave by sampling nearby points
  // This gives us consistent line width without high-frequency artifacts
  const int NUM_SAMPLES = 50; // Must be const for GLSL loop
  float minDist = 1000.0;
  float sampleRange = 0.02; // Range to search for closest point

  for(int i = 0; i < NUM_SAMPLES; i++) {
    float offset = (float(i) / float(NUM_SAMPLES - 1) - 0.5) * sampleRange;
    float sampleX = x + offset;
    float waveY = centerY + oscilloscopeWave(sampleX, centerX, iTime);

    // Calculate distance from current pixel to this point on the wave
    vec2 wavePoint = vec2(sampleX, waveY);
    vec2 currentPoint = vec2(x, y);
    float dist = distance(currentPoint, wavePoint);

    minDist = min(minDist, dist);
  }

  // Solid line with smooth edges using minimum distance
  float line = smoothstep(lineWidthUV + smoothingUV, lineWidthUV - smoothingUV, minDist);

  vec3 color = uColor;
  if(abs(uColorShift) > 0.01) {
    // Keep the center 50% at base color, then ramp shift across outer 25% on each side.
    float centerBandHalfWidth = 0.2;
    float edgeBandWidth = 0.5;
    float distanceFromCenter = abs(x - centerX);
    float edgeFactor = clamp((distanceFromCenter - centerBandHalfWidth) / edgeBandWidth, 0.0, 1.0);
    vec3 hsv = rgb2hsv(color);
    // Hue shift is zero in the center band and strongest at far edges.
    hsv.x = fract(hsv.x + edgeFactor * uColorShift * 0.3);
    color = hsv2rgb(hsv);
  }

  // Apply line intensity
  color *= line;

  // Calculate alpha based on line intensity
  float alpha = line * uMix;

  fragColor = vec4(color * uMix, alpha);
}`

export interface AgentAudioVisualizerWaveProps {
  /** The agent state driving the wave's personality. */
  state?: AgentState
  /** Wave color, hex. */
  color?: `#${string}`
  /** Hue variation toward the edges (0 disables). */
  colorShift?: number
  /** Line width in pixels. */
  lineWidth?: number
  /** Line blur in pixels. */
  blur?: number
  /** Audio level 0-1 (drives amplitude/frequency while speaking). */
  volume?: number
  className?: string
}

/* Wave-style audio visualizer that responds to agent state and level.
   Fills its container; size the wrapping element. */
export function AgentAudioVisualizerWave({
  state = "speaking",
  color = DEFAULT_COLOR,
  colorShift = 0.05,
  lineWidth = 1,
  blur = 0.5,
  volume,
  className,
  ...props
}: AgentAudioVisualizerWaveProps & ComponentProps<"div">) {
  const rgbColor = useMemo(() => hexToRgb(color), [color])
  const { speed, amplitude, frequency, opacity } = useAgentAudioVisualizerWave({
    state,
    volume,
  })

  return (
    <div
      data-lk-state={state}
      className={className}
      style={{
        /* LiveKit's horizontal edge fade. */
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
        maskImage:
          "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
      }}
      {...props}
    >
      <ReactShaderToy
        fs={shaderSource}
        devicePixelRatio={globalThis.devicePixelRatio ?? 1}
        uniforms={{
          uSpeed: { type: "1f", value: speed },
          uAmplitude: { type: "1f", value: amplitude },
          uFrequency: { type: "1f", value: frequency },
          uMix: { type: "1f", value: opacity },
          uLineWidth: { type: "1f", value: lineWidth },
          uSmoothing: { type: "1f", value: blur },
          uColor: { type: "3fv", value: rgbColor },
          uColorShift: { type: "1f", value: colorShift },
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}
