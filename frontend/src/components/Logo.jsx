/**
 * Z-Digital Solutions logo.
 * - variant="mark"  → square icon (star + Z letter only — tightly cropped)
 * - variant="full"  → wordmark (logo + "Z-Digital Solutions" + tagline)
 */
export default function Logo({ variant = "mark", className = "", size = 32, ...rest }) {
  if (variant === "full") {
    return (
      <img
        src="/zd-logo-wordmark.png"
        alt="Z-Digital Solutions"
        className={className}
        style={{ height: size, width: "auto" }}
        {...rest}
      />
    );
  }
  return (
    <span
      aria-label="Z-Digital Solutions"
      role="img"
      className={`inline-block bg-white overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: "url('/zd-logo-cropped.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "160% auto",
        backgroundPosition: "50% 40%",
        borderRadius: 0,
      }}
      {...rest}
    />
  );
}
