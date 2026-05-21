export default {
  darkMode: "class",
  content: ["./index.html", "./src/frontend/src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f7f9fb",
        surface: "#ffffff",
        "surface-muted": "#f2f4f6",
        "surface-soft": "#e6e8ea",
        primary: "#001e40",
        "primary-container": "#003366",
        "primary-soft": "#d5e3ff",
        "primary-accent": "#799dd6",
        secondary: "#526069",
        "secondary-container": "#d3e2ed",
        outline: "#c3c6d1",
        "on-surface": "#191c1e",
        "on-muted": "#43474f",
        success: "#0f7b45",
        danger: "#ba1a1a",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.03)",
        float: "0 16px 40px rgba(0, 30, 64, 0.12)",
      },
    },
  },
  plugins: [],
};
