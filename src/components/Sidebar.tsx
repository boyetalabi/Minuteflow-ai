import Link from 'next/link';
import { 
  LayoutDashboard, 
  Mic, 
  Upload, 
  History, 
  Settings, 
  LogOut,
  CreditCard
} from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 h-screen flex flex-col transition-colors">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="text-xl font-bold tracking-tight">MinuteFlow</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium">
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>
        <Link href="/dashboard/record" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900 font-medium transition-colors">
          <Mic className="w-5 h-5" />
          New Meeting
        </Link>
        <Link href="/dashboard/upload" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900 font-medium transition-colors">
          <Upload className="w-5 h-5" />
          Upload File
        </Link>
        <Link href="/dashboard/history" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900 font-medium transition-colors">
          <History className="w-5 h-5" />
          Meeting History
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl mb-4">
          <h4 className="text-sm font-medium mb-2">Storage Used</h4>
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-[45%]"></div>
          </div>
          <p className="text-xs text-slate-500 mt-2">450MB of 2GB (Free Plan)</p>
        </div>

        <Link href="/dashboard/billing" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900 transition-colors">
          <CreditCard className="w-4 h-4" />
          Subscription
        </Link>
        <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900 transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
          <LogOut className="w-4 h-4" />
          Log out
        </button>
      </div>
    </aside>
  );
}
