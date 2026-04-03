import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Sidebar from '../components/Sidebar';
import Timetable from '../components/Timetable'; // Naya Component
import Opportunities from '../components/Opportunities'; // Naya Component
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
import { Clock, Users, Target, Sparkles, Send, MessageSquare } from 'lucide-react';

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

    // AI Message Handler
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
                
                {/* Header */}
                <header className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                            Welcome, <span className="text-indigo-600">{user?.fullName?.split(' ')[0] || 'Student'}!</span> 👋
                        </h1>
                        <p className="text-slate-500 font-medium italic">Your Academic Intelligence Hub</p>
                    </div>
                    <Sparkles className="text-indigo-100 hidden md:block" size={48} />
                </header>

                {/* Main Grid: 3 Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT COLUMN: Attendance & AI Chat */}
                    <div className="space-y-8">
                        {/* Attendance Tracker */}
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <Users className="text-indigo-600" size={24} />
                                <h3 className="font-bold text-xl">Attendance</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="number" value={presentClasses} onChange={(e) => setPresentClasses(e.target.value)} className="p-4 bg-slate-50 rounded-2xl border outline-none font-bold" />
                                    <input type="number" value={totalClasses} onChange={(e) => setTotalClasses(e.target.value)} className="p-4 bg-slate-50 rounded-2xl border outline-none font-bold" />
                                </div>
                                <div className={`p-4 rounded-2xl text-center font-black ${attendanceData.safe ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    <p className="text-2xl">{attendanceData.percentage}%</p>
                                    <p className="text-[10px] uppercase">{attendanceData.status}</p>
                                </div>
                            </div>
                        </div>

                        {/* AI Assistant */}
                        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100 h-[350px] flex flex-col">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><MessageSquare size={18} className="text-green-600" /> AI Assistant</h3>
                            <div className="flex-1 overflow-y-auto mb-4 space-y-3 custom-scrollbar">
                                {messages.map((m, i) => (
                                    <div key={i} className={`p-3 rounded-2xl text-xs ${m.role === 'bot' ? 'bg-slate-100 self-start' : 'bg-indigo-600 text-white self-end ml-auto'}`}>
                                        {m.text}
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2 p-1 bg-slate-50 rounded-xl">
                                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask anything..." className="flex-1 bg-transparent p-2 outline-none text-xs" />
                                <button onClick={handleSendMessage} className="p-2 bg-indigo-600 text-white rounded-lg"><Send size={16} /></button>
                            </div>
                        </div>
                    </div>

                    {/* MIDDLE COLUMN: Timetable Advisor & Stats */}
                    <div className="space-y-8">
                        <Timetable attendancePercent={parseFloat(attendanceData.percentage)} />
                        
                        <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase opacity-60 mb-1">Total Study Hours</p>
                                <h3 className="text-3xl font-bold">{(studyLogs.reduce((sum, log) => sum + log.durationInMinutes, 0) / 60).toFixed(1)} Hrs</h3>
                            </div>
                            <Clock size={32} className="opacity-30" />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Career Hub (Opportunities) */}
                    <div>
                        <Opportunities />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
