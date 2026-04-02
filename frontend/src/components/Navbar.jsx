import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BrainCircuit, LogOut, CheckSquare, LineChart, Smile, Code, Compass } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-gray-800 border-b border-gray-700 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-indigo-400 font-bold text-xl">
          <BrainCircuit className="h-6 w-6" />
          <span>StudentMate AI</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-1 text-gray-300 hover:text-indigo-400 transition-colors">
            <LineChart className="h-4 w-4" /><span>Dashboard</span>
          </Link>
          <Link to="/planner" className="flex items-center space-x-1 text-gray-300 hover:text-indigo-400 transition-colors">
            <CheckSquare className="h-4 w-4" /><span>Planner</span>
          </Link>
          <Link to="/study-buddy" className="flex items-center space-x-1 text-gray-300 hover:text-indigo-400 transition-colors">
            <Code className="h-4 w-4" /><span>AI Buddy</span>
          </Link>
           <Link to="/well-being" className="flex items-center space-x-1 text-gray-300 hover:text-indigo-400 transition-colors">
            <Smile className="h-4 w-4" /><span>Well-being</span>
          </Link>
          <Link to="/roadmap" className="flex items-center space-x-1 text-gray-300 hover:text-indigo-400 transition-colors">
            <Compass className="h-4 w-4" /><span>Roadmap</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors ml-4"
          >
            <LogOut className="h-4 w-4" /><span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
