import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A1017",
        panel: "#111B27",
        edge: "#213347",
        signal: "#9CCB4F",
        warning: "#F2B950",
        danger: "#F06A5D",
        cyan: "#66C9D6",
        fog: "#96A5B8",
        paper: "#F5F3EE"
      },
      fontFamily: {
        sans: ["'IBM Plex Sans'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"]
      },
      boxShadow: {
        terminal: "0 18px 50px rgba(0, 0, 0, 0.28)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(150,165,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(150,165,184,0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
