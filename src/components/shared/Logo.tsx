import { useId } from "react";

/** Brand mark: a browser window with an equals sign ("website = cost"). Draws in currentColor. */
export default function Logo({ size = 28, title }: { size?: number; title?: string }) {
  const id = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <mask id={id}>
        <rect width="32" height="32" rx="8" fill="#fff" />
        <rect y="9" width="32" height="3" fill="#000" />
        <rect x="5" y="4" width="3" height="2" rx="1" fill="#000" />
        <rect x="10" y="17" width="12" height="3.5" rx="1.75" fill="#000" />
        <rect x="10" y="23.5" width="12" height="3.5" rx="1.75" fill="#000" />
      </mask>
      <rect width="32" height="32" rx="8" fill="currentColor" mask={`url(#${id})`} />
    </svg>
  );
}
