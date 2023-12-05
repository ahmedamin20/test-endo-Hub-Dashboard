import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        update: "#3b82f6",
        info: "#22c55e",
        delete: "#EF4444 ",

        nav: "#157fda",
        primary: "#FFFFFF20",
        secondary: {
          light: {
            1: "#39b49b",
            2: "#e0e0e0",
            3: "#bdbdbd",
          },
        },
        third: "#00000020",

        text: {
          p: "#999",
        },
      },
    },
  },
  plugins: [],
};
export default config;
