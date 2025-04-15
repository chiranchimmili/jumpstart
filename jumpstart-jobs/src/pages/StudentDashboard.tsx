import React from 'react';
import { mockUser, mockJobs } from '../data/mockData';
import { JobPosting } from '../data/mockData';

const StudentDashboard: React.FC = () => {
  const savedJobs = mockJobs.filter((job: JobPosting) => 
    mockUser.savedProjects.includes(job.id)
  );
  
  const completedJobs = mockJobs.filter((job: JobPosting) => 
    mockUser.completedProjects.includes(job.id)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockUser.skills.map((skill) => (
              <div key={skill.name} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{skill.name}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${skill.progress}%` }}></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {skill.completedProjects} of {skill.totalProjects} jobs completed
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Jobs Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Saved Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job: JobPosting) => (
              <div key={job.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                <p className="mt-2 text-gray-600">{job.description}</p>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.required.map((skill) => (
                      <span key={skill} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Jobs Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Completed Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedJobs.map((job: JobPosting) => (
              <div key={job.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                  <span className="text-green-600">✓</span>
                </div>
                <p className="mt-2 text-gray-600">{job.description}</p>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.required.map((skill) => (
                      <span key={skill} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 