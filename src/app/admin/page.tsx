import { Users, Activity, DollarSign, Database, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage users, view system analytics, and monitor performance.</p>
        </div>
        <Link href="/dashboard" className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-medium shadow-sm hover:bg-slate-50 transition-colors">
          Return to App
        </Link>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Users</p>
              <h3 className="text-2xl font-bold mt-1">12,450</h3>
              <p className="text-xs text-green-600 flex items-center mt-2">+12% from last month</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Subscriptions</p>
              <h3 className="text-2xl font-bold mt-1">3,200</h3>
              <p className="text-xs text-green-600 flex items-center mt-2">+5% from last month</p>
            </div>
            <div className="p-3 rounded-xl bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Meetings Processed</p>
              <h3 className="text-2xl font-bold mt-1">145k</h3>
              <p className="text-xs text-green-600 flex items-center mt-2">+24% from last month</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Storage Used</p>
              <h3 className="text-2xl font-bold mt-1">8.4 TB</h3>
              <p className="text-xs text-slate-500 flex items-center mt-2">of 50 TB Total</p>
            </div>
            <div className="p-3 rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400">
              <Database className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Users Table */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Recent Signups</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-sm text-slate-500">
                <th className="py-3 font-medium">User</th>
                <th className="py-3 font-medium">Plan</th>
                <th className="py-3 font-medium">Status</th>
                <th className="py-3 font-medium text-right">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince'].map((name, i) => (
                <tr key={i}>
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-bold">
                      {name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{name}</p>
                      <p className="text-xs text-slate-500">{name.split(' ')[0].toLowerCase()}@example.com</p>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      {i % 2 === 0 ? 'Pro' : 'Free'}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-green-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active
                    </span>
                  </td>
                  <td className="py-4 text-right text-sm text-slate-500">Today</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* System Health Logs */}
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            System Logs
          </h2>
          <div className="space-y-4">
            {[
              { type: 'error', msg: 'Failed to transcribe meeting #8912', time: '10 mins ago' },
              { type: 'warn', msg: 'High memory usage on API Worker 3', time: '1 hour ago' },
              { type: 'info', msg: 'Database backup completed successfully', time: '3 hours ago' },
            ].map((log, i) => (
              <div key={i} className={`p-3 rounded-xl border ${log.type === 'error' ? 'border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20' : log.type === 'warn' ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-900/20' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'}`}>
                <p className={`text-sm font-medium ${log.type === 'error' ? 'text-red-700 dark:text-red-400' : log.type === 'warn' ? 'text-yellow-700 dark:text-yellow-500' : 'text-slate-700 dark:text-slate-300'}`}>{log.msg}</p>
                <p className="text-xs text-slate-500 mt-1">{log.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
