import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Sidebar from '../components/Sidebar';
import Timetable from '../components/Timetable'; 
import Opportunities from '../components/Opportunities'; 
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Clock, Users, Target, Sparkles, Send, MessageSquare, Calculator } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const { user } = useAuth();
    const [studyLogs, setStudyLogs] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Attendance States
    const [presentClasses, setPresentClasses] = useState(17);
    const [totalClasses, setTotalClasses] = useState(23);
    const [criteria, setCriteria] = useState(0.75);
    const [attendanceData, setAttendanceData] = useState({ percentage: 0, status: '', safe: true });

    // AI Chat States
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([{ role: 'bot', text: 'Welcome! Need help with your academics?' }]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [logsRes, tasksRes] = await Promise.all([
                    api.get('/studylogs'),
                    api.get('/tasks')
                ]);
                setStudyLogs(logsRes.data);
                setTasks(tasksRes.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchDashboardData();
    }, [user]);

    // Attendance Logic
    useEffect(() => {
        const p = parseInt(presentClasses) || 0;
        const t = parseInt(totalClasses) || 0;
        if (t === 0) return;
        const currentPercentage = (p / t) * 100;
        const target = criteria * 100;
        if (currentPercentage < target) {
            const needed = Math.ceil((criteria * t - p) / (1 - criteria));
            setAttendanceData({ percentage: currentPercentage.toFixed(1), status: `Attend ${needed} more to reach ${target}%`, safe: false });
        } else {
            const bunks = Math.floor((p - (criteria * t)) / criteria);
            setAttendanceData({ percentage: currentPercentage.toFixed(1), status: `Safe! Bunk up to ${bunks} classes.`, safe: true });
        }
    }, [presentClasses, totalClasses, criteria]);

    const handleSendMessage = () => {
        if (!chatInput.trim()) return;
        setMessages([...messages, { role: 'user', text: chatInput }]);
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'bot', text: "Analysis: Focus on React Hooks and LeetCode Array problems today." }]);
        }, 800);
        setChatInput("");
    };

    if (loading) return <div className="flex justify-center items-center h-screen bg-white"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div></div>;

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 p-8">
                
                {/* Header Updated to Attendance Calculator */}
                <header className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <Calculator className="text-indigo-600" size={36} />
                            Attendance Calculator
                        </h1>
                        <p className="text-slate-500 font-medium italic mt-1">
                            Welcome back, {user?.fullName?.split(' ')[0] || 'Student'}! Track your progress and career goals.
                        </p>
                    </div>
                    <Sparkles className="text-indigo-100 hidden md:block" size={48} />
                </header>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    
                    {/* LEFT SECTION (Col-span 8): Attendance & AI Chat */}
                    <div className="xl:col-span-8 space-y-8">
                        {/* Big Attendance Card */}
                        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-indigo-50 p-4 rounded-3xl text-indigo-600"><Users size={28} /></div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Current Stats</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Criteria</label>
                                    <select value={criteria} onChange={(e) => setCriteria(parseFloat(e.target.value))} className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-indigo-600 outline-none">
                                        <option value={0.75}>75% Target</option>
                                        <option value={0.80}>80% Target</option>
                                        <option value={0.85}>85% Target</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Attended</label>
                                    <input type="number" value={presentClasses} onChange={(e) => setPresentClasses(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl font-black text-2xl outline-none border border-transparent focus:border-indigo-200 transition-all" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Total Lectures</label>
                                    <input type="number" value={totalClasses} onChange={(e) => setTotalClasses(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl font-black text-2xl outline-none border border-transparent focus:border-indigo-200 transition-all" />
                                </div>
                            </div>

                            <div className={`mt-10 p-8 rounded-[2.5rem] border text-center transition-all ${attendanceData.safe ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
                                <h3 className="text-6xl font-black mb-2">{attendanceData.percentage}%</h3>
                                <p className="text-xs font-black uppercase tracking-[0.2em]">{attendanceData.status}</p>
                            </div>
                        </div>

                        {/* Study Hours Display */}
                        <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase opacity-60 mb-1 tracking-widest">Efficiency Track</p>
                                <h3 className="text-4xl font-bold">{(studyLogs.reduce((sum, log) => sum + log.durationInMinutes, 0) / 60).toFixed(1)} Study Hours</h3>
                            </div>
                            <Clock size={48} className="opacity-20" />
                        </div>
                    </div>

                    {/* RIGHT SECTION (Col-span 4): Timetable and Career Hub Stacked */}
                    <div className="xl:col-span-4 space-y-8">
                        {/* Today's Timetable */}
                        <Timetable attendancePercent={parseFloat(attendanceData.percentage)} />

                        {/* Internship & Hackathon Aggregator */}
                        <Opportunities />

                        {/* AI Mini Chat */}
                        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100 h-[300px] flex flex-col">
                            <h3 className="font-bold text-sm mb-4 flex items-center gap-2"><MessageSquare size={16} className="text-green-600" /> AI Buddy</h3>
                            <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2 custom-scrollbar text-[11px]">
                                {messages.map((m, i) => (
                                    <div key={i} className={`p-3 rounded-2xl ${m.role === 'bot' ? 'bg-slate-50 self-start text-slate-600' : 'bg-indigo-600 text-white self-end ml-auto'}`}>
                                        {m.text}
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2 p-1 bg-slate-50 rounded-xl">
                                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask about bunk..." className="flex-1 bg-transparent p-2 outline-none text-xs" />
                                <button onClick={handleSendMessage} className="p-2 bg-indigo-600 text-white rounded-lg"><Send size={14} /></button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
