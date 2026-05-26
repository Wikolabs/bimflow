import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Orbitron'", "sans-serif"],
        body: ["'Oxanium'", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
