import React, { useState, useMemo } from 'react';
import { mockJobs } from '../data/mockData';
import { JobPosting } from '../data/mockData';

interface Filters {
  types: string[];
  difficulty: string[];
  duration: string[];
  compensationType: string[];
  skills: string[];
}

// Duration categories
const DURATION_RANGES = {
  'short-term': 'Short-term (<1 month)',
  'medium-term': 'Medium-term (1-4 months)',
  'long-term': 'Long-term (4+ months)',
} as const;

// Helper function to categorize duration
const categorizeDuration = (duration: string): keyof typeof DURATION_RANGES => {
  // Extract the number and unit from strings like "2 weeks" or "6 months"
  const match = duration.match(/(\d+)\s*(week|month)/i);
  if (!match) return 'short-term'; // Default to short-term if format doesn't match

  const [, num, unit] = match;
  const months = unit.toLowerCase().startsWith('month') ? 
    parseInt(num) : 
    parseInt(num) / 4; // Convert weeks to months

  if (months < 1) return 'short-term';
  if (months >= 4) return 'long-term';
  return 'medium-term';
};

const Home: React.FC = () => {
  const [jobs] = useState<JobPosting[]>(mockJobs);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    types: [],
    difficulty: [],
    duration: [],
    compensationType: [],
    skills: [],
  });

  const handleApply = (jobId: string) => {
    setAppliedJobs(prev => {
      const newSet = new Set(prev);
      newSet.add(jobId);
      return newSet;
    });
  };

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    const options = {
      types: new Set<string>(),
      difficulty: new Set<string>(),
      compensationType: new Set<string>(),
      skills: new Set<string>(),
    };

    jobs.forEach(job => {
      options.types.add(job.type);
      options.difficulty.add(job.difficulty);
      options.compensationType.add(job.compensation.type);
      job.skills.required.forEach(skill => options.skills.add(skill));
      job.skills.preferred.forEach(skill => options.skills.add(skill));
    });

    return {
      types: Array.from(options.types),
      difficulty: Array.from(options.difficulty),
      duration: Object.keys(DURATION_RANGES),
      compensationType: Array.from(options.compensationType),
      skills: Array.from(options.skills).sort(),
    };
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const typeMatch = filters.types.length === 0 || filters.types.includes(job.type);
      const difficultyMatch = filters.difficulty.length === 0 || filters.difficulty.includes(job.difficulty);
      const durationMatch = filters.duration.length === 0 || 
        filters.duration.includes(categorizeDuration(job.duration));
      const compensationTypeMatch = filters.compensationType.length === 0 || 
        filters.compensationType.includes(job.compensation.type);
      const skillsMatch = filters.skills.length === 0 || 
        filters.skills.some(skill => 
          job.skills.required.includes(skill) || job.skills.preferred.includes(skill)
        );

      return typeMatch && difficultyMatch && durationMatch && compensationTypeMatch && skillsMatch;
    });
  }, [jobs, filters]);

  const handleFilterChange = (category: keyof Filters, value: string) => {
    setFilters(prev => {
      const updated = { ...prev };
      if (updated[category].includes(value)) {
        updated[category] = updated[category].filter(item => item !== value);
      } else {
        updated[category] = [...updated[category], value];
      }
      return updated;
    });
  };

  const clearFilters = () => {
    setFilters({
      types: [],
      difficulty: [],
      duration: [],
      compensationType: [],
      skills: [],
    });
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
              Find entry-level tech jobs, internships, and projects designed for computer science students.
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Controls */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              Filters
            </button>
            {(filters.types.length > 0 || filters.difficulty.length > 0 || 
             filters.duration.length > 0 || filters.compensationType.length > 0 || 
             filters.skills.length > 0) && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all filters
              </button>
            )}
          </div>

          {showFilters && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {/* Job Type Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Job Type</h3>
                  <div className="space-y-2">
                    {filterOptions.types.map(type => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.types.includes(type)}
                          onChange={() => handleFilterChange('types', type)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600 capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Difficulty</h3>
                  <div className="space-y-2">
                    {filterOptions.difficulty.map(level => (
                      <label key={level} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.difficulty.includes(level)}
                          onChange={() => handleFilterChange('difficulty', level)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600 capitalize">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Duration Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Duration</h3>
                  <div className="space-y-2">
                    {filterOptions.duration.map(durationKey => (
                      <label key={durationKey} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.duration.includes(durationKey)}
                          onChange={() => handleFilterChange('duration', durationKey)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {DURATION_RANGES[durationKey as keyof typeof DURATION_RANGES]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Compensation Type Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Compensation Type</h3>
                  <div className="space-y-2">
                    {filterOptions.compensationType.map(type => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.compensationType.includes(type)}
                          onChange={() => handleFilterChange('compensationType', type)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600 capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Skills Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Skills</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filterOptions.skills.map(skill => (
                      <label key={skill} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.skills.includes(skill)}
                          onChange={() => handleFilterChange('skills', skill)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results count */}
          <div className="text-sm text-gray-600">
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'result' : 'results'}
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
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
                      onClick={() => handleApply(job.id)}
                      disabled={appliedJobs.has(job.id)}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        appliedJobs.has(job.id)
                          ? 'bg-green-100 text-green-800 cursor-default'
                          : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                      }`}
                    >
                      {appliedJobs.has(job.id) ? 'Applied' : 'Apply Now'}
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