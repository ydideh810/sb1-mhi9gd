import React, { useState, useRef } from 'react';
import { Upload, Download, File } from 'lucide-react';

interface FileItem {
  name: string;
  size: number;
  type: string;
}

export default function FileTransfer() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      setFiles([...files, ...newFiles]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-4 h-[60vh] flex flex-col">
      <div className="flex gap-2 mb-4">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="crt-button flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload Files
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-2 border border-[#B20000] rounded"
          >
            <File className="w-6 h-6" />
            <div className="flex-1">
              <div className="font-bold">{file.name}</div>
              <div className="text-sm opacity-70">{formatFileSize(file.size)}</div>
            </div>
            <button className="crt-button">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
        {files.length === 0 && (
          <div className="text-center p-4 border border-dashed border-[#B20000] rounded">
            No files uploaded yet
          </div>
        )}
      </div>
    </div>
  );
}