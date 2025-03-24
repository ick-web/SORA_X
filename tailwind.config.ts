import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "color-orange1": "#FA6616",
        "color-orange2": "#FF7D36",
        "color-orange3": "#FF9E6A",
        "color-orange4": "#FFCEB4",
        "color-black1": "#343434",
        "color-black2": "#454545",
        "color-green": "#A1FF2F",
      },
    },
  },
  plugins: [],
};
export default config;
