import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Calendar, CheckCircle2, Circle, Clock, Plus, Trash2 } from 'lucide-react';

const Planner = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTask, setNewTask] = useState({ title: '', deadline: '', priority: 'Medium' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/tasks');
            
            // Auto-prioritize logic: Sort by incomplete first, then by deadline, then by priority
            const sortedTasks = data.sort((a, b) => {
                if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;
                
                const dateA = new Date(a.deadline).getTime();
                const dateB = new Date(b.deadline).getTime();
                if (dateA !== dateB) return dateA - dateB;

                const priorityWeight = { 'High': 3, 'Medium': 2, 'Low': 1 };
                return priorityWeight[b.priority] - priorityWeight[a.priority];
            });

            setTasks(sortedTasks);
        } catch (error) {
            console.error('Error fetching tasks', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchTasks();
    }, [user]);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.post('/tasks', newTask);
            setNewTask({ title: '', deadline: '', priority: 'Medium' });
            fetchTasks();
        } catch (error) {
            console.error('Error creating task', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleTaskStatus = async (task) => {
        try {
            await api.put(`/tasks/${task._id}`, { isCompleted: !task.isCompleted });
            fetchTasks(); // Refresh to re-sort
        } catch (error) {
            console.error('Error updating task', error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
             console.error('Error deleting task', error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div></div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between border-b border-gray-700 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center">
                        <Calendar className="mr-3 text-indigo-500 h-8 w-8" />
                        Smart Planner
                    </h1>
                    <p className="text-gray-400 mt-1 pl-11">Auto-prioritized tasks based on deadlines</p>
                </div>
            </div>

            {/* Add Task Form */}
            <form onSubmit={handleCreateTask} className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <input 
                        type="text" 
                        required
                        placeholder="What needs to be done?"
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        value={newTask.title}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    />
                </div>
                <div className="w-full md:w-48">
                    <input 
                        type="date" 
                        required
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-indigo-500 transition-colors"
                        value={newTask.deadline}
                        onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                    />
                </div>
                <div className="w-full md:w-40">
                    <select 
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
                        value={newTask.priority}
                        onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    >
                        <option value="High">High Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="Low">Low Priority</option>
                    </select>
                </div>
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                    <Plus className="h-5 w-5 mr-1" /> Add
                </button>
            </form>

            {/* Task List */}
            <div className="space-y-4">
                {tasks.length === 0 ? (
                    <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700 border-dashed">
                        <CheckCircle2 className="mx-auto h-12 w-12 text-gray-600 mb-4" />
                        <h3 className="text-xl font-medium text-gray-400">No tasks yet</h3>
                        <p className="text-gray-500 mt-1">Add your first assignment or goal above!</p>
                    </div>
                ) : (
                    tasks.map(task => (
                        <div 
                            key={task._id} 
                            className={`flex items-center justify-between p-4 sm:p-5 rounded-xl border transition-all duration-200 group ${
                                task.isCompleted 
                                    ? 'bg-gray-800/50 border-gray-800 opacity-60' 
                                    : 'bg-gray-800 border-gray-700 hover:border-gray-600 shadow-sm'
                            }`}
                        >
                            <div className="flex items-center space-x-4 flex-1 min-w-0">
                                <button 
                                    onClick={() => toggleTaskStatus(task)}
                                    className="text-gray-400 hover:text-indigo-400 transition-colors flex-shrink-0"
                                >
                                    {task.isCompleted ? (
                                        <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                                    ) : (
                                        <Circle className="h-6 w-6" />
                                    )}
                                </button>
                                
                                <div className="flex-1 min-w-0 pr-4">
                                    <h3 className={`text-lg font-medium truncate ${task.isCompleted ? 'text-gray-500 line-through' : 'text-gray-100'}`}>
                                        {task.title}
                                    </h3>
                                    <div className="flex flex-wrap items-center mt-1 text-xs text-gray-500 gap-3">
                                        <span className="flex items-center">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {new Date(task.deadline).toLocaleDateString()}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-full border ${
                                            task.priority === 'High' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 
                                            task.priority === 'Medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 
                                            'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                        }`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => deleteTask(task._id)}
                                className="p-2 text-gray-500 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 flex-shrink-0"
                                title="Delete Task"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Planner;
