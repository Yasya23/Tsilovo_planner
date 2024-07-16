import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  extend: {
    keyframes: {
      colorChange: {
        '0%': { 'background-position': '0 0' },
        '100%': { 'background-position': '100% 0' },
      },
    },
    animation: {
      colorChange: 'colorChange 0.5s forwards',
    },
    backgroundSize: {
      '200%': '200%',
    },
  },
  plugins: [],
};
export default config;
