'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Pause, Play, AlertCircle, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock live transcript sentences
const mockSentences = [
  { speaker: "Speaker 1", text: "We need to complete the product by Friday.", delay: 2000 },
  { speaker: "Speaker 2", text: "Backend API is already completed.", delay: 6000 },
  { speaker: "Speaker 1", text: "Excellent. Let's focus on the frontend UI next.", delay: 10000 },
];

export default function RecordPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [liveTranscript, setLiveTranscript] = useState<{speaker: string, text: string}[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        // In a real app, this blob would be sent to the backend
        console.log("Recording stopped, blob created:", audioBlob.size, "bytes");
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      setIsPaused(false);
      setError(null);
      
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      // Simulate live transcription appearing
      setLiveTranscript([]);
      mockSentences.forEach((sentence) => {
        setTimeout(() => {
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            setLiveTranscript(prev => [...prev, sentence]);
          }
        }, sentence.delay);
      });

    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("Microphone access denied or not available. Please check your permissions.");
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setIsPaused(false);
      setRecordingTime(0);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">New Meeting</h1>
        <p className="text-slate-500 mt-1">Record your meeting directly from the browser.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      <div className="glass-panel rounded-3xl p-8 flex flex-col items-center justify-center min-h-[400px]">
        {/* Timer Display */}
        <div className={`text-6xl font-light tracking-tighter mb-12 ${isRecording && !isPaused ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>
          {formatTime(recordingTime)}
        </div>

        {/* Real-time Waveform Animation (Mock) */}
        <div className="flex items-center justify-center gap-1.5 h-24 mb-12">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 rounded-full ${isRecording && !isPaused ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-800'}`}
              animate={isRecording && !isPaused ? {
                height: [20, Math.random() * 80 + 20, 20]
              } : { height: 8 }}
              transition={{
                repeat: Infinity,
                duration: 0.5 + Math.random() * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 text-white font-medium text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30"
            >
              <Mic className="w-6 h-6" />
              Start Recording
            </button>
          ) : (
            <>
              {isPaused ? (
                <button
                  onClick={resumeRecording}
                  className="flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 shadow-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition-all"
                >
                  <Play className="w-6 h-6" />
                </button>
              ) : (
                <button
                  onClick={pauseRecording}
                  className="flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                >
                  <Pause className="w-6 h-6" />
                </button>
              )}
              
              <button
                onClick={stopRecording}
                className="flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white shadow-lg shadow-red-600/30 hover:bg-red-700 transition-all"
              >
                <Square className="w-6 h-6 fill-current" />
              </button>
            </>
          )}
        </div>
        
        
        {isRecording && (
          <div className="mt-12 w-full max-w-2xl text-left">
            <div className="flex items-center gap-2 mb-4 text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-2">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Live Transcript</span>
              <span className="ml-auto flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            </div>
            
            <div className="space-y-4 max-h-[200px] overflow-y-auto pr-4 custom-scrollbar">
              {liveTranscript.length === 0 && (
                <p className="text-slate-400 italic text-sm">Listening for audio...</p>
              )}
              {liveTranscript.map((entry, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx} 
                  className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3"
                >
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 block mb-1">{entry.speaker}</span>
                  <span className="text-slate-700 dark:text-slate-300">{entry.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
