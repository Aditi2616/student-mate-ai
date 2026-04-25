import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import axios from 'axios';
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
import { Clock, Users, Target, Sparkles, Send, MessageSquare, Calculator, BrainCircuit, Activity } from 'lucide-react';

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

    // --- ML ANALYSIS STATES ---
    const [mlData, setMlData] = useState({ studytime: 2, failures: 0, absences: 5, G1: 12, G2: 12 });
    const [mlResult, setMlResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

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

    // --- ML API CALL FUNCTION ---
    const handleMLAnalyze = async () => {
        setIsAnalyzing(true);
        try {
            // Updated with proper headers for Zero-Error connection
            const response = await axios.post('http://127.0.0.1:8000/analyze', mlData, {
                headers: { 'Content-Type': 'application/json' }
            });
            setMlResult(response.data);
        } catch (error) {
            console.error("ML Engine Error:", error);
            alert("⚠️ Connection Failed! Check if Python Server (Uvicorn) is running.");
        } finally {
            setIsAnalyzing(false);
        }
    };

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
                
                <header className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <BrainCircuit className="text-indigo-600" size={36} />
                            Student Track AI
                        </h1>
                        <p className="text-slate-500 font-medium italic mt-1">
                            Welcome back, {user?.fullName?.split(' ')[0] || 'Aditi'}! Performance insights are ready.
                        </p>
                    </div>
                    <Sparkles className="text-indigo-100 hidden md:block" size={48} />
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    
                    <div className="xl:col-span-8 space-y-8">
                        {/* Attendance Card */}
                        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-indigo-50 p-4 rounded-3xl text-indigo-600"><Users size={28} /></div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Attendance Tracking</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Criteria</label>
                                    <select value={criteria} onChange={(e) => setCriteria(parseFloat(e.target.value))} className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-indigo-600 outline-none">
                                        <option value={0.75}>75% Target</option>
                                        <option value={0.80}>80% Target</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Attended</label>
                                    <input type="number" value={presentClasses} onChange={(e) => setPresentClasses(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl font-black text-2xl outline-none" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Total</label>
                                    <input type="number" value={totalClasses} onChange={(e) => setTotalClasses(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl font-black text-2xl outline-none" />
                                </div>
                            </div>
                            <div className={`mt-6 p-6 rounded-[2rem] text-center ${attendanceData.safe ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                <h3 className="text-4xl font-black">{attendanceData.percentage}%</h3>
                                <p className="text-[10px] font-bold uppercase tracking-widest">{attendanceData.status}</p>
                            </div>
                        </div>

                        {/* ML ANALYTICS SECTION */}
                        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-indigo-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-indigo-600 p-4 rounded-3xl text-white shadow-lg shadow-indigo-200">
                                    <Activity size={28} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">AI Predictive Analysis</h2>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Real-time Student Tracking</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                                {[
                                    { label: 'Study Time', key: 'studytime' },
                                    { label: 'Failures', key: 'failures' },
                                    { label: 'Absences', key: 'absences' },
                                    { label: 'G1 Marks', key: 'G1' },
                                    { label: 'G2 Marks', key: 'G2' }
                                ].map((item) => (
                                    <div key={item.key}>
                                        <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block tracking-tighter">{item.label}</label>
                                        <input 
                                            type="number" 
                                            value={mlData[item.key]} 
                                            onChange={(e) => setMlData({...mlData, [item.key]: parseInt(e.target.value) || 0})}
                                            className="w-full p-3 bg-slate-50 rounded-xl font-bold text-slate-700 outline-none border border-transparent focus:border-indigo-300 transition-all"
                                        />
                                    </div>
                                ))}
                            </div>

                            <button 
                                onClick={handleMLAnalyze}
                                disabled={isAnalyzing}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 active:scale-95"
                            >
                                {isAnalyzing ? 'Analyzing Patterns...' : 'Run Neural Analysis'}
                                <Sparkles size={20} />
                            </button>

                            {mlResult && (
                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
                                        <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-1">Prediction</p>
                                        <h4 className="text-3xl font-black text-indigo-400">{mlResult.result}</h4>
                                    </div>
                                    <div className="p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100">
                                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Category</p>
                                        <h4 className="text-3xl font-black text-indigo-600">{mlResult.category}</h4>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="xl:col-span-4 space-y-8">
                        <Timetable attendancePercent={parseFloat(attendanceData.percentage)} />
                        <Opportunities />
                        
                        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100 h-[300px] flex flex-col">
                            <h3 className="font-bold text-sm mb-4 flex items-center gap-2"><MessageSquare size={16} className="text-green-600" /> AI Buddy</h3>
                            <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2 text-[11px]">
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
