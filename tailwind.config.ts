import type { Config } from 'tailwindcss';

import * as pxToRemModule from 'tailwindcss-preset-px-to-rem';

const pxToRem = pxToRemModule.default ?? pxToRemModule;

const config: Config = {
  presets: [pxToRem],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};
export default config;
