import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "brand-green": "#AEF396",
      "brand-red": "#F39696",
      "brand-yellow": "#F3DF96",
      "brand-purple-light": "#B097F6",
      "brand-purple-mid": "#562DCA",
      "brand-purple-dark": "#18151E",
      "brand-purple-trans-2": "#B097F67b",
      "brand-purple-trans-3": "#B097F655",
      "brand-purple-trans-4": "#B097F63E",
      "brand-white-trans-2": "#ffffff7b",
      transparent: "transparent",
      white: "white",
      black: "black",
    },
  },
  plugins: [],
};
export default config;
