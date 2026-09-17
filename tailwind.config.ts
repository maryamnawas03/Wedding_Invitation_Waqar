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
        brown: {
          50: "#FAF6F3",
          100: "#F2E8E1",
          200: "#E3D0C3",
          300: "#C8A793",
          400: "#AA7F65",
          DEFAULT: "#8C6D58", // Warm primary brown
          dark: "#4A3B32",   // Deep luxury brown
        },
        salmon: {
          50: "#FDF6F5",
          100: "#FBECE9",
          200: "#F6D6D0",
          300: "#EEB2A7",
          400: "#E89D93",
          DEFAULT: "#E2877A", // Luxurious Salmon Pink
          dark: "#B85C4F",
        },
        gray: {
          50: "#FAFAFA",
          100: "#F4F4F5",
          200: "#E4E4E7",
          300: "#D4D4D8",
          DEFAULT: "#71717A", // Slate soft grey
          dark: "#27272A",
        },
        cream: {
          DEFAULT: "#FAF7F2", // Creamy background surface
          light: "#FDFBF7",
          dark: "#F0E9DF",
        }
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        cinzel: ["var(--font-cinzel)", "Georgia", "serif"],
        script: ["var(--font-pinyon)", "cursive"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "luxury-gradient": "linear-gradient(135deg, #FDFBF7 0%, #FAF7F2 50%, #F5EFEA 100%)",
        "salmon-gradient": "linear-gradient(135deg, #E89D93 0%, #F4C5BE 50%, #E89D93 100%)",
        "brown-gradient": "linear-gradient(135deg, #4A3B32 0%, #8C6D58 100%)",
      },
      boxShadow: {
        "luxury": "0 10px 30px -10px rgba(74, 59, 50, 0.08)",
        "luxury-hover": "0 20px 40px -15px rgba(74, 59, 50, 0.15)",
        "salmon-glow": "0 0 15px rgba(226, 135, 122, 0.25)",
      },
      animation: {
        "fade-in-up": "fadeInUp 1s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(2deg)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
