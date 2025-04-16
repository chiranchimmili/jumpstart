import React, { useState, useMemo } from 'react';
import { mockJobs } from '../data/mockData';
import { JobPosting } from '../data/mockData';

interface Filters {
  types: string[];
  difficulty: string[];
  duration: string[];
  compensationType: string[];
  skills: string[];
  search: string;
}

// Duration categories
const DURATION_RANGES = {
  'short-term': 'Short-term (<1 month)',
  'medium-term': 'Medium-term (1-4 months)',
  'long-term': 'Long-term (4+ months)',
} as const;

// Helper function to categorize duration
const categorizeDuration = (duration: string): keyof typeof DURATION_RANGES => {
  const match = duration.match(/(\d+)\s*(week|month)/i);
  if (!match) return 'short-term';

  const [, num, unit] = match;
  const months = unit.toLowerCase().startsWith('month') ? 
    parseInt(num) : 
    parseInt(num) / 4;

  if (months < 1) return 'short-term';
  if (months >= 4) return 'long-term';
  return 'medium-term';
};

// Company Logo Component
const CompanyLogo: React.FC<{ name: string }> = ({ name }) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Generate a consistent color based on the company name
  const colors = [
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-teal-500',
    'bg-cyan-500',
  ];
  
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div className={`flex-shrink-0 w-12 h-12 ${bgColor} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
      {initials}
    </div>
  );
};

const Opportunities: React.FC = () => {
  const [jobs] = useState<JobPosting[]>(mockJobs);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    types: [],
    difficulty: [],
    duration: [],
    compensationType: [],
    skills: [],
    search: '',
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
      const searchMatch = filters.search === '' || 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.skills.required.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase())) ||
        job.skills.preferred.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()));

      return typeMatch && difficultyMatch && durationMatch && compensationTypeMatch && skillsMatch && searchMatch;
    });
  }, [jobs, filters]);

  const handleFilterChange = (category: keyof Filters, value: string) => {
    setFilters(prev => {
      const updated = { ...prev };
      if (category === 'search') {
        updated[category] = value;
      } else if (updated[category].includes(value)) {
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
      search: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Find Your Next Opportunity</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse through internships, co-ops, and projects to kickstart your career
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs, companies, or skills..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-blue-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-4 border border-blue-100">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Filters</span>
              </button>
              {(filters.types.length > 0 || filters.difficulty.length > 0 || 
               filters.duration.length > 0 || filters.compensationType.length > 0 || 
               filters.skills.length > 0 || filters.search) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'result' : 'results'}
            </div>
          </div>

          {showFilters && (
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {/* Job Type Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Job Type</h3>
                  <div className="space-y-1">
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
                  <div className="space-y-1">
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
                  <div className="space-y-1">
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
                  <div className="space-y-1">
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
                  <div className="space-y-1 max-h-40 overflow-y-auto">
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
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-blue-100">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <CompanyLogo name={job.company.name} />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-blue-600 mb-1">{job.title}</h3>
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">{job.company.name}</span>
                              <span className="mx-2">•</span>
                              <span>{job.company.location}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleApply(job.id)}
                            disabled={appliedJobs.has(job.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                              appliedJobs.has(job.id)
                                ? 'bg-green-100 text-green-800 cursor-default'
                                : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            }`}
                          >
                            {appliedJobs.has(job.id) ? 'Applied' : 'Apply Now'}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mt-4 mb-4">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full border border-blue-100">
                        {job.type}
                      </span>
                      <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full border border-blue-100">
                        {job.duration}
                      </span>
                      <span className={`text-xs px-2.5 py-1 rounded-full border ${
                        job.difficulty === 'beginner' 
                          ? 'bg-green-50 text-green-700 border-green-100' 
                          : job.difficulty === 'intermediate'
                          ? 'bg-yellow-50 text-yellow-700 border-yellow-100'
                          : 'bg-red-50 text-red-700 border-red-100'
                      }`}>
                        {job.difficulty}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-blue-600 mb-2">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.required.map(skill => (
                            <span key={skill} className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full border border-blue-100">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-blue-600 mb-2">Preferred Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.preferred.map(skill => (
                            <span key={skill} className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full border border-blue-100">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <h4 className="text-sm font-medium text-blue-600 mb-2">Compensation</h4>
                        <span className="text-green-600 font-medium">{job.compensation.amount}</span>
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

export default Opportunities; 