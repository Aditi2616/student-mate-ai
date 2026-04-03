import React, { useState } from 'react';
import Sidebar from './components/Sidebar'; 
import { Percent, MessageSquare, Sun, Moon, UserCircle, Settings } from 'lucide-react';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [attendance, setAttendance] = useState({ present: '', total: '', criteria: '75' });

  // 🎯 Smart Logic inside the card
  const getDetailedStatus = () => {
    const p = parseInt(attendance.present);
    const t = parseInt(attendance.total);
    const target = parseFloat(attendance.criteria) || 75;

    if (!p || !t || t === 0) return { msg: "Enter details to check", color: "text-slate-500", bg: "bg-slate-50" };
    
    const perc = (p / t) * 100;

    if (perc >= target) {
      const bks = Math.floor((p - (target / 100) * t) / (target / 100));
      return { 
        msg: `🔥 ${perc.toFixed(1)}% - You can bunk ${bks} more classes!`, 
        color: "text-green-700", 
        bg: "bg-green-50" 
      };
    } else {
      const req = Math.ceil((target * t - 100 * p) / (100 - target));
      return { 
        msg: `⚠️ ${perc.toFixed(1)}% - Attend next ${req} classes to hit ${target}%`, 
        color: "text-red-700", 
        bg: "bg-red-50" 
      };
    }
  };

  const status = getDetailedStatus();

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Sidebar />
      <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-indigo-900">Main Dashboard 👋</h2>
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
          {/* 📊 Attendance Tracker Card - WITH INLINE CRITERIA */}
          <div className={`p-8 rounded-[2.5rem] shadow-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
                  <Percent size={24} />
                </div>
                <h3 className="font-bold text-xl">Attendance Tracker</h3>
              </div>
              {/* ⚙️ Inline Criteria Input */}
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase">Goal %</span>
                <input 
                  type="number" 
                  value={attendance.criteria}
                  className="w-10 bg-transparent font-bold text-indigo-600 outline-none text-sm"
                  onChange={(e) => setAttendance({ ...attendance, criteria: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 ml-2">ATTENDED</label>
                  <input 
                    type="number" 
                    placeholder="18" 
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-slate-900 font-bold"
                    onChange={(e) => setAttendance({ ...attendance, present: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 ml-2">TOTAL</label>
                  <input 
                    type="number" 
                    placeholder="24" 
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-slate-900 font-bold"
                    onChange={(e) => setAttendance({ ...attendance, total: e.target.value })}
                  />
                </div>
              </div>

              {/* Status Message */}
              <div className={`mt-4 p-5 rounded-2xl font-bold text-center transition-all shadow-inner ${status.bg} ${status.color}`}>
                {status.msg}
              </div>
            </div>
          </div>

          {/* AI Assistant Card (Static for now) */}
          <div className={`p-8 rounded-[2.5rem] shadow-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-2xl text-green-600">
                <MessageSquare size={24} />
              </div>
              <h3 className="font-bold text-xl">AI Assistant</h3>
            </div>
            <div className="h-40 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl mb-4">
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