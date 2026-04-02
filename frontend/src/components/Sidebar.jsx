import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calculator, CheckSquare, LogOut, GraduationCap } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20}/> },
    { name: 'GPA Predictor', path: '/gpa', icon: <Calculator size={20}/> },
    { name: 'To-Do List', path: '/todo', icon: <CheckSquare size={20}/> },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 min-h-screen p-6 hidden lg:flex flex-col">
      <h1 className="text-xl font-black text-indigo-600 italic uppercase mb-10 text-center">Student-Mate AI</h1>
      
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`flex items-center space-x-3 p-3 rounded-xl font-bold transition-all ${
              location.pathname === item.path ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <Link to="/" className="flex items-center space-x-3 p-3 text-red-400 hover:bg-red-50 rounded-xl font-bold mt-auto">
        <LogOut size={20}/>
        <span>Logout</span>
      </Link>
    </div>
  );
};

export default Sidebar;