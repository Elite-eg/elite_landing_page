/** @type {import('tailwindcss').Config} */

/** Maps a CSS custom property holding RGB channels to a Tailwind color with alpha support. */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: token("navy-50"),
          100: token("navy-100"),
          200: token("navy-200"),
          300: token("navy-300"),
          500: token("navy-500"),
          700: token("navy-700"),
          900: token("navy-900"),
          950: token("navy-950"),
        },
        orange: {
          50: token("orange-50"),
          500: token("orange-500"),
          600: token("orange-600"),
        },
        ink: {
          400: token("ink-400"),
          700: token("ink-700"),
          900: token("ink-900"),
        },
        albiruni: token("albiruni-teal"),
        primary: {
          DEFAULT: token("primary"),
          dark: token("primary-dark"),
          deep: token("primary-deep"),
        },
        secondary: {
          DEFAULT: token("secondary"),
          dark: token("secondary-dark"),
        },
        accent: token("accent"),
        surface: {
          DEFAULT: token("surface"),
          alt: token("surface-alt"),
          muted: token("surface-muted"),
          info: token("surface-info"),
          warm: token("surface-warm"),
          dark: token("surface-dark"),
          navy: token("surface-navy"),
        },
        body: {
          DEFAULT: token("body"),
          dark: token("body-dark"),
        },
        content: {
          DEFAULT: token("content"),
          dark: token("content-dark"),
        },
        edge: token("edge"),
        success: token("success"),
        warning: token("warning"),
        danger: token("danger"),
        whatsapp: {
          DEFAULT: token("whatsapp"),
          dark: token("whatsapp-dark"),
        },
      },
      fontFamily: {
        sans: ["var(--font-body)"],
        heading: ["var(--font-heading)"],
        logo: ["var(--font-logo)"],
        /** Legacy alias, now the body font. */
        ibm: ["var(--font-body)"],
      },
      fontSize: {
        display: ["var(--text-display)", { lineHeight: "var(--leading-display)", fontWeight: "700" }],
        h2: ["var(--text-h2)", { lineHeight: "var(--leading-h2)", fontWeight: "700" }],
        h3: ["var(--text-h3)", { lineHeight: "var(--leading-h3)", fontWeight: "600" }],
        "body-lg": ["var(--text-body-lg)", { lineHeight: "var(--leading-body-lg)" }],
        caption: ["var(--text-caption)", { lineHeight: "var(--leading-caption)" }],
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "var(--ease-out)",
        "out-brand": "var(--ease-out)",
        back: "var(--ease-back)",
      },
      maxWidth: {
        container: "80rem",
        prose: "68ch",
      },
      boxShadow: {
        card: "0 1px 3px rgb(var(--primary) / 0.06), 0 8px 24px -12px rgb(var(--primary) / 0.12)",
        lift: "0 28px 56px -24px rgb(var(--primary) / 0.32)",
        widget: "0 30px 60px -14px rgb(var(--primary-deep) / 0.45)",
        glow: "0 14px 32px -12px rgb(var(--secondary) / 0.6)",
        "glow-accent": "0 14px 32px -12px rgb(var(--accent) / 0.55)",
      },
      screens: {
        "3xl": "1920px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
