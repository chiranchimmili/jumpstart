import React, { useState } from 'react';
import { mockJobs } from '../data/mockData';
import { JobPosting } from '../data/mockData';

const Home: React.FC = () => {
  const [jobs, setJobs] = useState<JobPosting[]>(mockJobs);

  const toggleSave = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { ...job, isSaved: !job.isSaved } 
        : job
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Jumpstart Your Tech Career
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              Find entry-level tech jobs and internships designed for computer science students.
            </p>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <div className="mt-1">
                        <span className="text-gray-700 font-medium">{job.company.name}</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-600">{job.company.location}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSave(job.id)}
                      className="text-gray-400 hover:text-blue-600"
                    >
                      {job.isSaved ? '★' : '☆'}
                    </button>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded">
                        {job.type}
                      </span>
                      <span className="bg-gray-100 text-gray-800 text-xs px-2.5 py-0.5 rounded">
                        {job.duration}
                      </span>
                      <span className={`text-xs px-2.5 py-0.5 rounded ${
                        job.difficulty === 'beginner' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {job.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Required Skills</h4>
                          <div className="flex flex-wrap gap-1">
                            {job.skills.required.map(skill => (
                              <span key={skill} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Preferred Skills</h4>
                          <div className="flex flex-wrap gap-1">
                            {job.skills.preferred.map(skill => (
                              <span key={skill} className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Compensation</h4>
                          <span className="text-green-600 font-medium">{job.compensation.amount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; 