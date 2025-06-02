"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import PremiumSummary from "../pdf-templates/premium-summary";
import QuestionsTemplate from "../pdf-templates/questions-template";

const PDFViewer = dynamic(() => import("./pdf-viewer"), { ssr: false });

type DocumentType = "premium-summary" | "questions";

const PDFViewerWrapper = () => {
  const [documentType, setDocumentType] =
    useState<DocumentType>("premium-summary");

  const getDocumentDetails = () => {
    switch (documentType) {
      case "questions":
        return {
          document: <QuestionsTemplate />,
          fileName: "questions.pdf",
        };
      case "premium-summary":
      default:
        return {
          document: <PremiumSummary />,
          fileName: "premium-summary.pdf",
        };
    }
  };

  const { document, fileName } = getDocumentDetails();

  return (
    <div className="w-full h-[calc(100vh-50px)] mx-auto p-6 bg-white/50 dark:bg-black/10 rounded-xl backdrop-blur-sm">
      <div className="mb-4">
        <label className="mr-2 font-medium text-gray-700">
          Select Document Type:
        </label>
        <select
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value as DocumentType)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="premium-summary">Premium Summary</option>
          <option value="questions">Questions Template</option>
        </select>
      </div>
      <PDFViewer document={document} fileName={fileName} />
    </div>
  );
};

export default PDFViewerWrapper;
