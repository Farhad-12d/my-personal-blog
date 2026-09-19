import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#12181B", // near-black, blue-green cast — background
        paper: "#F2EFE9", // warm off-white — text on dark
        brass: "#C98A3E", // primary accent
        moss: "#4B6358", // secondary accent
        line: "#2A3338", // hairlines / dividers on dark
        muted: "#8B9296", // secondary text / metadata
        // light-mode counterparts
        "paper-light": "#FBFAF7",
        "ink-light": "#1B2124",
        "line-light": "#E4E0D8",
        "muted-light": "#71767A",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
      typography: ({ theme }: any) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.ink-light"),
            "--tw-prose-headings": theme("colors.ink-light"),
            "--tw-prose-links": theme("colors.brass"),
            "--tw-prose-bold": theme("colors.ink-light"),
            "--tw-prose-quotes": theme("colors.muted-light"),
            "--tw-prose-quote-borders": theme("colors.moss"),
            "--tw-prose-code": theme("colors.ink-light"),
            "--tw-prose-hr": theme("colors.line-light"),
            maxWidth: "68ch",
            fontFamily: theme("fontFamily.serif").join(", "),
            a: { textDecoration: "underline", textUnderlineOffset: "3px" },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
