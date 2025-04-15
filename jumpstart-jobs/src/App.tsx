import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import StudentDashboard from './pages/StudentDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import Logo from './components/Logo';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
                  <Logo />
                  <span className="text-2xl font-bold text-blue-600">Jumpstart</span>
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link to="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-blue-500">
                    Home
                  </Link>
                  <Link to="/student" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-blue-500">
                    Student Dashboard
                  </Link>
                  <Link to="/employer" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-blue-500">
                    Employer Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/employer" element={<EmployerDashboard />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Jumpstart</h3>
                <p className="text-gray-400">Helping students gain real-world experience through curated projects.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                  <li><Link to="/student" className="text-gray-400 hover:text-white">Student Dashboard</Link></li>
                  <li><Link to="/employer" className="text-gray-400 hover:text-white">Employer Portal</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p className="text-gray-400">Email: contact@jumpstartjobs.com</p>
                <p className="text-gray-400">Phone: (555) 123-4567</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
              <p>&copy; 2024 JumpstartAll rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
