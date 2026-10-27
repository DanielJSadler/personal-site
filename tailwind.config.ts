import { type Config } from "tailwindcss";


export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
      },

      colors: {
        eerieBlack: "#222222",
        lapisLazuli: "#1C5D99",
        moonStone: "#639FAB",
        powederBlue: "#BBCDE5",
      },
    },
    variants: {
      extend: {
        scale: ["before", "hover", "hover:before"],
        translate: ["before"],
      },
    },
  },
  plugins: [],
} satisfies Config;
