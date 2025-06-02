"use client";

import React, { useState, useEffect, ReactElement } from "react";
import {
  PDFDownloadLink,
  PDFViewer as ReactPDFViewer,
  Document as PDFDocument,
} from "@react-pdf/renderer";

interface PDFViewerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: ReactElement<any, typeof PDFDocument>;
  fileName?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  document,
  fileName = "document.pdf",
}) => {
  // State to track if we're on client-side
  const [isClient, setIsClient] = useState(false);
  // State to track if the user wants to view the PDF in the browser
  const [showPreview, setShowPreview] = useState(false);

  // Set isClient to true once component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex justify-center items-center p-4 border rounded-lg bg-gray-100">
        <p>Loading PDF viewer...</p>
      </div>
    );
  }

  if (!isClient) {
    return (
      <div className="flex justify-center items-center p-4 border rounded-lg bg-gray-100 h-full">
        <p>Loading PDF viewer...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <div key={fileName + "download"} className="flex gap-4 justify-center">
        {isClient && (
          <PDFDownloadLink
            document={document}
            fileName={fileName}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {({ loading }) =>
              loading ? "Preparing document..." : "Download PDF"
            }
          </PDFDownloadLink>
        )}

        <button
          onClick={() => setShowPreview(!showPreview)}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </div>

      {showPreview && isClient && (
        <div
          key={fileName + "preview"}
          className="border rounded-lg overflow-hidden h-full mt-4"
        >
          <ReactPDFViewer style={{ width: "100%", height: "100%" }}>
            {document}
          </ReactPDFViewer>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
