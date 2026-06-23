'use client';

import { useState, useCallback } from 'react';
import { UploadCloud, FileAudio, FileVideo, X, CheckCircle2 } from 'lucide-react';

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    const validTypes = ['audio/mp3', 'audio/wav', 'audio/m4a', 'video/mp4'];
    // For MVP, we skip strict type checking to allow varied formats
    setFile(selectedFile);
    setProgress(0);
    setIsComplete(false);
  };

  const simulateUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsComplete(true);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const clearFile = () => {
    setFile(null);
    setProgress(0);
    setIsComplete(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Upload Meeting</h1>
        <p className="text-slate-500 mt-1">Upload an audio or video file to generate transcripts and minutes.</p>
      </div>

      <div className="glass-panel rounded-3xl p-8 lg:p-12">
        {!file ? (
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
              isDragging 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' 
                : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center mb-6">
              <UploadCloud className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Drag & drop your file here</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              Supported formats: MP3, WAV, M4A, MP4. Maximum file size is 2GB.
            </p>
            
            <label className="cursor-pointer inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition-colors">
              <span>Browse Files</span>
              <input 
                type="file" 
                className="hidden" 
                accept="audio/*,video/mp4" 
                onChange={handleFileChange}
              />
            </label>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  {file.type.includes('video') ? <FileVideo className="w-6 h-6" /> : <FileAudio className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-sm">
                    {file.name}
                  </h4>
                  <p className="text-sm text-slate-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type || 'Unknown format'}
                  </p>
                </div>
              </div>
              {!isUploading && !isComplete && (
                <button onClick={clearFile} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mb-2 flex justify-between text-sm font-medium">
              <span className="text-slate-700 dark:text-slate-300">
                {isComplete ? 'Upload complete' : isUploading ? 'Uploading...' : 'Ready to upload'}
              </span>
              <span className="text-blue-600 dark:text-blue-400">{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 mb-6 overflow-hidden">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {!isUploading && !isComplete && (
              <div className="flex justify-end gap-3">
                <button onClick={clearFile} className="px-5 py-2.5 rounded-xl font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  Cancel
                </button>
                <button onClick={simulateUpload} className="px-5 py-2.5 rounded-xl font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all">
                  Start Upload
                </button>
              </div>
            )}
            
            {isComplete && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">File successfully processed!</span>
                </div>
                <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-medium bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 shadow-md transition-all">
                  View Meeting Minutes
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
