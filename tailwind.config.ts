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
        "color-black1": "#292929",
        "color-black2": "#3D3D3D",
        "color-black3": "#616161",
        "color-black4": "#7D7D7D",
        "color-green": "#A1FF2F",
      },
    },
  },
  plugins: [],
};
export default config;
