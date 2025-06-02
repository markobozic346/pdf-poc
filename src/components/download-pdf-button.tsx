/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

interface DownloadPDFButtonProps {
  template?: string;
  data?: Record<string, any>;
  className?: string;
  children?: React.ReactNode;
}

const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({
  template = "premium-summary",
  data,
  className = "",
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const downloadPDF = async () => {
    try {
      setIsLoading(true);

      let url = `/api/generate-pdf?template=${template}`;
      let options: RequestInit = {
        method: "GET",
      };

      // If data is provided, use POST method
      if (data) {
        url = "/api/generate-pdf";
        options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Create a blob from the PDF stream
      const blob = await response.blob();

      // Create a link element to trigger the download
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${template}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Clean up the URL object
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Failed to download PDF:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={downloadPDF}
      disabled={isLoading}
      className={`px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition-colors disabled:opacity-50 ${className}`}
    >
      {isLoading ? "Generating PDF..." : children || "Download PDF"}
    </button>
  );
};

export default DownloadPDFButton;
