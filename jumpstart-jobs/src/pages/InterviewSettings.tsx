import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface InterviewSettings {
  type: 'technical' | 'behavioral';
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // in minutes
}

const InterviewSettings: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<InterviewSettings>({
    type: 'technical',
    difficulty: 'medium',
    duration: 30
  });

  const handleStartInterview = () => {
    navigate('/mock-interview', { state: settings });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            Configure Your Mock Interview
          </h1>

          <div className="space-y-8">
            {/* Interview Type Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-gray-300">Interview Type</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSettings({ ...settings, type: 'technical' })}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    settings.type === 'technical'
                      ? 'border-blue-500 bg-blue-500/10 text-white'
                      : 'border-gray-600 text-gray-300 hover:border-blue-500'
                  }`}
                >
                  <div className="text-lg font-medium">Technical</div>
                  <p className="text-sm text-gray-400 mt-1">
                    Coding and problem-solving questions
                  </p>
                </button>
                <button
                  onClick={() => setSettings({ ...settings, type: 'behavioral' })}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    settings.type === 'behavioral'
                      ? 'border-blue-500 bg-blue-500/10 text-white'
                      : 'border-gray-600 text-gray-300 hover:border-blue-500'
                  }`}
                >
                  <div className="text-lg font-medium">Behavioral</div>
                  <p className="text-sm text-gray-400 mt-1">
                    Soft skills and experience-based questions
                  </p>
                </button>
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-gray-300">Difficulty Level</h2>
              <div className="grid grid-cols-3 gap-4">
                {['easy', 'medium', 'hard'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSettings({ ...settings, difficulty: level as 'easy' | 'medium' | 'hard' })}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      settings.difficulty === level
                        ? 'border-blue-500 bg-blue-500/10 text-white'
                        : 'border-gray-600 text-gray-300 hover:border-blue-500'
                    }`}
                  >
                    <div className="text-lg font-medium capitalize">{level}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-gray-300">Interview Duration</h2>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={settings.duration}
                  onChange={(e) => setSettings({ ...settings, duration: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-white font-medium w-16 text-center">
                  {settings.duration} min
                </span>
              </div>
              <p className="text-sm text-gray-400">
                {settings.type === 'technical'
                  ? 'Recommended: 30-45 minutes for technical interviews'
                  : 'Recommended: 15-30 minutes for behavioral interviews'}
              </p>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartInterview}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSettings; 