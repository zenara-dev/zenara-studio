/**
 * Z-Digital Solutions logo.
 * - variant="icon"      → square star-shield mark only
 * - variant="wordmark"  → horizontal wordmark (star + "Z-Digital Solutions")
 * - variant="full"      → wordmark + "Solving digital problems" tagline
 *
 * Sizing: pass `height` in px; width scales automatically.
 */
export default function Logo({
  variant = "icon",
  height = 32,
  className = "",
  ...rest
}) {
  const src =
    variant === "full"
      ? "/zd-wordmark-full.png"
      : variant === "wordmark"
      ? "/zd-wordmark.png"
      : "/zd-icon.png";

  return (
    <img
      src={src}
      alt="Z-Digital Solutions"
      className={`block ${className}`}
      style={{ height, width: "auto" }}
      {...rest}
    />
  );
}
