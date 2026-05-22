import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#2B3E50",
          dark: "#1E2A3A",
          900: "#141C28",
        },
        teal: {
          DEFAULT: "#2D8B6E",
          light: "#3DAA7A",
          pale: "#E6F5F0",
        },
        steel: "#6B7B8D",
        "white-warm": "#F5F5F0",
        "black-deep": "#1A1A1A",
        error: "#D14B3A",
      },
      fontFamily: {
        head: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-opensans)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        card: "0 12px 48px rgba(43,62,80,0.14)",
        elevated: "0 16px 64px rgba(0,0,0,0.22)",
        subtle: "0 4px 16px rgba(43,62,80,0.08)",
        "card-hover": "0 20px 64px rgba(43,62,80,0.22)",
      },
      borderRadius: {
        card: "16px",
        btn: "6px",
        pill: "999px",
      },
      backgroundImage: {
        "grad-brand": "linear-gradient(135deg, #1E2A3A 0%, #2B3E50 100%)",
        "grad-teal": "linear-gradient(135deg, #2D8B6E 0%, #3DAA7A 100%)",
        "grad-hero": "linear-gradient(135deg, #141C28 0%, #1E2A3A 60%, #2D8B6E 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "count-up": "countUp 0.4s ease forwards",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      transitionDuration: {
        "200": "200ms",
        "300": "300ms",
      },
    },
  },
  plugins: [],
};

export default config;
