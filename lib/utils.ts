/* Stub of the shadcn/ui `cn` utility. The Lyric marketing site doesn't
   use Tailwind or clsx/tailwind-merge — this minimal version is here
   because components installed from the shadcn registry (e.g. the
   ElevenLabs Waveform component at components/ui/waveform.tsx) import
   from "@/lib/utils". It performs the same join-and-dedupe-ish job at
   a basic level: filter falsy values, join with spaces. Without
   Tailwind there are no utility-class conflicts to resolve, so the
   simple version is sufficient. */

type ClassValue = string | number | boolean | null | undefined

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ")
}
