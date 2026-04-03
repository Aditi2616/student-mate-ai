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
  const [userName, setUserName] = useState("User");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Welcome to Student-Mate AI! How can I assist you with your academics today?' }
  ]);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser && savedUser.name) setUserName(savedUser.name);
  }, []);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.toLowerCase();
    setMessages(prev => [...prev, { role: 'user', text: chatInput }]);
    setChatInput("");

    setTimeout(() => {
      let botReply = "That's an insightful question! Let me check my knowledge base... 📚";

      if (userMsg.includes("data science") || userMsg.includes("project")) {
        botReply = "For Data Science, I recommend these top 3 projects: \n1. **Student Performance Analytics**: Predicting grades using ML. \n2. **Sentiment Analysis**: Using NLP for social media data. \n3. **Stock Trend Predictor**: Time-series analysis. \n\nWould you like a roadmap for any of these?";
      }
      else if (userMsg.includes("useeffect") || userMsg.includes("usestate")) {
        botReply = "React Hooks are powerful tools! 💡 \n1. **useState**: Manages local state (variables). \n2. **useEffect**: Handles side-effects like API calls and subscriptions.";
      } 
      else if (userMsg.includes("leetcode") || userMsg.includes("24") || userMsg.includes("java")) {
        botReply = "LeetCode 24 (Swap Nodes in Pairs) is best solved using recursion in Java. Logic: Point the first node to the second, then recursively call the function for the remaining list.";
      }
      else if (userMsg.includes("attendance") || userMsg.includes("shortage")) {
        botReply = "Based on your tracker, if you attend the next few sessions consistently, you will easily meet the criteria. Keep going! ✅";
      }
      else if (userMsg.includes("hi") || userMsg.includes("hello")) {
        botReply = `Hello ${userName}! I'm your AI Academic Assistant. Shall we dive into some DSA or check your attendance goals?`;
      }

      setMessages(prev => [...prev, { role: 'bot', text: botReply }]);
    }, 800);
  };

  const getDetailedStatus = () => {
    const p = parseInt(attendance.present);
    const t = parseInt(attendance.total);
    const target = parseFloat(attendance.criteria) || 75;
    if (!p || !t || t === 0) return { msg: "Provide data for analysis", color: "text-slate-400", bg: "bg-slate-50" };
    const perc = (p / t) * 100;
    if (perc >= target) {
      const bks = Math.floor((p - (target / 100) * t) / (target / 100));
      return { msg: `✅ ${perc.toFixed(1)}% - You're safe! Bunk up to ${bks} classes.`, color: "text-green-700", bg: "bg-green-50" };
    } else {
      const req = Math.ceil((target * t - 100 * p) / (100 - target));
      return { msg: `⚠️ ${perc.toFixed(1)}% - Shortage! Attend next ${req} classes.`, color: "text-red-700", bg: "bg-red-50" };
    }
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Sidebar />
      <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-black text-indigo-900">Welcome, {userName} 👋</h2>
            <p className="text-slate-500 font-medium tracking-tight">Your Academic Intelligence Hub</p>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 transition-all active:scale-95">
              {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-slate-600" />}
            </button>
            <UserCircle size={44} className="text-indigo-600" />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-[3rem] shadow-xl bg-white border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600"><Percent size={24} /></div>
                <h3 className="font-bold text-xl">Attendance Tracker</h3>
              </div>
              <div className="bg-slate-50 px-3 py-1.5 rounded-xl border flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400">CRITERIA %</span>
                <input type="number" value={attendance.criteria} className="w-10 bg-transparent font-bold text-indigo-600 outline-none text-center" onChange={(e) => setAttendance({ ...attendance, criteria: e.target.value })}/>
              </div>
            </div>
            <div className="space-y-6">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 ml-2">ATTENDED</label>
                    <input type="number" placeholder="e.g. 15" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold" onChange={(e) => setAttendance({ ...attendance, present: e.target.value })}/>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 ml-2">TOTAL</label>
                    <input type="number" placeholder="e.g. 20" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold" onChange={(e) => setAttendance({ ...attendance, total: e.target.value })}/>
                  </div>
               </div>
               <div className={`p-5 rounded-2xl font-black text-center shadow-inner transition-all ${getDetailedStatus().bg} ${getDetailedStatus().color}`}>
                  {getDetailedStatus().msg}
               </div>
            </div>
          </div>

          <div className="p-8 rounded-[3rem] shadow-xl bg-white border border-slate-100 flex flex-col h-[480px]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-50 rounded-2xl text-green-600"><MessageSquare size={24} /></div>
              <h3 className="font-bold text-xl">AI Academic Mate</h3>
            </div>
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`p-4 rounded-2xl text-sm font-medium leading-relaxed max-w-[85%] ${m.role === 'bot' ? 'bg-slate-50 text-slate-700 self-start shadow-sm' : 'bg-indigo-600 text-white self-end ml-auto shadow-md'}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2 p-1 bg-slate-50 rounded-2xl border">
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Ask about DSA, React, Career..." className="flex-1 p-4 bg-transparent outline-none text-sm font-medium" />
              <button onClick={handleSendMessage} className="p-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all active:scale-90 shadow-lg"><Send size={20} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;