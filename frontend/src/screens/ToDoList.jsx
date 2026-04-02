import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Plus, Trash2, CheckCircle, Circle, Sun, Moon } from 'lucide-react';

const ToDoList = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Sidebar />
      <div className="flex-1 p-6 lg:p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-indigo-600">To-Do List</h2>
            <p className="text-slate-500 font-medium">Manage your daily study tasks.</p>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-white rounded-2xl shadow-sm border">
            {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-slate-600" />}
          </button>
        </header>

        <div className="max-w-2xl mx-auto">
          {/* Input Area */}
          <div className={`p-4 rounded-3xl shadow-lg border flex gap-3 mb-8 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <input 
              type="text" 
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="What needs to be done?" 
              className="flex-1 bg-transparent outline-none p-2 font-medium"
            />
            <button onClick={addTask} className="bg-indigo-600 text-white p-3 rounded-2xl hover:bg-indigo-700 transition-all">
              <Plus size={24} />
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-slate-400 italic">No tasks yet. Add something to get started!</p>
              </div>
            ) : (
              tasks.map(task => (
                <div 
                  key={task.id} 
                  className={`flex items-center justify-between p-5 rounded-[2rem] border shadow-sm transition-all ${
                    task.completed ? 'opacity-60 bg-slate-50' : (darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100')
                  }`}
                >
                  <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleTask(task.id)}>
                    {task.completed ? <CheckCircle className="text-green-500" /> : <Circle className="text-slate-300" />}
                    <span className={`font-bold ${task.completed ? 'line-through text-slate-400' : ''}`}>
                      {task.text}
                    </span>
                  </div>
                  <button onClick={() => deleteTask(task.id)} className="text-red-400 hover:text-red-600 p-2">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;