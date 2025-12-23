/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "soft-beige": "#FFFEFB",
        // "blackish": "#241969"
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-6deg)" },
          "25%": { transform: "rotate(6deg)" },
          "50%": { transform: "rotate(-6deg)" },
          "75%": { transform: "rotate(6deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1.2s ease-in-out infinite",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        source: ["Source Sans 3", "sans-serif"],
        plex: ["IBM Plex Sans", "sans-serif"],
        jetbrains: ["JetBrains Mono", "monospace"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
