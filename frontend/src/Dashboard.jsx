// import React, { useState, useEffect } from 'react';
// import Sidebar from './components/Sidebar'; 
// import { Percent, MessageSquare, Sun, Moon, UserCircle, Send } from 'lucide-react';

// const Dashboard = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [attendance, setAttendance] = useState({ present: '', total: '', criteria: '75' });
//   const [userName, setUserName] = useState("Student"); // Default
//   const [chatInput, setChatInput] = useState("");
//   const [messages, setMessages] = useState([{ role: 'bot', text: 'Hi! How can I help with your studies today?' }]);

//   useEffect(() => {
//     // Login ke waqt save kiya gaya name nikalna
//     const savedUser = JSON.parse(localStorage.getItem('user'));
//     if (savedUser && savedUser.name) {
//       setUserName(savedUser.name);
//     }
//   }, []);

//   const handleSendMessage = () => {
//     if (!chatInput.trim()) return;
//     setMessages([...messages, { role: 'user', text: chatInput }]);
//     // Simulation: Bot reply
//     setTimeout(() => {
//       setMessages(prev => [...prev, { role: 'bot', text: "I am currently being integrated with Gemini AI. Stay tuned!" }]);
//     }, 1000);
//     setChatInput("");
//   };

//   const getDetailedStatus = () => {
//     const p = parseInt(attendance.present);
//     const t = parseInt(attendance.total);
//     const target = parseFloat(attendance.criteria) || 75;
//     if (!p || !t || t === 0) return { msg: "Enter details to check", color: "text-slate-500", bg: "bg-slate-50" };
//     const perc = (p / t) * 100;
//     if (perc >= target) {
//       const bks = Math.floor((p - (target / 100) * t) / (target / 100));
//       return { msg: `🔥 ${perc.toFixed(1)}% - Safe! Bunk ${bks} more`, color: "text-green-700", bg: "bg-green-50" };
//     } else {
//       const req = Math.ceil((target * t - 100 * p) / (100 - target));
//       return { msg: `⚠️ ${perc.toFixed(1)}% - Attend next ${req} classes`, color: "text-red-700", bg: "bg-red-50" };
//     }
//   };

//   return (
//     <div className={`flex min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
//       <Sidebar />
//       <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
//         <header className="flex justify-between items-center mb-10">
//           <div>
//             {/* ✅ USER NAME UPDATED HERE */}
//             <h2 className="text-3xl font-bold text-indigo-900">Hello, {userName} 👋</h2>
//             <p className="text-slate-500 font-medium">Your academic overview is ready.</p>
//           </div>
//           <div className="flex items-center space-x-4">
//             <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-white rounded-2xl shadow-sm">
//               {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-slate-600" />}
//             </button>
//             <UserCircle size={40} className="text-indigo-600" />
//           </div>
//         </header>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Attendance Tracker */}
//           <div className="p-8 rounded-[2.5rem] shadow-xl bg-white border border-slate-100">
//              <div className="flex justify-between items-center mb-6">
//                 <div className="flex items-center gap-3">
//                   <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600"><Percent size={24} /></div>
//                   <h3 className="font-bold text-xl">Attendance Tracker</h3>
//                 </div>
//                 <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl">
//                   <span className="text-[10px] font-black text-slate-400">GOAL %</span>
//                   <input type="number" value={attendance.criteria} className="w-10 bg-transparent font-bold text-indigo-600 outline-none" onChange={(e) => setAttendance({ ...attendance, criteria: e.target.value })}/>
//                 </div>
//              </div>
//              <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                    <input type="number" placeholder="Attended" className="p-4 bg-slate-50 border rounded-2xl outline-none" onChange={(e) => setAttendance({ ...attendance, present: e.target.value })}/>
//                    <input type="number" placeholder="Total" className="p-4 bg-slate-50 border rounded-2xl outline-none" onChange={(e) => setAttendance({ ...attendance, total: e.target.value })}/>
//                 </div>
//                 <div className={`p-5 rounded-2xl font-bold text-center ${getDetailedStatus().bg} ${getDetailedStatus().color}`}>
//                   {getDetailedStatus().msg}
//                 </div>
//              </div>
//           </div>

//           {/* ✅ WORKING AI CHATBOX COMPONENT */}
//           <div className="p-8 rounded-[2.5rem] shadow-xl bg-white border border-slate-100 flex flex-col h-[400px]">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-3 bg-green-100 rounded-2xl text-green-600"><MessageSquare size={24} /></div>
//               <h3 className="font-bold text-xl">AI Study Mate</h3>
//             </div>
            
//             <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2 scrollbar-hide">
//               {messages.map((m, i) => (
//                 <div key={i} className={`p-3 rounded-2xl max-w-[80%] text-sm font-medium ${m.role === 'bot' ? 'bg-slate-100 self-start' : 'bg-indigo-600 text-white self-end ml-auto'}`}>
//                   {m.text}
//                 </div>
//               ))}
//             </div>

//             <div className="flex gap-2">
//               <input 
//                 value={chatInput}
//                 onChange={(e) => setChatInput(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                 placeholder="Ask me anything..." 
//                 className="flex-1 p-4 bg-slate-50 border rounded-2xl outline-none text-sm"
//               />
//               <button onClick={handleSendMessage} className="p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700">
//                 <Send size={20} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar'; 
import { Percent, MessageSquare, Sun, Moon, UserCircle, Send } from 'lucide-react';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [attendance, setAttendance] = useState({ present: '', total: '', criteria: '75' });
  const [userName, setUserName] = useState("Student");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([{ role: 'bot', text: 'Hi! How can I help with your studies today?' }]);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser && savedUser.name) {
      setUserName(savedUser.name); // ✅ Ab login wala name yahan dikhega
    }
  }, []);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg = { role: 'user', text: chatInput };
    setMessages([...messages, newMsg]);
    
    // AI Logic Simulation
    setTimeout(() => {
      let botResponse = "I'm analyzing your request. How else can I assist?";
      if (chatInput.toLowerCase().includes("leetcode")) {
        botResponse = "LeetCode 1743: 'Restore the Array From Adjacent Pairs'. You should use a Map to store adjacency and then perform DFS. Need the code?";
      }
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 800);
    setChatInput("");
  };

  const getDetailedStatus = () => {
    const p = parseInt(attendance.present);
    const t = parseInt(attendance.total);
    const target = parseFloat(attendance.criteria) || 75;
    if (!p || !t || t === 0) return { msg: "Enter details to check", color: "text-slate-500", bg: "bg-slate-50" };
    const perc = (p / t) * 100;
    if (perc >= target) {
      const bks = Math.floor((p - (target / 100) * t) / (target / 100));
      return { msg: `🔥 ${perc.toFixed(1)}% - Safe! Bunk ${bks} more`, color: "text-green-700", bg: "bg-green-50" };
    } else {
      const req = Math.ceil((target * t - 100 * p) / (100 - target));
      return { msg: `⚠️ ${perc.toFixed(1)}% - Attend next ${req} classes`, color: "text-red-700", bg: "bg-red-50" };
    }
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Sidebar />
      <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black text-indigo-900">Hello, {userName} 👋</h2>
            <p className="text-slate-500 font-medium italic">Ready to crush your academic goals?</p>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-white rounded-2xl shadow-sm border">
              {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-slate-600" />}
            </button>
            <UserCircle size={40} className="text-indigo-600" />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Attendance Tracker */}
          <div className="p-8 rounded-[3rem] shadow-xl bg-white border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl flex items-center gap-2"><Percent size={20} className="text-indigo-600"/> Attendance</h3>
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-xl border">
                <span className="text-[10px] font-black text-slate-400">GOAL %</span>
                <input type="number" value={attendance.criteria} className="w-10 bg-transparent font-bold text-indigo-600 outline-none" onChange={(e) => setAttendance({ ...attendance, criteria: e.target.value })}/>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Attended" className="p-4 bg-slate-50 rounded-2xl outline-none border focus:border-indigo-300" onChange={(e) => setAttendance({ ...attendance, present: e.target.value })}/>
                <input type="number" placeholder="Total" className="p-4 bg-slate-50 rounded-2xl outline-none border focus:border-indigo-300" onChange={(e) => setAttendance({ ...attendance, total: e.target.value })}/>
              </div>
              <div className={`p-5 rounded-2xl font-black text-center shadow-inner ${getDetailedStatus().bg} ${getDetailedStatus().color}`}>
                {getDetailedStatus().msg}
              </div>
            </div>
          </div>

          {/* AI Chatbot */}
          <div className="p-8 rounded-[3rem] shadow-xl bg-white border border-slate-100 flex flex-col h-[450px]">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><MessageSquare size={20} className="text-green-600"/> AI Study Mate</h3>
            <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2 custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`p-4 rounded-2xl text-sm max-w-[85%] ${m.role === 'bot' ? 'bg-slate-100 text-slate-700 self-start' : 'bg-indigo-600 text-white self-end ml-auto shadow-md'}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Ask me anything..." className="flex-1 p-4 bg-slate-50 rounded-2xl outline-none border focus:border-green-300 text-sm" />
              <button onClick={handleSendMessage} className="p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all"><Send size={20} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;