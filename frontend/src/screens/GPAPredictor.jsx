import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Plus, Trash2, Zap, Target, Trophy, Calculator, AlertCircle } from 'lucide-react';

const GPAPredictor = () => {
  const [subjects, setSubjects] = useState([]);
  const [targetCpi, setTargetCpi] = useState(8.0);
  const [input, setInput] = useState({ 
    name: '', mid: '', midTotal: '30', end: '0', endTotal: '45', credits: '4', attended: '', totalClasses: '' 
  });

  useEffect(() => { fetchSubjects(); }, []);

  const fetchSubjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/subjects');
      // Har subject ke liye simulation 'end' marks 0 se start honge
      setSubjects(res.data.map(s => ({ ...s, end: 0 })));
    } catch (err) { console.error("Fetch Error:", err); }
  };

  const addSubject = async () => {
    if (!input.name || !input.mid) return alert("Subject Name aur Mid marks bharo bhai!");
    try {
      const res = await axios.post('http://localhost:5000/api/subjects', input);
      setSubjects([{ ...res.data, end: 0 }, ...subjects]);
      setInput({ name: '', mid: '', midTotal: '30', end: '0', endTotal: '45', credits: '4', attended: '', totalClasses: '' });
    } catch (err) { console.error("Add Error:", err); }
  };

  const deleteSubject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/subjects/${id}`);
      setSubjects(subjects.filter(s => s._id !== id));
    } catch (err) { console.error("Delete Error:", err); }
  };

  // 75% Attendance Alert Logic
  const getAttStatus = (att, tot) => {
    const a = parseInt(att) || 0;
    const t = parseInt(tot) || 0;
    if (t === 0) return { p: 0, msg: "No Classes", safe: true };
    const perc = (a / t) * 100;

    if (perc >= 75) {
      const bks = Math.floor((a - (0.75 * t)) / 0.75);
      return { p: perc.toFixed(1), msg: bks > 0 ? `${bks} Bunks Left` : "On Edge", safe: true };
    } else {
      const req = Math.ceil((0.75 * t - a) / 0.25);
      return { p: perc.toFixed(1), msg: `Attend ${req} more classes`, safe: false };
    }
  };

  const calculateCPI = () => {
    let pts = 0, crd = 0;
    subjects.forEach(sub => {
      const m = Number(sub.mid) || 0;
      const e = Number(sub.end) || 0;
      const mt = Number(sub.midTotal) || 30;
      const et = Number(sub.endTotal) || 45;
      const perc = ((m + e) / (mt + et)) * 100;
      
      let gp = perc >= 90 ? 10 : perc >= 80 ? 9 : perc >= 70 ? 8 : perc >= 60 ? 7 : perc >= 50 ? 6 : perc >= 40 ? 5 : 0;
      pts += (gp * Number(sub.credits));
      crd += Number(sub.credits);
    });
    return crd > 0 ? (pts / crd).toFixed(2) : "0.00";
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />
      <div className="flex-1 p-8">
        {/* BIG ANALYTICS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-indigo-900">
          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl flex items-center justify-between">
            <div><p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">Simulated CPI</p><h2 className="text-6xl font-black">{calculateCPI()}</h2></div>
            <Calculator size={56} className="opacity-20" />
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex items-center justify-between shadow-sm">
            <div><p className="text-[10px] font-black text-slate-400 uppercase">Target</p>
            <input type="number" step="0.1" className="text-4xl font-black text-indigo-600 outline-none w-24 bg-transparent" value={targetCpi} onChange={(e) => setTargetCpi(e.target.value)} /></div>
            <Target size={36} className="text-slate-100" />
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex items-center gap-5 shadow-sm">
            <div className={`p-4 rounded-3xl ${calculateCPI() >= targetCpi ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}><Trophy size={36}/></div>
            <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
            <h4 className="text-2xl font-black text-slate-700">{calculateCPI() >= targetCpi ? "On Track! 🔥" : "Push Harder"}</h4></div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* ENTRY FORM */}
          <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-50 h-fit sticky top-8">
            <h3 className="font-black text-xl mb-8 text-slate-800 flex items-center gap-3"><Zap size={20} className="text-indigo-600"/> New Entry</h3>
            <div className="space-y-5">
              <input placeholder="Subject Name" className="w-full p-5 bg-slate-50 rounded-[1.5rem] outline-none font-bold text-slate-700" value={input.name} onChange={e => setInput({...input, name: e.target.value})}/>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Mid Score" className="p-5 bg-slate-50 rounded-[1.5rem] outline-none" value={input.mid} onChange={e => setInput({...input, mid: e.target.value})}/>
                <input type="number" placeholder="Credits" className="p-5 bg-slate-50 rounded-[1.5rem] outline-none font-bold" value={input.credits} onChange={e => setInput({...input, credits: e.target.value})}/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Attended" className="p-5 bg-slate-50 rounded-[1.5rem] outline-none text-sm" value={input.attended} onChange={e => setInput({...input, attended: e.target.value})}/>
                <input type="number" placeholder="Total" className="p-5 bg-slate-50 rounded-[1.5rem] outline-none text-sm" value={input.totalClasses} onChange={e => setInput({...input, totalClasses: e.target.value})}/>
              </div>
              <button onClick={addSubject} className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black hover:bg-indigo-600 transition-all shadow-lg active:scale-95">Add Subject</button>
            </div>
          </div>

          {/* INSIGHTS LIST */}
          <div className="xl:col-span-2 space-y-5">
            <h3 className="font-black text-2xl text-slate-800 tracking-tight mb-4">Subject Simulation Insights</h3>
            {subjects.map(sub => {
              const att = getAttStatus(sub.attended, sub.totalClasses);
              return (
                <div key={sub._id} className="p-8 bg-white rounded-[3.5rem] border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-6 hover:shadow-xl transition-all group">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <h4 className="font-black text-slate-800 text-2xl tracking-tighter uppercase">{sub.name}</h4>
                      <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 ${att.safe ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600 animate-pulse'}`}>
                        {!att.safe && <AlertCircle size={14}/>}
                        <span className="text-[11px] font-black uppercase tracking-widest">{att.p}% Att — {att.msg}</span>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex gap-16">
                      <div><p className="text-[10px] font-black text-slate-300 uppercase mb-2">Mid Term</p><p className="font-black text-slate-700 text-2xl">{sub.mid} <span className="text-slate-300 text-sm">/ {sub.midTotal}</span></p></div>
                      <div>
                        <p className="text-[10px] font-black text-indigo-400 uppercase mb-2 tracking-widest font-bold">End Term Simulation</p>
                        <div className="flex items-center gap-3">
                          <input type="number" className="w-24 p-4 bg-indigo-50 border-2 border-indigo-100 rounded-2xl text-center font-black text-indigo-600 outline-none focus:border-indigo-400 text-xl" value={sub.end} onChange={(e) => setSubjects(subjects.map(s => s._id === sub._id ? {...s, end: e.target.value} : s))} />
                          <span className="text-slate-300 font-bold text-lg">/ {sub.endTotal}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => deleteSubject(sub._id)} className="p-5 text-slate-100 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                    <Trash2 size={28}/>
                  </button>
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