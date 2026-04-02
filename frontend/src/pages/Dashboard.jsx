import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Sidebar from '../components/Sidebar';
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
import { BookOpen, CheckCircle, Clock, Users, AlertCircle, Target, Sparkles } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    // 1. Auth Context se user data le rahe hain
    const { user } = useAuth();
    
    const [studyLogs, setStudyLogs] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Attendance States (Default values from your screenshot)
    const [presentClasses, setPresentClasses] = useState(17);
    const [totalClasses, setTotalClasses] = useState(23);
    const [criteria, setCriteria] = useState(0.75); // Standard 75%
    const [attendanceData, setAttendanceData] = useState({ percentage: 0, status: '', safe: true });

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

    // 3. Attendance Calculation Logic (Reference Site Style)
    useEffect(() => {
        const p = parseInt(presentClasses) || 0;
        const t = parseInt(totalClasses) || 0;
        if (t === 0) return;

        const currentPercentage = (p / t) * 100;
        const target = criteria * 100;
        
        if (currentPercentage < target) {
            // Formula: Kitni classes aur leni hain target tak pahunchne ke liye
            const needed = Math.ceil((criteria * t - p) / (1 - criteria));
            setAttendanceData({ 
                percentage: currentPercentage.toFixed(1), 
                status: `You need to attend ${needed} more classes to reach ${target}%`, 
                safe: false 
            });
        } else {
            // Formula: Kitni classes bunk kar sakte ho
            const bunks = Math.floor((p - (criteria * t)) / criteria);
            setAttendanceData({ 
                percentage: currentPercentage.toFixed(1), 
                status: `Safe! You can bunk ${bunks >= 0 ? bunks : 0} classes.`, 
                safe: true 
            });
        }
    }, [presentClasses, totalClasses, criteria]);

    // 4. Study Chart Processing
    const studyData = (() => {
        const last7Days = Array.from({length: 7}, (_, i) => {
            const d = new Date(); d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();
        const data = last7Days.map(date => {
            const totalMinutes = studyLogs.filter(log => log.date.split('T')[0] === date)
                                         .reduce((sum, log) => sum + log.durationInMinutes, 0);
            return totalMinutes / 60;
        });
        return { labels: last7Days, datasets: [{
            label: 'Study Hours', data, borderColor: '#6366f1', backgroundColor: 'rgba(99, 102, 241, 0.2)', tension: 0.4, fill: true
        }]};
    })();

    if (loading) return <div className="flex justify-center items-center h-screen bg-white"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div></div>;

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 p-8 px-12">
                
                {/* Header: Registered Name Display FIX */}
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
                            {/* Yahan 'fullName' use kiya hai jo register mein bhara tha */}
                            Welcome back, <span className="text-indigo-600">
                                {user?.fullName?.split(' ')[0] || user?.name || 'Student'}!
                            </span> 👋
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium text-lg italic">Welcome back to Student-Mate AI</p>
                    </div>
                    <Sparkles className="text-indigo-100" size={64} />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                    <div className="xl:col-span-2 space-y-10">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-1">Total Study</p>
                                    <h3 className="text-4xl font-bold">{(studyLogs.reduce((sum, log) => sum + log.durationInMinutes, 0) / 60).toFixed(1)} Hrs</h3>
                                </div>
                                <Clock size={40} className="opacity-30" />
                            </div>
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending Tasks</p>
                                    <h3 className="text-4xl font-bold text-slate-800">{tasks.filter(t => !t.isCompleted).length}</h3>
                                </div>
                                <Target size={40} className="text-indigo-100" />
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-50">
                            <Line data={studyData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                        </div>
                    </div>

                    {/* Attendance Tracker (The Specific Part You Wanted) */}
                    <div className="space-y-8">
                        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-indigo-50 p-4 rounded-3xl text-indigo-600"><Users size={28} /></div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Attendance Tracker</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Percentage Required</label>
                                    <select 
                                        value={criteria} 
                                        onChange={(e) => setCriteria(parseFloat(e.target.value))} 
                                        className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-indigo-600 outline-none cursor-pointer"
                                    >
                                        <option value={0.75}>75% Criteria</option>
                                        <option value={0.80}>80% Criteria</option>
                                        <option value={0.85}>85% Criteria</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Classes Attended</label>
                                    <input 
                                        type="number" 
                                        value={presentClasses} 
                                        onChange={(e) => setPresentClasses(e.target.value)} 
                                        className="w-full p-4 bg-slate-50 rounded-2xl font-black text-2xl outline-none" 
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Total Classes</label>
                                    <input 
                                        type="number" 
                                        value={totalClasses} 
                                        onChange={(e) => setTotalClasses(e.target.value)} 
                                        className="w-full p-4 bg-slate-50 rounded-2xl font-black text-2xl outline-none" 
                                    />
                                </div>
                            </div>

                            {/* Result Display Box */}
                            <div className={`mt-10 p-6 rounded-[2rem] border text-center transition-all ${attendanceData.safe ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
                                <h3 className="text-5xl font-black mb-2">{attendanceData.percentage}%</h3>
                                <p className="text-xs font-bold uppercase tracking-wide px-4 leading-tight">
                                    {attendanceData.status}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
