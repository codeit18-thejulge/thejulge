import type { Config } from "tailwindcss";

import * as pxToRemModule from "tailwindcss-preset-px-to-rem";
import scrollbarHide from "tailwind-scrollbar-hide";

const pxToRem = pxToRemModule.default ?? pxToRemModule;

const config: Config = {
  presets: [pxToRem],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Spoqa Han Sans Neo", "sans-serif"],
      },
      fontSize: {
        "12-regular": ["0.75rem", { fontWeight: "400" }],
        "14-regular": ["0.875rem", { fontWeight: "400" }],
        "14-bold": ["0.875rem", { fontWeight: "700" }],
        "16-regular": ["1rem", { fontWeight: "400" }],
        "16-bold": ["1rem", { fontWeight: "700" }],
        "18-bold": ["1.125rem", { fontWeight: "700" }],
        "20-bold": ["1.25rem", { fontWeight: "700" }],
        "24-bold": ["1.5rem", { fontWeight: "700" }],
        "28-bold": ["1.75rem", { fontWeight: "700" }],
      },
      colors: {
        white: "var(--white)",
        black: "var(--black)",
        error: "var(--red)",
        primary: "var(--green-50)",
        secondary: "var(--green-10)",
        third: "var(--green-40)",
        "black-overlay": "rgba(0, 0, 0, 0.7)",
        gray: {
          5: "var(--gray-5)",
          10: "var(--gray-10)",
          20: "var(--gray-20)",
          30: "var(--gray-30)",
          40: "var(--gray-40)",
          50: "var(--gray-50)",
        },
        red: {
          10: "var(--red-10)",
          20: "var(--red-20)",
          30: "var(--red-30)",
          40: "var(--red-40)",
        },
        blue: {
          10: "var(--blue-10)",
          20: "var(--blue-20)",
        },
        green: {
          10: "var(--green-10)",
          20: "var(--green-20)",
          30: "var(--green-30)",
          40: "var(--green-40)",
          50: "var(--green-50)",
          60: "var(--green-60)",
        },
      },
      keyframes: {
        "skeleton-shimmer": {
          "0%": { backgroundPosition: "-400% 0" },
          "100%": { backgroundPosition: "400% 0" },
        },
      },
      animation: {
        "skeleton-shimmer": "skeleton-shimmer 15s linear infinite",
        "loading-spinner": "loading-spinner 3s linear infinite alternate",
      },
      screens: {
        mobile: "375px",
        tablet: "744px",
        desktop: "1440px",
      },
    },
  },
  plugins: [scrollbarHide],
};
export default config;
