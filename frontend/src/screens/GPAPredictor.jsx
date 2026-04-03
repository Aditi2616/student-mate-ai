import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Trash2, Zap, Target, Calculator, AlertCircle, CheckCircle, Info } from 'lucide-react';

const GPAPredictor = () => {
  const [subjects, setSubjects] = useState([]);
  const [targetCpi, setTargetCpi] = useState(8.0);
  
  // Semester Config
  const [examConfig, setExamConfig] = useState({ count: 2, m1Total: 30, m2Total: 70 });
  
  const [input, setInput] = useState({ 
    name: '', credits: '4', m1Obtained: ''
  });

  const API_URL = import.meta.env.VITE_API_URL || 'https://student-mate-backend.onrender.com';

  useEffect(() => { fetchSubjects(); }, []);

  const fetchSubjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/subjects`);
      setSubjects(res.data);
    } catch (err) { console.error("Fetch Error:", err); }
  };

  const addSubject = async () => {
    if (!input.name || !input.m1Obtained) return alert("Subject Name aur Pehle exam ke marks bharo!");
    try {
      const res = await axios.post(`${API_URL}/api/subjects`, input);
      setSubjects([res.data, ...subjects]);
      setInput({ name: '', credits: '4', m1Obtained: '' });
    } catch (err) { console.error("Add Error:", err); }
  };

  const deleteSubject = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/subjects/${id}`);
      setSubjects(subjects.filter(s => s._id !== id));
    } catch (err) { console.error("Delete Error:", err); }
  };

  // 🎯 PREDICTION LOGIC: How much needed in Final Exam?
  const getRequiredInFinal = (m1, credits) => {
    const targetPoints = parseFloat(targetCpi); 
    const m1Marks = parseFloat(m1) || 0;
    const totalMax = examConfig.m1Total + examConfig.m2Total;
    
    // Reverse Engineering Grade Points:
    // Target CPI 8 means roughly 75% overall marks needed.
    // Formula: (Total Marks Needed) = (Target % of Total Max)
    // Marks Needed in Final = (Total Needed) - (Already Got in M1)
    
    const approxPercentageNeeded = targetPoints * 10 - 5; // e.g., 8 CPI -> 75%
    const totalMarksNeeded = (approxPercentageNeeded / 100) * totalMax;
    const neededInFinal = totalMarksNeeded - m1Marks;

    if (neededInFinal <= 0) return "Safe! Minimal marks needed.";
    if (neededInFinal > examConfig.m2Total) return "Hard! Need more than 100%";
    return `Need ${neededInFinal.toFixed(1)} / ${examConfig.m2Total}`;
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />
      <div className="flex-1 p-8">
        
        {/* SEMESTER CONFIGURATION BAR */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase ml-2">Exams per Sem</p>
            <input type="number" className="w-full p-3 bg-slate-50 rounded-2xl font-bold" value={examConfig.count} readOnly />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase ml-2">Exam 1 (Mid) Max</p>
            <input type="number" className="w-full p-3 bg-slate-50 rounded-2xl font-bold text-indigo-600" 
              value={examConfig.m1Total} onChange={(e) => setExamConfig({...examConfig, m1Total: parseInt(e.target.value)})} />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase ml-2">Exam 2 (Final) Max</p>
            <input type="number" className="w-full p-3 bg-slate-50 rounded-2xl font-bold text-orange-600" 
              value={examConfig.m2Total} onChange={(e) => setExamConfig({...examConfig, m2Total: parseInt(e.target.value)})} />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* SUBJECT ENTRY */}
          <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-50 h-fit sticky top-8">
            <h3 className="font-black text-xl mb-8 text-slate-800 flex items-center gap-3">
              <Zap size={20} className="text-indigo-600"/> Subject Result
            </h3>
            <div className="space-y-5">
              <input placeholder="Subject Name" className="w-full p-5 bg-slate-50 rounded-[1.5rem] outline-none font-bold" 
                value={input.name} onChange={e => setInput({...input, name: e.target.value})}/>
              <input type="number" placeholder={`Marks in Exam 1 (Max ${examConfig.m1Total})`} 
                className="w-full p-5 bg-slate-50 rounded-[1.5rem] outline-none border-l-4 border-indigo-500"
                value={input.m1Obtained} onChange={e => setInput({...input, m1Obtained: e.target.value})}/>
              <button onClick={addSubject} className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black hover:bg-indigo-600 shadow-lg">
                Calculate Target
              </button>
            </div>
          </div>

          {/* PREDICTION LIST */}
          <div className="xl:col-span-2 space-y-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-2xl text-slate-800">Final Exam Goals</h3>
              <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full">
                <span className="text-xs font-bold text-indigo-600 uppercase">Target CPI: {targetCpi}</span>
              </div>
            </div>

            {subjects.map(sub => {
              const statusMsg = getRequiredInFinal(sub.m1Obtained, sub.credits);
              const isDanger = statusMsg.includes("Hard") || statusMsg.includes("90");

              return (
                <div key={sub._id} className="p-8 bg-white rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-slate-800 text-2xl uppercase tracking-tighter">{sub.name}</h4>
                      <p className="text-slate-400 font-bold text-xs uppercase mt-1">
                        Exam 1: {sub.m1Obtained} / {examConfig.m1Total}
                      </p>
                    </div>
                    <div className={`p-4 rounded-3xl ${isDanger ? 'bg-red-50' : 'bg-green-50'}`}>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${isDanger ? 'text-red-400' : 'text-green-400'}`}>Goal for Final Exam</p>
                      <h5 className={`text-xl font-black ${isDanger ? 'text-red-600' : 'text-green-600'}`}>
                        {statusMsg}
                      </h5>
                    </div>
                    <button onClick={() => deleteSubject(sub._id)} className="p-3 text-slate-100 hover:text-red-500 rounded-full transition-all">
                      <Trash2 size={20}/>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPAPredictor;