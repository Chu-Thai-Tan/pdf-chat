"use client";

import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pdfFile, setPdfFile] = useState<any>(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let selectedFiles = e.target.files?.[0];
    if (selectedFiles) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFiles);
      reader.onload = (e) => {
        setPdfFile(e.target?.result);
      };
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input
        ref={inputRef}
        type="file"
        name="Add pdf file"
        id=""
        accept="application/pdf"
        onChange={handleChange}
      />
      Test
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        {pdfFile && (
          <div className="w-700 h-750">
            <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
          </div>
        )}
      </Worker>
    </main>
  );
}
