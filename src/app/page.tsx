import PDFViewerWrapper from "@/components/pdf-viewer-wrapper";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-8 text-center">
          PDF Document Viewer
        </h1>

        <PDFViewerWrapper />
      </div>
    </main>
  );
}
