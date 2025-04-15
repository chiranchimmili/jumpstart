import React, { useState } from 'react';
import { JobPosting } from '../data/mockData';

interface NewJobForm extends Omit<JobPosting, 'id'> {
  title: string;
  description: string;
  company: {
    name: string;
    location: string;
  };
  duration: string;
  type: 'internship' | 'part-time' | 'contract';
  difficulty: 'beginner' | 'intermediate';
  skills: {
    required: string[];
    preferred: string[];
  };
  compensation: {
    type: 'hourly' | 'fixed' | 'range';
    amount: string;
  };
}

const defaultNewJob: NewJobForm = {
  title: '',
  description: '',
  company: {
    name: '',
    location: '',
  },
  duration: '',
  type: 'internship',
  difficulty: 'beginner',
  skills: {
    required: [],
    preferred: [],
  },
  compensation: {
    type: 'hourly',
    amount: '',
  },
};

const EmployerDashboard: React.FC = () => {
  const [postedJobs, setPostedJobs] = useState<JobPosting[]>([]);
  const [newJob, setNewJob] = useState<NewJobForm>(defaultNewJob);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newJob.title && newJob.description && newJob.company.name && newJob.company.location) {
      const job: JobPosting = {
        id: String(Date.now()),
        ...newJob,
      };
      setPostedJobs([...postedJobs, job]);
      setNewJob(defaultNewJob);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Post New Job Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Post a New Job</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                value={newJob.title}
                onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                value={newJob.company.name}
                onChange={(e) => setNewJob({
                  ...newJob,
                  company: { ...newJob.company, name: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={newJob.company.location}
                onChange={(e) => setNewJob({
                  ...newJob,
                  company: { ...newJob.company, location: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={newJob.description}
                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <input
                  type="text"
                  value={newJob.duration}
                  onChange={(e) => setNewJob({ ...newJob, duration: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 3 months"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={newJob.type}
                  onChange={(e) => setNewJob({ ...newJob, type: e.target.value as JobPosting['type'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="internship">Internship</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                <select
                  value={newJob.difficulty}
                  onChange={(e) => setNewJob({ ...newJob, difficulty: e.target.value as JobPosting['difficulty'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Required Skills (comma-separated)</label>
              <input
                type="text"
                value={newJob.skills.required.join(', ')}
                onChange={(e) => setNewJob({
                  ...newJob,
                  skills: {
                    ...newJob.skills,
                    required: e.target.value.split(',').map(skill => skill.trim()).filter(Boolean)
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., React, JavaScript, HTML"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Preferred Skills (comma-separated)</label>
              <input
                type="text"
                value={newJob.skills.preferred.join(', ')}
                onChange={(e) => setNewJob({
                  ...newJob,
                  skills: {
                    ...newJob.skills,
                    preferred: e.target.value.split(',').map(skill => skill.trim()).filter(Boolean)
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., TypeScript, Tailwind, Git"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Compensation Type</label>
                <select
                  value={newJob.compensation.type}
                  onChange={(e) => setNewJob({
                    ...newJob,
                    compensation: {
                      ...newJob.compensation,
                      type: e.target.value as JobPosting['compensation']['type']
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="hourly">Hourly</option>
                  <option value="fixed">Fixed</option>
                  <option value="range">Range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="text"
                  value={newJob.compensation.amount}
                  onChange={(e) => setNewJob({
                    ...newJob,
                    compensation: {
                      ...newJob.compensation,
                      amount: e.target.value
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., $20-25/hour or $5000 total"
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>

        {/* Posted Jobs List */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Posted Jobs</h2>
          <div className="space-y-6">
            {postedJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <div className="mt-1">
                      <span className="text-gray-700 font-medium">{job.company.name}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-600">{job.company.location}</span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">{job.description}</p>
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Required Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {job.skills.required.map((skill) => (
                          <span key={skill} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Preferred Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {job.skills.preferred.map((skill) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard; 