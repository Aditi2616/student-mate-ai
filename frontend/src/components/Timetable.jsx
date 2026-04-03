import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle2, Clock, CalendarDays } from 'lucide-react';

const Timetable = ({ attendancePercent }) => {
  const [dayName, setDayName] = useState("");
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = days[new Date().getDay()];
    setDayName(today);

    // Ye data student baad mein settings se change kar payega
    const mockData = {
      "Monday": ["DSA (10:00 AM)", "OS (11:30 AM)", "Maths (2:00 PM)"],
      "Tuesday": ["Web Dev (9:00 AM)", "Machine Learning (11:00 AM)"],
      "Wednesday": ["Aptitude (10:00 AM)", "Communication (1:00 PM)"],
      "Thursday": ["DBMS (10:00 AM)", "Java (11:30 AM)", "Project (2:00 PM)"],
      "Friday": ["Compiler Design (9:00 AM)", "Python (11:00 AM)"],
      "Saturday": [], "Sunday": []
    };
    setSchedule(mockData[today] || []);
  }, []);

  const isCritical = attendancePercent < 75;

  return (
    <div className={`p-6 rounded-[2.5rem] border shadow-xl transition-all h-full flex flex-col justify-between ${isCritical ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-white rounded-2xl shadow-sm">
            <CalendarDays size={20} className={isCritical ? 'text-red-500' : 'text-green-500'} />
          </div>
          {isCritical ? <AlertTriangle className="text-red-500 animate-pulse" /> : <CheckCircle2 className="text-green-500" />}
        </div>
        
        <h3 className="font-black text-xl text-slate-800 mb-1">{dayName}'s Schedule</h3>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Daily Necessity Report</p>

        <div className="space-y-3">
          {schedule.length > 0 ? schedule.map((cls, i) => (
            <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-600 bg-white/60 p-3 rounded-2xl border border-white/50">
              <Clock size={12} className="text-slate-400" /> {cls}
            </div>
          )) : <p className="text-center py-4 text-slate-400 font-bold italic text-sm">No classes today! 🎉</p>}
        </div>
      </div>

      <div className={`mt-6 p-4 rounded-2xl text-center font-black text-[10px] uppercase tracking-[0.2em] shadow-md ${isCritical ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
        {isCritical ? "Attendance Mandatory ⚠️" : "Safe to Bunk Today 😎"}
      </div>
    </div>
  );
};

export default Timetable;