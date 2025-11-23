"use client";

import Link from 'next/link';
import { useRef, useState } from 'react';

export default function TestingPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files).filter(file => {
      const ext = file.name.split('.').pop()?.toLowerCase();
      return ext === 'tflite' || ext === 'onnx' || ext === 'pt';
    });
    setSelectedFiles(prev => [...prev, ...fileArray]);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <div className="min-h-screen p-8 font-mono text-walrus-dark bg-walrus-light">
      <header className="mb-12 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:underline">
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-black uppercase tracking-tighter">
          Test Your Model
        </h1>
      </header>

      <main className="max-w-4xl mx-auto border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white text-black">
        <div className="mb-8 text-center">
          <p className="text-xl mb-4">Upload your .tflite, .onnx, or .pt files here.</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".tflite,.onnx,.pt"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
          <div
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed border-black p-12 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all ${
              isDragging ? 'bg-gray-200 border-4' : ''
            }`}
          >
            <p className="text-2xl font-bold">DRAG & DROP</p>
            <p className="text-sm mt-2">or click to browse</p>
          </div>
          {selectedFiles.length > 0 && (
            <div className="mt-4 text-left">
              <p className="font-bold mb-2">Selected files:</p>
              <ul className="list-disc list-inside">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="text-sm">
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex justify-center">
          <button 
            className="bg-black text-white text-xl font-bold py-4 px-12 hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(128,128,128,1)] transition-all border-2 border-transparent"
            disabled={selectedFiles.length === 0}
          >
            INITIATE TEST PROTOCOL
          </button>
        </div>
      </main>
    </div>
  );
}

