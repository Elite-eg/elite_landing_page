import type { SVGProps } from "react";

/** Four-colour Google Play triangle (the official mark is multi-coloured, so it can't use currentColor). */
export function GooglePlayLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" {...props}>
      <path fill="#00D7FE" d="M3.6 1.8c-.3.3-.4.8-.4 1.4v17.6c0 .6.2 1.1.5 1.4l.1.1 9.9-9.9v-.2L3.7 1.7l-.1.1z" />
      <path fill="#FFCE00" d="M17 15.7l-3.3-3.3v-.2L17 8.9l.1.1 3.9 2.2c1.1.6 1.1 1.7 0 2.3l-3.9 2.2H17z" />
      <path fill="#FF3A44" d="M17.1 15.6l-3.4-3.4L3.7 22.2c.4.4 1 .4 1.7.1l11.7-6.7" />
      <path fill="#00F076" d="M17.1 8.9L5.4 2.2c-.7-.4-1.3-.3-1.7.1l10 10 3.4-3.4z" />
    </svg>
  );
}
