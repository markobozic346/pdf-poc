import { Font } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

// // Register Spectral font using local font files
Font.register({
  family: "Spectral",
  fonts: [
    { src: "http://localhost:3000/spectral/Spectral-Regular.ttf", fontWeight: 400 },
    { src: "http://localhost:3000/spectral/Spectral-Medium.ttf", fontWeight: 500 },
    { src: "http://localhost:3000/spectral/Spectral-SemiBold.ttf", fontWeight: 600 },
    { src: "http://localhost:3000/spectral/Spectral-Bold.ttf", fontWeight: 700 },
  ],
});

export const defaultTw = createTw({
  theme: {
    fontFamily: {
      // sans: ["General Sans"],
      spectral: ["Spectral"],
    },
    extend: {
      colors: {
        brand: {
          50: "#feeee7",
          100: "#fce1d4",
          200: "#fac2a8",
          300: "#f7a078",
          400: "#f5824d",
          500: "#f26522",
          600: "#cf4a0c",
          700: "#9a3709",
          800: "#6a2606",
          900: "#351303",
          950: "#180901",
        },
        
        grayscale: {
          50: "#f6f7f8",
          100: "#ebecf0",
          200: "#d6dae1",
          300: "#c2c7d1",
          400: "#adb4c2",
          500: "#9aa3b4",
          600: "#727f97",
          700: "#555f72",
          800: "#383f4c",
          900: "#1c2026",
          950: "#0f1114",
          body: "#747F95",
        },
        
        primary: "#214850", 
        secondary: "#F3F4ED",
        accent: "#214850", 
        
        table: {
          header: {
            bg: "#214850", 
            text: "#ffffff",
          },
          border: "#c2c7d1",
          row: {
            even: "#f6f7f8",
            odd: "#ffffff", 
          },
        },
        
        border: {
          DEFAULT: "#f26522",
          lighter: "#f7a078", 
          grayscale: {
            DEFAULT: "#c2c7d1", 
            lighter: "#d6dae1", 
            darker: "#727f97", 
          },
        },
        
        background: "#ffffff", 
        foreground: "#6a2a07", 
      },
      
      backgroundImage: {
        "brand-gradient": "linear-gradient(to right, #f6b592, #CB4E0B)",
      },
      
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
});

export const tw = defaultTw
