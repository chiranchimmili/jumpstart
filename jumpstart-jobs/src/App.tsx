import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StudentDashboard from './pages/StudentDashboard';
import Opportunities from './pages/Opportunities';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
