import type { Config } from "tailwindcss";

// Colors are wired to CSS custom properties set at runtime from config.ts (THEME),
// so a new champion's palette swap in config.ts propagates everywhere without
// touching this file.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        ink: {
          DEFAULT: "#0b0d0f",
          900: "#0b0d0f",
          800: "#14171a",
          700: "#1c2024",
          600: "#262b30",
          500: "#3a4046",
          400: "#5a6169",
          300: "#8a9098",
          200: "#c2c6cb",
          100: "#e8eaec",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px var(--color-primary)",
      },
      backgroundImage: {
        "gold-fade":
          "linear-gradient(135deg, var(--color-primary) 0%, transparent 60%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
