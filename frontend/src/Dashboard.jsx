import React, { useState } from 'react';
import Sidebar from './components/Sidebar'; 
import { Percent, MessageSquare, Sun, Moon, UserCircle } from 'lucide-react';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [attendance, setAttendance] = useState({ present: '', total: '' });

  // Quick Attendance Logic for Dashboard
  const getBriefStatus = () => {
    const p = parseInt(attendance.present);
    const t = parseInt(attendance.total);
    if (!p || !t) return "Enter details to check status";
    const perc = (p / t) * 100;
    return perc >= 75 ? `🔥 ${perc.toFixed(1)}% - You are safe!` : `⚠️ ${perc.toFixed(1)}% - Shortage alert!`;
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Sidebar yahan dikhega */}
      <Sidebar />

      <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold">Main Dashboard 👋</h2>
            <p className="text-slate-500">Welcome back to Student-Mate AI</p>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
              {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-slate-600" />}
            </button>
            <UserCircle size={40} className="text-indigo-600" />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 1. Quick Attendance Card */}
          <div className={`p-8 rounded-[2.5rem] shadow-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
                <Percent size={24} />
              </div>
              <h3 className="font-bold text-xl">Attendance Tracker</h3>
            </div>
            <div className="space-y-4">
              <input 
                type="number" 
                placeholder="Classes Attended" 
                className="w-full p-4 bg-slate-50 border rounded-2xl outline-none text-slate-900"
                onChange={(e) => setAttendance({ ...attendance, present: e.target.value })}
              />
              <input 
                type="number" 
                placeholder="Total Classes" 
                className="w-full p-4 bg-slate-50 border rounded-2xl outline-none text-slate-900"
                onChange={(e) => setAttendance({ ...attendance, total: e.target.value })}
              />
              <div className="mt-4 p-4 bg-indigo-50 rounded-2xl text-indigo-700 font-bold text-center">
                {getBriefStatus()}
              </div>
            </div>
          </div>

          {/* 2. AI Chatbot Card */}
          <div className={`p-8 rounded-[2.5rem] shadow-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-2xl text-green-600">
                <MessageSquare size={24} />
              </div>
              <h3 className="font-bold text-xl">AI Assistant</h3>
            </div>
            <div className="h-32 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl mb-4">
              <p className="text-slate-400 italic text-sm">Chat interface coming soon...</p>
            </div>
            <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition-all">
              Ask a Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;