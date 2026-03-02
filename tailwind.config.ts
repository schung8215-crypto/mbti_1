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
        // Primary brand — Terracotta
        terracotta: {
          50: "#fef6f0",
          100: "#f4e8dd",
          200: "#e8c9b5",
          300: "#d9a88d",
          400: "#d08b6a",
          500: "#c67d5c",
          600: "#b06c4d",
          700: "#8f5538",
          800: "#6e4029",
          900: "#4e2d1a",
        },
        // Secondary - Sage Green (Wood element)
        sage: {
          50: "#f4f7f5",
          100: "#e6eeea",
          200: "#cdddd5",
          300: "#a8c4b8",
          400: "#7da695",
          500: "#5d8b78",
          600: "#497060",
          700: "#3c5a4e",
          800: "#334941",
          900: "#2c3d37",
        },
        // Accent - Warm Amber (Earth element)
        amber: {
          50: "#fdf9f3",
          100: "#faf0e1",
          200: "#f4dfc2",
          300: "#ecc899",
          400: "#e2ab6a",
          500: "#d9934a",
          600: "#cb7a3a",
          700: "#a96031",
          800: "#884d2d",
          900: "#6f4127",
        },
        // Neutral - Warm grays (Espresso, Cream, Muted)
        warm: {
          50: "#faf9f7",
          100: "#f5f3f0",
          200: "#ebe7e2",
          300: "#ddd7cf",
          400: "#c4bbb0",
          500: "#a99e91",
          600: "#8f8377",
          700: "#756a60",
          800: "#615851",
          900: "#514a44",
          950: "#2d2520",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
        display: ["var(--font-lora)", "Lora", "Georgia", "serif"],
        korean: ["var(--font-gowun-batang)", "Gowun Batang", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-warm": "linear-gradient(135deg, var(--tw-gradient-stops))",
      },
      boxShadow: {
        soft: "0 2px 20px -2px rgba(45, 37, 32, 0.08)",
        medium: "0 4px 30px -4px rgba(45, 37, 32, 0.12)",
        glow: "0 0 40px -10px rgba(198, 125, 92, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
