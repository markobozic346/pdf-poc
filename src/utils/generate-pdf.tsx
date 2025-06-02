import PremiumSummaryTemplate from "@/pdf-templates/premium-summary";
import QuestionsTemplate from "@/pdf-templates/questions-template";
import { renderToBuffer, Font } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import React from "react";

interface ThemeColors {
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string;
  text?: string;
  [key: string]: string | undefined;
}

const registerFonts = () => {
  Font.register({
    family: "Spectral",
    fonts: [
      {
        src: "http://localhost:3000/spectral/Spectral-Regular.ttf",
        fontWeight: 400,
      },
      {
        src: "http://localhost:3000/spectral/Spectral-Medium.ttf",
        fontWeight: 500,
      },
      {
        src: "http://localhost:3000/spectral/Spectral-SemiBold.ttf",
        fontWeight: 600,
      },
      {
        src: "http://localhost:3000/spectral/Spectral-Bold.ttf",
        fontWeight: 700,
      },
    ],
  });
};

const createCustomTw = (colors: ThemeColors = {}) => {
  const defaultColors = {
    primary: "#214850",
    secondary: "#555f72",
    accent: "#f26522",
    background: "#f6f7f8",
    text: "#333333",
  };

  const mergedColors = { ...defaultColors, ...colors };

  return createTw({
    theme: {
      fontFamily: {
        spectral: ["Spectral"],
      },
      extend: {
        colors: {
          primary: mergedColors.primary,
          secondary: mergedColors.secondary,
          accent: mergedColors.accent,
          background: mergedColors.background,
          text: mergedColors.text,
          grayscale: {
            100: mergedColors.background,
            200: "#e6e7e8",
            300: "#d1d3d4",
            400: "#bcbec0",
            500: "#a7a9ac",
            600: "#939598",
            700: "#808184",
            800: "#6d6e71",
            900: "#58595b",
          },
          ...colors,
        },
      },
    },
  });
};

const generatePDF = async (options?: {
  colors?: ThemeColors;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>;
  template?: string;
}): Promise<Buffer> => {
  try {
    const {
      colors = {},
      data = {},
      template = "premium-summary",
    } = options || {};

    registerFonts();

    const customTw = createCustomTw(colors);

    // Render the selected template
    switch (template) {
      case "questions":
        return await renderToBuffer(
          <QuestionsTemplate tw={customTw} {...data} />
        );
      case "premium-summary":
      default:
        return await renderToBuffer(
          <PremiumSummaryTemplate tw={customTw} {...data} />
        );
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};

export default generatePDF;
