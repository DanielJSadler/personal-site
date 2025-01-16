import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

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
  plugins: [require("@tailwindcss/container-queries")],
} satisfies Config;
