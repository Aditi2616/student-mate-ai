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
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I am your AI Student-Mate. How can I help with your studies or attendance today?' }
  ]);

  // 👤 Load User Name from Login Data
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser && savedUser.name) {
      setUserName(savedUser.name);
    }
  }, []);

  // 🤖 SMART AI CHAT LOGIC (For Demo & PPT)
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput.toLowerCase();
    setMessages(prev => [...prev, { role: 'user', text: chatInput }]);
    setChatInput("");

    // Simulate AI Processing
    setTimeout(() => {
      let botReply = "That's a great question! Let me check my academic database... 📚";

      if (userMsg.includes("useeffect") || userMsg.includes("usestate")) {
        botReply = "React Hooks simple hain! 💡 \n1. useState: Data save karne ke liye (Variable ki tarah). \n2. useEffect: API calls aur side-effects handle karne ke liye.";
      } 
      else if (userMsg.includes("leetcode") || userMsg.includes("24") || userMsg.includes("java")) {
        botReply = "LeetCode 24 (Swap Nodes in Pairs) Java mein solve karne ke liye hum 'Recursion' use karte hain. \nLogic: First node ko second se point karo, phir baaki list ke liye function call karo.";
      }
      else if (userMsg.includes("attendance") || userMsg.includes("shortage")) {
        botReply = "Don't worry! Aapka tracker dikha raha hai ki agar aap agle kuch din regular rahengi, toh criteria easily maintain ho jayega. Stay consistent! ✅";
      }
      else if (userMsg.includes("hi") || userMsg.includes("hello")) {
        botReply = `Hello ${userName}! Main aapka Student-Mate AI hoon. Aaj hum DSA padhein ya Attendance check karein?`;
      }

      setMessages(prev => [...prev, { role: 'bot', text: botReply }]);
    }, 800);
  };

  // 📊 Attendance Calculation Logic
  const getDetailedStatus = () => {
    const p = parseInt(attendance.present);
    const t = parseInt(attendance.total);
    const target = parseFloat(attendance.criteria) || 75;

    if (!p || !t || t === 0) return { msg: "Enter details to check", color: "text-slate-500", bg: "bg-slate-50" };
    
    const perc = (p / t) * 100;

    if (perc >= target) {
      const bks = Math.floor((p - (target / 100) * t) / (target / 100));
      return { 
        msg: `🔥 ${perc.toFixed(1)}% - You're safe! Bunk ${bks} more classes.`, 
        color: "text-green-700", 
        bg: "bg-green-50" 
      };
    } else {
      const req = Math.ceil((target * t - 100 * p) / (100 - target));
      return { 
        msg: `⚠️ ${perc.toFixed(1)}% - Shortage! Attend next ${req} classes.`, 
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
        
        {/* Header with Dynamic Name */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-black text-indigo-900">Hello, {userName} 👋</h2>
            <p className="text-slate-500 font-medium">Welcome back to Student-Mate AI</p>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 transition-all active:scale-95">
              {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-slate-600" />}
            </button>
            <UserCircle size={44} className="text-indigo-600 cursor-pointer" />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* 📊 Attendance Tracker Card */}
          <div className={`p-8 rounded-[3rem] shadow-xl border bg-white border-slate-100`}>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
                  <Percent size={24} />
                </div>
                <h3 className="font-bold text-xl">Attendance Tracker</h3>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                <span className="text-[10px] font-black text-slate-400">GOAL %</span>
                <input 
                  type="number" 
                  value={attendance.criteria}
                  className="w-10 bg-transparent font-bold text-indigo-600 outline-none text-sm text-center"
                  onChange={(e) => setAttendance({ ...attendance, criteria: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 ml-2">ATTENDED</label>
                  <input 
                    type="number" placeholder="18" 
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-800"
                    onChange={(e) => setAttendance({ ...attendance, present: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 ml-2">TOTAL</label>
                  <input 
                    type="number" placeholder="24" 
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-800"
                    onChange={(e) => setAttendance({ ...attendance, total: e.target.value })}
                  />
                </div>
              </div>
              <div className={`mt-4 p-5 rounded-2xl font-black text-center shadow-inner transition-all duration-300 ${status.bg} ${status.color}`}>
                {status.msg}
              </div>
            </div>
          </div>

          {/* 💬 AI Assistant Card */}
          <div className="p-8 rounded-[3rem] shadow-xl bg-white border border-slate-100 flex flex-col h-[480px]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-2xl text-green-600">
                <MessageSquare size={24} />
              </div>
              <h3 className="font-bold text-xl">AI Assistant</h3>
            </div>
            
            {/* Message List */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`p-4 rounded-2xl text-sm font-medium leading-relaxed max-w-[85%] ${m.role === 'bot' ? 'bg-slate-100 text-slate-700 self-start shadow-sm' : 'bg-indigo-600 text-white self-end ml-auto shadow-md'}`}>
                  {m.text}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex gap-2 p-1 bg-slate-50 rounded-2xl border border-slate-100">
              <input 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about LeetCode, React..." 
                className="flex-1 p-4 bg-transparent outline-none text-sm font-medium"
              />
              <button 
                onClick={handleSendMessage}
                className="p-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg active:scale-90"
              >
                <Send size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;