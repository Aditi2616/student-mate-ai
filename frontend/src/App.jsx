import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // 👈 Isse import karna mat bhulna
import LoginScreen from './screens/LoginScreen';
import Dashboard from './Dashboard';
import GPAPredictor from './screens/GPAPredictor';
import ToDoList from './screens/ToDoList';

function App() {
  return (
    // ⚠️ CRITICAL: AuthProvider hamesha Router ke bahar ya andar wrap hona chahiye
    <AuthProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gpa" element={<GPAPredictor />} />
          <Route path="/todo" element={<ToDoList />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
