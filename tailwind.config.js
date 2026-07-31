/** @type {import('tailwindcss').Config} */
export default {
  content: ["./client/index.html", "./client/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#14201c",
          soft: "#2a3b34",
          muted: "#5c6f66",
        },
        mist: {
          DEFAULT: "#eef3f0",
          soft: "#f6f9f7",
          deep: "#d7e4dd",
        },
        leaf: {
          DEFAULT: "#1f6b52",
          bright: "#278566",
          soft: "#d8efe5",
        },
        sand: {
          DEFAULT: "#f3ebe0",
          warm: "#e8d9c4",
        },
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        sans: ["Figtree", "sans-serif"],
      },
      boxShadow: {
        lift: "0 12px 40px -16px rgba(20, 32, 28, 0.18)",
        soft: "0 4px 20px -8px rgba(20, 32, 28, 0.12)",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fade: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        rise: "rise 0.5s ease-out both",
        "rise-slow": "rise 0.7s ease-out both",
        fade: "fade 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};
