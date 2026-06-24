import tokens from "../../design-tokens.json";

export type Tokens = typeof tokens;

export const colors = tokens.colors;
export const typography = tokens.typography;
export const spacing = tokens.spacing;
export const motion = tokens.motion;
export const radius = tokens.radius;

export const theme = {
  background: "bg-background",
  surface: "bg-surface",
  surfaceElevated: "bg-surface-elevated",
  accent: "text-accent",
  accentBg: "bg-accent",
  text: "text-foreground",
  muted: "text-muted",
  subtle: "text-subtle",
  border: "border-border",
} as const;

export function cn(
  base: string,
  variants?: Record<string, string | boolean | undefined | null>,
) {
  const active = variants
    ? Object.entries(variants)
        .filter(([, value]) => Boolean(value))
        .map(([key]) => key)
        .join(" ")
    : "";
  return [base, active].filter(Boolean).join(" ");
}
