import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StudentDashboard from './pages/StudentDashboard';
import Opportunities from './pages/Opportunities';
import InterviewPrep from './pages/InterviewPrep';
import MockInterview from './pages/MockInterview';
import InterviewSettings from './pages/InterviewSettings';
import Networking from './pages/Networking';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/networking" element={<Networking />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
          <Route path="/interview-settings" element={<InterviewSettings />} />
          <Route 
            path="/mock-interview" 
            element={
              <MockInterview />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
