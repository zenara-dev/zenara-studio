/**
 * Zenara Studios — typographic logo.
 * All text, no raster assets. Uses Playfair Display for the iconic "Z".
 *
 * Variants:
 *  - "mark"     → iconic serif Z inside a square outline
 *  - "wordmark" → "Zenara Studios" horizontal wordmark
 *  - "stack"    → "Zenara / Studios" two-line stack (for hero / footer)
 */
export default function Logo({
  variant = "mark",
  height = 40,
  tone = "ink", // "ink" (on light bg) | "soft" (on dark bg)
  className = "",
  ...rest
}) {
  const color = tone === "soft" ? "#ffffff" : "#0a0a0a";
  const muted = tone === "soft" ? "rgba(255,255,255,0.55)" : "#8a8a8a";
  const border = tone === "soft" ? "rgba(255,255,255,0.25)" : "#eaeaea";

  if (variant === "wordmark") {
    return (
      <span
        data-testid="logo-wordmark"
        aria-label="Zenara Studios"
        role="img"
        className={`inline-flex items-baseline ${className}`}
        style={{ color, lineHeight: 1 }}
        {...rest}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 600,
            fontSize: height,
            letterSpacing: "-0.02em",
          }}
        >
          Zenara
        </span>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: height * 0.32,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            marginLeft: height * 0.28,
            color: muted,
          }}
        >
          Studios
        </span>
      </span>
    );
  }

  if (variant === "stack") {
    return (
      <span
        data-testid="logo-stack"
        aria-label="Zenara Studios"
        role="img"
        className={`inline-block ${className}`}
        style={{ color, lineHeight: 0.92 }}
        {...rest}
      >
        <span
          className="block"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 500,
            fontStyle: "italic",
            fontSize: height,
            letterSpacing: "-0.03em",
          }}
        >
          Zenara
        </span>
        <span
          className="block mt-1"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: height * 0.22,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: muted,
          }}
        >
          Studios
        </span>
      </span>
    );
  }

  // Mark: iconic serif Z in a square
  return (
    <span
      data-testid="logo-mark"
      aria-label="Zenara Studios"
      role="img"
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        width: height,
        height: height,
        border: `1px solid ${border}`,
        color,
      }}
      {...rest}
    >
      <span
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          fontStyle: "italic",
          fontSize: height * 0.62,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        Z
      </span>
    </span>
  );
}
