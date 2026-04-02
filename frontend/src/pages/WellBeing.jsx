import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { HeartPulse, Activity, Brain, Clock, Plus, AlertTriangle } from 'lucide-react';

const WellBeing = () => {
    const { user } = useAuth();
    const [moods, setMoods] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Form state
    const [selectedMood, setSelectedMood] = useState('Okay');
    const [notes, setNotes] = useState('');
    const [durationInput, setDurationInput] = useState('');
    const [subjectInput, setSubjectInput] = useState('');
    const [scoreInput, setScoreInput] = useState(7);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [burnoutAlert, setBurnoutAlert] = useState(false);

    const fetchMoods = async () => {
        try {
            const { data } = await api.get('/moods');
            setMoods(data);
        } catch (error) {
            console.error('Error fetching moods', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchMoods();
    }, [user]);

    const handleMoodSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { data } = await api.post('/moods', { mood: selectedMood, notes });
            if (data.burnoutAlert) {
                 setBurnoutAlert(true);
            }
            setNotes('');
            fetchMoods();
        } catch (error) {
            console.error('Error logging mood', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStudyLogSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
             await api.post('/studylogs', { 
                subject: subjectInput, 
                durationInMinutes: parseInt(durationInput),
                productivityScore: parseInt(scoreInput)
            });
            setSubjectInput('');
            setDurationInput('');
            setScoreInput(7);
            alert('Study session logged successfully!');
        } catch (error) {
             console.error('Error logging study session', error);
        } finally {
             setIsSubmitting(false);
        }
    };

    const moodColors = {
        'Great': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
        'Good': 'bg-teal-500/20 text-teal-400 border-teal-500/50',
        'Okay': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
        'Stressed': 'bg-amber-500/20 text-amber-400 border-amber-500/50',
        'Exhausted': 'bg-rose-500/20 text-rose-400 border-rose-500/50'
    };

    if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div></div>;

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between border-b border-gray-700 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center">
                        <HeartPulse className="mr-3 text-rose-500 h-8 w-8" />
                        Well-being & Tracking
                    </h1>
                    <p className="text-gray-400 mt-1 pl-11">Monitor your mental health and study habits</p>
                </div>
            </div>

            {burnoutAlert && (
                 <div className="bg-rose-500/20 border border-rose-500 p-4 rounded-xl flex items-start space-x-4 animate-pulse">
                    <AlertTriangle className="h-6 w-6 text-rose-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-lg font-bold text-rose-400">Burnout Warning!</h3>
                        <p className="text-rose-200 text-sm mt-1">
                            You've logged multiple high-stress or exhaustion moods recently. Please consider taking a break, 
                            reducing your workload, or speaking to a counselor. Your health comes first!
                        </p>
                        <button onClick={() => setBurnoutAlert(false)} className="mt-3 text-sm font-medium text-rose-300 hover:text-white underline px-0">
                            Dismiss Warning
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Col: Forms */}
                <div className="space-y-8">
                    {/* Mood Form */}
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-sm">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                            <Brain className="mr-2 h-5 w-5 text-indigo-400" /> 
                            How are you feeling?
                        </h2>
                        
                        <form onSubmit={handleMoodSubmit} className="space-y-4">
                            <div className="flex space-x-2 overflow-x-auto pb-2">
                                {['Great', 'Good', 'Okay', 'Stressed', 'Exhausted'].map(m => (
                                    <button
                                        key={m}
                                        type="button"
                                        onClick={() => setSelectedMood(m)}
                                        className={`px-4 py-2 rounded-lg border transition-all whitespace-nowrap ${
                                            selectedMood === m 
                                                ? moodColors[m] + ' ring-2 ring-offset-2 ring-offset-gray-800 ring-indigo-500' 
                                                : 'bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-700'
                                        }`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                            
                            <div>
                                <textarea
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="Add any notes about your day... (optional)"
                                    rows="2"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
                            >
                                Log Mood
                            </button>
                        </form>
                    </div>

                    {/* Study Session Form */}
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-sm">
                         <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                            <Activity className="mr-2 h-5 w-5 text-emerald-400" /> 
                            Log Study Session
                        </h2>
                        <form onSubmit={handleStudyLogSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Subject</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    value={subjectInput}
                                    onChange={(e) => setSubjectInput(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Duration (mins)</label>
                                    <input 
                                        type="number" 
                                        required
                                        min="1"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                        value={durationInput}
                                        onChange={(e) => setDurationInput(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Productivity (1-10)</label>
                                    <input 
                                        type="number" 
                                        required
                                        min="1" max="10"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                        value={scoreInput}
                                        onChange={(e) => setScoreInput(e.target.value)}
                                    />
                                </div>
                            </div>
                             <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50 mt-2"
                            >
                                Save Session
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Col: Mood History */}
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-sm flex flex-col h-full max-h-[700px]">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-gray-400" /> 
                        Recent Check-ins
                    </h2>
                    
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        {moods.length === 0 ? (
                             <p className="text-center text-gray-500 py-8">No mood entries yet.</p>
                        ) : (
                            moods.map(entry => (
                                <div key={entry._id} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${moodColors[entry.mood]}`}>
                                            {entry.mood}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(entry.date).toLocaleDateString()} at {new Date(entry.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </span>
                                    </div>
                                    {entry.notes && (
                                        <p className="text-gray-300 text-sm mt-2 pt-2 border-t border-gray-800">
                                            "{entry.notes}"
                                        </p>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WellBeing;
