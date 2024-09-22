import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        glow: "0 0 15px rgba(255, 255, 255, 0.8)",
        "glow-green": "0 0 10px 2px rgba(34, 197, 94, 0.6)", // green glow
        "glow-red": "0 0 10px 2px rgba(239, 68, 68, 0.6)", // red glow
      },
    },
  },
  plugins: [],
};
export default config;
