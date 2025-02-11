/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        intermitentOpacity:
          "intermitentOpacity 1s ease-in-out infinite alternate",
      },
      keyframes: {
        intermitentOpacity: {
          "0%": {
            opacity: 0.3,
          },
          "100%": {
            opacity: 0.6,
          },
        },
      },
    },
  },
  plugins: [],
};
