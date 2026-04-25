import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calculator, CheckSquare, LogOut, BrainCircuit, Activity } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20}/> },
    { name: 'Performance AI', path: '/dashboard', icon: <Activity size={20}/> }, // Seedha dashboard ke AI section pe le jayega
    { name: 'GPA Predictor', path: '/gpa', icon: <Calculator size={20}/> },
    { name: 'Task Manager', path: '/todo', icon: <CheckSquare size={20}/> },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-100 min-h-screen p-8 hidden lg:flex flex-col shadow-sm">
      {/* Updated Branding Name */}
      <div className="flex items-center gap-2 mb-12 justify-center">
        <BrainCircuit className="text-indigo-600" size={28} />
        <h1 className="text-xl font-black text-slate-800 tracking-tighter">
          STUDENT<span className="text-indigo-600">TRACK</span>
        </h1>
      </div>
      
      <nav className="flex-1 space-y-3">
        {menuItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path} 
            className={`flex items-center space-x-3 p-4 rounded-[1.2rem] font-bold transition-all duration-300 ${
              location.pathname === item.path 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-105' 
                : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            {item.icon}
            <span className="text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>

      <Link to="/" className="flex items-center space-x-3 p-4 text-rose-400 hover:bg-rose-50 rounded-2xl font-bold mt-auto transition-colors">
        <LogOut size={20}/>
        <span className="text-sm">Log Out System</span>
      </Link>
    </div>
  );
};

export default Sidebar;