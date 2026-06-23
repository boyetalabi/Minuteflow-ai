import Link from 'next/link';
import { Mic, FileText, Users, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <header className="w-full flex justify-between items-center p-6 lg:px-12 glass z-10 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="text-xl font-bold tracking-tight">MinuteFlow AI</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
          <Link href="#about" className="hover:text-blue-600 transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Log in
          </Link>
          <Link href="/dashboard" className="px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 shadow-lg shadow-slate-900/20">
            Get Started
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10 mt-20 md:mt-32 mb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium border border-blue-100 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            Introducing MinuteFlow 2.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Your meetings, <br/>
            <span className="text-gradient">perfectly documented.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            AI-powered meeting assistant that records, transcribes, identifies speakers, and organizes your discussions into professional minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white text-lg font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
              Start for free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#demo" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-700 text-lg font-medium hover:bg-slate-50 transition-all shadow-md border border-slate-200 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700">
              Watch Demo
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-32 w-full">
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center gap-4 transform transition-all hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center dark:bg-blue-900/50 dark:text-blue-400">
              <Mic className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold">Live Transcription</h3>
            <p className="text-slate-600 dark:text-slate-400">High-accuracy real-time transcription with active speaker detection and timestamps.</p>
          </div>
          
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center gap-4 transform transition-all hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center dark:bg-indigo-900/50 dark:text-indigo-400">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold">Speaker Diarization</h3>
            <p className="text-slate-600 dark:text-slate-400">Automatically identifies and labels different speakers in your conversation.</p>
          </div>
          
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center gap-4 transform transition-all hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center dark:bg-purple-900/50 dark:text-purple-400">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold">AI Meeting Minutes</h3>
            <p className="text-slate-600 dark:text-slate-400">Generates professional summaries, action items, and decisions instantly.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
