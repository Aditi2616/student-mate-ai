// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from '../components/Sidebar';
// import { Trash2, Plus, Calculator, Target, TrendingUp, AlertCircle } from 'lucide-react';

// const GPAPredictor = () => {
//   const [subjects, setSubjects] = useState([]);
//   const [targetCpi, setTargetCpi] = useState(8.0);
//   const [examConfig, setExamConfig] = useState({ m1Max: 30, m2Max: 70 });
  
//   // ✅ FIXED: Initial values empty rakhi hain taaki placeholder dikhe
//   const [input, setInput] = useState({ name: '', credits: '', m1: '' });

//   const API_URL = import.meta.env.VITE_API_URL || 'https://student-mate-backend.onrender.com';

//   // Axios Header Configuration
//   const getAuthHeader = () => {
//     const token = localStorage.getItem('token');
//     return { headers: { Authorization: `Bearer ${token}` } };
//   };

//   useEffect(() => { fetchSubjects(); }, []);

//   const fetchSubjects = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/subjects`, getAuthHeader());
//       setSubjects(res.data.map(s => ({ ...s, m2Simulated: 0 })));
//     } catch (err) { 
//       console.error("Fetch Error:", err);
//     }
//   };

//   const addSubject = async () => {
//     // ✅ FIXED: Logic validation
//     if (!input.name || !input.m1 || !input.credits) {
//       return alert("Bhai Subject, Mid marks aur Credits teeno bharo!");
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/subjects`, {
//         name: input.name,
//         credits: input.credits,
//         m1Obtained: input.m1
//       }, getAuthHeader());

//       // ✅ FIXED: Immediate list update
//       setSubjects([...subjects, { ...res.data, m2Simulated: 0 }]);
      
//       // ✅ FIXED: Clear form after adding
//       setInput({ name: '', credits: '', m1: '' });
      
//     } catch (err) { 
//       console.error("Add Error:", err);
//       alert("Subject add nahi ho paya. Backend check karo!");
//     }
//   };

//   const deleteSubject = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/api/subjects/${id}`, getAuthHeader());
//       setSubjects(subjects.filter(s => s._id !== id));
//     } catch (err) { console.error("Delete Error:", err); }
//   };

//   const calculateSimulatedCPI = () => {
//     let totalPoints = 0;
//     let totalCredits = 0;

//     subjects.forEach(sub => {
//       const totalMarks = (parseFloat(sub.m1Obtained) || 0) + (parseFloat(sub.m2Simulated) || 0);
//       const totalMax = examConfig.m1Max + examConfig.m2Max;
//       const percentage = (totalMarks / totalMax) * 100;

//       let gp = percentage >= 90 ? 10 : percentage >= 80 ? 9 : percentage >= 70 ? 8 : 
//                percentage >= 60 ? 7 : percentage >= 50 ? 6 : percentage >= 40 ? 5 : 0;
      
//       totalPoints += (gp * parseFloat(sub.credits));
//       totalCredits += parseFloat(sub.credits);
//     });

//     return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
//   };

//   const currentCPI = calculateSimulatedCPI();

//   return (
//     <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
//       <Sidebar />
//       <div className="flex-1 p-8">
        
//         {/* TOP DASHBOARD CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl flex justify-between items-center">
//             <div>
//               <p className="text-[10px] font-black opacity-60 uppercase tracking-widest">Simulated SGPA</p>
//               <h2 className="text-6xl font-black">{currentCPI}</h2>
//             </div>
//             <Calculator size={50} className="opacity-20" />
//           </div>

//           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col justify-center shadow-sm">
//             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Semester Weightage</p>
//             <div className="flex gap-4">
//               <div className="flex-1">
//                 <label className="text-[9px] font-bold text-indigo-500">MID MAX</label>
//                 <input type="number" className="w-full font-bold bg-slate-50 p-2 rounded-lg" 
//                   value={examConfig.m1Max} onChange={e => setExamConfig({...examConfig, m1Max: parseInt(e.target.value)})}/>
//               </div>
//               <div className="flex-1">
//                 <label className="text-[9px] font-bold text-orange-500">END MAX</label>
//                 <input type="number" className="w-full font-bold bg-slate-50 p-2 rounded-lg" 
//                   value={examConfig.m2Max} onChange={e => setExamConfig({...examConfig, m2Max: parseInt(e.target.value)})}/>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex items-center gap-5 shadow-sm">
//              <div className={`p-4 rounded-3xl ${currentCPI >= targetCpi ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
//                 <TrendingUp size={30} />
//              </div>
//              <div>
//                 <p className="text-[10px] font-black text-slate-400 uppercase">Target: {targetCpi}</p>
//                 <h4 className="text-xl font-black">{currentCPI >= targetCpi ? "Target Met! 🎉" : "Keep Improving"}</h4>
//              </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
//           {/* LEFT: ADD SUBJECT FORM */}
//           <div className="xl:col-span-1 bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 h-fit">
//             <h3 className="font-black text-xl mb-6 flex items-center gap-2"> <Plus size={20} className="text-indigo-600"/> Add Subject</h3>
//             <div className="space-y-4">
//               <input 
//                 placeholder="Subject Name" 
//                 className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold" 
//                 value={input.name} 
//                 onChange={e => setInput({...input, name: e.target.value})} 
//               />
//               <div className="grid grid-cols-2 gap-3">
//                 <input 
//                   type="number" 
//                   placeholder="Mid Marks" 
//                   className="w-full p-4 bg-slate-50 rounded-2xl outline-none" 
//                   value={input.m1} 
//                   onChange={e => setInput({...input, m1: e.target.value})} 
//                 />
//                 <input 
//                   type="number" 
//                   placeholder="Credits" 
//                   className="w-full p-4 bg-slate-50 rounded-2xl outline-none" 
//                   value={input.credits} 
//                   onChange={e => setInput({...input, credits: e.target.value})} 
//                 />
//               </div>
//               <button onClick={addSubject} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-indigo-600 transition-all">Add to List</button>
//             </div>
//           </div>

//           {/* RIGHT: LIVE SIMULATION TABLE */}
//           <div className="xl:col-span-3">
//             <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
//               <table className="w-full text-left border-collapse">
//                 <thead className="bg-slate-50 border-b border-slate-100">
//                   <tr>
//                     <th className="p-6 text-[10px] font-black text-slate-400 uppercase">Subject</th>
//                     <th className="p-6 text-[10px] font-black text-slate-400 uppercase text-center">Mid ({examConfig.m1Max})</th>
//                     <th className="p-6 text-[10px] font-black text-indigo-500 uppercase text-center">Simulate End ({examConfig.m2Max})</th>
//                     <th className="p-6 text-[10px] font-black text-slate-400 uppercase text-center">Delete</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {subjects.map((sub, index) => (
//                     <tr key={sub._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-all">
//                       <td className="p-6">
//                         <p className="font-black text-slate-700 uppercase">{sub.name}</p>
//                         <p className="text-[10px] text-slate-400 font-bold">{sub.credits} Credits</p>
//                       </td>
//                       <td className="p-6 text-center font-bold text-slate-600">{sub.m1Obtained}</td>
//                       <td className="p-6 text-center">
//                         <div className="flex items-center gap-4 justify-center">
//                           <input 
//                             type="range" min="0" max={examConfig.m2Max} 
//                             className="w-32 h-1.5 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
//                             value={sub.m2Simulated} 
//                             onChange={(e) => {
//                               const newSubs = [...subjects];
//                               newSubs[index].m2Simulated = parseInt(e.target.value);
//                               setSubjects(newSubs);
//                             }}
//                           />
//                           <span className="min-w-[40px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg text-sm">
//                             {sub.m2Simulated}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="p-6 text-center">
//                         <button onClick={() => deleteSubject(sub._id)} className="text-slate-200 hover:text-red-500 transition-all">
//                           <Trash2 size={18} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {subjects.length === 0 && (
//                 <div className="p-20 text-center text-slate-300">
//                    <AlertCircle className="mx-auto mb-2 opacity-20" size={48} />
//                    <p className="font-bold">No subjects added yet. Start by adding one!</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GPAPredictor;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Trash2, Plus, Calculator, TrendingUp, AlertCircle } from 'lucide-react';

const GPAPredictor = () => {
  const [subjects, setSubjects] = useState([]);
  const [targetCpi, setTargetCpi] = useState(8.0);
  const [examConfig, setExamConfig] = useState({ m1Max: 30, m2Max: 45 });
  const [input, setInput] = useState({ name: '', credits: '', m1: '' });

  const API_URL = import.meta.env.VITE_API_URL || 'https://student-mate-backend.onrender.com';

  // Axios Header for Safety
  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  useEffect(() => { fetchSubjects(); }, []);

  const fetchSubjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/subjects`, getAuthHeader());
      setSubjects(res.data.map(s => ({ ...s, m2Simulated: 0 })));
    } catch (err) { console.error("Fetch Error:", err); }
  };

  const addSubject = async () => {
    if (!input.name || !input.m1 || !input.credits) return alert("All fields are required!");
    try {
      const res = await axios.post(`${API_URL}/api/subjects`, {
        name: input.name, credits: input.credits, m1Obtained: input.m1
      }, getAuthHeader());
      
      // ✅ Naya subject list mein add karo
      setSubjects([...subjects, { ...res.data, m2Simulated: 0 }]);
      setInput({ name: '', credits: '', m1: '' });
    } catch (err) { console.error("Add Error:", err); }
  };

  // ✅ TARGETED DELETE: Sirf wahi ID hategi jispe click hua hai
  const deleteSubject = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/subjects/${id}`, getAuthHeader());
      // State filter: Sirf wo subject rakho jiski ID match NAHI karti
      setSubjects(prevSubjects => prevSubjects.filter(sub => sub._id !== id));
    } catch (err) { 
      console.error("Delete Error:", err);
      alert("Could not delete this subject.");
    }
  };

  const calculateSimulatedCPI = () => {
    let totalPoints = 0, totalCredits = 0;
    subjects.forEach(sub => {
      const totalMarks = (parseFloat(sub.m1Obtained) || 0) + (parseFloat(sub.m2Simulated) || 0);
      const percentage = (totalMarks / (examConfig.m1Max + examConfig.m2Max)) * 100;
      let gp = percentage >= 90 ? 10 : percentage >= 80 ? 9 : percentage >= 70 ? 8 : percentage >= 60 ? 7 : percentage >= 50 ? 6 : percentage >= 40 ? 5 : 0;
      totalPoints += (gp * parseFloat(sub.credits));
      totalCredits += parseFloat(sub.credits);
    });
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar />
      <div className="flex-1 p-8">
        {/* Header Cards (SGPA, Weightage, Target) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl flex justify-between items-center">
            <div><p className="text-[10px] font-black opacity-60 uppercase tracking-widest">SGPA</p><h2 className="text-6xl font-black">{calculateSimulatedCPI()}</h2></div>
            <Calculator size={50} className="opacity-20" />
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border flex items-center justify-between shadow-sm">
            <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Weightage</p>
            <p className="font-bold text-slate-600 text-lg">Mid: {examConfig.m1Max} | End: {examConfig.m2Max}</p></div>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border flex items-center gap-5 shadow-sm">
             <div className={`p-4 rounded-3xl ${calculateSimulatedCPI() >= targetCpi ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}><TrendingUp size={30} /></div>
             <div><p className="text-[10px] font-black text-slate-400 uppercase">Goal: {targetCpi}</p><h4 className="text-xl font-black">{calculateSimulatedCPI() >= targetCpi ? "Met! 🎉" : "Work Hard"}</h4></div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Add Subject Form */}
          <div className="xl:col-span-1 bg-white p-8 rounded-[2.5rem] shadow-lg border h-fit">
            <h3 className="font-black text-xl mb-6 flex items-center gap-2"><Plus size={20} className="text-indigo-600"/> Add Subject</h3>
            <div className="space-y-4">
              <input placeholder="Subject Name" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold border focus:border-indigo-300" value={input.name} onChange={e => setInput({...input, name: e.target.value})} />
              <input type="number" placeholder="Mid Marks" className="w-full p-4 bg-slate-50 rounded-2xl outline-none border focus:border-indigo-300" value={input.m1} onChange={e => setInput({...input, m1: e.target.value})} />
              <input type="number" placeholder="Credits" className="w-full p-4 bg-slate-50 rounded-2xl outline-none border focus:border-indigo-300" value={input.credits} onChange={e => setInput({...input, credits: e.target.value})} />
              <button onClick={addSubject} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-indigo-600 transition-all shadow-md active:scale-95">Add to List</button>
            </div>
          </div>

          {/* Simulation Table with Specific Delete */}
          <div className="xl:col-span-3 bg-white rounded-[2.5rem] shadow-sm border p-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase">Subject</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase text-center">Mid (30)</th>
                  <th className="p-4 text-[10px] font-black text-indigo-500 uppercase text-center">Simulate End (45)</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {subjects.map((sub, index) => (
                  <tr key={sub._id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="p-4">
                      <p className="font-black text-slate-700 uppercase">{sub.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{sub.credits} Credits</p>
                    </td>
                    <td className="p-4 text-center font-bold text-slate-600">{sub.m1Obtained}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-4 justify-center">
                        <input type="range" min="0" max={examConfig.m2Max} className="w-32 h-1.5 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" value={sub.m2Simulated} onChange={(e) => { const n = [...subjects]; n[index].m2Simulated = parseInt(e.target.value); setSubjects(n); }} />
                        <span className="font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl text-xs border border-indigo-100">{sub.m2Simulated}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      {/* ✅ INDIVIDUAL DELETE BUTTON */}
                      <button 
                        onClick={() => deleteSubject(sub._id)} 
                        className="p-3 bg-red-50 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-2xl transition-all shadow-sm"
                        title={`Delete ${sub.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {subjects.length === 0 && (
              <div className="p-16 text-center text-slate-300">
                <AlertCircle className="mx-auto mb-2 opacity-20" size={40} />
                <p className="font-bold">List is empty. Add subjects to simulate SGPA!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPAPredictor;